<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { Student } from '~/schema'
import { studentSchema } from '~/schema'
import type { TableFilter } from '~/types/table'
import { createColumns } from '~/composables/columns'
import { useThrottle } from '~/composables/useThrottle'
import { showElement } from '~/utils/showElement'
import { extractValue } from '~/utils/extractValue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const { $authStore, $studentStore, $bus } = useNuxtApp()

const isCreating = ref<boolean>(false)
const isEditing = ref<boolean>(false)
const isDeleting = ref<boolean>(false)
const selectedValue = ref<Student | object>({})

onMounted(async () => {
  $bus.on('open-dialog-edit', (row: Student) => {
    isEditing.value = true
    selectedValue.value = row
  })

  $bus.on('open-dialog-delete', (row: Student) => {
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

  $bus.on('delete-rows', (values: Student[]) => {
    console.log(values)
  })

  if (!$studentStore.students.length) {
    await $studentStore.fetchStudents()
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
  studentSchema,
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
                    h('span', {}, row.getValue('name'))
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
  'students.update',
  'students.delete'
) as ColumnDef<Student>[]

const valueGender = extractValue($studentStore.students, 'gender')

const filters: TableFilter[] = [
  {
    name: 'gender',
    label: 'Gender',
    values: valueGender
  }
]

const reloadData = useThrottle(() => {
  $studentStore.reloadData()
}, 60000, 'student')

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
  return showElement($authStore.user.permissions, ['student.create'])
})
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h2 class="text-4xl font-bold tracking-tight">Manage Students</h2>

      <div class="flex gap-4">
        <Button variant="default" @click="isCreating = true" v-if="shouldShowElement">
          Import Students
        </Button>
      </div>
    </div>

    <LayoutTable
      :data="$studentStore.students"
      :columns="columns"
      :filters="filters"
      :reload-data="reloadData"
    />
  </div>

  <!--  <Dialog :open="isCreating" @update:open="handleCloseDialog">-->
  <!--    <DialogContent class="sm:max-w-[550px]" @interact-outside="handleInteractOutside">-->
  <!--      <StudentDialogCreateEdit/>-->
  <!--    </DialogContent>-->
  <!--  </Dialog>-->

  <!--  <Dialog :open="isEditing" @update:open="handleCloseDialog">-->
  <!--    <DialogContent class="sm:max-w-[550px]" @interact-outside="handleInteractOutside">-->
  <!--      <StudentDialogCreateEdit :data="selectedValue" edit/>-->
  <!--    </DialogContent>-->
  <!--  </Dialog>-->

  <!--  <Dialog :open="isDeleting" @update:open="handleCloseDialog">-->
  <!--    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">-->
  <!--      <StudentDialogDelete :data="selectedValue"/>-->
  <!--    </DialogContent>-->
  <!--  </Dialog>-->
</template>
