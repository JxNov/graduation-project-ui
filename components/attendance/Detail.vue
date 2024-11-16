<script setup lang='ts'>
import DetailStudent from './DetailStudent.vue'

const students = [
  { username: 'student1', name: 'Student 1', avatar: '', attendance: true },
  { username: 'student2', name: 'Student 2', avatar: '', attendance: false },
  { username: 'student3', name: 'Student 3', avatar: '', attendance: false },
  { username: 'student4', name: 'Student 4', avatar: '', attendance: true }
]

const totalStudents = ref<number>(students.length)
const totalAttendance = ref<number>(students.filter(student => student.attendance).length)

const updateAttendance = (username: string, attendance: boolean) => {
  const student = students.find(student => student.username === username)

  if (student) {
    student.attendance = attendance
    totalAttendance.value = students.filter(student => student.attendance).length
  }
}
</script>

<template>
  <Card>
    <CardHeader class="flex flex-col sm:flex-row items-start justify-between gap-6">
      <div class="flex flex-row items-start gap-4">
        <Avatar size="base">
          <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div>
          <CardTitle class="text-2xl">
            Class
          </CardTitle>

          <CardDescription class="text-base">
            Teacher
          </CardDescription>
        </div>
      </div>

      <div class="flex flex-col sm:items-end gap-2">
        <CardTitle>
          {{ new Date().toLocaleDateString() }}
        </CardTitle>

        <CardDescription class="text-base">
          Đã điểm danh {{ totalAttendance }}/{{ totalStudents }} học sinh
        </CardDescription>
      </div>
    </CardHeader>

    <CardContent class="border-t pt-6">
      <div class="grid grid-cols-1 gap-8">
        <DetailStudent
          v-for="student in students"
          :student="student"
          :checked="student.attendance"
          @update:checked="updateAttendance(student.username, $event)"
        />
      </div>
    </CardContent>

    <CardFooter class="flex justify-end border-t pt-6">
      <Button size="sm">Lưu điểm danh</Button>
    </CardFooter>
  </Card>
</template>