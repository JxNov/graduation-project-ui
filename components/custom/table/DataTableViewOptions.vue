<script setup lang="ts">
import type {Table} from '@tanstack/vue-table'
import {MixerHorizontalIcon, ReloadIcon} from '@radix-icons/vue'
import {Button} from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'

interface DataTableViewOptionsProps {
  table: Table<any>
  reloadData: () => void
}

const props = defineProps<DataTableViewOptionsProps>()

const columns = computed(() => props.table.getAllColumns()
    .filter(
        column =>
            typeof column.accessorFn !== 'undefined' && column.getCanHide(),
    ))
</script>

<template>
  <div class="flex flex-1 items-center space-x-2">
    <Button
        variant="outline"
        size="sm"
        class="ml-auto hidden h-8 lg:flex"
        @click="props.reloadData"
    >
      <ReloadIcon class="mr-2 h-4 w-4"/>
      Reload data
    </Button>

    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
            variant="outline"
            size="sm"
            class="ml-auto hidden h-8 lg:flex"
        >
          <MixerHorizontalIcon class="mr-2 h-4 w-4"/>
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" class="w-[150px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator/>

        <DropdownMenuCheckboxItem
            v-for="column in columns"
            :key="column.id"
            class="capitalize"
            :checked="column.getIsVisible()"
            @update:checked="(value) => column.toggleVisibility(!!value)"
        >
          {{ column.id }}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
