<script setup lang="ts">
import { ConfigProvider } from 'radix-vue'
import type { NavGroup } from '~/types/nav'
import { cn } from '~/lib/utils'
import { hasPermission as checkPermission } from '~/utils/permissions'
import { useMediaQuery } from '@vueuse/core'

const route = useRoute()
const { $authStore } = useNuxtApp()

defineProps<{
  item: NavGroup
}>()

const { isOpen } = storeToRefs(useNavbar())

const isOpenCollapsible = ref(false)

// Solving Hydration Nuxt
const useIdFunction = () => useId()

const hasPermission = (permissions: string[] | undefined): boolean => {
  return checkPermission(permissions, $authStore.user.permissions)
}

const checkActive = (link: string): boolean => {
  if (link === '/admin') {
    return route.path === link
  }

  if (link !== '/classrooms') {
    // return new RegExp(`^${link}(/\\d+)?$`).test(route.path)

    return new RegExp(`^${link}(/[^/]+)?$`).test(route.path)
  }

  return new RegExp(`^${link}(/.*)?$`).test(route.path)
}

const isLargeScreen = useMediaQuery('(min-width: 1024px)')
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <TooltipProvider>
      <Tooltip :delay-duration="0">
        <TooltipTrigger as-child>
          <Collapsible
            v-model:open="isOpenCollapsible"
            class="w-full space-y-1"
            v-if="item.children.some(nav => hasPermission(nav.permissions))"
          >
            <CollapsibleTrigger as-child>
              <Button
                variant="ghost"
                size="icon"
                class="w-full gap-3 rounded-lg px-4 font-normal"
                :class="[
                  cn('justify-center lg:justify-start', isOpen ? 'lg:justify-start' : 'lg:justify-center'),
                ]"
                :aria-label="$t(`menu.nav.${item.title}`)"
              >
                <Icon v-if="item.icon" :name="item.icon" class="size-5" />

                <span v-show="isOpen" class="hidden lg:inline-block">
                  {{ $t(`menu.nav.${item.title}`) }}
                </span>

                <Icon
                  v-if="isOpen"
                  name="radix-icons:chevron-right"
                  class="ml-auto h-4 w-4 hidden lg:inline-block transition-transform duration-200"
                  :class="isOpenCollapsible ? 'rotate-90' : 'rotate-0'"
                />
              </Button>
            </CollapsibleTrigger>

            <CollapsibleContent class="space-y-2">
              <template v-for="(nav, index) in item.children" :key="index">
                <NuxtLink :to="nav.link" v-if="hasPermission(nav.permissions)">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger as-child>
                        <Button
                          variant="ghost"
                          size="icon"
                          class="w-full gap-4 rounded-lg px-5 font-normal"
                          :class="[
                          // { 'bg-muted': nav.link === route.path },
                          { 'bg-muted': checkActive(nav.link) },
                          cn('justify-center lg:justify-start', isOpen ? 'lg:justify-start' : 'lg:justify-center'),
                        ]"
                          :aria-label="$t(`menu.nav.${nav.title}`)"
                        >
                          <Icon v-if="nav.icon" :name="nav.icon" class="size-3.5" />
                          <span v-if="isOpen" class="hidden lg:inline-block">
                            {{ $t(`menu.nav.${nav.title}`) }}
                        </span>
                        </Button>
                      </TooltipTrigger>

                      <TooltipContent side="right" :side-offset="5" v-if="!isOpen">
                        {{ $t(`menu.nav.${nav.title}`) }}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </NuxtLink>
              </template>
            </CollapsibleContent>
          </Collapsible>
        </TooltipTrigger>

        <TooltipContent v-if="(!isOpen && !isOpenCollapsible) || !isLargeScreen" side="right" :side-offset="5">
          {{ $t(`menu.nav.${item.title}`) }}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </ConfigProvider>
</template>
