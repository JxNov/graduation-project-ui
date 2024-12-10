<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { Teacher } from '~/schema'
import { teacherSchema } from '~/schema'
import type { TableFilter } from '~/types/table'
import { createColumns } from '~/composables/columns'
import { checkPermissions } from '~/utils/checkPermissions'
import { extractValue } from '~/utils/extractValue'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { TeacherDialogImport } from '~/components/common/dialog/teacher'
import { toast } from 'vue-sonner'

const { $authStore, $teacherStore, $bus } = useNuxtApp()

const isLoaded = ref<boolean>(false)
const isImporting = ref<boolean>(false)
const isCreating = ref<boolean>(false)
const isEditing = ref<boolean>(false)
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

  $bus.on('close-dialog-delete', (value: boolean) => {
    isDeleting.value = value
    selectedValue.value = {}
  })

  $bus.on('delete-rows', (values: Teacher[]) => {
    console.log(values)
  })

  if (!$teacherStore.teachers.length) {
    await $teacherStore.fetchTeachers()
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
    // ['name', 'Name'],
    ['email', 'Email'],
    ['gender', 'Gender'],
    ['actions', '', '', {
      enableSorting: false,
      enableHiding: false
    }]
  ],
  teacherSchema,
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
    }
  ],
  'teachers.update',
  'teachers.delete'
) as ColumnDef<Teacher>[]

const valueGender = extractValue($teacherStore.teachers, 'gender')

const filters: TableFilter[] = [
  {
    name: 'gender',
    label: 'Gender',
    values: valueGender
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
  isDeleting.value = false
  selectedValue.value = {}
}

const shouldShowElement = computed(() => {
  return checkPermissions($authStore.user.permissions, ['teacher.create'])
})

const downloadSampleTeachers = async () => {
  isLoaded.value = true

  try {
    const response = await $teacherStore.exportSampleTeachers()

    if (!response) {
      throw new Error('Export failed')
    }

    const url = URL.createObjectURL(new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }))
    const a = document.createElement('a')
    a.href = url
    a.download = 'sample_teachers.xlsx'

    document.body.appendChild(a)
    a.click()
    URL.revokeObjectURL(url)
    document.body.removeChild(a)

    toast.success('Download success!!!')

    isLoaded.value = false
  } catch (error) {
    toast.error('Download failed!!!')
    isLoaded.value = false
  }
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h2 class="text-4xl font-bold tracking-tight">Manage Teachers</h2>

      <div class="flex gap-4">
        <Button variant="outline" @click="downloadSampleTeachers" v-if="shouldShowElement" :disabled="isLoaded">
          Download Sample Teachers
        </Button>

        <Button variant="default" @click="isImporting = true" v-if="shouldShowElement">
          Import Teachers
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

  <!--  <Dialog :open="isEditing" @update:open="handleCloseDialog">-->
  <!--    <DialogContent class="sm:max-w-[550px]" @interact-outside="handleInteractOutside">-->
  <!--      <TeacherDialogCreateEdit :data="selectedValue" edit/>-->
  <!--    </DialogContent>-->
  <!--  </Dialog>-->

  <!--  <Dialog :open="isDeleting" @update:open="handleCloseDialog">-->
  <!--    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">-->
  <!--      <TeacherDialogDelete :data="selectedValue"/>-->
  <!--    </DialogContent>-->
  <!--  </Dialog>-->
</template>
