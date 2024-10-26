<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { Generation } from '~/schema'
import { generationSchema } from '~/schema'
import { createColumns } from '~/components/custom/table/columns'
import { GenerationDialogCreateEdit } from '~/components/custom/dialog/generation'
import { toast } from 'vue-sonner'
import { useThrottle } from '~/composables/useThrottle'
import { extractValue } from '~/utils/extractValue'
import { showElement } from '~/utils/showElement'

const { $generalStore, $generationStore, $bus } = useNuxtApp()

onMounted(async () => {
  if (!$generationStore.generations.length) {
    await $generationStore.fetchGenerations()
  }
})

const isCreating = ref<boolean>(false)
const isEditing = ref(false)
const isDeleting = ref(false)
let selectedGeneration = reactive<Generation | object>({})

$bus.on('open-dialog-edit-generation', (row: Generation) => {
  isEditing.value = true
  selectedGeneration = row
})

$bus.on('open-dialog-delete-generation', (row: Generation) => {
  isDeleting.value = true
  selectedGeneration = row
})

$bus.on('close-dialog-create-edit-generation', (value: boolean) => {
  isCreating.value = value
  isEditing.value = value
  selectedGeneration = {}
})

$bus.on('close-dialog-delete-generation', (value: boolean) => {
  isDeleting.value = value
  selectedGeneration = {}
})

$bus.on('delete-rows-generation', (value: Generation[]) => {
  console.log(value)
})

const columns = createColumns(
  [
    ['select'],
    ['name', 'Generation', 'w-1/3'],
    ['year', 'Year', 'w-1/3'],
    ['start_date', 'Start Date', 'w-1/3'],
    ['end_date', 'End Date', 'w-1/3'],
    ['actions']
  ],
  generationSchema,
  [],
  'open-dialog-edit-generation',
  'open-dialog-delete-generation',
  'users.edit',
  'users.delete'
) as ColumnDef<Generation>[]

const valueStartDate = extractValue($generationStore.generations, 'start_date')
const valueEndDate = extractValue($generationStore.generations, 'end_date')

const filters = [
  {
    name: 'start_date',
    label: 'Start Date',
    values: valueStartDate
  },
  {
    name: 'end_date',
    label: 'End Date',
    values: valueEndDate
  }
]

const reloadData = useThrottle(() => {
  const promise = () => $generationStore.reloadData()

  return toast.promise(promise, {
    loading: 'Reloading data...',
    success: 'Data reloaded successfully',
    error: 'Data reloaded failed'
  })
}, 60000, 'generation')

const handleInteractOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (target?.closest('[data-sonner-toaster]')) return event.preventDefault()
}

const shouldShowElement = computed(() => {
  return showElement($generalStore.userPermissions, ['users.create'])
})

const handleCloseDialog = () => {
  isCreating.value = false
  isEditing.value = false
  isDeleting.value = false
  selectedGeneration = {}
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
      emit-delete-rows="delete-rows-generation"
    />
  </div>

  <Dialog :open="isCreating" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">
      <GenerationDialogCreateEdit />
    </DialogContent>
  </Dialog>

  <!--  <Dialog :open="isEditing" @update:open="handleCloseDialog">-->
  <!--    <DialogContent class="sm:max-w-[550px]" @interact-outside="handleInteractOutside">-->
  <!--      <GenerationDialogCreateEdit :data="selectedGeneration" edit/>-->
  <!--    </DialogContent>-->
  <!--  </Dialog>-->

  <!--  <Dialog :open="isDeleting" @update:open="handleCloseDialog">-->
  <!--    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">-->
  <!--      <GenerationDialogDelete :data="selectedGeneration"/>-->
  <!--    </DialogContent>-->
  <!--  </Dialog>-->
</template>
