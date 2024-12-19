<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { AcademicYear } from '~/schema'
import { academicYearSchema } from '~/schema'
import { createColumns } from '~/composables/columns'
import { AcademicYearDialogRestore } from '~/components/common/dialog/academic-year'
import { extractValue } from '~/utils/extractValue'
import { checkPermissions } from '~/utils/checkPermissions'
import { Button } from '~/components/ui/button'

const title = 'Thùng rác'
const description = 'Thùng rác'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: '',
  twitterImage: '',
  twitterCard: 'summary_large_image'
})

const { $authStore, $academicYearStore, $bus } = useNuxtApp()

const isRestoring = ref<boolean>(false)
const selectedValue = ref<AcademicYear | object>({})

onMounted(async () => {
  $bus.on('close-dialog-restore', (value: boolean) => {
    isRestoring.value = value
    selectedValue.value = {}
  })

  $bus.on('delete-rows', (values: AcademicYear[]) => {
    const slugs = values.map((value) => value.slug)
    console.log(slugs)
  })

  await fetchData()
})

onBeforeUnmount(() => {
  $bus.off('close-dialog-restore')
  $bus.off('delete-rows')
})

const columns = createColumns(
  [
    ['name', 'Năm học'],
    ['startDate', 'Ngày bắt đầu'],
    ['endDate', 'Ngày kết thúc']
  ],
  academicYearSchema,
  [
    {
      accessorKey: 'button',
      title: '',
      render: (row) => {
        return h('div', { class: 'truncate px-2' },
          h('div', { class: 'flex items-center gap-2' }, [
            h(Button, {
              variant: 'outline',
              size: 'sm',
              onClick: () => {
                isRestoring.value = true
                selectedValue.value = row.original
              }
            }, { default: () => 'Khôi phục' })
          ])
        )
      },
      options: {
        enableSorting: false,
        enableHiding: false
      },
      before: 'actions'
    }
  ],
  'null',
  'null'
) as ColumnDef<AcademicYear>[]

const valueStartDate = extractValue($academicYearStore.trashAcademicYears, 'startDate')
const valueEndDate = extractValue($academicYearStore.trashAcademicYears, 'endDate')

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
  isRestoring.value = false
  selectedValue.value = {}
}

async function fetchData() {
  await Promise.all([
    $academicYearStore.trashAcademicYear()
  ])
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h2 class="text-4xl font-bold tracking-tight">Thùng rác năm học</h2>

      <div class="flex justify-between items-center gap-4">
        <NuxtLink to="/admin/academic-years">
          <Button variant="outline" v-if="shouldShowElement">
            Quay lại
          </Button>
        </NuxtLink>
      </div>
    </div>

    <LayoutTable
      :data="$academicYearStore.trashAcademicYears"
      :columns="columns"
      :filters="filters"
    />
  </div>

  <Dialog :open="isRestoring" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">
      <AcademicYearDialogRestore :data="selectedValue" />
    </DialogContent>
  </Dialog>
</template>
