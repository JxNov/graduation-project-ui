<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
import DatePicker from '~/components/base/DatePicker.vue'
import { type DateValue, parseDate, today, getLocalTimeZone } from '@internationalized/date'

const { $generationStore, $bus } = useNuxtApp()

interface DialogEditProps {
  data?: any,
  edit?: boolean,
}

const props = defineProps<DialogEditProps>()

const startDate = ref<DateValue>(today(getLocalTimeZone()))
const endDate = ref<DateValue>(today(getLocalTimeZone()).add({ years: 1 }))
const isLoading = ref<boolean>(false)
const initialValues = ref<any>({
  name: '',
  startDate: startDate.value.toString(),
  endDate: endDate.value.toString()
})

if (props.edit) {
  const formatStartDate = props.data.startDate.split('/').reverse().join('-')
  const formatEndDate = props.data.endDate.split('/').reverse().join('-')

  initialValues.value = {
    name: props.data.name,
    startDate: formatStartDate,
    endDate: formatEndDate
  }

  startDate.value = parseDate(formatStartDate)
  endDate.value = parseDate(formatEndDate)
}

const formSchema = toTypedSchema(z.object({
  name: z.string().min(3).max(50),
  startDate: z.string(),
  endDate: z.string()
}))

const { setFieldValue, handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: initialValues.value
})

const handleStartDateChange = (date: DateValue) => {
  startDate.value = date
  setFieldValue('startDate', date.toString())
}

const handleEndDateChange = (date: DateValue) => {
  endDate.value = date
  setFieldValue('endDate', date.toString())
}

const handleClose = () => {
  $bus.emit('close-dialog-create-edit', false)
}

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  const startDate = parseDate(values.startDate)
  const endDate = parseDate(values.endDate)
  const year = endDate.year - startDate.year

  if (year < 4 || year > 4) {
    if (year < 4) {
      toast.error('Tổng số năm không được nhỏ hơn 4')
      isLoading.value = false
      return
    } else {
      toast.error('Tổng số năm không được lớn hơn 4')
      isLoading.value = false
      return
    }
  }

  try {
    if (!props.edit) {
      const response = await $generationStore.createGeneration(values)

      if (!response) {
        throw new Error('Create generation failed')
      }

      isLoading.value = false
      handleClose()
      return
    }

    const response = await $generationStore.updateGeneration(props.data.slug, values)

    if (!response) {
      throw new Error('Update generation failed')
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
      <DialogTitle v-if="props.edit">Edit generation</DialogTitle>
      <DialogTitle v-else>Create new generation</DialogTitle>

      <DialogDescription v-if="props.edit">
        Edit generation <strong>{{ props.data.name }}</strong>.
      </DialogDescription>
      <DialogDescription v-else>
        Create a new generation.
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

      <DatePicker
        name="startDate"
        label="Start date"
        :model-value="startDate"
        :disabled="isLoading"
        @update:modelValue="handleStartDateChange"
      />

      <DatePicker
        name="endDate"
        label="End date"
        :model-value="endDate"
        :disabled="isLoading"
        @update:modelValue="handleEndDateChange"
      />
    </div>

    <DialogFooter>
      <Button type="button" variant="outline" @click="handleClose" :disabled="isLoading">
        Cancel
      </Button>
      <Button type="submit" :disabled="isLoading">
        Save changes
      </Button>
    </DialogFooter>
  </form>
</template>
