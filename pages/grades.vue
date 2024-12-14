<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { Grade } from '~/schema'
import { gradeSchema } from '~/schema'
import type { TableFilter } from '~/types/table'
import { createColumns } from '~/composables/columns'
import { checkPermissions } from '~/utils/checkPermissions'
import { extractValue } from '~/utils/extractValue'
import { Badge } from '~/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'

const { $authStore, $userStore, $roleStore, $gradeStore } = useNuxtApp()

onMounted(async () => {
  if (!$gradeStore.grades.length) {
    await $gradeStore.fetchGradeStudent('kiendv897-6a1', 'ki-1', 'nam-nhat')
  }
})

const columns = createColumns(
  [
    ['subjectName', 'Subject'],
    ['semesterName', 'Semester'],
    ['academicYearName', 'Academic Year']
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
      after: 'academicYearName'
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
      accessorKey: 'midSemesterPoints',
      title: 'Mid Term Points',
      render: (row) => h('div',
        row.original.midSemesterPoints.map((midTermPoint: any) => h(Badge, {
          variant: 'outline',
          class: 'mr-1'
        }, () => midTermPoint))
      ),
      before: 'averageScore'
    },
    {
      accessorKey: 'endSemesterPoints',
      title: 'End Term Points',
      render: (row) => h('div',
        row.original.endSemesterPoints.map((endTermPoint: any) => h(Badge, {
          variant: 'outline',
          class: 'mr-1'
        }, () => endTermPoint))
      ),
      before: 'averageScore'
    },
    {
      accessorKey: 'averageScore',
      title: 'Average Score',
      render: (row) => h(Badge, {
        variant: 'outline',
        class: 'mr-1'
      }, () => row.original.averageScore)
    }
  ],
  'users.update',
  'users.delete'
) as ColumnDef<Grade>[]

const valueSubject = extractValue($gradeStore.grades, 'subjectName')
const valueSemester = extractValue($gradeStore.grades, 'semesterName')
const valueAcademicYear = extractValue($gradeStore.grades, 'academicYearName')

const filters: TableFilter[] = [
  {
    name: 'subjectName',
    label: 'Subject',
    values: valueSubject
  },
  {
    name: 'semesterName',
    label: 'Semester',
    values: valueSemester
  },
  {
    name: 'academicYearName',
    label: 'Academic Year',
    values: valueAcademicYear
  }
]

const handleInteractOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (target?.closest('[data-sonner-toaster]')) return event.preventDefault()
}

const shouldShowElement = computed(() => {
  return checkPermissions($authStore.user.permissions, ['users.create'])
})
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <h2 class="text-4xl font-bold tracking-tight">Grades</h2>

    <LayoutTable
      :data="$gradeStore.grades"
      :columns="columns"
      :filters="filters"
    />
  </div>
</template>
