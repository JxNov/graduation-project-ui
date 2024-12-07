<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import { createColumns } from '~/composables/columns'
import { Button } from '@/components/ui/button'
import { attendanceSchema } from '~/schema'
import type { Attendance } from '~/schema'

const router = useRouter()
const { $attendanceStore, $bus } = useNuxtApp()

onMounted(async () => {
  if (!$attendanceStore.attendances.length) {
    await $attendanceStore.fetchAttendances()
  }
})

const columns = createColumns(
  [
    ['date', 'Date'],
    ['className', 'Class'],
    ['teacherName', 'Teacher'],
    ['totalStudents', 'Students'],
    ['attendedStudents', 'Attendances']
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
              return 'Update Attendance'
            } else {
              return 'Attendance'
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
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h2 class="text-4xl font-bold tracking-tight">Attendances</h2>
    </div>

    <LayoutTable
      :data="$attendanceStore.attendances"
      :columns="columns"
      :filters="[]"
    />
  </div>
</template>
