<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import { createColumns } from '~/composables/columns'
import { Button } from '@/components/ui/button'
import { attendanceSchema } from '~/schema'
import type { Attendance } from '~/schema'

const router = useRouter()
const { $attendanceStore, $bus } = useNuxtApp()

onMounted(async () => {
  await fetchData()
})

const columns = createColumns(
  [
    ['date', 'Ngày'],
    ['className', 'Lớp'],
    ['teacherName', 'Giáo viên'],
    ['totalStudents', 'Học sinh'],
    ['attendedStudents', 'Điểm danh']
  ],
  attendanceSchema,
  [
    {
      accessorKey: 'show',
      title: '',
      render: (row) => h('div', { class: 'truncate' },
        h(Button, {
          variant: 'outline',
          size: 'sm',
          onClick: () => {
            router.push(`/admin/attendances/${row.original.classSlug}`)
          }
        }, {
          default: () => {
            if (row.original.id) {
              return 'Cập nhật điểm danh'
            } else {
              return 'Điểm danh'
            }
          }
        })
      ),
      options: {
        enableSorting: false,
        enableHiding: false
      }
    }
  ],
  '',
  ''
) as ColumnDef<Attendance>[]

async function fetchData() {
  const promises = []

  if (!$attendanceStore.attendances.length) {
    promises.push($attendanceStore.fetchAttendances())
  }

  await Promise.all(promises)
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h2 class="text-4xl font-bold tracking-tight">Điểm danh</h2>
    </div>

    <LayoutTable
      :data="$attendanceStore.attendances"
      :columns="columns"
      :filters="[]"
    />
  </div>
</template>
