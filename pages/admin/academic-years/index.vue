<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { AcademicYear } from '~/schema'
import { academicYearSchema } from '~/schema'
import { createColumns } from '~/composables/columns'
import { AcademicYearDialogCreateEdit, AcademicYearDialogDelete } from '~/components/common/dialog/academic-year'
import { extractValue } from '~/utils/extractValue'
import { checkPermissions } from '~/utils/checkPermissions'
import { Trash2 } from 'lucide-vue-next'

const { $authStore, $academicYearStore, $generationStore, $bus } = useNuxtApp()

const isCreating = ref<boolean>(false)
const isEditing = ref<boolean>(false)
const isDeleting = ref<boolean>(false)
const selectedValue = ref<AcademicYear | object>({})

onMounted(async () => {
  $bus.on('open-dialog-edit', (row: AcademicYear) => {
    isEditing.value = true
    selectedValue.value = row
  })

  $bus.on('open-dialog-delete', (row: AcademicYear) => {
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

  $bus.on('delete-rows', (values: AcademicYear[]) => {
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
    ['name', 'Năm học'],
    ['generationName', 'Khóa học sinh'],
    ['startDate', 'Ngày bắt đầu'],
    ['endDate', 'Ngày kết thúc'],
    ['actions', '', '', {
      enableSorting: false,
      enableHiding: false
    }]
  ],
  academicYearSchema,
  [],
  'admin.update',
  'admin.delete'
) as ColumnDef<AcademicYear>[]

const valueGenerationName = extractValue($academicYearStore.academicYears, 'generationName')
const valueStartDate = extractValue($academicYearStore.academicYears, 'startDate')
const valueEndDate = extractValue($academicYearStore.academicYears, 'endDate')

const filters = [
  {
    name: 'generationName',
    label: 'Khóa học',
    values: valueGenerationName
  },
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
  await Promise.all([
    $generationStore.fetchGenerations(),
    $academicYearStore.fetchAcademicYears()
  ])
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h2 class="text-4xl font-bold tracking-tight">Quản lý năm học</h2>

      <div class="flex justify-between items-center gap-4">
        <NuxtLink to="/admin/academic-years/trash">
          <Button variant="outline" v-if="shouldShowElement" class="flex items-center gap-2">
            <Trash2 class="w-5 h-5" />
            Thùng rác
          </Button>
        </NuxtLink>

        <Button variant="default" @click="isCreating = true" v-if="shouldShowElement">
          Tạo mới năm học
        </Button>
      </div>
    </div>

    <LayoutTable
      :data="$academicYearStore.academicYears"
      :columns="columns"
      :filters="filters"
    />
  </div>

  <Dialog :open="isCreating" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">
      <AcademicYearDialogCreateEdit />
    </DialogContent>
  </Dialog>

  <Dialog :open="isEditing" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">
      <AcademicYearDialogCreateEdit :data="selectedValue" edit />
    </DialogContent>
  </Dialog>

  <Dialog :open="isDeleting" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">
      <AcademicYearDialogDelete :data="selectedValue" />
    </DialogContent>
  </Dialog>
</template>
