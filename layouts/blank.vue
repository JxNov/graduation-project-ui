<script setup lang="ts">
const store = useNavbar()
const { theme, radius } = useCustomize()

useServerHead({
  htmlAttrs: {
    class: `theme-${theme.value} [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border`,
    style: `--radius: ${radius.value}rem;`
  }
})

const router = useRouter()

defineShortcuts({
  'Meta_B': () => store.toggle(),
  'G-H': () => router.push('/')
})
</script>

<template>
  <div vaul-drawer-wrapper>
    <slot />
  </div>
</template>
