<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useForm } from 'vee-validate'
import TagsCombobox from '~/components/base/TagsCombobox.vue'
import Combobox from '~/components/base/Combobox.vue'

const { $teacherStore, $subjectStore, $bus } = useNuxtApp()

const isLoading = ref<boolean>(false)
const subjects = $subjectStore.subjects.map(subject => ({ label: subject.name, value: subject.slug }))
const dataTeachersCombobox = $teacherStore.teachers.map(teacher => ({
  label: teacher.name,
  value: teacher.username
}))

const formSchema = toTypedSchema(z.object({
  teacher: z.string(),
  subjects: z.array(z.string()).min(1)
}))

const { setFieldValue, handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    teacher: '',
    subjects: []
  }
})

const handleClose = () => {
  $bus.emit('close-dialog-assign', false)
}

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true

  try {
    const response = await $teacherStore.assignSubjectToTeacher(values.teacher, values.subjects)

    if (!response) {
      throw new Error('Chia môn học cho giáo viên thất bại')
    }

    isLoading.value = false
    handleClose()
  } catch (error) {
    isLoading.value = false
  }
})
</script>

<template>
  <form class="space-y-6" @submit="onSubmit">
    <DialogHeader>
      <DialogTitle>
       Chia môn học cho giáo viên
      </DialogTitle>

      <DialogDescription>
        Phân công giáo viên dạy môn học
      </DialogDescription>
    </DialogHeader>

    <div class="space-y-6">
      <FormField v-slot="{ value }" name="teacher">
        <FormItem>
          <FormLabel>Giáo viên</FormLabel>

          <FormControl>
            <Combobox
              name="giáo viên"
              :data="dataTeachersCombobox"
              :disabled="isLoading"
              :model-value="value"
              @update:model-value="setFieldValue('teacher', $event)"
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ value }" name="subjects">
        <FormItem>
          <FormLabel>Môn học</FormLabel>

          <FormControl>
            <TagsCombobox
              placeholder="Chọn môn học"
              :data="subjects"
              v-bind:model-value="value"
              @update:model-value="value"
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <DialogFooter class="gap-2">
      <Button type="button" variant="outline" @click="handleClose" :disabled="isLoading">
        Hủy
      </Button>

      <Button type="submit" :disabled="isLoading">
        Lưu
      </Button>
    </DialogFooter>
  </form>
</template>