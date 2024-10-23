<script setup lang="ts">
import type {Table} from '@tanstack/vue-table'
import DataTableFacetedFilter from './DataTableFacetedFilter.vue'
import DataTableViewOptions from './DataTableViewOptions.vue'
import {Cross2Icon} from '@radix-icons/vue'
import {Button} from '~/components/ui/button'
import {Input} from '~/components/ui/input'
import type {TableFilter} from "~/types/table";
import {refDebounced} from "@vueuse/core";

interface DataTableToolbarProps {
  table: Table<any>,
  filters: TableFilter[]
  reloadData: () => void
}

const {$bus} = useNuxtApp();

const props = defineProps<DataTableToolbarProps>()

const isFiltered = computed(() => props.table.getState().columnFilters.length > 0)

const searchValue = ref<string>('')
const debouncedSearch = refDebounced(searchValue, 250)

watch(debouncedSearch, (value) => {
  props.table.setGlobalFilter(value.trim())
});

const handleReset = () => {
  props.table.resetColumnFilters();
  searchValue.value = '';
  $bus.emit('reset-filters');
};
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 items-center space-x-2">
      <Input
          placeholder="Filter..."
          v-model="searchValue"
          class="h-8 w-[150px] lg:w-[250px]"
      />

      <DataTableFacetedFilter
          v-for="filter in filters"
          :key="filter.name"
          :column="table.getColumn(filter.name)"
          :title="filter.label"
          :options="filter.values"
      />

      <Button
          v-if="isFiltered || searchValue"
          variant="ghost"
          class="h-8 px-2 lg:px-3"
          @click="handleReset"
      >
        Reset
        <Cross2Icon class="ml-2 h-4 w-4"/>
      </Button>
    </div>
    <DataTableViewOptions :table="table" :reload-data="reloadData"/>
  </div>
</template>
