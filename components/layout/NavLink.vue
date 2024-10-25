<script setup lang="ts">
import { cn } from '~/lib/utils'
import type { NavLink } from '~/types/nav'
import { hasPermission as checkPermission } from '~/utils/permissions'

const route = useRoute()
const { $generalStore } = useNuxtApp()

defineProps<{
  item: NavLink
}>()

const { isOpen } = storeToRefs(useNavbar())

const hasPermission = (permissions: string[] | undefined): boolean => {
  return checkPermission(permissions, $generalStore.userPermissions)
}
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
              { 'bg-muted': item.link === route.path },
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

      <TooltipContent side="right" :side-offset="5" v-if="!isOpen">
        {{ $t(`menu.nav.${item.title}`) }}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
