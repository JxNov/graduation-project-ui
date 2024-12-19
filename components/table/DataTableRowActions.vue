<script setup lang="ts">
import { DotsHorizontalIcon } from '@radix-icons/vue'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'
import type { Row } from '@tanstack/vue-table'
import { ConfigProvider } from 'radix-vue'

const { $bus } = useNuxtApp()
const useIdFunction = () => useId()

interface DialogEditAuthorityProps {
  row: Row<any>,
  schema: any,
  permissionEdit: boolean,
  permissionDelete: boolean,
}

const props = defineProps<DialogEditAuthorityProps>()
// const data = computed(() => props.schema.parse(props.row.original))
const data = ref<any>(props.row.original)

const handleEdit = () => {
  $bus.emit('open-dialog-edit', data.value)
}

const handleDelete = () => {
  $bus.emit('open-dialog-delete', data.value)
}
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <DropdownMenu v-if="permissionEdit || permissionDelete">
      <DropdownMenuTrigger as-child>
        <Button
          variant="ghost"
          class="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon class="h-4 w-4" />
          <span class="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" class="w-[160px]">
        <DropdownMenuItem @click="handleEdit" v-if="permissionEdit">
          Sửa
        </DropdownMenuItem>
        <DropdownMenuSeparator v-if="permissionEdit && permissionDelete" />

        <DropdownMenuItem @click="handleDelete" v-if="permissionDelete">
          Xóa
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </ConfigProvider>
</template>
