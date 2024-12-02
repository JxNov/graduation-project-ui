<script setup lang="ts">
import { cn } from '~/lib/utils'
import type { NavLink } from '~/types/nav'
import { hasPermission as checkPermission } from '~/utils/permissions'
import { useMediaQuery } from '@vueuse/core'

const route = useRoute()
const { $authStore } = useNuxtApp()

defineProps<{
  item: NavLink
}>()

const { isOpen } = storeToRefs(useNavbar())

const hasPermission = (permissions: string[] | undefined): boolean => {
  return checkPermission(permissions, $authStore.user.permissions)
}

const checkActive = (link: string): boolean => {
  if (link !== '/classrooms') {
    return new RegExp(`^${link}(/\\d+)?$`).test(route.path)
  }

  return new RegExp(`^${link}(/.*)?$`).test(route.path)
}

const isLargeScreen = useMediaQuery('(min-width: 1024px)')
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <NuxtLink :to="item.link" v-if="hasPermission(item.permissions)">
          <Button
            variant="ghost"
            size="icon"
            class="w-full gap-3 rounded-lg px-4 font-normal"
            :class="[
              // { 'bg-muted': item.link === route.path },
              { 'bg-muted': checkActive(item.link) },
              cn('justify-center lg:justify-start', isOpen ? 'lg:justify-start' : 'lg:justify-center'),
            ]"
            :aria-label="$t(`menu.nav.${item.title}`)"
          >
            <Icon v-if="item.icon" :name="item.icon" class="size-5" />
            <span v-if="isOpen" class="hidden lg:inline-block">
              {{ $t(`menu.nav.${item.title}`) }}
            </span>
          </Button>
        </NuxtLink>
      </TooltipTrigger>

      <TooltipContent side="right" :side-offset="5" v-if="!isOpen || !isLargeScreen">
        {{ $t(`menu.nav.${item.title}`) }}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
