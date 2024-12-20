<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { Class } from '~/schema'
import { classSchema } from '~/schema'
import { createColumns } from '~/composables/columns'
import { checkPermissions } from '~/utils/checkPermissions'
import { Button } from '~/components/ui/button'

const title = 'Học sinh lưu ban'
const description = 'Học sinh lưu ban'

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
    ['studentName', 'Tên'],
    ['username', 'Username'],
    ['className', 'Lớp'],
    ['info', 'Điểm']
  ],
  classSchema,
  [],
  'null',
  'null'
) as ColumnDef<Class>[]

async function fetchData() {
  await Promise.all([
    $classStore.fetchRepeatStudents()
  ])
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h2 class="text-4xl font-bold tracking-tight">Học sinh lưu ban</h2>

      <NuxtLink to="/admin/classes">
        <Button variant="outline" v-if="adminPermissions" class="flex items-center gap-2">
          Quay lại
        </Button>
      </NuxtLink>
    </div>

    <LayoutTable :data="$classStore.repeatStudents" :columns="columns" :filters="[]" />
  </div>
</template>
