<script setup lang="ts">
const { $classroomStore } = useNuxtApp()

onMounted(() => {
  if (!$classroomStore.classrooms.length) {
    $classroomStore.fetchClassrooms()
  }
})
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <ClientOnly>
      <ClassroomItem
        v-for="classroom in $classroomStore.classrooms"
        :key="classroom.ClassSlug"
        :classroom="classroom"
      />
    </ClientOnly>
  </div>
</template>
