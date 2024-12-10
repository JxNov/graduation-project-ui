<script setup lang="ts">
const { $geminiStore } = useNuxtApp()

onMounted(async () => {
  if (!$geminiStore.geminis.length) {
    await $geminiStore.fetchGeminis()
  }
})
</script>

<template>
  <GeminiLayout :data="$geminiStore.geminis" />
</template>