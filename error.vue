<script setup lang="ts">
import type {NuxtError} from '#app'

const props = defineProps({
  error: Object as () => NuxtError
}) as { error: NuxtError }

definePageMeta({
  layout: 'blank',
})

onMounted(() => {
  props.error.statusCode === 403 ? document.title = 'Forbidden' : document.title = 'Page Not Found'
})
</script>

<template>
  <CommonForbidden v-if="props.error.statusCode === 403"/>
  <CommonNotFound v-else/>
</template>
