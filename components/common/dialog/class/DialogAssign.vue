<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useForm } from 'vee-validate'
import TagsCombobox from '~/components/base/TagsCombobox.vue'

const { $studentStore, $classStore, $bus } = useNuxtApp()

const props = defineProps<{
  classSlug: string
}>()

const isLoading = ref<boolean>(false)
const students = $studentStore.students.map(student => ({ label: student.name, value: student.username }))

const formSchema = toTypedSchema(z.object({
  students: z.array(z.string()).min(1)
}))

const { setFieldValue, handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    students: []
  }
})

const handleClose = () => {
  $bus.emit('close-dialog-assign', false)
}

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true

  try {
    const response = await $classStore.assignStudentsToClass({
      classSlug: props.classSlug,
      username: values.students
    })

    if (!response) {
      throw new Error('Failed to assign role and permission')
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
        Assign students to class
      </DialogTitle>

      <DialogDescription>
        Assign students to class
      </DialogDescription>
    </DialogHeader>

    <div class="space-y-6">
      <FormField v-slot="{ value }" name="students">
        <FormItem>
          <FormLabel>Students</FormLabel>

          <FormControl>
            <TagsCombobox
              placeholder="Select students"
              :data="students"
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
        Cancel
      </Button>

      <Button type="submit" :disabled="isLoading">
        Save changes
      </Button>
    </DialogFooter>
  </form>
</template>