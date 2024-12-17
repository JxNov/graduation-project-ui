<script setup lang="ts">
const { $authStore } = useNuxtApp()

const studentPermissions = checkPermissions($authStore.user.permissions, ['student.read'])
const teacherPermissions = checkPermissions($authStore.user.permissions, ['teacher.read'])
</script>

<template>
  <GradeStudent v-if="studentPermissions" />
  <GradeTeacher v-else-if="teacherPermissions" />
  <GradeAdmin v-else />
</template>
