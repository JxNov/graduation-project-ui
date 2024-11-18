<script setup lang="ts">
import { AttendanceDetail } from '~/components/attendance'

const title = 'Điểm danh lớp học'
const description = 'Điểm danh lớp học'

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
  <AttendanceDetail />
</template>
