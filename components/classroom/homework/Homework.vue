<script setup lang="ts">
import HomeworkItem from './HomeworkItem.vue'
import HomeWorkCreate from './HomeworkCreate.vue'
import { checkPermissions } from '~/utils/checkPermissions'

const { $homeworkStore, $authStore } = useNuxtApp()
const route = useRoute()

const teacherPermissions = checkPermissions($authStore.user.permissions, ['teacher.read'])

onMounted(async () => {
  if (!$homeworkStore.homeworks.length) {
    await $homeworkStore.fetchHomeworks(route.params.classroomSlug as string)
  }
})
</script>

<template>
  <div class="w-full flex flex-col gap-4 md:px-16 lg:px-24 xl:px-48 mt-10">
    <div class="flex justify-end" v-if="teacherPermissions">
      <HomeWorkCreate />
    </div>

    <HomeworkItem
      v-for="homework in $homeworkStore.homeworks"
      :key="homework.slug"
      :homework="homework"
    />
  </div>
</template>
