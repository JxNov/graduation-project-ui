<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
import DatePicker from '~/components/base/DatePicker.vue'
import { type DateValue, parseDate, today, getLocalTimeZone } from '@internationalized/date'

const { $classStore, $teacherStore, $bus } = useNuxtApp()

interface DialogEditProps {
  data?: any,
  edit?: boolean,
}

const props = defineProps<DialogEditProps>()

const isLoading = ref<boolean>(false)
const initialValues = ref<any>({
  name: '',
  username: ''
})

if (props.edit) {
  initialValues.value = {
    name: props.data.name,
    username: props.data.username
  }
}

const formSchema = toTypedSchema(z.object({
  name: z.string().min(3).max(50),
  username: z.string().min(3).max(50)
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

  if (!props.edit) {
    await $classStore.createClass(values)

    isLoading.value = false
    handleClose()
    return
  }

  await $classStore.updateClass(props.data.slug, values)
  isLoading.value = false
  handleClose()
})
</script>

<template>
  <form class="space-y-6" @submit="onSubmit">
    <DialogHeader>
      <DialogTitle v-if="props.edit">Edit class</DialogTitle>
      <DialogTitle v-else>Create new class</DialogTitle>

      <DialogDescription v-if="props.edit">
        Edit class <strong>{{ props.data.name }}</strong>.
      </DialogDescription>
      <DialogDescription v-else>
        Create a new class.
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

      <FormField v-slot="{ componentField }" name="username">
        <FormItem>
          <FormLabel>Teacher</FormLabel>

          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select teacher..." />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="teacher in $teacherStore.teachers"
                  :key="teacher.username"
                  :value="teacher.username"
                >
                  {{ teacher.name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

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
