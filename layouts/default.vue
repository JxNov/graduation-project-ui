<script setup lang="ts">
import { cn } from '~/lib/utils'

const store = useNavbar()
const { isOpen } = storeToRefs(store)
const { isBgWhite } = storeToRefs(useAppConf())
const { theme, radius } = useCustomize()
const router = useRouter()

useServerHead({
  htmlAttrs: {
    class: `theme-${theme.value} [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border`,
    style: `--radius: ${radius.value}rem;`
  }
})

defineShortcuts({
  'Meta_B': () => store.toggle(),
  'G-H': () => router.push('/')
})
</script>

<template>
  <div
    class="grid w-full transition-width duration-300 min-h-dvh"
    :class="cn('pl-0 lg:pl-64 sm:pl-20', isOpen ? 'lg:pl-64 sm:pl-20' : 'lg:pl-20')"
  >
    <LayoutSidebar v-if="router.currentRoute.value.path.includes('/classrooms')" classroom />
    <LayoutSidebar v-else />

    <div class="flex flex-col min-h-screen">
      <LayoutHeader v-if="router.currentRoute.value.path.includes('/classrooms')" classroom />
      <LayoutHeader v-else />

      <main class="flex-1 p-4 lg:p-6" :class="isBgWhite ? 'bg-background' : 'bg-muted dark:bg-muted/20'">
        <slot />
      </main>
    </div>
  </div>
</template>
