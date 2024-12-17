<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'

const { $homeworkStore, $authStore } = useNuxtApp()
const route = useRoute()

interface DialogEditProps {
  data?: any,
}

const props = defineProps<DialogEditProps>()

const emits = defineEmits<{
  (e: 'close', value: boolean): void
  (e: 'update', data: any): void
}>()

const isLoading = ref<boolean>(false)

const formSchema = toTypedSchema(z.object({
  score: z.string()
    .refine(value => !isNaN(Number(value)), {
      message: 'Score must be a number'
    })
    .refine(value => {
      const score = Number(value)
      return score >= 0 && score <= 10
    }, {
      message: 'Score must be a number between 0 and 10'
    }),
  feedback: z.string().optional()
}))

const { setFieldValue, handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    score: props.data?.score,
    feedback: props.data?.feedback || ''
  }
})

const handleClose = () => {
  isLoading.value = false
  emits('close', false)
}

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true

  const data = {
    score: Number(values.score),
    feedback: values.feedback
  }

  try {
    const response = await $homeworkStore.giveScore(route.params.homeworkSlug as string, props.data.studentUsername, data)

    if (!response) {
      throw new Error('Failed to import students')
    }

    emits('update', response)
    handleClose()
  } catch (error) {
    isLoading.value = false
  }
})
</script>

<template>
  <form class="space-y-6 px-1" @submit="onSubmit">
    <DialogHeader>
      <DialogTitle>
        Grade Assignment
      </DialogTitle>

      <DialogDescription>
        Grade the assignment for the student <strong>{{ props.data.studentName }}</strong>
      </DialogDescription>
    </DialogHeader>

    <div class="space-y-6">
      <FormField v-slot="{ componentField }" name="score">
        <FormItem>
          <FormLabel>Score</FormLabel>

          <FormControl>
            <Input type="text" placeholder="Score..." v-bind="componentField" :disabled="isLoading" />
          </FormControl>

          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="feedback">
        <FormItem>
          <FormLabel>Feedback</FormLabel>
          <FormControl>
          <Textarea
            placeholder="Feedback"
            class="resize-none h-24"
            v-bind="componentField"
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