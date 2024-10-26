<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { User } from '~/schema'
import { userSchema } from '~/schema'
import type { TableFilter } from '~/types/table'
import { createColumns } from '~/components/custom/table/columns'
import { useThrottle } from '~/composables/useThrottle'
import { showElement } from '~/utils/showElement'
import { extractValue } from '~/utils/extractValue'
import { toast } from 'vue-sonner'
import { Badge } from '~/components/ui/badge'

const { $generalStore, $userStore, $bus } = useNuxtApp()

$userStore.fetchUsers()

onMounted(async () => {
})

const isCreating = ref<boolean>(false)
const isEditing = ref(false)
const isDeleting = ref(false)
const selectedUser = ref<User | object>({})

$bus.on('open-dialog-edit-user', (row: User) => {
  isEditing.value = true
  selectedUser.value = row
})

$bus.on('open-dialog-delete-user', (row: User) => {
  isDeleting.value = true
  selectedUser.value = row
})

$bus.on('close-dialog-create-edit-user', (value: boolean) => {
  isCreating.value = value
  isEditing.value = value
  selectedUser.value = {}
})

$bus.on('close-dialog-delete-user', (value: boolean) => {
  isDeleting.value = value
  selectedUser.value = {}
})

$bus.on('delete-rows-user', (value: User[]) => {
  console.log(value)
})

const columns = createColumns(
  [
    ['select'],
    ['name', 'Name'],
    ['email', 'Email'],
    ['gender', 'Gender'],
    ['actions', '', '', {
      enableSorting: false,
      enableHiding: false
    }]
  ],
  userSchema,
  [
    {
      accessorKey: 'roles',
      title: 'Roles',
      render: (row) => h('div', { class: 'truncate w-80' },
        row.original.roles.map((role: any) => h(Badge, {
          variant: 'outline',
          class: 'mr-1'
        }, () => role))
      ),
      options: {
        enableSorting: false
      },
      before: 'actions'
    }
  ],
  'open-dialog-edit-user',
  'open-dialog-delete-user',
  'users.update',
  'users.delete'
) as ColumnDef<User>[]

const valueGender = extractValue($userStore.users, 'gender')
const valueRoles = extractValue($userStore.users, 'roles')

const filters: TableFilter[] = [
  {
    name: 'gender',
    label: 'Gender',
    values: valueGender
  },
  {
    name: 'roles',
    label: 'Role',
    values: valueRoles
  }
]

const reloadData = useThrottle(() => {
  // const promise = () => $roleStore.reloadData();
  const promise = () => Promise.resolve()

  return toast.promise(promise, {
    loading: 'Reloading data...',
    success: 'Data reloaded successfully',
    error: 'Data reloaded failed'
  })
}, 60000, 'user')

const handleInteractOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (target?.closest('[data-sonner-toaster]')) return event.preventDefault()
}

const handleCloseDialog = () => {
  isCreating.value = false
  isEditing.value = false
  isDeleting.value = false
  selectedUser.value = {}
}

const shouldShowElement = computed(() => {
  return showElement($generalStore.userPermissions, ['users.create'])
})
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h2 class="text-4xl font-bold tracking-tight">Manage Users</h2>
      <Button variant="default" @click="isCreating = true" v-if="shouldShowElement">
        Import Users
      </Button>
    </div>

    <LayoutTable
      :data="$userStore.users"
      :columns="columns"
      :filters="filters"
      :reload-data="reloadData"
      emit-delete-rows="delete-rows-user"
    />
  </div>

  <!--  <Dialog :open="isCreating" @update:open="handleCloseDialog">-->
  <!--    <DialogContent class="sm:max-w-[550px]" @interact-outside="handleInteractOutside">-->
  <!--      <UserDialogCreateEdit/>-->
  <!--    </DialogContent>-->
  <!--  </Dialog>-->

  <!--  <Dialog :open="isEditing" @update:open="handleCloseDialog">-->
  <!--    <DialogContent class="sm:max-w-[550px]" @interact-outside="handleInteractOutside">-->
  <!--      <UserDialogCreateEdit :data="selectedUser" edit/>-->
  <!--    </DialogContent>-->
  <!--  </Dialog>-->

  <!--  <Dialog :open="isDeleting" @update:open="handleCloseDialog">-->
  <!--    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">-->
  <!--      <UserDialogDelete :data="selectedUser"/>-->
  <!--    </DialogContent>-->
  <!--  </Dialog>-->
</template>
