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
}

const { $bus } = useNuxtApp()
const useIdFunction = () => useId()
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
<!--    <Button-->
<!--      variant="outline"-->
<!--      size="sm"-->
<!--      class="ml-auto hidden h-8 lg:flex"-->
<!--      v-if="selectedRows > 0"-->
<!--      @click="handleDelete"-->
<!--      :id="useIdFunction"-->
<!--    >-->
<!--      <TrashIcon class="mr-2 h-4 w-4" />-->
<!--      Delete ({{ selectedRows }})-->
<!--    </Button>-->

    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          variant="outline"
          size="sm"
          class="ml-auto hidden h-8 lg:flex"
          :id="useIdFunction"
        >
          <MixerHorizontalIcon class="mr-2 h-4 w-4" />
          Xem
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Chuyển đổi cột</DropdownMenuLabel>
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
