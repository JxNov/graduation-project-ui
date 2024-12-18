<script setup lang='ts'>
import DetailStudent from './DetailStudent.vue'

const { $attendanceStore } = useNuxtApp()

const props = defineProps<{
  classSlug: string
}>()

onMounted(async () => {
  await $attendanceStore.detailAttendance(props.classSlug)
})

const isLoading = ref<boolean>(false)
const newId = ref<number | null>(null)
const id = computed(() => $attendanceStore.attendance?.id ? $attendanceStore.attendance?.id : newId.value)
const students = computed(() => $attendanceStore.attendance?.students ?? [])
const totalAttendance = ref<number>(students.value.filter(student => student.status === 'Present').length)

const updateAttendance = (username: string, attendance: string) => {
  const student = students.value.find(student => student.username === username)

  if (student) {
    student.status = attendance
    totalAttendance.value = students.value.filter(student => student.status === 'Present').length
  }
}

const onSubmit = async () => {
  isLoading.value = true

  const data = {
    classSlug: props.classSlug,
    students: students.value.map(student => ({
      username: student.username,
      status: student.status,
      reason: student.reason || ''
    }))
  }

  try {
    if (!id.value) {
      const response = await $attendanceStore.createAttendance(data)

      if (!response) {
        throw new Error('Điểm danh thất bại')
      }

      newId.value = response.id
      isLoading.value = false
      return
    }

    const response = await $attendanceStore.updateAttendance(id.value, data)

    if (!response) {
      throw new Error('Cập nhật điểm danh thất bại')
    }

    isLoading.value = false
  } catch (error) {
    isLoading.value = false
  }
}
</script>

<template>
  <Card>
    <form @submit.prevent="onSubmit">
      <CardHeader class="flex flex-col sm:flex-row items-start justify-between gap-6">
        <div class="flex flex-row items-start gap-4">
          <Avatar size="base">
            <AvatarImage
              :src="$attendanceStore.attendance?.teacherImage || ''"
              :alt="$attendanceStore.attendance?.teacherName"
            />
            <AvatarFallback>
              {{ $attendanceStore.attendance?.teacherName.split(' ').map((name: string) => name[0]).join('') }}
            </AvatarFallback>
          </Avatar>

          <div>
            <CardTitle class="text-2xl">
              {{ $attendanceStore.attendance?.className }}
            </CardTitle>

            <CardDescription class="text-base">
              {{ $attendanceStore.attendance?.teacherName }}
            </CardDescription>
          </div>
        </div>

        <div class="flex flex-col sm:items-end gap-2">
          <CardTitle>
            {{ new Date().toLocaleDateString() }}
          </CardTitle>

          <CardDescription class="text-base flex flex-col">
            <span>
              <span class="text-primary font-semibold">Tổng:</span>
              {{ $attendanceStore.attendance?.numberStudentInClass }} học sinh
            </span>

            <span>
              <span class="text-primary font-semibold">Có mặt:</span>
              {{ totalAttendance }}
            </span>

            <span class="text-primary-500">
              <span class="text-primary font-semibold">Vắng mặt:</span>
              {{ students.length - totalAttendance }}
            </span>
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent class="border-t pt-6">
        <div class="grid grid-cols-1 gap-8">
          <DetailStudent
            v-for="student in students"
            :student="student"
            :disabled="isLoading"
            @update:status="updateAttendance(student.username, $event)"
            @update:reason="student.reason = $event"
          />
        </div>
      </CardContent>

      <CardFooter class="flex justify-end border-t pt-6">
        <Button size="sm" :disabled="isLoading">Lưu điểm danh</Button>
      </CardFooter>
    </form>
  </Card>
</template>