<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import { createColumns } from '~/composables/columns'
import { useThrottle } from '~/composables/useThrottle'
import type { TableFilter } from '~/types/table'
import { Badge } from '~/components/ui/badge'

interface Attendance {
  id: number
  date: string
  status: string
  reason: string
}

const attendanceSchema = {
  id: {
    type: 'number',
    title: 'ID',
    hidden: true
  },
  date: {
    type: 'string',
    title: 'Date',
    hidden: false
  },
  status: {
    type: 'string',
    title: 'Status',
    hidden: false
  },
  reason: {
    type: 'string',
    title: 'Reason',
    hidden: false
  }
}

const columns = createColumns(
  [
    ['date', 'Date'],
    ['reason', 'Reason', '', {
      enableSorting: false,
      enableHiding: false
    }]
  ],
  attendanceSchema,
  [
    {
      accessorKey: 'status',
      title: 'Status',
      render: (row) => h(Badge, {
        class: {
          'bg-green-500 hover:bg-green-600 cursor-default text-white': row.original.status === 'Present',
          'bg-red-500 hover:bg-red-600 cursor-default text-white': row.original.status === 'Absent'
        }
      }, { default: () => row.original.status }),
      before: 'reason'
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
    date: '2024-11-09',
    status: 'Present',
    reason: ''
  },
  {
    id: 2,
    date: '2024-11-10',
    status: 'Absent',
    reason: 'Sick'
  },
  {
    id: 3,
    date: '2024-11-11',
    status: 'Present',
    reason: ''
  }
])

const filters: TableFilter[] = [
  {
    name: 'status',
    label: 'Status',
    values: [
      { label: 'Present', value: 'Present' },
      { label: 'Absent', value: 'Absent' }
    ]
  }
]

const config = useRuntimeConfig()
const schoolNetworkIPv4 = config.public.schoolNetworkIPv4
const schoolNetworkSubnetMask = config.public.schoolNetworkSubnetMask

const handleAttendance = async () => {
  try {
    const response = await fetch(`/api/network-info`)
    const data = await response.json()

    Object.keys(data).forEach((key) => {
      const networks = data[key]

      networks.forEach((network: any) => {
        const { family } = network

        if (family === 'IPv4') {
          const { address, netmask, cidr } = network

          console.log(address, netmask, cidr)
        }
      })
    })
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h2 class="text-4xl font-bold tracking-tight">Attendances</h2>

      <Button variant="default" @click="handleAttendance">
        Attendance
      </Button>
    </div>

    <LayoutTable
      :data="attendances"
      :columns="columns"
      :filters="filters"
      :reload-data="reloadData"
    />
  </div>
</template>
