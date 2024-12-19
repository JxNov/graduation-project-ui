<script setup lang="ts">
const { $geminiStore } = useNuxtApp()

onMounted(async () => {
  await $geminiStore.fetchGeminis()
})
</script>

<template>
  <GeminiLayout :data="$geminiStore.geminis" />
</template>