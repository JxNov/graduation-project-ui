<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { Class } from '~/schema'
import { classSchema } from '~/schema'
import { createColumns } from '~/composables/columns'
import { ClassDialogRestore } from '~/components/common/dialog/class'
import { extractValue } from '~/utils/extractValue'
import { checkPermissions } from '~/utils/checkPermissions'
import { Button } from '~/components/ui/button'

const title = 'Thùng rác'
const description = 'Thùng rác'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: '',
  twitterImage: '',
  twitterCard: 'summary_large_image'
})

const { $authStore, $classStore, $bus } = useNuxtApp()

const isRestoring = ref<boolean>(false)
const selectedValue = ref<Class | object>({})

onMounted(async () => {
  $bus.on('close-dialog-restore', (value: boolean) => {
    isRestoring.value = value
    selectedValue.value = {}
  })

  $bus.on('delete-rows', (values: Class[]) => {
    const slugs = values.map((value) => value.slug)
    console.log(slugs)
  })

  await fetchData()
})

onBeforeUnmount(() => {
  $bus.off('close-dialog-restore')
  $bus.off('delete-rows')
})

const columns = createColumns(
  [
    ['name', 'Lớp học'],
    ['teacherName', 'GVCN'],
    ['numberOfStudents', 'Số lượng học sinh'],
    ['code', 'Mã lớp', '', {
      enableSorting: false
    }],
    ['actions', '', '', {
      enableSorting: false,
      enableHiding: false
    }]
  ],
  classSchema,
  [
    {
      accessorKey: 'button',
      title: '',
      render: (row) => {
        return h('div', { class: 'truncate px-2' },
          h('div', { class: 'flex items-center gap-2' }, [
            h(Button, {
              variant: 'outline',
              size: 'sm',
              onClick: () => {
                isRestoring.value = true
                selectedValue.value = row.original
              }
            }, { default: () => 'Khôi phục' })
          ])
        )
      },
      options: {
        enableSorting: false,
        enableHiding: false
      },
      before: 'actions'
    }
  ],
  'null',
  'null'
) as ColumnDef<Class>[]

const handleInteractOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (target?.closest('[data-sonner-toaster]')) return event.preventDefault()
}

const shouldShowElement = computed(() => {
  return checkPermissions($authStore.user.permissions, ['admin.create'])
})

const handleCloseDialog = () => {
  isRestoring.value = false
  selectedValue.value = {}
}

async function fetchData() {
  await Promise.all([
    $classStore.trashClass()
  ])
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h2 class="text-4xl font-bold tracking-tight">Thùng rác lớp học</h2>

      <div class="flex justify-between items-center gap-4">
        <NuxtLink to="/admin/classes">
          <Button variant="outline" v-if="shouldShowElement">
            Quay lại
          </Button>
        </NuxtLink>
      </div>
    </div>

    <LayoutTable
      :data="$classStore.trashClasses"
      :columns="columns"
      :filters="[]"
    />
  </div>

  <Dialog :open="isRestoring" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">
      <ClassDialogRestore :data="selectedValue" />
    </DialogContent>
  </Dialog>
</template>
