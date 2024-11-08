<script setup lang="ts">
import type { NavMenuItems } from '~/types/nav'
import { navMenuClassroom } from '~/constants/classrooms'
import { navMenu } from '~/constants/menus'
import { Toaster } from '~/components/ui/sonner'

const router = useRouter()
const { t } = useI18n()
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#09090b' : '#ffffff')
const items = ref<NavMenuItems>([])
const title = ref<string>('')
const description = ref<string>('')

watchEffect(() => {
  if (router.currentRoute.value.path.includes('/classrooms')) {
    items.value = navMenuClassroom
  } else {
    items.value = navMenu
  }

  const links = items.value.flatMap(item => {
    if ('heading' in item) {
      return item
    } else if ('children' in item) {
      return item.children
    } else {
      return item
    }
  })

  links.find(link => {
    if ('link' in link) {
      title.value = t(`menu.nav.${link.title}`)
      description.value = t(`menu.nav.${link.title}`)
      return link.link === router.currentRoute.value.path
    }
  })
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
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <Toaster position="top-right" class="pointer-events-auto" :duration="3000" />
</template>