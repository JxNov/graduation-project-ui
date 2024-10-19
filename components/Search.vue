<script setup lang="ts">
import {navMenu} from '@/constants/menus'
import type {NavGroup} from '~/types/nav'

const {metaSymbol} = useShortcuts()

const openCommand = ref(false)
const router = useRouter()

defineShortcuts({
  Meta_K: () => openCommand.value = true,
})

// const componentsNav = computed<NavGroup>(() => {
//   return navMenu.find((nav: any) => nav.title === 'Components') as NavGroup
// })

const handleSelectLink = (path: string) => {
  router.push(path)
  openCommand.value = false
}
</script>

<template>
  <Button variant="outline" size="sm"
          class="w-full flex-1 justify-between gap-1 font-normal md:w-56 md:flex-initial md:gap-3"
          @click="openCommand = !openCommand">
    <span class="hidden sm:inline-flex">Search functionality</span>
    <span class="sm:hidden">Search...</span>

    <BaseKbd>
      <span class="text-xs">{{ metaSymbol }}</span>K
    </BaseKbd>
  </Button>

  <CommandDialog v-model:open="openCommand">
    <CommandInput placeholder="Type a command or search..."/>
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>

      <CommandGroup heading="Suggestions">
        <CommandItem value="Home" @select="handleSelectLink('/')">
          <Icon name="i-lucide-home" class="pr-2"/>
          Home
        </CommandItem>
      </CommandGroup>
      <CommandSeparator/>

      <!--      <CommandGroup heading="Components">-->
      <!--        <CommandItem-->
      <!--            v-for="nav in componentsNav?.children"-->
      <!--            :key="nav.title"-->
      <!--            :value="nav.title"-->
      <!--            @select="handleSelectLink(nav.link)"-->
      <!--        >-->
      <!--          <Icon name="i-radix-icons-circle" pr-2/>-->
      <!--          {{ nav.title }}-->
      <!--        </CommandItem>-->
      <!--      </CommandGroup>-->
    </CommandList>
  </CommandDialog>
</template>
