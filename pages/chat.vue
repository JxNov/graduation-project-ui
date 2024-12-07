<script setup lang="ts">
const { $chatStore } = useNuxtApp()

onMounted(async () => {
  if (!$chatStore.chatPreviews.length) {
    await $chatStore.getChatPreviewAdmin()
  }
})

const preview = computed(() => $chatStore.chatPreviews)
</script>

<template>
  <ChatLayout :preview="preview" />
</template>