<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import { createColumns } from '~/composables/columns'
import { useThrottle } from '~/composables/useThrottle'
import { Button } from '@/components/ui/button'

const router = useRouter()

interface Attendance {
  id: number
  name: string
  teacher: string
  students: number
  attendance: number
}

const attendanceSchema = {
  id: {
    type: 'number',
    title: 'ID',
    hidden: true
  },
  name: {
    type: 'string',
    title: 'Class',
    hidden: false
  },
  teacher: {
    type: 'string',
    title: 'Teacher',
    hidden: false
  },
  students: {
    type: 'number',
    title: 'Students',
    hidden: false
  },
  attendance: {
    type: 'number',
    title: 'Attendances',
    hidden: false
  }
}

const columns = createColumns(
  [
    ['name', 'Class'],
    ['teacher', 'Teacher'],
    ['students', 'Students'],
    ['attendance', 'Attendances']
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
            router.push(`/admin/attendances/${row.id}`)
          }
        }, { default: () => 'Show' })
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

const reloadData = useThrottle(() => {
}, 60000, 'attendance')

const attendances = ref<Attendance[]>([
  {
    id: 1,
    name: 'Class 1',
    teacher: 'Teacher 1',
    students: 10,
    attendance: 8
  },
  {
    id: 2,
    name: 'Class 2',
    teacher: 'Teacher 2',
    students: 15,
    attendance: 12
  }
])
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h2 class="text-4xl font-bold tracking-tight">Attendances</h2>
    </div>

    <LayoutTable
      :data="attendances"
      :columns="columns"
      :filters="[]"
      :reload-data="reloadData"
    />
  </div>
</template>
