<script setup lang='ts'>
import { createColumns } from '~/composables/columns'
import type { ColumnDef } from '@tanstack/vue-table'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { type Student, studentSchema } from '~/schema'
import DetailStudent from '~/components/class/DetailStudent.vue'
import { Badge } from '~/components/ui/badge'
import { checkPermissions } from '~/utils/checkPermissions'

const { $classStore, $subjectStore, $authStore, $academicYearStore } = useNuxtApp()
const route = useRoute()

const teacherPermissions = checkPermissions($authStore.user.permissions, ['teacher.read'])

const detailClass = ref<any>(null)
const subject = ref<string>(teacherPermissions ? $authStore.user.subjects[0] : '')
const semesters = ref<any>([])
const semester = ref<string>('')
const isOpen = ref<boolean>(false)
const selectedValue = ref<any>({})
const students = ref<any>([])

const subjectsForTeacher = computed(() => {
  return $subjectStore.subjects.filter((subject: any) => $authStore.user.subjects.includes(subject.slug))
})

const subjects = computed(() => {
  return teacherPermissions ? subjectsForTeacher.value : $subjectStore.subjects
})

const semestersForSelect = computed(() => {
  return semesters.value.map((semester: any) => ({
    label: semester.semesterName,
    value: semester.semesterSlug
  }))
})

onMounted(async () => {
  detailClass.value = await $classStore.showClass(route.params.slug as string, `subject=${subject.value}`)

  const { semesters: semesterAcademicYear } = await $academicYearStore.showAcademicYear(detailClass.value.academicYearSlug)
  semesters.value = semesterAcademicYear

  if (!$subjectStore.subjects.length) {
    await $subjectStore.fetchSubjects()
  }
})

watch(() => semesters.value, (value: any) => {
  semester.value = value[0].semesterSlug
})

watch(() => detailClass.value, (value: any) => {
  students.value = value.students
})

watch(() => subject.value, async (value: any) => {
  const { students: studentScores } = await $classStore.showClass(route.params.slug as string, `subject=${value}&semester=${semester.value}`)
  students.value = studentScores
})

watch(() => semester.value, async (value: any) => {
  const { students: studentScores } = await $classStore.showClass(route.params.slug as string, `subject=${subject.value}&semester=${value}`)
  students.value = studentScores
})

const columns = createColumns(
  [],
  studentSchema,
  [
    {
      accessorKey: 'name',
      title: 'Name',
      render: (row) => h('div', { class: 'flex items-center gap-2' }, {
        default: () => {
          return [
            h(Avatar, {}, {
              default: () => [
                h(AvatarImage, {
                  src: row.original.image || '',
                  alt: row.getValue('name')
                }),
                h(AvatarFallback, {}, {
                  default: () => [
                    h('span', {}, row.getValue('name')[0])
                  ]
                })
              ]
            }),
            h('div', {}, row.getValue('name'))
          ]
        }
      })
    },
    {
      accessorKey: 'mouthPoints',
      title: 'Mouth Points',
      render: (row) => h('div',
        row.original.mouthPoints?.map((mouthPoint: any) => h(Badge, {
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
        row.original.fifteenMinutesPoints?.map((fifteenMinutesPoint: any) => h(Badge, {
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
        row.original.onePeriodPoints?.map((onePeriodPoint: any) => h(Badge, {
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
        row.original.midSemesterPoints?.map((midTermPoint: any) => h(Badge, {
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
        row.original.endSemesterPoints?.map((endTermPoint: any) => h(Badge, {
          variant: 'outline',
          class: 'mr-1'
        }, () => endTermPoint))
      ),
      before: 'averageScore'
    },
    {
      accessorKey: 'averageScore',
      title: 'Average Score',
      render: (row) => row.original.averageScore && h(Badge, {
        variant: 'outline',
        class: 'mr-1'
      }, () => row.original.averageScore)
    },
    {
      accessorKey: 'score',
      title: '',
      render: (row) => h('div', { class: 'truncate' },
        h(Button, {
          variant: 'outline',
          size: 'sm',
          onClick: () => {
            isOpen.value = true
            selectedValue.value = { ...row.original, subject: subject.value, semester: semester.value }
          }
        }, { default: () => 'Enter score' })
      ),
      options: {
        enableSorting: false,
        enableHiding: false
      },
      before: 'actions'
    }
  ],
  'users.update',
  'users.delete'
) as ColumnDef<Student>[]

const handleInteractOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (target?.closest('[data-sonner-toaster]')) return event.preventDefault()
}

const handleCloseDialog = () => {
  isOpen.value = false
  selectedValue.value = {}
}

const handleUpdateScore = (score: any) => {
  const index = students.value.findIndex((student: any) => student.username === score.username)
  students.value[index].mouthPoints = score.mouthPoints
  students.value[index].fifteenMinutesPoints = score.fifteenMinutesPoints
  students.value[index].onePeriodPoints = score.onePeriodPoints
  students.value[index].midSemesterPoints = score.midSemesterPoints
  students.value[index].endSemesterPoints = score.endSemesterPoints
  students.value[index].averageScore = score.averageScore
}
</script>

<template>
  <Card class="mb-4">
    <CardHeader class="flex flex-col sm:flex-row items-center justify-between gap-6">
      <div class="flex flex-row items-start gap-4">
        <Avatar size="base">
          <AvatarImage :src="detailClass?.teacherImage || ''" :alt="detailClass?.teacherName" />
          <AvatarFallback>
            {{ detailClass?.teacherName?.split(' ').map((name: string) => name[0]).join('') }}
          </AvatarFallback>
        </Avatar>

        <div>
          <CardTitle class="text-2xl">
            {{ detailClass?.name }}
          </CardTitle>

          <CardDescription class="text-base">
            {{ detailClass?.teacherName }}
          </CardDescription>
        </div>
      </div>

      <div class="flex flex-col sm:items-end gap-2">
        <CardTitle>
          {{ students.length }} student(s)
        </CardTitle>

        <form @submit.prevent class="flex flex-row items-center gap-4">
          <Select v-model="subject">
            <SelectTrigger class="min-w-[180px]">
              <SelectValue placeholder="Select a subject" class="select-none" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Subjects</SelectLabel>
                <SelectItem
                  v-for="(subject, index) in subjects"
                  :key="index"
                  :value="subject.slug"
                >
                  {{ subject.name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

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
        </form>
      </div>
    </CardHeader>
  </Card>

  <LayoutTable
    :data="students"
    :columns="columns"
    :filters="[]"
  />

  <Dialog :open="isOpen" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[66%]" @interact-outside="handleInteractOutside">
      <DetailStudent
        :data="selectedValue"
        @update:score="handleUpdateScore"
        @close="handleCloseDialog"
      />
    </DialogContent>
  </Dialog>
</template>