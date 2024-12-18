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
import { getImageFirebase } from '~/utils/imageFirebase'

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


onMounted(async () => {
  if (!$authStore.avatar.startsWith('http')) {
    $authStore.avatar = await getImageFirebase($authStore.user.username, $authStore.user.image)
  }
})
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
              <!--              <Triangle class="size-5 fill-foreground" />-->
              <Button variant="ghost" size="icon" aria-label="Home">
                <svg width="469" height="327" viewBox="0 0 469 327" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M32.618 100H2.41797V76H90.018V100H59.818V216H32.618V100ZM101.62 216V76H173.42V100H129.02V133.4H168.62V156.6H129.02V192.8H174.22V216H101.62ZM226.552 192.8H261.752V216H210.952C202.152 207.733 195.486 197.267 190.952 184.6C186.419 171.933 184.152 158.933 184.152 145.6C184.152 132.133 186.686 119.2 191.752 106.8C196.819 94.4 204.352 84.1333 214.352 76H261.752V100H226.552C222.952 104.133 219.819 110.8 217.152 120C214.619 129.2 213.352 138 213.352 146.4C213.352 154.8 214.619 163.6 217.152 172.8C219.819 182 222.952 188.667 226.552 192.8ZM303.824 216H276.424V76H303.824V132.4H335.824V76H363.224V216H335.824V158H303.824V216ZM436.279 76L404.079 162H433.679V125.6H459.679V216H433.679V187H396.679C385.079 181 379.279 171.733 379.279 159.2C379.279 153.467 382.479 142.6 388.879 126.6L408.879 76H436.279Z"
                    fill="url(#paint0_linear_3_50)" />
                  <path
                    d="M124.562 243.9H146.662V254.4H131.062L140.562 268.5C144.828 274.567 147.195 278.733 147.662 281C147.928 282.067 148.062 283.167 148.062 284.3C148.062 289.033 146.295 292.6 142.762 295H117.262V284.5H135.562L124.862 268.8C124.395 268.067 123.662 267.033 122.662 265.7C121.728 264.367 120.995 263.3 120.462 262.5C119.928 261.633 119.562 261 119.362 260.6C119.162 260.2 118.895 259.7 118.562 259.1C118.228 258.433 117.995 257.867 117.862 257.4C117.595 256.133 117.462 255.1 117.462 254.3C117.462 249.433 119.828 245.967 124.562 243.9ZM165.946 269C165.946 271.8 166.379 274.667 167.246 277.6C168.113 280.467 169.313 282.767 170.846 284.5H185.846V295H163.946C156.079 288.733 152.146 280.067 152.146 269C152.146 257.933 156.346 249.567 164.746 243.9H185.846V254.4H170.846C167.579 257.8 165.946 262.667 165.946 269ZM215.811 243.9H225.311C228.244 247.633 230.244 251.367 231.311 255.1C232.378 258.833 232.911 263.5 232.911 269.1V295H219.611V268.1C219.611 261.767 218.744 257.2 217.011 254.4H205.811V295H192.511V225H205.811V247.5C207.278 246.167 208.644 245.233 209.911 244.7C211.244 244.167 213.211 243.9 215.811 243.9ZM271.544 295H249.744C243.077 288.8 239.744 280.333 239.744 269.6C239.744 264.2 240.477 259.5 241.944 255.5C243.477 251.5 245.877 247.633 249.144 243.9H272.544C276.01 247.9 278.377 251.8 279.644 255.6C280.91 259.333 281.544 264 281.544 269.6C281.544 280.333 278.21 288.8 271.544 295ZM256.844 284.5H264.444C266.844 279.833 268.044 274.533 268.044 268.6C268.044 262.667 266.81 257.933 264.344 254.4H256.844C254.444 257.8 253.244 262.633 253.244 268.9C253.244 275.1 254.444 280.3 256.844 284.5ZM319.102 295H297.302C290.636 288.8 287.302 280.333 287.302 269.6C287.302 264.2 288.036 259.5 289.502 255.5C291.036 251.5 293.436 247.633 296.702 243.9H320.102C323.569 247.9 325.936 251.8 327.202 255.6C328.469 259.333 329.102 264 329.102 269.6C329.102 280.333 325.769 288.8 319.102 295ZM304.402 284.5H312.002C314.402 279.833 315.602 274.533 315.602 268.6C315.602 262.667 314.369 257.933 311.902 254.4H304.402C302.002 257.8 300.802 262.633 300.802 268.9C300.802 275.1 302.002 280.3 304.402 284.5ZM349.461 225V295H336.261V225H349.461Z"
                    fill="url(#paint1_linear_3_50)" />
                  <defs>
                    <linearGradient id="paint0_linear_3_50" x1="-122" y1="168.171" x2="532.5" y2="168.171"
                                    gradientUnits="userSpaceOnUse">
                      <stop stop-color="#00DC82" />
                      <stop offset="0.5" stop-color="#34CDFE" />
                      <stop offset="1" stop-color="#0047E1" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_3_50" x1="52.8294" y1="271.085" x2="386.359" y2="271.085"
                                    gradientUnits="userSpaceOnUse">
                      <stop stop-color="#00DC82" />
                      <stop offset="0.5" stop-color="#34CDFE" />
                      <stop offset="1" stop-color="#0047E1" />
                    </linearGradient>
                  </defs>
                </svg>
              </Button>

              Tech4School
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
              <span class="sr-only">Chuyển đổi menu người dùng</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent class="min-w-56" align="end">
            <DropdownMenuLabel class="flex items-center gap-2 font-normal">
              <Avatar>
                <AvatarImage :src="$authStore.avatar || ''" :alt="$authStore.user.name" />
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
              <NuxtLink to="/profile">
                <DropdownMenuItem class="cursor-pointer">
                  Hồ sơ
                </DropdownMenuItem>
              </NuxtLink>

              <DarkToggle />

              <LanguageSwitcher />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <DropdownMenuItem @click="handleLogout">
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </header>
</template>
