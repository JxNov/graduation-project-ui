<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { Role } from '~/schema'
import type { TableFilter } from '~/types/table'
import { roleSchema } from '~/schema'
import { useThrottle } from '~/composables/useThrottle'
import { createColumns } from '~/components/custom/table/columns'
import { showElement } from '~/utils/showElement'
import { extractValue } from '~/utils/extractValue'
import { RoleDialogCreateEdit, RoleDialogDelete } from '~/components/custom/dialog/role'
import { toast } from 'vue-sonner'
import { Badge } from '~/components/ui/badge'

const { $generalStore, $roleStore, $bus } = useNuxtApp()

onMounted(async () => {
  if (!$roleStore.modules.length) {
    await $roleStore.fetchModules()
  }

  if (!$roleStore.roles.length) {
    await $roleStore.fetchRoles()
  }

  if (!$roleStore.permissions.length) {
    await $roleStore.fetchPermissions()
  }
})

const isCreating = ref<boolean>(false)
const isEditing = ref(false)
const isDeleting = ref(false)
const selectedRole = ref<Role | object>({})

$bus.on('open-dialog-edit-role', (row: Role) => {
  isEditing.value = true
  selectedRole.value = row
})

$bus.on('open-dialog-delete-role', (row: Role) => {
  isDeleting.value = true
  selectedRole.value = row
})

$bus.on('close-dialog-create-edit-role', (value: boolean) => {
  isCreating.value = value
  isEditing.value = value
  selectedRole.value = {}
})

$bus.on('close-dialog-delete-role', (value: boolean) => {
  isDeleting.value = value
  selectedRole.value = {}
})

$bus.on('delete-rows-role', (value: Role[]) => {
  console.log(value)
})

const columns = createColumns(
  [
    ['select'],
    ['name', 'Role'],
    ['actions', '', '', {
      enableSorting: false,
      enableHiding: false
    }]
  ],
  roleSchema,
  [
    {
      accessorKey: 'permissions',
      title: 'Permissions',
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
  'open-dialog-edit-role',
  'open-dialog-delete-role',
  'users.update',
  'users.delete'
) as ColumnDef<Role>[]

const valueRoles = extractValue($roleStore.roles, 'name')
const valuePermissions = extractValue($roleStore.roles, 'permissions')

const filters: TableFilter[] = [
  {
    name: 'name',
    label: 'Role',
    values: valueRoles
  },
  {
    name: 'permissions',
    label: 'Permissions',
    values: valuePermissions
  }
]

watch(() => $roleStore.roles, (newValue) => {
  const valueRoles = extractValue(newValue, 'name')
  const valuePermissions = extractValue(newValue, 'permissions')

  filters[0].values = valueRoles
  filters[1].values = valuePermissions
})

const reloadData = useThrottle(() => {
  const promise = () => $roleStore.reloadData()

  return toast.promise(promise, {
    loading: 'Reloading data...',
    success: 'Data reloaded successfully',
    error: 'Data reloaded failed'
  })
}, 60000, 'role')

const handleInteractOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (target?.closest('[data-sonner-toaster]')) return event.preventDefault()
}

const shouldShowElement = computed(() => {
  return showElement($generalStore.userPermissions, ['users.create'])
})

const handleCloseDialog = () => {
  isCreating.value = false
  isEditing.value = false
  isDeleting.value = false
  selectedRole.value = {}
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h2 class="text-4xl font-bold tracking-tight">Manage Roles</h2>
      <Button variant="default" @click="isCreating = true" v-if="shouldShowElement">
        Create new role
      </Button>
    </div>

    <LayoutTable
      :data="$roleStore.roles"
      :columns="columns"
      :filters="filters"
      :reload-data="reloadData"
      emit-delete-rows="delete-rows-role"
    />
  </div>

  <Dialog :open="isCreating" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[550px]" @interact-outside="handleInteractOutside">
      <RoleDialogCreateEdit />
    </DialogContent>
  </Dialog>

  <Dialog :open="isEditing" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[550px]" @interact-outside="handleInteractOutside">
      <RoleDialogCreateEdit :data="selectedRole" edit />
    </DialogContent>
  </Dialog>

  <Dialog :open="isDeleting" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">
      <RoleDialogDelete :data="selectedRole" />
    </DialogContent>
  </Dialog>
</template>