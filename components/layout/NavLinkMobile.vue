<script setup lang="ts">
import type {NavLink} from '~/types/nav'
import {hasPermission as checkPermission} from "~/utils/permissions";

const route = useRoute()
const {$generalStore} = useNuxtApp()

defineProps<{
  item: NavLink
}>()

const hasPermission = (permissions: string[] | undefined): boolean => {
  return checkPermission(permissions, $generalStore.userPermissions);
};
</script>

<template>
  <SheetClose as-child>
    <NuxtLink
        v-if="hasPermission(item.permissions)"
        :to="item.link"
        :class="[
        { 'bg-muted': item.link === route.path },
      ]"
        class="flex items-center gap-4 rounded-lg px-3 py-2 text-sm text-foreground font-normal hover:bg-muted"
    >
      <Icon v-if="item.icon" :name="item.icon" size-4.5/>
      {{ item.title }}
    </NuxtLink>
  </SheetClose>
</template>
