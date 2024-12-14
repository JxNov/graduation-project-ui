<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { Class } from '~/schema'
import { classSchema } from '~/schema'
import { createColumns } from '~/composables/columns'
import {
  ClassDialogDistribution,
  ClassDialogCreateEdit,
  ClassDialogDelete,
  ClassDialogAssign
} from '~/components/common/dialog/class'
import { checkPermissions } from '~/utils/checkPermissions'
import { Button } from '~/components/ui/button'

const { $authStore, $academicYearStore, $classStore, $teacherStore, $studentStore, $blockStore, $bus } = useNuxtApp()
const router = useRouter()

const isDistribution = ref<boolean>(false)
const isCreating = ref<boolean>(false)
const isEditing = ref<boolean>(false)
const isAssigning = ref<boolean>(false)
const isDeleting = ref<boolean>(false)
const selectedValue = ref<Class | object>({})
const selectedClassSlug = ref<string>('')

onMounted(async () => {
  $bus.on('open-dialog-edit', (row: Class) => {
    isEditing.value = true
    selectedValue.value = row
  })

  $bus.on('open-dialog-delete', (row: Class) => {
    isDeleting.value = true
    selectedValue.value = row
  })

  $bus.on('close-dialog-create-edit', (value: boolean) => {
    isCreating.value = value
    isEditing.value = value
    selectedValue.value = {}
  })

  $bus.on('close-dialog-assign', (value: boolean) => {
    isAssigning.value = value
    selectedClassSlug.value = ''
  })

  $bus.on('close-dialog-delete', (value: boolean) => {
    isDeleting.value = value
    selectedValue.value = {}
  })

  $bus.on('close-dialog-distribution', (value: boolean) => {
    isDistribution.value = value
  })

  $bus.on('delete-rows', (values: Class[]) => {
    const slugs = values.map((value) => value.slug)
    console.log(slugs)
  })

  if (!$teacherStore.teachers.length) {
    await $teacherStore.fetchTeachers()
  }

  if (!$studentStore.students.length) {
    await $studentStore.fetchStudents()
  }

  if (!$blockStore.blocks.length) {
    await $blockStore.fetchBlocks()
  }

  if (!$academicYearStore.academicYears.length) {
    await $academicYearStore.fetchAcademicYears()
  }

  if (!$classStore.classes.length) {
    await $classStore.fetchClasses()
  }
})

onBeforeUnmount(() => {
  $bus.off('open-dialog-edit')
  $bus.off('open-dialog-delete')
  $bus.off('close-dialog-create-edit')
  $bus.off('close-dialog-assign')
  $bus.off('close-dialog-delete')
  $bus.off('delete-rows')
})

const columns = createColumns(
  [
    ['select'],
    ['name', 'Class'],
    ['teacherName', 'Teacher'],
    ['numberOfStudents', 'Number of students'],
    ['code', 'Invite code', '', {
      enableSorting: false
    }],
    ['actions', '', '', {
      enableSorting: false,
      enableHiding: false
    }]
  ],
  classSchema,
  [
    {
      accessorKey: 'button',
      title: '',
      render: (row) => h('div', { class: 'truncate px-2' },
        h('div', { class: 'flex items-center gap-2' }, [
          h(Button, {
            variant: 'outline',
            size: 'sm',
            onClick: () => {
              router.push(`/admin/classes/${row.original.slug}`)
            }
          }, { default: () => 'Detail' }),
          h(Button, {
            variant: 'outline',
            size: 'sm',
            onClick: () => {
              console.log(row.original)
            }
          }, { default: () => 'Up to class' }),
          h(Button, {
            variant: 'outline',
            size: 'sm',
            onClick: () => {
              selectedClassSlug.value = row.original.slug
              isAssigning.value = true
            }
          }, { default: () => 'Assign student' })
        ])
      ),
      options: {
        enableSorting: false,
        enableHiding: false
      },
      before: 'actions'
    }
  ],
  'admin.update',
  'admin.delete'
) as ColumnDef<Class>[]

const handleInteractOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (target?.closest('[data-sonner-toaster]')) return event.preventDefault()
}

const shouldShowElement = computed(() => {
  return checkPermissions($authStore.user.permissions, ['admin.create'])
})

const handleCloseDialog = () => {
  isDistribution.value = false
  isCreating.value = false
  isEditing.value = false
  isAssigning.value = false
  isDeleting.value = false
  selectedValue.value = {}
  selectedClassSlug.value = ''
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h2 class="text-4xl font-bold tracking-tight">Manage classes</h2>

      <div class="flex gap-2">
        <Button variant="outline" @click="isDistribution = true" v-if="shouldShowElement">
          Distribution students
        </Button>

        <Button variant="default" @click="isCreating = true" v-if="shouldShowElement">
          Create new class
        </Button>
      </div>
    </div>

    <LayoutTable
      :data="$classStore.classes"
      :columns="columns"
      :filters="[]"
    />
  </div>

  <Dialog :open="isDistribution" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">
      <ClassDialogDistribution />
    </DialogContent>
  </Dialog>

  <Dialog :open="isCreating" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">
      <ClassDialogCreateEdit />
    </DialogContent>
  </Dialog>

  <Dialog :open="isEditing" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">
      <ClassDialogCreateEdit :data="selectedValue" edit />
    </DialogContent>
  </Dialog>

  <Dialog :open="isAssigning" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">
      <ClassDialogAssign :class-slug="selectedClassSlug" />
    </DialogContent>
  </Dialog>

  <Dialog :open="isDeleting" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">
      <ClassDialogDelete :data="selectedValue" />
    </DialogContent>
  </Dialog>
</template>
