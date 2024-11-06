<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import { MixerHorizontalIcon, ReloadIcon, TrashIcon } from '@radix-icons/vue'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'

interface DataTableViewOptionsProps {
  table: Table<any>
  reloadData: () => void
}

const { $bus } = useNuxtApp()
const props = defineProps<DataTableViewOptionsProps>()

const columns = computed(() => props.table.getAllColumns()
  .filter(
    column =>
      typeof column.accessorFn !== 'undefined' && column.getCanHide()
  ))

const rows = computed(() => props.table.getRowModel().rows)

const selectedRows = computed(() => rows.value.filter(row => row.getIsSelected()).length)

const handleDelete = () => {
  const selected = rows.value.filter(row => row.getIsSelected())
  const values = selected.map(row => row.original)
  $bus.emit('delete-rows', values)
}
</script>

<template>
  <div class="flex flex-1 items-center space-x-2">
    <Button
      variant="outline"
      size="sm"
      class="ml-auto hidden h-8 lg:flex"
      v-if="selectedRows > 0"
      @click="handleDelete"
    >
      <TrashIcon class="mr-2 h-4 w-4" />
      Delete ({{ selectedRows }})
    </Button>

    <Button
      variant="outline"
      size="sm"
      class="ml-auto hidden h-8 lg:flex"
      @click="props.reloadData"
    >
      <ReloadIcon class="mr-2 h-4 w-4" />
      Reload data
    </Button>

    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          variant="outline"
          size="sm"
          class="ml-auto hidden h-8 lg:flex"
          id="dropdown-menu-trigger-view-options"
        >
          <MixerHorizontalIcon class="mr-2 h-4 w-4" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" class="w-[150px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />

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
