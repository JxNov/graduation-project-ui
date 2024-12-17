<script setup lang="ts">
import { createColumns } from '~/composables/columns'
import { type Grade, gradeSchema } from '~/schema'
import type { ColumnDef } from '@tanstack/vue-table'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'

const title = 'Điểm tổng kết'
const description = 'Điểm tổng kết'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: '',
  twitterImage: '',
  twitterCard: 'summary_large_image'
})

const { $gradeStore, $classStore, $authStore, $academicYearStore } = useNuxtApp()

const classes = ref<any>([])
const cls = ref<string>('')
const academicYears = ref<any>([])
const academicYear = ref<string>('')
const data = ref<any>([])
const isLoading = ref<boolean>(false)

onMounted(async () => {
  if (!$classStore.classes.length) {
    await $classStore.fetchClassForTeacher($authStore.user.username)
  }

  const { classes: classAcademicYear } = await $academicYearStore.showAcademicYear($classStore.classes[0].academicYearSlug)
  classes.value = classAcademicYear.filter((cls: any) => cls.classSlug === $classStore.classes[0].slug)

  if (!$academicYearStore.academicYears.length) {
    await $academicYearStore.fetchAcademicYears()
  }

  academicYears.value = $academicYearStore.academicYears.filter((academicYear: any) => academicYear.slug === $classStore.classes[0].academicYearSlug)

  cls.value = classes.value[0].classSlug
  academicYear.value = academicYears.value[0].slug

  await onSubmit()
})

const columns = createColumns(
  [
    ['semesterScore1', 'Score semester 1'],
    ['semesterPerformance1', 'Performance semester 1'],
    ['semesterScore2', 'Score semester 2'],
    ['semesterPerformance2', 'Performance semester 2'],
    ['academicYearScore', 'Score academic year'],
    ['academicYearPerformance', 'Performance academic year']
  ],
  gradeSchema,
  [
    {
      accessorKey: 'studentName',
      title: 'Name',
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
      before: 'semesterScore1'
    }
  ],
  'null',
  'null'
) as ColumnDef<Grade>[]

const onSubmit = async () => {
  isLoading.value = true

  try {
    const response = await $gradeStore.fetchFinalGrade(cls.value, academicYear.value)

    if (!response) {
      throw new Error('No data found')
    }

    data.value = response.finalScores
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    throw error
  }
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h2 class="text-4xl font-bold tracking-tight">Final Grades</h2>

      <form @submit.prevent="onSubmit" class="flex flex-row items-center gap-4">
        <div class="bg-card rounded-md">
          <Select v-model="academicYear">
            <SelectTrigger class="min-w-[180px]">
              <SelectValue placeholder="Select a academic year" class="select-none" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Academic Year</SelectLabel>
                <SelectItem
                  v-for="(academicYear, index) in academicYears"
                  :key="index"
                  :value="academicYear.slug"
                >
                  {{ academicYear.name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

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
                  :value="cls.classSlug"
                >
                  {{ cls.className }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          :loading="isLoading"
        >
          Check
        </Button>
      </form>
    </div>

    <LayoutTable
      :data="data"
      :columns="columns"
      :filters="[]"
    />
  </div>
</template>
