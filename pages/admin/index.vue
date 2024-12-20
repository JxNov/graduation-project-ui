<script setup lang="ts">
import { Users, School } from 'lucide-vue-next'

const { $academicYearStore, $statisticStore } = useNuxtApp()

const selectedAcademicYear = ref<string>('')
const performances = ['Giỏi', 'Khá', 'Trung bình', 'Yếu']
const selectedPerformance = ref<string>(performances[0])

watch(selectedAcademicYear, async (value) => {
  await Promise.all([
    $statisticStore.fetchStatisticPerformance(value),
    $statisticStore.fetchStatisticStudentAcademicYear(value)
  ])
})

onMounted(async () => {
  await Promise.all([
    $academicYearStore.fetchAcademicYears(),
    $statisticStore.fetchStatisticAll(),
    $statisticStore.fetchStatisticGender()
  ])

  selectedAcademicYear.value = $academicYearStore.academicYears[$academicYearStore.academicYears.length - 1].slug
})
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <h2 class="text-3xl font-bold tracking-tight">
        Bảng điều khiển
      </h2>
    </div>
    <main class="flex flex-1 flex-col gap-4 md:gap-8">
      <div class="grid gap-4 lg:grid-cols-4 md:grid-cols-2 md:gap-8">
        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle class="text-sm font-medium">
              Số khóa học sinh
            </CardTitle>
            <Users class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p class="text-2xl font-bold">
              {{ $statisticStore.statistics.numberGeneration }}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle class="text-sm font-medium">
              Số giáo viên
            </CardTitle>
            <Users class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p class="text-2xl font-bold">
              {{ $statisticStore.statistics.numberTeacher }}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle class="text-sm font-medium">
              Số lượng học sinh
            </CardTitle>
            <Users class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p class="text-2xl font-bold">
              {{ $statisticStore.statistics.numberStudent }}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle class="text-sm font-medium">
              Số lượng lớp học
            </CardTitle>
            <School class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p class="text-2xl font-bold">
              {{ $statisticStore.statistics.numberClasses }}
            </p>
          </CardContent>
        </Card>
      </div>

      <div class="grid gap-4 lg:grid-cols-2 xl:grid-cols-3 md:gap-8">
        <Card class="xl:col-span-2">
          <CardHeader class="flex flex-row justify-between items-center">
            <div class="grid gap-2">
              <CardTitle>
                Thống kê học lực
              </CardTitle>
              <CardDescription>
                Thống kê học lực của học sinh theo từng năm học
              </CardDescription>
            </div>

            <Select v-model="selectedAcademicYear">
              <SelectTrigger class="w-[180px]">
                <SelectValue placeholder="Năm học" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Năm học</SelectLabel>
                  <SelectItem
                    v-for="(academicYear, index) in $academicYearStore.academicYears"
                    :key="index"
                    :value="academicYear.slug"
                  >
                    {{ academicYear.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <BarChart
              :data="$statisticStore.statisticPerformance"
              index="name"
              :categories="['Giỏi', 'Khá', 'Trung bình', 'Yếu']"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="flex flex-row justify-between items-center">
            <CardTitle>
              Thống kê học lực học sinh
            </CardTitle>

            <Select v-model="selectedPerformance">
              <SelectTrigger class="w-[180px]">
                <SelectValue placeholder="Học lực" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Học lực</SelectLabel>
                  <SelectItem
                    v-for="(performance, index) in performances"
                    :key="index"
                    :value="performance"
                  >
                    {{ performance }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent class="grid gap-8">
            <DonutChart
              index="name"
              :category="selectedPerformance === 'Giỏi' ? 'Giỏi' : selectedPerformance === 'Khá' ? 'Khá' : selectedPerformance === 'Trung bình' ? 'Trung bình' : 'Yếu'"
              :data="$statisticStore.statisticPerformance"
            />
          </CardContent>
        </Card>
      </div>

      <div class="grid gap-4 lg:grid-cols-2 xl:grid-cols-3 md:gap-8">
        <Card>
          <CardHeader>
            <CardTitle>
              Nam/Nữ
            </CardTitle>
          </CardHeader>
          <CardContent class="grid gap-8">
            <AreaChart :data="$statisticStore.statisticGender" index="name" :categories="['Nam', 'Nữ']" />
          </CardContent>
        </Card>

        <Card class="xl:col-span-2">
          <CardHeader>
            <CardTitle>
              Thống kê số học sinh trong khối của năm học
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              :data="$statisticStore.statisticStudentAcademicYear"
              index="name"
              :categories="['totalStudents']"
            />
          </CardContent>
        </Card>
      </div>
    </main>
  </div>
</template>
