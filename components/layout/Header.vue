<script setup lang="ts">
import { CircleUser, Menu, Triangle } from 'lucide-vue-next'
import { navMenu, navMenuBottom } from '~/constants/menus'
import { navMenuClassroom, navMenuClassroomBottom } from '~/constants/classrooms'
import type { NavGroup, NavLink, NavSectionTitle } from '~/types/nav'
import { useMediaQuery } from '@vueuse/core'
import Search from '~/components/base/Search.vue'
import DarkToggle from '~/components/base/DarkToggle.vue'
import LanguageSwitcher from '~/components/base/LanguageSwitcher.vue'
import ThemePopover from '~/components/base/ThemePopover.vue'
import ThemeDrawer from '~/components/base/ThemeDrawer.vue'

defineProps<{
  classroom?: boolean
}>()

const { $authStore, $generalStore } = useNuxtApp()

const handleLogout = async () => {
  await $authStore.logout()
}

function resolveNavItemComponent(item: NavLink | NavGroup | NavSectionTitle) {
  if ('heading' in item)
    return resolveComponent('LayoutNavHeadingMobile')
  else if ('children' in item)
    return resolveComponent('LayoutNavGroupMobile')

  return resolveComponent('LayoutNavLinkMobile')
}

const isMediumScreen = useMediaQuery('(min-width: 768px)')
</script>

<template>
  <header class="sticky top-0 z-10 h-[53px] flex items-center gap-4 border-b bg-background px-4 md:px-6">
    <div class="w-full flex items-center gap-4">
      <Sheet>
        <SheetTrigger as-child>
          <Button size="icon" variant="outline" class="sm:hidden">
            <Menu />
            <span class="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent aria-describedby="radix-vue-dialog-description-1" side="left" class="flex flex-col p-4">
          <SheetHeader>
            <SheetTitle class="flex items-center gap-3">
              <Triangle class="size-5 fill-foreground" />
              Dashboard
            </SheetTitle>
          </SheetHeader>

          <ScrollArea class="w-full">
            <nav class="grid gap-2">
              <template v-if="classroom">
                <component
                  :is="resolveNavItemComponent(item)"
                  v-for="(item, index) in navMenuClassroom"
                  :key="index"
                  :item="item"
                />
              </template>

              <template v-else>
                <component
                  :is="resolveNavItemComponent(item)"
                  v-for="(item, index) in navMenu"
                  :key="index"
                  :item="item"
                />
              </template>
            </nav>
          </ScrollArea>

          <div class="mt-auto">
            <nav class="grid gap-2">
              <template v-if="classroom">
                <component
                  :is="resolveNavItemComponent(item)"
                  v-for="(item, index) in navMenuClassroomBottom"
                  :key="index"
                  :item="item"
                />
              </template>

              <template v-else>
                <component
                  :is="resolveNavItemComponent(item)"
                  v-for="(item, index) in navMenuBottom"
                  :key="index"
                  :item="item"
                />
              </template>
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      <Search />

      <div class="ml-auto flex items-center gap-4">
        <ThemePopover v-if="isMediumScreen" />
        <ThemeDrawer v-else />

        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button id="radix-vue-dropdown-menu-trigger-1" variant="secondary" size="icon" class="rounded-full">
              <CircleUser class="h-5 w-5" />
              <span class="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent class="w-56" align="end">
            <DropdownMenuLabel class="flex items-center gap-2 font-normal">
              <Avatar>
                <AvatarImage :src="$authStore.user.image || ''" :alt="$authStore.user.name" />
                <AvatarFallback>{{ $authStore.user.name.split(' ').map((name: string) => name[0]).join('') }}
                </AvatarFallback>
              </Avatar>

              <div class="flex flex-col space-y-1">
                <p class="text-sm font-medium leading-none">
                  {{ $authStore.user.name }}
                </p>

                <p class="text-xs text-muted-foreground leading-none">
                  {{ $authStore.user.email }}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>
                <NuxtLink to="/profile">
                  {{ $t('auth.profile.title') }}
                </NuxtLink>
              </DropdownMenuItem>

              <DarkToggle />

              <LanguageSwitcher />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <DropdownMenuItem @click="handleLogout">
              {{ $t('auth.logout') }}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </header>
</template>
