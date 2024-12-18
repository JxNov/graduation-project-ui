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
    ['semesterScore1', 'Điểm học kỳ 1'],
    ['semesterPerformance1', 'Học lực học kỳ 1'],
    ['semesterScore2', 'Điểm kỳ 2'],
    ['semesterPerformance2', 'Học lực học kỳ 2'],
    ['academicYearScore', 'Điểm tổng kết'],
    ['academicYearPerformance', 'Học lực']
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
      throw new Error('Không tìm thấy dữ liệu')
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
      <h2 class="text-4xl font-bold tracking-tight">Điểm tổng kết</h2>

      <form @submit.prevent="onSubmit" class="flex flex-row items-center gap-4">
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

        <Button type="submit" :loading="isLoading">
          Kiểm tra
        </Button>
      </form>
    </div>

    <LayoutTable :data="data" :columns="columns" :filters="[]" />
  </div>
</template>
