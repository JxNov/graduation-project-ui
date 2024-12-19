<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { Teacher } from '~/schema'
import { teacherSchema } from '~/schema'
import type { TableFilter } from '~/types/table'
import { createColumns } from '~/composables/columns'
import { checkPermissions } from '~/utils/checkPermissions'
import { extractValue } from '~/utils/extractValue'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { TeacherDialogImport, TeacherDialogAssign } from '~/components/common/dialog/teacher'
import { UserDialogCreateEdit, UserDialogDelete } from '~/components/common/dialog/user'
import { toast } from 'vue-sonner'
import { Badge } from '~/components/ui/badge'
import { Trash2 } from 'lucide-vue-next'

const { $authStore, $teacherStore, $subjectStore, $bus } = useNuxtApp()

const isLoaded = ref<boolean>(false)
const isImporting = ref<boolean>(false)
const isCreating = ref<boolean>(false)
const isEditing = ref<boolean>(false)
const isAssigning = ref<boolean>(false)
const isDeleting = ref<boolean>(false)
const selectedValue = ref<Teacher | object>({})

onMounted(async () => {
  $bus.on('open-dialog-edit', (row: Teacher) => {
    isEditing.value = true
    selectedValue.value = row
  })

  $bus.on('open-dialog-delete', (row: Teacher) => {
    isDeleting.value = true
    selectedValue.value = row
  })

  $bus.on('close-dialog-import', (value: boolean) => {
    isImporting.value = value
  })

  $bus.on('close-dialog-create-edit', (value: boolean) => {
    isCreating.value = value
    isEditing.value = value
    selectedValue.value = {}
  })

  $bus.on('close-dialog-assign', (value: boolean) => {
    isAssigning.value = value
  })

  $bus.on('close-dialog-delete', (value: boolean) => {
    isDeleting.value = value
    selectedValue.value = {}
  })

  $bus.on('delete-rows', (values: Teacher[]) => {
    console.log(values)
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
    ['email', 'Email'],
    ['gender', 'Giới tính'],
    ['actions', '', '', {
      enableSorting: false,
      enableHiding: false
    }]
  ],
  teacherSchema,
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
      accessorKey: 'subjects',
      title: 'Môn học',
      render: (row) => h('div', { class: 'truncate' },
        row.original.subjects?.map((permission: any) => h(Badge, {
          variant: 'outline',
          class: 'mr-1'
        }, () => permission))
      ),
      before: 'actions'
    }
  ],
  'admin.update',
  'admin.delete'
) as ColumnDef<Teacher>[]

const valueGender = extractValue($teacherStore.teachers, 'gender')
const valueSubjects = extractValue($teacherStore.teachers, 'subjects')

const filters: TableFilter[] = [
  {
    name: 'gender',
    label: 'Giới tính',
    values: valueGender
  },
  {
    name: 'subjects',
    label: 'Môn học',
    values: valueSubjects
  }
]

const handleInteractOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (target?.closest('[data-sonner-toaster]')) return event.preventDefault()
}

const handleCloseDialog = () => {
  isImporting.value = false
  isCreating.value = false
  isEditing.value = false
  isAssigning.value = false
  isDeleting.value = false
  selectedValue.value = {}
}

const shouldShowElement = computed(() => {
  return checkPermissions($authStore.user.permissions, ['admin.create'])
})

const downloadSampleTeachers = async () => {
  isLoaded.value = true

  try {
    const response = await $teacherStore.exportSampleTeachers()

    if (!response) {
      throw new Error('Tải file thất bại')
    }

    const url = URL.createObjectURL(new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }))
    const a = document.createElement('a')
    a.href = url
    a.download = 'sample_teachers.xlsx'

    document.body.appendChild(a)
    a.click()
    URL.revokeObjectURL(url)
    document.body.removeChild(a)

    toast.success('Tải file thành công!!!')

    isLoaded.value = false
  } catch (error) {
    toast.error('Tải file thất bại!!!')
    isLoaded.value = false
  }
}

async function fetchData() {
  await Promise.all([
    $teacherStore.fetchTeachers(),
    $subjectStore.fetchSubjects()
  ])
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h2 class="text-4xl font-bold tracking-tight">Quản lý giáo viên</h2>

      <div class="flex gap-4">
        <NuxtLink to="/admin/users/trash">
          <Button variant="outline" v-if="shouldShowElement" class="flex items-center gap-2">
            <Trash2 class="w-5 h-5" />
            Thùng rác
          </Button>
        </NuxtLink>

        <Button variant="outline" @click="downloadSampleTeachers" v-if="shouldShowElement" :disabled="isLoaded">
          Tải file mẫu giáo viên
        </Button>

        <Button variant="default" @click="isImporting = true" v-if="shouldShowElement">
          Nhập giáo viên
        </Button>

        <Button @click="isAssigning = true" v-if="shouldShowElement">
          Phân môn học cho giáo viên
        </Button>
      </div>
    </div>

    <LayoutTable
      :data="$teacherStore.teachers"
      :columns="columns"
      :filters="filters"
    />
  </div>

  <Dialog :open="isImporting" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[450px]" @interact-outside="handleInteractOutside">
      <TeacherDialogImport />
    </DialogContent>
  </Dialog>

  <Dialog :open="isAssigning" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[450px]" @interact-outside="handleInteractOutside">
      <TeacherDialogAssign @click="$bus.emit('close-tags-combobox', false)" />
    </DialogContent>
  </Dialog>

  <Dialog :open="isEditing" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[550px]" @interact-outside="handleInteractOutside">
      <UserDialogCreateEdit :data="selectedValue" edit />
    </DialogContent>
  </Dialog>

  <Dialog :open="isDeleting" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">
      <UserDialogDelete :data="selectedValue" />
    </DialogContent>
  </Dialog>
</template>
