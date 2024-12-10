<script setup lang="ts">
import { checkPermissions } from '~/utils/checkPermissions'

const { $classroomStore, $authStore } = useNuxtApp()

const teacherPermissions = checkPermissions($authStore.user.permissions, ['teacher.read'])
const studentPermissions = checkPermissions($authStore.user.permissions, ['student.read'])

onMounted(() => {
  if (!$classroomStore.classrooms.length) {
    if (teacherPermissions) {
      $classroomStore.fetchClassrooms()
    } else if (studentPermissions) {
      $classroomStore.fetchClassroomStudent()
    }
  }
})
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <ClassroomItem
      v-for="classroom in $classroomStore.classrooms"
      :key="classroom.classSlug"
      :classroom="classroom"
    />
  </div>
</template>
