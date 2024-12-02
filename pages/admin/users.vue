<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { User } from '~/schema'
import { userSchema } from '~/schema'
import type { TableFilter } from '~/types/table'
import { createColumns } from '~/composables/columns'
import { useThrottle } from '~/composables/useThrottle'
import { showElement } from '~/utils/showElement'
import { extractValue } from '~/utils/extractValue'
import { Badge } from '~/components/ui/badge'
import { UserDialogAssign } from '~/components/common/dialog/user'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'

const { $authStore, $userStore, $roleStore, $bus } = useNuxtApp()

const isAssigning = ref<boolean>(false)
const isCreating = ref<boolean>(false)
const isEditing = ref<boolean>(false)
const isDeleting = ref<boolean>(false)
const selectedValue = ref<User | object>({})

onMounted(async () => {
  $bus.on('open-dialog-edit', (row: User) => {
    isEditing.value = true
    selectedValue.value = row
  })

  $bus.on('open-dialog-delete', (row: User) => {
    isDeleting.value = true
    selectedValue.value = row
  })

  $bus.on('close-dialog-assign', (value: boolean) => {
    isAssigning.value = value
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

  $bus.on('delete-rows', (values: User[]) => {
    console.log(values)
  })

  if (!$userStore.users.length) {
    await $userStore.fetchUsers()
  }

  if (!$roleStore.modules.length) {
    await $roleStore.fetchModules()
  }

  if (!$roleStore.roles.length) {
    await $roleStore.fetchRoles()
  }
})

onBeforeUnmount(() => {
  $bus.off('open-dialog-edit')
  $bus.off('open-dialog-delete')
  $bus.off('close-dialog-assign')
  $bus.off('close-dialog-create-edit')
  $bus.off('close-dialog-delete')
  $bus.off('delete-rows')
})

const columns = createColumns(
  [
    ['select'],
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
      accessorKey: 'name',
      title: 'Name',
      render: (row) => h('div', { class: 'flex items-center gap-2' }, {
        default: () => {
          return [
            h(Avatar, {}, {
              default: () => [
                h(AvatarImage, {
                  src: row.original.image || '',
                  alt: row.getValue('name')
                }),
                h(AvatarFallback, {}, {
                  default: () => [
                    h('span', {}, row.getValue('name')[0])
                  ]
                })
              ]
            }),
            h('div', {}, row.getValue('name'))
          ]
        }
      }),
      before: 'email'
    },
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
  $userStore.reloadData()
}, 60000, 'user')

const handleInteractOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (target?.closest('[data-sonner-toaster]')) return event.preventDefault()
}

const handleCloseDialog = () => {
  isAssigning.value = false
  isCreating.value = false
  isEditing.value = false
  isDeleting.value = false
  selectedValue.value = {}
}

const shouldShowElement = computed(() => {
  return showElement($authStore.user.permissions, ['users.create'])
})
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h2 class="text-4xl font-bold tracking-tight">Manage Users</h2>

      <div class="flex gap-4">
        <Button variant="default" @click="isAssigning = true" v-if="shouldShowElement">
          Assign roles to users
        </Button>
      </div>
    </div>

    <LayoutTable
      :data="$userStore.users"
      :columns="columns"
      :filters="filters"
      :reload-data="reloadData"
    />
  </div>

  <Dialog :open="isAssigning" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[550px]" @interact-outside="handleInteractOutside">
      <UserDialogAssign @click="$bus.emit('close-tags-combobox', false)" />
    </DialogContent>
  </Dialog>

  <!--  <Dialog :open="isCreating" @update:open="handleCloseDialog">-->
  <!--    <DialogContent class="sm:max-w-[550px]" @interact-outside="handleInteractOutside">-->
  <!--      <UserDialogCreateEdit/>-->
  <!--    </DialogContent>-->
  <!--  </Dialog>-->

  <!--  <Dialog :open="isEditing" @update:open="handleCloseDialog">-->
  <!--    <DialogContent class="sm:max-w-[550px]" @interact-outside="handleInteractOutside">-->
  <!--      <UserDialogCreateEdit :data="selectedValue" edit/>-->
  <!--    </DialogContent>-->
  <!--  </Dialog>-->

  <!--  <Dialog :open="isDeleting" @update:open="handleCloseDialog">-->
  <!--    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">-->
  <!--      <UserDialogDelete :data="selectedValue"/>-->
  <!--    </DialogContent>-->
  <!--  </Dialog>-->
</template>
