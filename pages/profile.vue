<script setup lang="ts">
const title = 'Thông tin cá nhân'
const description = 'Thông tin cá nhân của bạn'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: '',
  twitterImage: '',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <Profile />
</template>
