<script setup lang="ts">
import type { NavGroup } from '~/types/nav'
import { hasPermission as checkPermission } from '~/utils/permissions'

const route = useRoute()
const { $authStore } = useNuxtApp()

defineProps<{
  item: NavGroup
}>()

const isOpenCollapsible = ref(false)

const hasPermission = (permissions: string[] | undefined): boolean => {
  return checkPermission(permissions, $authStore.user.permissions)
}
</script>

<template>
  <Collapsible
    v-model:open="isOpenCollapsible"
    class="w-full space-y-1"
    v-if="item.children.some(nav => hasPermission(nav.permissions))"
  >
    <CollapsibleTrigger as-child>
      <Button
        variant="ghost"
        size="icon"
        class="w-full gap-3 rounded-lg px-3 font-normal"
        :aria-label="$t(`menu.nav.${item.title}`)"
      >
        <Icon v-if="item.icon" :name="item.icon" class="size-5" />
        <span>{{ $t(`menu.nav.${item.title}`) }}</span>
        <Icon
          name="radix-icons:chevron-right"
          class="ml-auto h-4 w-4 transition-transform duration-200"
          :class="isOpenCollapsible ? 'rotate-90' : 'rotate-0'"
        />
      </Button>
    </CollapsibleTrigger>
    <CollapsibleContent class="space-y-2">
      <template v-for="(nav, index) in item.children" :key="`link-children-${index}`">
        <SheetClose as-child v-if="hasPermission(nav.permissions)">
          <NuxtLink
            :to="nav.link"
            :class="[
              { 'bg-muted': nav.link === route.path },
            ]"
            class="flex items-center gap-4 rounded-lg px-4 py-2 text-sm text-foreground font-normal hover:bg-muted"
          >
            <Icon v-if="nav.icon" :name="nav.icon" size-3 />
            {{ $t(`menu.nav.${nav.title}`) }}
          </NuxtLink>
        </SheetClose>
      </template>
    </CollapsibleContent>
  </Collapsible>
</template>
