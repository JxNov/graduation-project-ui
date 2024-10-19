<script setup lang="ts">
import {Toaster} from "~/components/ui/sonner";

const store = useNavbar()
const { theme, radius } = useCustomize()

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
</script>

<template>
  <div>
    <slot />
  </div>

  <Toaster position="top-right" class="pointer-events-auto" :duration="3000"/>
</template>
