<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useForm } from 'vee-validate'
import TagsCombobox from '~/components/base/TagsCombobox.vue'

const { $teacherStore, $classStore, $bus } = useNuxtApp()

const props = defineProps<{
  classSlug: string
}>()

const isLoading = ref<boolean>(false)
const teachers = $teacherStore.teachers.map(teacher => ({ label: teacher.name, value: teacher.username }))

const formSchema = toTypedSchema(z.object({
  teachers: z.array(z.string()).min(1)
}))

const { setFieldValue, handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    teachers: []
  }
})

const handleClose = () => {
  $bus.emit('close-dialog-assign-teacher', false)
}

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true

  try {
    const response = await $classStore.assignTeachersToClass(props.classSlug, {
      username: values.teachers
    })

    if (!response) {
      throw new Error('Gán giáo viên vào lớp không thành công')
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
        Gán giáo viên vào lớp
      </DialogTitle>

      <DialogDescription>
        Gán giáo viên vào lớp để dạy học sinh
      </DialogDescription>
    </DialogHeader>

    <div class="space-y-6">
      <FormField v-slot="{ value }" name="teachers">
        <FormItem>
          <FormLabel>Giáo viên</FormLabel>

          <FormControl>
            <TagsCombobox placeholder="Chọn giáo viên" :data="teachers" v-bind:model-value="value"
                          @update:model-value="value" />
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