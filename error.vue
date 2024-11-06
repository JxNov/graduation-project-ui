<script setup lang="ts">
import type { NuxtError } from '#app'
import Forbidden from '@/components/common/error/Forbidden.vue'
import NotFound from '@/components/common/error/NotFound.vue'

const { theme, radius } = useCustomize()
const props = defineProps({
  error: Object as () => NuxtError
}) as { error: NuxtError }

useServerHead({
  htmlAttrs: {
    class: `theme-${theme.value} [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border`,
    style: `--radius: ${radius.value}rem;`
  }
})

onMounted(() => {
  document.title = props.error.statusCode === 403 ? 'Forbidden' : 'Page Not Found'
})
</script>

<template>
  <Forbidden v-if="props.error.statusCode === 403" />
  <NotFound v-else />
</template>
