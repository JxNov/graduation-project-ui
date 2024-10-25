<script setup lang="ts">
import type { NuxtError } from '#app'
import Forbidden from '~/components/common/error/Forbidden.vue'
import NotFound from '~/components/common/error/NotFound.vue'

const props = defineProps({
  error: Object as () => NuxtError
}) as { error: NuxtError }

definePageMeta({
  layout: 'blank'
})

onMounted(() => {
  props.error.statusCode === 403 ? document.title = 'Forbidden' : document.title = 'Page Not Found'
})
</script>

<template>
  <Forbidden v-if="props.error.statusCode === 403" />
  <NotFound v-else />
</template>
