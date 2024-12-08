<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { User } from '~/schema'
import { userSchema } from '~/schema'
import type { TableFilter } from '~/types/table'
import { createColumns } from '~/composables/columns'
import { useThrottle } from '~/composables/useThrottle'
import { showElement } from '~/utils/showElement'
import { extractValue } from '~/utils/extractValue'
import { Badge } from '~/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'

const { $authStore, $userStore, $roleStore } = useNuxtApp()

onMounted(async () => {
})

interface Grade {
  subject: string
  teacher: string
  mouthPoints: number[]
  fifteenMinutesPoints: number[]
  onePeriodPoints: number[]
  midTermPoints: number[]
  finalPoints: number
}

const gradeSchema = {
  subject: 'string',
  teacher: 'string',
  mouthPoints: 'array',
  fifteenMinutesPoints: 'array',
  onePeriodPoints: 'array',
  midTermPoints: 'array',
  finalPoints: 'number'
}

const grades: Grade[] = [
  {
    subject: 'Math',
    teacher: 'Teacher 1',
    mouthPoints: [10, 10, 9],
    fifteenMinutesPoints: [10, 8, 6],
    onePeriodPoints: [10, 7, 5],
    midTermPoints: [10, 10],
    finalPoints: 10
  },
  {
    subject: 'Science',
    teacher: 'Teacher 2',
    mouthPoints: [10, 10, 10],
    fifteenMinutesPoints: [10, 10, 10],
    onePeriodPoints: [10, 10, 10],
    midTermPoints: [10, 10],
    finalPoints: 10
  }
]

const columns = createColumns(
  [
    ['subject', 'Subject'],
    ['teacher', 'Teacher'],
    ['finalPoints', 'Final Points']
  ],
  gradeSchema,
  [
    {
      accessorKey: 'mouthPoints',
      title: 'Mouth Points',
      render: (row) => h('div',
        row.original.mouthPoints.map((mouthPoint: any) => h(Badge, {
          variant: 'outline',
          class: 'mr-1'
        }, () => mouthPoint))
      ),
      after: 'teacher'
    },
    {
      accessorKey: 'fifteenMinutesPoints',
      title: '15 Minutes Points',
      render: (row) => h('div',
        row.original.fifteenMinutesPoints.map((fifteenMinutesPoint: any) => h(Badge, {
          variant: 'outline',
          class: 'mr-1'
        }, () => fifteenMinutesPoint))
      ),
      after: 'mouthPoints'
    },
    {
      accessorKey: 'onePeriodPoints',
      title: '1 Period Points',
      render: (row) => h('div',
        row.original.onePeriodPoints.map((onePeriodPoint: any) => h(Badge, {
          variant: 'outline',
          class: 'mr-1'
        }, () => onePeriodPoint))
      ),
      after: 'fifteenMinutesPoints'
    },
    {
      accessorKey: 'midTermPoints',
      title: 'Mid Term Points',
      render: (row) => h('div',
        row.original.midTermPoints.map((midTermPoint: any) => h(Badge, {
          variant: 'outline',
          class: 'mr-1'
        }, () => midTermPoint))
      ),
      before: 'finalPoints'
    }
  ],
  'users.update',
  'users.delete'
) as ColumnDef<Grade>[]

const valueSubject = [
  { value: 'math', label: 'Math' },
  { value: 'science', label: 'Science' },
  { value: 'english', label: 'English' }
]

const filters: TableFilter[] = [
  {
    name: 'subject',
    label: 'Subject',
    values: valueSubject
  }
]

const reloadData = useThrottle(() => {
  $userStore.reloadData()
}, 60000, 'user')

const handleInteractOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (target?.closest('[data-sonner-toaster]')) return event.preventDefault()
}

const shouldShowElement = computed(() => {
  return showElement($authStore.user.permissions, ['users.create'])
})
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <h2 class="text-4xl font-bold tracking-tight">Grades</h2>

    <LayoutTable
      :data="grades"
      :columns="columns"
      :filters="filters"
    />
  </div>
</template>
