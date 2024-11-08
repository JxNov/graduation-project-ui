<script setup lang="ts">
import type { NuxtError } from '#app'
import Forbidden from '@/components/common/error/Forbidden.vue'
import NotFound from '@/components/common/error/NotFound.vue'

const { theme, radius } = useCustomize()
const colorMode = useColorMode()
const props = defineProps({
  error: Object as () => NuxtError
}) as { error: NuxtError }

const color = computed(() => colorMode.value === 'dark' ? '#09090b' : '#ffffff')
const title = props.error.statusCode === 403 ? 'Forbidden' : 'Page Not Found'
const description = props.error.statusCode === 403 ? 'Forbidden' : 'Page Not Found'

useServerHead({
  htmlAttrs: {
    class: `theme-${theme.value} [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border`,
    style: `--radius: ${radius.value}rem;`
  }
})

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

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
  <Forbidden v-if="props.error.statusCode === 403" />
  <NotFound v-else />
</template>
