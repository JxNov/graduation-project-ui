<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { Grade } from '~/schema'
import { gradeSchema } from '~/schema'
import type { TableFilter } from '~/types/table'
import { createColumns } from '~/composables/columns'
import { extractValue } from '~/utils/extractValue'
import { Badge } from '~/components/ui/badge'

const { $authStore, $gradeStore, $classStore, $academicYearStore } = useNuxtApp()

const classes = ref<any>([])
const cls = ref<string>('')
const semesters = ref<any>([])
const semester = ref<string>('')

const semestersForSelect = computed(() => {
  return semesters.value.map((semester: any) => ({
    label: semester.semesterName,
    value: semester.semesterSlug
  }))
})

onMounted(async () => {
  await $classStore.fetchClassForStudent($authStore.user.username)

  classes.value = $classStore.classes

  const { semesters: semesterAcademicYear } = await $academicYearStore.showAcademicYear($classStore.classes[0].academicYearSlug)
  semesters.value = semesterAcademicYear

  // if (!$gradeStore.grades.length) {
  //   await $gradeStore.fetchGradeStudent(`class=${$classStore.classes[0].slug}&semester=${semestersForSelect.value[0].value}`)
  // }
})

watch(() => semesters.value, (value: any) => {
  semester.value = value[0].semesterSlug
})

watch(() => semester.value, async (value: any) => {
  await $gradeStore.fetchGradeStudent(`class=${cls.value}&semester=${value}`)
})

watch(() => classes.value, async (value: any) => {
  cls.value = value[0].slug
})

watch(() => cls.value, async (value: any) => {
  await $gradeStore.fetchGradeStudent(`class=${value}&semester=${semester.value}`)
})

const columns = createColumns(
  [
    ['subjectName', 'Môn học']
  ],
  gradeSchema,
  [
    {
      accessorKey: 'mouthPoints',
      title: 'Điểm miệng',
      render: (row) => h('div',
        row.original.mouthPoints?.map((mouthPoint: any) => h(Badge, {
          variant: 'outline',
          class: 'mr-1'
        }, () => mouthPoint))
      ),
      after: 'semesterName'
    },
    {
      accessorKey: 'fifteenMinutesPoints',
      title: 'Điểm 15 phút',
      render: (row) => h('div',
        row.original.fifteenMinutesPoints?.map((fifteenMinutesPoint: any) => h(Badge, {
          variant: 'outline',
          class: 'mr-1'
        }, () => fifteenMinutesPoint))
      ),
      after: 'mouthPoints'
    },
    {
      accessorKey: 'onePeriodPoints',
      title: 'Điểm 1 tiết',
      render: (row) => h('div',
        row.original.onePeriodPoints?.map((onePeriodPoint: any) => h(Badge, {
          variant: 'outline',
          class: 'mr-1'
        }, () => onePeriodPoint))
      ),
      after: 'fifteenMinutesPoints'
    },
    {
      accessorKey: 'midSemesterPoints',
      title: 'Điểm giữa kỳ',
      render: (row) => h('div',
        row.original.midSemesterPoints?.map((midTermPoint: any) => h(Badge, {
          variant: 'outline',
          class: 'mr-1'
        }, () => midTermPoint))
      ),
      before: 'averageScore'
    },
    {
      accessorKey: 'endSemesterPoints',
      title: 'Điểm cuối kỳ',
      render: (row) => h('div',
        row.original.endSemesterPoints?.map((endTermPoint: any) => h(Badge, {
          variant: 'outline',
          class: 'mr-1'
        }, () => endTermPoint))
      ),
      before: 'averageScore'
    },
    {
      accessorKey: 'averageScore',
      title: 'Điểm trung bình',
      render: (row) => row.original.averageScore && h(Badge, {
        variant: 'outline',
        class: 'mr-1'
      }, () => row.original.averageScore)
    }
  ],
  'null',
  'null'
) as ColumnDef<Grade>[]

const valueSubject = extractValue($gradeStore.grades, 'className')

const filters: TableFilter[] = [
  {
    name: 'subjectName',
    label: 'Subject',
    values: valueSubject
  }
]
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h2 class="text-4xl font-bold tracking-tight">Điểm</h2>

      <form @submit.prevent class="flex flex-row items-center gap-4">
        <div class="bg-card rounded-md">
          <Select v-model="cls">
            <SelectTrigger class="min-w-[180px]">
              <SelectValue placeholder="Lớp" class="select-none" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Lớp</SelectLabel>
                <SelectItem v-for="(cls, index) in classes" :key="index" :value="cls.slug">
                  {{ cls.name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div class="bg-card rounded-md">
          <Select v-model="semester">
            <SelectTrigger class="min-w-[180px]">
              <SelectValue placeholder="Học kỳ" class="select-none" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Học kỳ</SelectLabel>
                <SelectItem v-for="(semester, index) in semestersForSelect" :key="index" :value="semester.value">
                  {{ semester.label }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </form>
    </div>

    <LayoutTable :data="$gradeStore.grades" :columns="columns" :filters="filters" />
  </div>
</template>
