<script setup lang="ts">
import HomeworkItem from './HomeworkItem.vue'
import { checkPermissions } from '~/utils/checkPermissions'
import { PlusIcon } from '@radix-icons/vue'
import { HomeworkDialogCreateEdit, HomeworkDialogDelete } from '~/components/common/dialog/homework'

const { $homeworkStore, $authStore, $bus } = useNuxtApp()

const teacherPermissions = checkPermissions($authStore.user.permissions, ['teacher.read'])

const isCreating = ref<boolean>(false)
const isEditing = ref<boolean>(false)
const isDeleting = ref<boolean>(false)
const selectedValue = ref<object>({})

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

onMounted(() => {
  $bus.on('close-dialog-create-edit', handleCloseDialog)
  $bus.on('close-dialog-delete-homework', handleCloseDialog)
})

onBeforeUnmount(() => {
  $bus.off('close-dialog-create-edit')
  $bus.off('close-dialog-delete-homework')
})
</script>

<template>
  <div class="w-full flex flex-col gap-4 md:px-16 lg:px-24 xl:px-48 mt-10">
    <div class="flex justify-end" v-if="teacherPermissions">
      <Button type="button" @click="isCreating = true">
        <PlusIcon class="w-6 h-6 mr-1" />
        Create Homework
      </Button>
    </div>

    <HomeworkItem
      v-for="homework in $homeworkStore.homeworks"
      :key="homework.slug"
      :homework="homework"
      @editHomework="selectedValue = homework; isEditing = true"
      @deleteHomework="selectedValue = homework; isDeleting = true"
    />
  </div>

  <Dialog :open="isCreating" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[550px]" @interact-outside="handleInteractOutside">
      <HomeworkDialogCreateEdit />
    </DialogContent>
  </Dialog>

  <Dialog :open="isEditing" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[550px]" @interact-outside="handleInteractOutside">
      <HomeworkDialogCreateEdit :data="selectedValue" edit />
    </DialogContent>
  </Dialog>

  <Dialog :open="isDeleting" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[550px]" @interact-outside="handleInteractOutside">
      <HomeworkDialogDelete :data="selectedValue" />
    </DialogContent>
  </Dialog>
</template>
