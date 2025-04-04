<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import { createColumns } from '~/composables/columns'
import type { TableFilter } from '~/types/table'
import { Badge } from '~/components/ui/badge'
import { toast } from 'vue-sonner'
import { attendanceShowSchema } from '~/schema'
import type { AttendanceShow } from '~/schema'
import { extractValue } from '~/utils/extractValue'

const { $attendanceStore, $bus } = useNuxtApp()
const config = useRuntimeConfig()

const schoolNetworkIPv4 = config.public.schoolNetworkIPv4
const schoolNetworkSubnetMask = config.public.schoolNetworkSubnetMask

const isOpen = ref<boolean>(false)

onMounted(async () => {
  $bus.on('close-dialog-attendance', (value: boolean) => {
    isOpen.value = value
  })

  await $attendanceStore.showAttendance()
})

onUnmounted(() => {
  $bus.off('close-dialog-attendance')
})

const columns = createColumns(
  [
    ['date', 'Ngày'],
    ['className', 'Lớp'],
    ['shifts', 'Ca'],
    ['reason', 'Lý do', '', {
      enableSorting: false,
      enableHiding: false
    }]
  ],
  attendanceShowSchema,
  [
    {
      accessorKey: 'status',
      title: 'Trạng thái',
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
) as ColumnDef<AttendanceShow>[]

const valueStatus = extractValue($attendanceStore.attendanceShow, 'status')
const valueShifts = extractValue($attendanceStore.attendanceShow, 'shifts')

const filters: TableFilter[] = [
  {
    name: 'shifts',
    label: 'Ca',
    values: valueShifts
  },
  {
    name: 'status',
    label: 'Trạng thái',
    values: valueStatus
  }
]

const handleAttendance = async () => {
  try {
    const response = await fetch(`/api/network-info`)
    const data = await response.json()
    if (!response.ok) throw new Error(data.message)
    if (!data || !Object.keys(data).length) throw new Error('Bạn không kết nối với mạng trường')

    Object.keys(data).forEach((key) => {
      const networks = data[key]

      networks.forEach((network: any) => {
        const { family } = network

        if (family === 'IPv4') {
          const { address, netmask, cidr } = network

          if (address === schoolNetworkIPv4 && netmask === schoolNetworkSubnetMask) {
            isOpen.value = true
            return
          }

          toast.error('Bạn không kết nối với mạng trường')
        }
      })
    })
  } catch (error) {
    toast.error('Bạn không kết nối với mạng trường')
  }
}

const handleInteractOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (target?.closest('[data-sonner-toaster]')) return event.preventDefault()
}

const handleCloseDialog = () => {
  isOpen.value = false
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h2 class="text-4xl font-bold tracking-tight">Điểm danh</h2>

      <Button variant="default" @click="handleAttendance">
        Điểm danh
      </Button>
    </div>

    <LayoutTable
      :data="$attendanceStore.attendanceShow"
      :columns="columns"
      :filters="filters"
    />
  </div>

  <Dialog :open="isOpen" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[525px]" @interact-outside="handleInteractOutside">
      <AttendanceCamera />
    </DialogContent>
  </Dialog>
</template>
