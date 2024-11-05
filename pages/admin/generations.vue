<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { Generation } from '~/schema'
import { generationSchema } from '~/schema'
import { createColumns } from '~/composables/columns'
import { GenerationDialogCreateEdit, GenerationDialogDelete } from '~/components/common/dialog/generation'
import { useThrottle } from '~/composables/useThrottle'
import { extractValue } from '~/utils/extractValue'
import { showElement } from '~/utils/showElement'

const { $authStore, $generationStore, $bus } = useNuxtApp()

const isCreating = ref<boolean>(false)
const isEditing = ref<boolean>(false)
const isDeleting = ref<boolean>(false)
const selectedValue = ref<Generation | object>({})

onMounted(async () => {
  $bus.on('open-dialog-edit', (row: Generation) => {
    isEditing.value = true
    selectedValue.value = row
  })

  $bus.on('open-dialog-delete', (row: Generation) => {
    isDeleting.value = true
    selectedValue.value = row
  })

  $bus.on('close-dialog-create-edit', (value: boolean) => {
    isCreating.value = value
    isEditing.value = value
    selectedValue.value = {}
  })

  $bus.on('close-dialog-delete', (value: boolean) => {
    isDeleting.value = value
    selectedValue.value = {}
  })

  $bus.on('delete-rows', (values: Generation[]) => {
    const slugs = values.map((value) => value.slug)
    console.log(slugs)
  })

  if (!$generationStore.generations.length) {
    await $generationStore.fetchGenerations()
  }
})

onBeforeUnmount(() => {
  $bus.off('open-dialog-edit')
  $bus.off('open-dialog-delete')
  $bus.off('close-dialog-create-edit')
  $bus.off('close-dialog-delete')
  $bus.off('delete-rows')
})

const columns = createColumns(
  [
    ['select'],
    ['name', 'Generation'],
    ['startDate', 'Start Date'],
    ['endDate', 'End Date'],
    ['actions', '', '', {
      enableSorting: false,
      enableHiding: false
    }]
  ],
  generationSchema,
  [],
  'users.update',
  'users.delete'
) as ColumnDef<Generation>[]

const valueStartDate = extractValue($generationStore.generations, 'startDate')
const valueEndDate = extractValue($generationStore.generations, 'endDate')

const filters = [
  {
    name: 'startDate',
    label: 'Start Date',
    values: valueStartDate
  },
  {
    name: 'endDate',
    label: 'End Date',
    values: valueEndDate
  }
]

const reloadData = useThrottle(() => {
  $generationStore.reloadData()
}, 60000, 'generation')

const handleInteractOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (target?.closest('[data-sonner-toaster]')) return event.preventDefault()
}

const shouldShowElement = computed(() => {
  return showElement($authStore.user.permissions, ['users.create'])
})

const handleCloseDialog = () => {
  isCreating.value = false
  isEditing.value = false
  isDeleting.value = false
  selectedValue.value = {}
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h2 class="text-4xl font-bold tracking-tight">Manage Generations</h2>
      <Button variant="default" @click="isCreating = true" v-if="shouldShowElement">
        Create new generation
      </Button>
    </div>

    <LayoutTable
      :data="$generationStore.generations"
      :columns="columns"
      :filters="filters"
      :reload-data="reloadData"
    />
  </div>

  <Dialog :open="isCreating" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">
      <GenerationDialogCreateEdit />
    </DialogContent>
  </Dialog>

  <Dialog :open="isEditing" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">
      <GenerationDialogCreateEdit :data="selectedValue" edit />
    </DialogContent>
  </Dialog>

  <Dialog :open="isDeleting" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">
      <GenerationDialogDelete :data="selectedValue" />
    </DialogContent>
  </Dialog>
</template>
