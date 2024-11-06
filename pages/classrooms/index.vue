<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div>
      <nuxt-link to="/classrooms">
        <div class="bg-white shadow-md rounded-lg p-4">
          <h2 class="text-xl font-semibold">Name</h2>
          <p class="text-gray-500">Desc</p>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>
