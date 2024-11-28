<script setup lang="ts">
import PeopleCard from './PeopleCard.vue'

defineProps<{
  teachersClassroom: any
  studentsClassroom: any
}>()
</script>

<template>
  <div class="w-full flex flex-col gap-4 md:px-16 lg:px-24 xl:px-48 mt-10">
    <PeopleCard title="Giáo viên" :data="teachersClassroom" />
    <PeopleCard title="Học sinh" :data="studentsClassroom" />
  </div>
</template>
