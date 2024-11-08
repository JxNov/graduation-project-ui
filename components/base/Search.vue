<script setup lang="ts">
import { navMenu, navMenuBottom } from '~/constants/menus'
import { navMenuClassroom, navMenuClassroomBottom } from '~/constants/classrooms'
import { hasPermission as checkPermission } from '~/utils/permissions'

const { metaSymbol } = useShortcuts()
const router = useRouter()
const { $authStore } = useNuxtApp()

defineShortcuts({
  Meta_K: () => openCommand.value = true
})

const openCommand = ref(false)

const navMenuGroup = computed(() => {
  if (router.currentRoute.value.path.includes('/classroom')) {
    return navMenuClassroom.map((nav: any) => nav)
  }

  return navMenu.map((nav: any) => nav)
})

const navMenuGroupBottom = computed(() => {
  if (router.currentRoute.value.path.includes('/classroom')) {
    return navMenuClassroomBottom.map((nav: any) => nav)
  }

  return navMenuBottom.map((nav: any) => nav)
})

const hasPermission = (permissions: string[] | undefined): boolean => {
  return checkPermission(permissions, $authStore.user.permissions)
}

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
    <CommandInput placeholder="Type a command or search..." />

    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>

      <template v-for="nav in navMenuGroup" :key="nav.title">
        <CommandGroup
          :heading="$t(`menu.nav.${nav.title}`)"
          v-if="nav.children && nav.children.length"
          class="border-t border-b border-gray-200"
        >
          <template v-for="child in nav.children" :key="child.title">
            <CommandItem
              :value="$t(`menu.nav.${child.title}`)"
              @select="handleSelectLink(child.link)"
              class="flex items-center gap-2"
              v-if="hasPermission(child.permissions)"
            >
              <Icon :name="child.icon ?? 'i-radix-icons-circle'" />
              {{ $t(`menu.nav.${child.title}`) }}
            </CommandItem>
          </template>
        </CommandGroup>

        <CommandGroup v-else>
          <CommandItem
            :value="$t(`menu.nav.${nav.title}`)"
            @select="handleSelectLink(nav.link)"
            class="flex items-center gap-2"
            v-if="hasPermission(nav.permissions)"
          >
            <Icon :name="nav.icon ?? 'i-radix-icons-circle'" />
            {{ $t(`menu.nav.${nav.title}`) }}
          </CommandItem>
        </CommandGroup>
      </template>

      <CommandGroup class="border-t border-b border-gray-200">
        <template v-for="nav in navMenuGroupBottom" :key="nav.title">
          <CommandItem
            :value="$t(`menu.nav.${nav.title}`)"
            @select="handleSelectLink(nav.link)"
            class="flex items-center gap-2"
            v-if="hasPermission(nav.permissions)"
          >
            <Icon :name="nav.icon ?? 'i-radix-icons-circle'" />
            {{ $t(`menu.nav.${nav.title}`) }}
          </CommandItem>
        </template>
      </CommandGroup>
    </CommandList>
  </CommandDialog>
</template>
