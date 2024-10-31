<script setup lang="ts">
import {cn} from '~/lib/utils'
import {Toaster} from "~/components/ui/sonner";
import type {NavMenuItems} from '~/types/nav'
import {navMenu} from '~/constants/menus'

const store = useNavbar()
const {isOpen} = storeToRefs(store)
const {isBgWhite} = storeToRefs(useAppConf())
const {theme, radius} = useCustomize()

useServerHead({
  bodyAttrs: {
    class: `theme-${theme.value}`,
    style: `--radius: ${radius.value}rem;`,
  },
})

const router = useRouter()

defineShortcuts({
  'Meta_B': () => store.toggle(),
  'G-H': () => router.push('/'),
})

onMounted(() => {
  const items = ref<NavMenuItems>(navMenu)
  const menus = computed(() => items.value)

  watchEffect(() => {
    const links = menus.value.flatMap(item => {
      if ('heading' in item) {
        return item;
      } else if ('children' in item) {
        return item.children;
      } else {
        return item;
      }
    });

    links.find(link => {
      if ('link' in link) {
        document.title = link.title;
        return link.link === router.currentRoute.value.path;
      }
    })
  })
})
</script>

<template>
  <div
      class="grid w-full transition-width duration-300 min-h-dvh"
      :class="cn('pl-0 lg:pl-64 sm:pl-20', isOpen ? 'lg:pl-64 sm:pl-20' : 'lg:pl-20')"
  >
    <LayoutSidebar/>

    <div class="flex flex-col min-h-screen">
      <LayoutHeader/>

      <main class="flex-1 p-4 lg:p-6" :class="isBgWhite ? 'bg-background' : 'bg-muted dark:bg-muted/20'">
        <slot/>
      </main>
    </div>
  </div>

  <Toaster position="top-right" class="pointer-events-auto" :duration="3000"/>
</template>
