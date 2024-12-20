<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { Grade } from '~/schema'
import { gradeSchema } from '~/schema'
import type { TableFilter } from '~/types/table'
import { createColumns } from '~/composables/columns'
import { extractValue } from '~/utils/extractValue'
import { Badge } from '~/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'

const { $authStore, $gradeStore, $classStore, $academicYearStore, $subjectStore } = useNuxtApp()
const router = useRouter()

const academicYears = ref<any>([])
const academicYear = ref<string>('')
const classes = ref<any>([])
const cls = ref<string>('')
const semesters = ref<any>([])
const semester = ref<string>('')
const subject = ref<string>($authStore.user.subjects[0] || '')

const subjectsForTeacher = computed(() => {
  return $subjectStore.subjects.filter((subject: any) => $authStore.user.subjects.includes(subject.slug))
})

const isTeacherForClass = computed(() => {
  return $classStore.classes.some((c: any) => c.teacherUsername === $authStore.user.username && c.slug === cls.value)
})

const subjects = computed(() => {
  return subjectsForTeacher.value || $subjectStore.subjects
})

const semestersForSelect = computed(() => {
  return semesters.value.map((semester: any) => ({
    label: semester.semesterName,
    value: semester.semesterSlug
  }))
})

onMounted(async () => {
  await fetchData()

  const {
    semesters: semesterAcademicYear,
    classes: classAcademicYear
  } = await $academicYearStore.showAcademicYear($classStore.classes[0].academicYearSlug)
  semesters.value = semesterAcademicYear
  classes.value = classAcademicYear.filter((cls: any) => cls.classSlug === $classStore.classes[0].slug)

  if (!$academicYearStore.academicYears.length) {
    await $academicYearStore.fetchAcademicYears()
  }

  const academicYearForClass = $classStore.classes.map((c: any) => c.academicYearSlug)
  academicYears.value = $academicYearStore.academicYears.filter((academicYear: any) => academicYearForClass.includes(academicYear.slug))

  // if (!$gradeStore.grades.length) {
  //   if (isTeacherForClass.value) {
  //     await $gradeStore.fetchGradeByTeacher(`academicYear=${$classStore.classes[0].academicYearSlug}&class=${$classStore.classes[0].slug}&semester=${semestersForSelect.value[0].value}`)
  //   } else {
  //     await $gradeStore.fetchGradeByTeacher(`academicYear=${academicYears.value[0].slug}&class=${classes.value[0].classSlug}&semester=${semestersForSelect.value[0].value}&subject=${subject.value}`)
  //   }
  // }
})

watch(() => academicYears.value, (value: any) => {
  academicYear.value = value[0].slug
})

watch(() => academicYear.value, async (value: any) => {
  const {
    semesters: semesterAcademicYear,
    classes: classAcademicYear
  } = await $academicYearStore.showAcademicYear(value)
  semesters.value = semesterAcademicYear
  classes.value = classAcademicYear

  if (isTeacherForClass.value) {
    await $gradeStore.fetchGradeByTeacher(`academicYear=${value}&class=${$classStore.classes[0].slug}&semester=${semestersForSelect.value[0].value}`)
  } else {
    await $gradeStore.fetchGradeByTeacher(`academicYear=${value}&class=${classes.value[0]?.classSlug}&semester=${semestersForSelect.value[0].value}&subject=${subject.value}`)
  }
})

watch(() => semesters.value, (value: any) => {
  semester.value = value[0].semesterSlug
})

watch(() => semester.value, async (value: any) => {
  if (isTeacherForClass.value) {
    await $gradeStore.fetchGradeByTeacher(`academicYear=${academicYear.value}&class=${cls.value}&semester=${value}`)
  } else {
    await $gradeStore.fetchGradeByTeacher(`academicYear=${academicYear.value}&class=${cls.value}&semester=${value}&subject=${subject.value}`)
  }
})

watch(() => classes.value, async (value: any) => {
  cls.value = value[0].classSlug
})

watch(() => cls.value, async (value: any) => {
  if (isTeacherForClass.value) {
    await $gradeStore.fetchGradeByTeacher(`academicYear=${academicYear.value}&class=${value}&semester=${semester.value}`)
  } else {
    await $gradeStore.fetchGradeByTeacher(`academicYear=${academicYear.value}&class=${value}&semester=${semester.value}&subject=${subject.value}`)
  }
})

