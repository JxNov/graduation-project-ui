<script setup lang="ts">
import DataTable from '~/components/table/DataTable.vue'
import type { TableFilter } from '~/types/table'

defineProps<{
  data: any[]
  columns: any[]
  filters: TableFilter[]
}>()
</script>

<template>
  <DataTable :data="data" :columns="columns" :filters="filters" />
</template>
