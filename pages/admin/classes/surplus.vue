<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { Class } from '~/schema'
import { classSchema } from '~/schema'
import { createColumns } from '~/composables/columns'
import { checkPermissions } from '~/utils/checkPermissions'
import { Button } from '~/components/ui/button'

const title = 'Học sinh chưa được xếp lớp'
const description = 'Học sinh chưa được xếp lớp'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: '',
  twitterImage: '',
  twitterCard: 'summary_large_image'
})

const { $authStore, $classStore } = useNuxtApp()

const adminPermissions = checkPermissions($authStore.user.permissions, ['admin.create'])

onMounted(async () => {
  await fetchData()
})

const columns = createColumns(
  [
    ['name', 'Tên'],
    ['email', 'Email'],
    ['username', 'Username']
  ],
  classSchema,
  [],
  'null',
  'null'
) as ColumnDef<Class>[]

async function fetchData() {
  await Promise.all([
    $classStore.fetchSurplusStudents()
  ])
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h2 class="text-4xl font-bold tracking-tight">Học sinh chưa xếp lớp</h2>

      <NuxtLink to="/admin/classes">
        <Button variant="outline" v-if="adminPermissions" class="flex items-center gap-2">
          Quay lại
        </Button>
      </NuxtLink>
    </div>

    <LayoutTable :data="$classStore.surplusStudents" :columns="columns" :filters="[]" />
  </div>
</template>
