<script setup lang="ts">
import HomeworkItem from './HomeworkItem.vue'
import HomeWorkCreate from './HomeworkCreate.vue'
</script>

<template>
  <div class="w-full flex flex-col gap-4 md:px-16 lg:px-24 xl:px-48 mt-10">
    <div class="flex justify-end">
      <HomeWorkCreate />
    </div>

    <HomeworkItem />
  </div>
</template>
