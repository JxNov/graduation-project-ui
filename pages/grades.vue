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

const { $authStore, $gradeStore, $classStore, $subjectStore, $academicYearStore } = useNuxtApp()
const route = useRoute()

const teacherPermissions = checkPermissions($authStore.user.permissions, ['teacher.read'])

const classes = ref<any>([])
const cls = ref<string>('')
const subject = ref<string>(teacherPermissions ? $authStore.user.subjects[0] : '')
const semesters = ref<any>([])
const semester = ref<string>('')
const students = ref<any>([])

const semestersForSelect = computed(() => {
  return semesters.value.map((semester: any) => ({
    label: semester.semesterName,
    value: semester.semesterSlug
  }))
})

onMounted(async () => {
  if (!$gradeStore.grades.length) {
    await $gradeStore.fetchGradeStudent()
  }
})

watch(() => semesters.value, (value: any) => {
  semester.value = value[0].semesterSlug
})

watch(() => semester.value, async (value: any) => {
  const { students: studentScores } = await $classStore.showClass(route.params.slug as string, `subject=${subject.value}&semester=${value}`)
  students.value = studentScores
})

const columns = createColumns(
  [
    ['className', 'Subject'],
    ['academicYearName', 'Academic Year'],
    ['semesterName', 'Semester']
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

const valueSubject = extractValue($gradeStore.grades, 'className')
const valueSemester = extractValue($gradeStore.grades, 'semesterName')
const valueAcademicYear = extractValue($gradeStore.grades, 'academicYearName')

const filters: TableFilter[] = [
  {
    name: 'className',
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
    <div class="flex justify-between items-center">
      <h2 class="text-4xl font-bold tracking-tight">Grades</h2>

      <form @submit.prevent class="flex flex-row items-center gap-4">
        <div class="bg-card rounded-md">
          <Select v-model="cls">
            <SelectTrigger class="min-w-[180px]">
              <SelectValue placeholder="Select a class" class="select-none" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Classes</SelectLabel>
                <SelectItem
                  v-for="(cls, index) in classes"
                  :key="index"
                  :value="cls.slug"
                >
                  {{ cls.name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div class="bg-card rounded-md">
          <Select v-model="semester">
            <SelectTrigger class="min-w-[180px]">
              <SelectValue placeholder="Select a semester" class="select-none" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Semesters</SelectLabel>
                <SelectItem
                  v-for="(semester, index) in semestersForSelect"
                  :key="index"
                  :value="semester.value"
                >
                  {{ semester.label }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </form>
    </div>

    <LayoutTable
      :data="$gradeStore.grades"
      :columns="columns"
      :filters="filters"
    />
  </div>
</template>
