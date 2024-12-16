<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { Semester } from '~/schema'
import { semesterSchema } from '~/schema'
import { createColumns } from '~/composables/columns'
import { SemesterDialogCreateEdit, SemesterDialogDelete } from '~/components/common/dialog/semester'
import { extractValue } from '~/utils/extractValue'
import { checkPermissions } from '~/utils/checkPermissions'

const { $authStore, $semesterStore, $academicYearStore, $bus } = useNuxtApp()

const isCreating = ref<boolean>(false)
const isEditing = ref<boolean>(false)
const isDeleting = ref<boolean>(false)
const selectedValue = ref<Semester | object>({})

onMounted(async () => {
  $bus.on('open-dialog-edit', (row: Semester) => {
    isEditing.value = true
    selectedValue.value = row
  })

  $bus.on('open-dialog-delete', (row: Semester) => {
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

  $bus.on('delete-rows', (values: Semester[]) => {
    const slugs = values.map((value) => value.slug)
    console.log(slugs)
  })

  if (!$academicYearStore.academicYears.length) {
    await $academicYearStore.fetchAcademicYears()
  }

  if (!$semesterStore.semesters.length) {
    await $semesterStore.fetchSemesters()
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
    ['name', 'Semester'],
    ['generationName', 'Generation'],
    ['academicYearName', 'Academic Year'],
    ['startDate', 'Start Date'],
    ['endDate', 'End Date'],
    ['actions', '', '', {
      enableSorting: false,
      enableHiding: false
    }]
  ],
  semesterSchema,
  [],
  'admin.update',
  'admin.delete'
) as ColumnDef<Semester>[]

const valueGenerationName = extractValue($semesterStore.semesters, 'generationName')
const valueAcademicYearName = extractValue($semesterStore.semesters, 'academicYearName')
const valueSemester = extractValue($semesterStore.semesters, 'name')
const valueStartDate = extractValue($semesterStore.semesters, 'startDate')
const valueEndDate = extractValue($semesterStore.semesters, 'endDate')

const filters = [
  {
    name: 'name',
    label: 'Semester',
    values: valueSemester
  },
  {
    name: 'generationName',
    label: 'Generation',
    values: valueGenerationName
  },
  {
    name: 'academicYearName',
    label: 'Academic Year',
    values: valueAcademicYearName
  },
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
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h2 class="text-4xl font-bold tracking-tight">Manage semesters</h2>
      <Button variant="default" @click="isCreating = true" v-if="shouldShowElement">
        Create new semester
      </Button>
    </div>

    <LayoutTable
      :data="$semesterStore.semesters"
      :columns="columns"
      :filters="filters"
    />
  </div>

  <Dialog :open="isCreating" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">
      <SemesterDialogCreateEdit />
    </DialogContent>
  </Dialog>

  <Dialog :open="isEditing" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">
      <SemesterDialogCreateEdit :data="selectedValue" edit />
    </DialogContent>
  </Dialog>

  <Dialog :open="isDeleting" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">
      <SemesterDialogDelete :data="selectedValue" />
    </DialogContent>
  </Dialog>
</template>
