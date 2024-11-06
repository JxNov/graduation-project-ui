<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { Block } from '~/schema'
import { blockSchema } from '~/schema'
import { createColumns } from '~/composables/columns'
import { BlockDialogCreateEdit, BlockDialogDelete } from '~/components/common/dialog/block'
import { useThrottle } from '~/composables/useThrottle'
import { showElement } from '~/utils/showElement'

const { $authStore, $blockStore, $bus } = useNuxtApp()

const isCreating = ref<boolean>(false)
const isEditing = ref<boolean>(false)
const isDeleting = ref<boolean>(false)
const selectedValue = ref<Block | object>({})

onMounted(async () => {
  $bus.on('open-dialog-edit', (row: Block) => {
    isEditing.value = true
    selectedValue.value = row
  })

  $bus.on('open-dialog-delete', (row: Block) => {
    isDeleting.value = true
    selectedValue.value = row
  })

  $bus.on('close-dialog-create-edit', (value: boolean) => {
    isCreating.value = value
    isEditing.value = value
    selectedValue.value = {}
  })

  $bus.on('close-dialog-delete', (value: boolean) => {
    isDeleting.value = value
    selectedValue.value = {}
  })

  $bus.on('delete-rows', (values: Block[]) => {
    const slugs = values.map((value) => value.slug)
    console.log(slugs)
  })

  if (!$blockStore.blocks.length) {
    await $blockStore.fetchBlocks()
  }
})

onBeforeUnmount(() => {
  $bus.off('open-dialog-edit')
  $bus.off('open-dialog-delete')
  $bus.off('close-dialog-create-edit')
  $bus.off('close-dialog-delete')
  $bus.off('delete-rows')
})

const columns = createColumns(
  [
    ['select'],
    ['name', 'Block'],
    ['level', 'Level'],
    ['actions', '', '', {
      enableSorting: false,
      enableHiding: false
    }]
  ],
  blockSchema,
  [],
  'users.update',
  'users.delete'
) as ColumnDef<Block>[]

const reloadData = useThrottle(() => {
  $blockStore.reloadData()
}, 60000, 'academic-year')

const handleInteractOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (target?.closest('[data-sonner-toaster]')) return event.preventDefault()
}

const shouldShowElement = computed(() => {
  return showElement($authStore.user.permissions, ['users.create'])
})

const handleCloseDialog = () => {
  isCreating.value = false
  isEditing.value = false
  isDeleting.value = false
  selectedValue.value = {}
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h2 class="text-4xl font-bold tracking-tight">Manage blocks</h2>
      <Button variant="default" @click="isCreating = true" v-if="shouldShowElement">
        Create new block
      </Button>
    </div>

    <LayoutTable
      :data="$blockStore.blocks"
      :columns="columns"
      :filters="[]"
      :reload-data="reloadData"
    />
  </div>

  <Dialog :open="isCreating" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">
      <BlockDialogCreateEdit />
    </DialogContent>
  </Dialog>

  <Dialog :open="isEditing" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">
      <BlockDialogCreateEdit :data="selectedValue" edit />
    </DialogContent>
  </Dialog>

  <Dialog :open="isDeleting" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">
      <BlockDialogDelete :data="selectedValue" />
    </DialogContent>
  </Dialog>
</template>
