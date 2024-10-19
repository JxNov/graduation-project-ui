<script setup lang="ts">
import DataTable from '~/components/custom/table/DataTable.vue';
import type {TableFilter} from "~/types/table";

defineProps<{
  data: any[]
  columns: any[]
  filters: TableFilter[]
  reloadData: () => void
}>();
</script>

<template>
  <DataTable :data="data" :columns="columns" :filters="filters" :reload-data="reloadData"/>
</template>
