<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'

const { $teacherStore, $bus } = useNuxtApp()

const isLoading = ref<boolean>(false)

const formSchema = toTypedSchema(z.object({
  file: z.array(z.instanceof(File))
}))

const { setFieldValue, handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    file: []
  }
})

const handleClose = () => {
  $bus.emit('close-dialog-import', false)
}

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  const file = values.file[0]

  try {
    const response = await $teacherStore.importTeachers({ file })

    if (!response) {
      throw new Error('Nhập giáo viên thất bại')
    }

    handleClose()
  } catch (error) {
    isLoading.value = false
  }
})
</script>

<template>
  <form class="space-y-6" @submit="onSubmit">
    <DialogHeader>
      <DialogTitle>Nhập giáo viên</DialogTitle>

      <DialogDescription>
        Nhập giáo viên từ file Excel
      </DialogDescription>
    </DialogHeader>

    <FormField name="file">
      <FormItem>
        <FormControl>
          <BaseDropzone
            :max-files="1"
            @update:model-value="setFieldValue('file', $event)"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

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