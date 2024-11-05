<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { Class } from '~/schema'
import { classSchema } from '~/schema'
import { createColumns } from '~/composables/columns'
import { ClassDialogCreateEdit, ClassDialogDelete } from '~/components/common/dialog/class'
import { useThrottle } from '~/composables/useThrottle'
import { showElement } from '~/utils/showElement'

const { $authStore, $classStore, $teacherStore, $bus } = useNuxtApp()

const isCreating = ref<boolean>(false)
const isEditing = ref<boolean>(false)
const isDeleting = ref<boolean>(false)
const selectedValue = ref<Class | object>({})

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

  $bus.on('close-dialog-delete', (value: boolean) => {
    isDeleting.value = value
    selectedValue.value = {}
  })

  $bus.on('delete-rows', (values: Class[]) => {
    const slugs = values.map((value) => value.slug)
    console.log(slugs)
  })

  if (!$teacherStore.teachers.length) {
    await $teacherStore.fetchTeachers()
  }

  if (!$classStore.classes.length) {
    await $classStore.fetchClasses()
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
    ['name', 'Class'],
    ['teacherName', 'Teacher'],
    ['code', 'Invite code', '', {
      enableSorting: false,
      enableHiding: false
    }],
    ['actions', '', '', {
      enableSorting: false,
      enableHiding: false
    }]
  ],
  classSchema,
  [],
  'users.update',
  'users.delete'
) as ColumnDef<Class>[]

const reloadData = useThrottle(() => {
  $classStore.reloadData()
}, 60000, 'generation')

const handleInteractOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (target?.closest('[data-sonner-toaster]')) return event.preventDefault()
}

const shouldShowElement = computed(() => {
  return showElement($authStore.user.permissions, ['users.create'])
})

const handleCloseDialog = () => {
  isCreating.value = false
  isEditing.value = false
  isDeleting.value = false
  selectedValue.value = {}
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h2 class="text-4xl font-bold tracking-tight">Manage classes</h2>
      <Button variant="default" @click="isCreating = true" v-if="shouldShowElement">
        Create new class
      </Button>
    </div>

    <LayoutTable
      :data="$classStore.classes"
      :columns="columns"
      :filters="[]"
      :reload-data="reloadData"
    />
  </div>

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

  <Dialog :open="isDeleting" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">
      <ClassDialogDelete :data="selectedValue" />
    </DialogContent>
  </Dialog>
</template>
