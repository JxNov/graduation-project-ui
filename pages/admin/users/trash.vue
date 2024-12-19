<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { User } from '~/schema'
import { userSchema } from '~/schema'
import { createColumns } from '~/composables/columns'
import { UserDialogRestore } from '~/components/common/dialog/user'
import { extractValue } from '~/utils/extractValue'
import { checkPermissions } from '~/utils/checkPermissions'
import { Button } from '~/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import type { TableFilter } from '~/types/table'

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

const { $authStore, $userStore, $bus } = useNuxtApp()

const isRestoring = ref<boolean>(false)
const selectedValue = ref<User | object>({})

onMounted(async () => {
  $bus.on('close-dialog-restore', (value: boolean) => {
    isRestoring.value = value
    selectedValue.value = {}
  })

  $bus.on('delete-rows', (values: User[]) => {
    const username = values.map((value) => value.username)
    console.log(username)
  })

  await fetchData()
})

onBeforeUnmount(() => {
  $bus.off('close-dialog-restore')
  $bus.off('delete-rows')
})

const columns = createColumns(
  [
    ['email', 'Email'],
    ['gender', 'Giới tính']
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
) as ColumnDef<User>[]

const valueGender = extractValue($userStore.users, 'gender')

const filters: TableFilter[] = [
  {
    name: 'gender',
    label: 'Giới tính',
    values: valueGender
  }
]

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
    $userStore.trashUser()
  ])
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h2 class="text-4xl font-bold tracking-tight">Thùng rác người dùng</h2>

      <div class="flex justify-between items-center gap-4">
        <NuxtLink to="/admin/users">
          <Button variant="outline" v-if="shouldShowElement">
            Quay lại
          </Button>
        </NuxtLink>
      </div>
    </div>

    <LayoutTable
      :data="$userStore.trashUsers"
      :columns="columns"
      :filters="filters"
    />
  </div>

  <Dialog :open="isRestoring" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">
      <UserDialogRestore :data="selectedValue" />
    </DialogContent>
  </Dialog>
</template>
