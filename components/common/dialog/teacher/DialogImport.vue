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
      throw new Error('Failed to import students')
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
      <DialogTitle>Import Teacher</DialogTitle>

      <DialogDescription>
        Import teachers from a Excel file
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
        Cancel
      </Button>

      <Button type="submit" :disabled="isLoading">
        Save changes
      </Button>
    </DialogFooter>
  </form>
</template>