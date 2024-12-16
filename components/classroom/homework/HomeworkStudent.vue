<script setup lang="ts">
import HomeworkStudentSubmit from './HomeworkStudentSubmit.vue'
import { HomeworkDialogFeedback } from '~/components/common/dialog/homework'

defineProps<{
  homework: any
  data: any
}>()

const emits = defineEmits<{
  (e: 'update', data: any): void
}>()

const isEditing = ref<boolean>(false)
const selectedValue = ref<any>({})

const openGradeAssignment = (data: any) => {
  selectedValue.value = data
  isEditing.value = true
}

const handleInteractOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (target?.closest('[data-sonner-toaster]')) return event.preventDefault()
}

const handleCloseDialog = () => {
  isEditing.value = false
  selectedValue.value = {}
}

const handleUpdate = (data: any) => {
  emits('update', data)
}
</script>

<template>
  <div class="xl:px-16 mt-10">
    <Card>
      <CardHeader class="flex flex-row justify-between items-center gap-4 select-none">
        <div class="flex flex-col items-start gap-4">
          <CardTitle>{{ homework.title }}</CardTitle>
          <CardDescription>{{ homework.dueDate }}</CardDescription>
        </div>

        <div class="flex flex-row items-center gap-4">
          <div class="flex flex-row items-start gap-10">
            <div class="border-l-2 pl-4">
              <p class="text-4xl pb-2">{{ homework.submitted }}</p>
              <CardDescription>Đã nộp</CardDescription>
            </div>

            <div class="border-l-2 pl-4">
              <p class="text-4xl pb-2">{{ homework.notSubmitted }}</p>
              <CardDescription>Đã giao</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent class="grid grid-cols-12 gap-4 border-t pt-6">
        <HomeworkStudentSubmit
          v-for="(item, index) in data"
          :key="index"
          :data="item"
          @open-grade-assignment="openGradeAssignment"
        />
      </CardContent>
    </Card>
  </div>

  <Dialog :open="isEditing" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[450px]" @interact-outside="handleInteractOutside">
      <HomeworkDialogFeedback
        :data="selectedValue"
        @close="handleCloseDialog"
        @update="handleUpdate($event)"
      />
    </DialogContent>
  </Dialog>
</template>

