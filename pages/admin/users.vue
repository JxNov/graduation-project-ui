<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { User } from '~/schema'
import { userSchema } from '~/schema'
import type { TableFilter } from '~/types/table'
import { createColumns } from '~/composables/columns'
import { checkPermissions } from '~/utils/checkPermissions'
import { extractValue } from '~/utils/extractValue'
import { Badge } from '~/components/ui/badge'
import { UserDialogAssign, UserDialogCreateEdit, UserDialogRestorePassword } from '~/components/common/dialog/user'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'

const { $authStore, $userStore, $roleStore, $bus } = useNuxtApp()

const isAssigning = ref<boolean>(false)
const isCreating = ref<boolean>(false)
const isEditing = ref<boolean>(false)
const isDeleting = ref<boolean>(false)
const isRestoring = ref<boolean>(false)
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

  $bus.on('close-dialog-restore', (value: boolean) => {
    isRestoring.value = value
  })

  $bus.on('delete-rows', (values: User[]) => {
    console.log(values)
  })

  await fetchData()
})

onBeforeUnmount(() => {
  $bus.off('open-dialog-edit')
  $bus.off('open-dialog-delete')
  $bus.off('close-dialog-assign')
  $bus.off('close-dialog-create-edit')
  $bus.off('close-dialog-delete')
  $bus.off('close-dialog-restore')
  $bus.off('delete-rows')
})

const columns = createColumns(
  [
    ['select'],
    ['email', 'Email'],
    ['gender', 'Giới tính'],
    ['actions', '', '', {
      enableSorting: false,
      enableHiding: false
    }]
  ],
  userSchema,
  [
    {
      accessorKey: 'name',
      title: 'Tên',
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
                    h('span', {}, row.getValue('name').split(' ').map((name: string) => name[0]).join(''))
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
      title: 'Vai trò',
      render: (row) => h('div', { class: 'truncate w-80' },
        row.original.roles?.map((role: any) => h(Badge, {
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
  'admin.update',
  'admin.delete'
) as ColumnDef<User>[]

const valueGender = extractValue($userStore.users, 'gender')
const valueRoles = extractValue($userStore.users, 'roles')

const filters: TableFilter[] = [
  {
    name: 'gender',
    label: 'Giới tính',
    values: valueGender
  },
  {
    name: 'roles',
    label: 'Vai trò',
    values: valueRoles
  }
]

const handleInteractOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (target?.closest('[data-sonner-toaster]')) return event.preventDefault()
}

const handleCloseDialog = () => {
  isAssigning.value = false
  isCreating.value = false
  isEditing.value = false
  isDeleting.value = false
  isRestoring.value = false
  selectedValue.value = {}
}

const shouldShowElement = computed(() => {
  return checkPermissions($authStore.user.permissions, ['admin.create'])
})

async function fetchData() {
  const promises = []

  if (!$userStore.users.length) {
    promises.push($userStore.fetchUsers())
  }

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
      <h2 class="text-4xl font-bold tracking-tight">Quản lý người dùng</h2>

      <div class="flex gap-4">
        <Button variant="outline" @click="isRestoring = true" v-if="shouldShowElement">
          Khôi phục mật khẩu người dùng
        </Button>

        <Button variant="outline" @click="isAssigning = true" v-if="shouldShowElement">
          Gán vai trò cho người dùng
        </Button>

        <Button @click="isCreating = true" v-if="shouldShowElement">
          Tạo mới người dùng
        </Button>
      </div>
    </div>

    <LayoutTable
      :data="$userStore.users"
      :columns="columns"
      :filters="filters"
    />
  </div>

  <Dialog :open="isAssigning" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[550px]" @interact-outside="handleInteractOutside">
      <UserDialogAssign @click="$bus.emit('close-tags-combobox', false)" />
    </DialogContent>
  </Dialog>

  <Dialog :open="isCreating" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[550px]" @interact-outside="handleInteractOutside">
      <UserDialogCreateEdit />
    </DialogContent>
  </Dialog>

  <Dialog :open="isRestoring" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[450px]" @interact-outside="handleInteractOutside">
      <UserDialogRestorePassword />
    </DialogContent>
  </Dialog>

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
