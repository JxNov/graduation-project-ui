<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { Generation } from '~/schema'
import { generationSchema } from '~/schema'
import { createColumns } from '~/composables/columns'
import { GenerationDialogCreateEdit, GenerationDialogDelete } from '~/components/common/dialog/generation'
import { extractValue } from '~/utils/extractValue'
import { checkPermissions } from '~/utils/checkPermissions'

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

  await fetchData()
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
    ['name', 'Khóa học sinh'],
    ['startDate', 'Ngày bắt đầu'],
    ['endDate', 'Ngày kết thúc'],
    ['actions', '', '', {
      enableSorting: false,
      enableHiding: false
    }]
  ],
  generationSchema,
  [],
  'admin.update',
  'admin.delete'
) as ColumnDef<Generation>[]

const valueStartDate = extractValue($generationStore.generations, 'startDate')
const valueEndDate = extractValue($generationStore.generations, 'endDate')

const filters = [
  {
    name: 'startDate',
    label: 'Ngày bắt đầu',
    values: valueStartDate
  },
  {
    name: 'endDate',
    label: 'Ngày kết thúc',
    values: valueEndDate
  }
]

const handleInteractOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (target?.closest('[data-sonner-toaster]')) return event.preventDefault()
}

const shouldShowElement = computed(() => {
  return checkPermissions($authStore.user.permissions, ['admin.create'])
})

const handleCloseDialog = () => {
  isCreating.value = false
  isEditing.value = false
  isDeleting.value = false
  selectedValue.value = {}
}

async function fetchData() {
  const promises = []

  if (!$generationStore.generations.length) {
    promises.push($generationStore.fetchGenerations())
  }

  await Promise.all(promises)
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h2 class="text-4xl font-bold tracking-tight">Quản lý khóa học sinh</h2>
      <Button variant="default" @click="isCreating = true" v-if="shouldShowElement">
        Tạo mới khóa học sinh
      </Button>
    </div>

    <LayoutTable
      :data="$generationStore.generations"
      :columns="columns"
      :filters="filters"
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
