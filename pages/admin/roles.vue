<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { Role } from '~/schema'
import { roleSchema } from '~/schema'
import type { TableFilter } from '~/types/table'
import { createColumns } from '~/composables/columns'
import { checkPermissions } from '~/utils/checkPermissions'
import { extractValue } from '~/utils/extractValue'
import { RoleDialogCreateEdit, RoleDialogDelete } from '~/components/common/dialog/role'
import { Badge } from '~/components/ui/badge'

const { $authStore, $roleStore, $bus } = useNuxtApp()

const isCreating = ref<boolean>(false)
const isEditing = ref<boolean>(false)
const isDeleting = ref<boolean>(false)
const selectedValue = ref<Role | object>({})

onMounted(async () => {
  $bus.on('open-dialog-edit', (row: Role) => {
    isEditing.value = true
    selectedValue.value = row
  })

  $bus.on('open-dialog-delete', (row: Role) => {
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

  $bus.on('delete-rows', (values: Role[]) => {
    const slugs = values.map((value) => value.slug)
    console.log(slugs)
    // isDeleting.value = true
  })

  await fetchData()
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
    ['name', 'Vai trò'],
    ['actions', '', '', {
      enableSorting: false,
      enableHiding: false
    }]
  ],
  roleSchema,
  [
    {
      accessorKey: 'permissions',
      title: 'Quyền',
      render: (row) => h('div', { class: 'truncate w-80' },
        row.original.permissions.map((permission: any) => h(Badge, {
          variant: 'outline',
          class: 'mr-1'
        }, () => permission))
      ),
      options: {
        enableSorting: false
      },
      before: 'actions'
    }
  ],
  'admin.update',
  'admin.delete'
) as ColumnDef<Role>[]

const valuePermissions = extractValue($roleStore.roles, 'permissions')

const filters: TableFilter[] = [
  {
    name: 'permissions',
    label: 'Quyền',
    values: valuePermissions
  }
]

watch(() => $roleStore.roles, (newValue) => {
  for (const filter of filters) {
    if (filter.name === 'permissions') {
      filter.values = extractValue(newValue, 'permissions')
    }
  }
})

const handleInteractOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (target?.closest('[data-sonner-toaster]')) return event.preventDefault()
}

const shouldShowElement = computed(() => {
  return checkPermissions($authStore.user.permissions, ['admin.create'])
})

const handleCloseDialog = () => {
  isCreating.value = false
  isEditing.value = false
  isDeleting.value = false
  selectedValue.value = {}
}

async function fetchData() {
  const promises = []

  if (!$roleStore.modules.length) {
    promises.push($roleStore.fetchModules())
  }

  if (!$roleStore.roles.length) {
    promises.push($roleStore.fetchRoles())
  }

  await Promise.all(promises)
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h2 class="text-4xl font-bold tracking-tight">Quản lý vai trò</h2>

      <Button variant="default" @click="isCreating = true" v-if="shouldShowElement">
        Tạo mới vai trò
      </Button>
    </div>

    <LayoutTable
      :data="$roleStore.roles"
      :columns="columns"
      :filters="filters"
    />
  </div>

  <Dialog :open="isCreating" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[550px]" @interact-outside="handleInteractOutside">
      <RoleDialogCreateEdit />
    </DialogContent>
  </Dialog>

  <Dialog :open="isEditing" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[550px]" @interact-outside="handleInteractOutside">
      <RoleDialogCreateEdit :data="selectedValue" edit />
    </DialogContent>
  </Dialog>

  <Dialog :open="isDeleting" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">
      <RoleDialogDelete :data="selectedValue" />
    </DialogContent>
  </Dialog>
</template>