watch(() => subject.value, async (value: any) => {
  await $gradeStore.fetchGradeByTeacher(`academicYear=${academicYear.value}&class=${cls.value}&semester=${semester.value}&subject=${value}`)
})

const fields = [
  {
    accessorKey: 'mouthPoints',
    title: 'Điểm miệng',
    render: (row: any) => h('div',
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
    render: (row: any) => h('div',
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
    render: (row: any) => h('div',
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
    render: (row: any) => h('div',
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
    render: (row: any) => h('div',
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
    render: (row: any) => row.original.averageScore && h(Badge, {
      variant: 'outline',
      class: 'mr-1'
    }, () => row.original.averageScore)
  }
]

const columns = createColumns(
  [],
  gradeSchema,
  [
    {
      accessorKey: 'studentName',
      title: 'Tên học sinh',
      render: (row) => h('div', { class: 'flex items-center gap-2' }, {
        default: () => {
          return [
            h(Avatar, {}, {
              default: () => [
                h(AvatarImage, {
                  src: row.original.studentImage || '',
                  alt: row.getValue('studentName')
                }),
                h(AvatarFallback, {}, {
                  default: () => [
                    h('span', {}, row.getValue('studentName').split(' ').map((name: string) => name[0]).join(''))
                  ]
                })
              ]
            }),
            h('div', {}, row.getValue('studentName'))
          ]
        }
      }),
      before: 'subjectName'
    },
    ...fields
  ],
  'null',
  'null'
) as ColumnDef<Grade>[]

const columnsTeacherForClass = createColumns(
  [
    ['subjectName', 'Môn học']
  ],
  gradeSchema,
  [
    {
      accessorKey: 'studentName',
      title: 'Tên học sinh',
      render: (row) => h('div', { class: 'flex items-center gap-2' }, {
        default: () => {
          return [
            h(Avatar, {}, {
              default: () => [
                h(AvatarImage, {
                  src: row.original.studentImage || '',
                  alt: row.getValue('studentName')
                }),
                h(AvatarFallback, {}, {
                  default: () => [
                    h('span', {}, row.getValue('studentName').split(' ').map((name: string) => name[0]).join(''))
                  ]
                })
              ]
            }),
            h('div', {}, row.getValue('studentName'))
          ]
        }
      }),
      before: 'subjectName'
    },
    ...fields
  ],
  'null',
  'null'
) as ColumnDef<Grade>[]

const valueSubject = extractValue($gradeStore.grades, 'className')

const filters: TableFilter[] = [
  {
    name: 'subjectName',
    label: 'Môn học',
    values: valueSubject
  }
]

const redirect = (path: string) => {
  router.push(path)
}

async function fetchData() {
  await Promise.all([
    $classStore.fetchClassForTeacher($authStore.user.username),
    $subjectStore.fetchSubjects()
  ])
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h2 class="text-4xl font-bold tracking-tight">Grades</h2>

      <div class="flex items-center gap-4">
        <form @submit.prevent class="flex flex-row items-center gap-4">
          <div class="bg-card rounded-md">
            <Select v-model="academicYear">
              <SelectTrigger class="min-w-[180px]">
                <SelectValue placeholder="Năm học" class="select-none" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Năm học</SelectLabel>
                  <SelectItem v-for="(academicYear, index) in academicYears" :key="index" :value="academicYear.slug">
                    {{ academicYear.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div class="bg-card rounded-md">
            <Select v-model="cls">
              <SelectTrigger class="min-w-[180px]">
                <SelectValue placeholder="Lớp" class="select-none" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Lớp</SelectLabel>
                  <SelectItem v-for="(cls, index) in classes" :key="index" :value="cls.classSlug">
                    {{ cls.className }}
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

          <div class="bg-card rounded-md" v-if="!isTeacherForClass">
            <Select v-model="subject">
              <SelectTrigger class="min-w-[180px]">
                <SelectValue placeholder="Môn học" class="select-none" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Môn học</SelectLabel>
                  <SelectItem v-for="(subject, index) in subjects" :key="index" :value="subject.slug">
                    {{ subject.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </form>

        <Button @click="() => redirect('/grades/final')">
          Điểm tổng kết
        </Button>
      </div>
    </div>

    <LayoutTable :data="$gradeStore.grades" :columns="isTeacherForClass ? columnsTeacherForClass : columns"
                 :filters="isTeacherForClass ? filters : []" />
  </div>
</template>
