<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useForm } from 'vee-validate'
import DatePicker from '~/components/base/DatePicker.vue'
import { type DateValue, parseDate, today, getLocalTimeZone } from '@internationalized/date'

const { $blockStore, $bus } = useNuxtApp()

interface DialogEditProps {
  data?: any,
  edit?: boolean,
}

const props = defineProps<DialogEditProps>()

const isLoading = ref<boolean>(false)
const initialValues = ref<any>({
  name: '',
  level: 1
})

if (props.edit) {
  initialValues.value = {
    name: props.data.name,
    level: props.data.level
  }
}

const formSchema = toTypedSchema(z.object({
  name: z.string().min(3).max(50),
  level: z.number().min(1).max(10)
}))

const { setFieldValue, handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: initialValues.value
})

const handleClose = () => {
  $bus.emit('close-dialog-create-edit', false)
}

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  try {
    if (!props.edit) {
      const response = await $blockStore.createBlock(values)

      if (!response) {
        throw new Error('Failed to create block')
      }

      isLoading.value = false
      handleClose()
      return
    }

    const response = await $blockStore.updateBlock(props.data.slug, values)

    if (!response) {
      throw new Error('Failed to update block')
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
      <DialogTitle v-if="props.edit">Edit semester</DialogTitle>
      <DialogTitle v-else>Create new semester</DialogTitle>

      <DialogDescription v-if="props.edit">
        Edit semester <strong>{{ props.data.name }}</strong>.
      </DialogDescription>
      <DialogDescription v-else>
        Create a new semester.
      </DialogDescription>
    </DialogHeader>

    <div class="space-y-6">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Name</FormLabel>

          <FormControl>
            <Input type="text" placeholder="Name..." v-bind="componentField" :disabled="isLoading" />
          </FormControl>

          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="level">
        <FormItem>
          <FormLabel>Level</FormLabel>

          <FormControl>
            <Input type="number" min="1" placeholder="Level..." v-bind="componentField" :disabled="isLoading" />
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
