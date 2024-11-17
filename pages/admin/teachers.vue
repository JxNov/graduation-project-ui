<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { Teacher } from '~/schema'
import { teacherSchema } from '~/schema'
import type { TableFilter } from '~/types/table'
import { createColumns } from '~/composables/columns'
import { useThrottle } from '~/composables/useThrottle'
import { showElement } from '~/utils/showElement'
import { extractValue } from '~/utils/extractValue'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'

const { $authStore, $teacherStore, $bus } = useNuxtApp()

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
                    h('span', {}, row.getValue('name')[0])
                  ]
                })
              ]
            }),
            h('div', {}, row.getValue('name'))
          ]
        }
      }),
      options: {
        enableSorting: false
      },
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

const reloadData = useThrottle(() => {
  $teacherStore.reloadData()
}, 60000, 'teacher')

const handleInteractOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (target?.closest('[data-sonner-toaster]')) return event.preventDefault()
}

const handleCloseDialog = () => {
  isCreating.value = false
  isEditing.value = false
  isDeleting.value = false
  selectedValue.value = {}
}

const shouldShowElement = computed(() => {
  return showElement($authStore.user.permissions, ['teacher.create'])
})
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h2 class="text-4xl font-bold tracking-tight">Manage Teachers</h2>

      <div class="flex gap-4">
        <Button variant="default" @click="isCreating = true" v-if="shouldShowElement">
          Import Teachers
        </Button>
      </div>
    </div>

    <LayoutTable
      :data="$teacherStore.teachers"
      :columns="columns"
      :filters="filters"
      :reload-data="reloadData"
    />
  </div>

  <!--  <Dialog :open="isCreating" @update:open="handleCloseDialog">-->
  <!--    <DialogContent class="sm:max-w-[550px]" @interact-outside="handleInteractOutside">-->
  <!--      <TeacherDialogCreateEdit/>-->
  <!--    </DialogContent>-->
  <!--  </Dialog>-->

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
