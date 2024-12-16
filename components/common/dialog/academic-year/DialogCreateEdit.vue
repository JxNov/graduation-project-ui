<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useForm } from 'vee-validate'
import DatePickerNotSelectedPrevious from '~/components/base/DatePickerNotSelectedPrevious.vue'
import { type DateValue, parseDate, today, getLocalTimeZone } from '@internationalized/date'
import Combobox from '~/components/base/Combobox.vue'

const { $academicYearStore, $generationStore, $bus } = useNuxtApp()

interface DialogEditProps {
  data?: any,
  edit?: boolean,
}

const props = defineProps<DialogEditProps>()

const dataCombobox = $generationStore.generations.map((generation) => ({
  label: generation.name,
  value: generation.slug
}))
const startDate = ref<DateValue>(today(getLocalTimeZone()))
const endDate = ref<DateValue>(today(getLocalTimeZone()).add({ years: 1 }))
const isLoading = ref<boolean>(false)
const initialValues = ref<any>({
  name: '',
  startDate: startDate.value.toString(),
  endDate: endDate.value.toString(),
  generationSlug: ''
})

if (props.edit) {
  const formatStartDate = props.data.startDate.split('/').reverse().join('-')
  const formatEndDate = props.data.endDate.split('/').reverse().join('-')
  const generationSlug = $generationStore.generations.find((generation) => generation.name === props.data.generationName)?.slug

  initialValues.value = {
    name: props.data.name,
    startDate: formatStartDate,
    endDate: formatEndDate,
    generationSlug: generationSlug
  }

  startDate.value = parseDate(formatStartDate)
  endDate.value = parseDate(formatEndDate)
}

const formSchema = toTypedSchema(z.object({
  name: z.string().min(3).max(50),
  startDate: z.string(),
  endDate: z.string(),
  generationSlug: z.string()
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

  try {
    if (!props.edit) {
      const response = await $academicYearStore.createAcademicYear(values)

      if (!response) {
        throw new Error('Failed to create academic year')
      }

      isLoading.value = false
      handleClose()
      return
    }

    const response = await $academicYearStore.updateAcademicYear(props.data.slug, values)

    if (!response) {
      throw new Error('Failed to update academic year')
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
      <DialogTitle v-if="props.edit">Edit academic year</DialogTitle>
      <DialogTitle v-else>Create new academic year</DialogTitle>

      <DialogDescription v-if="props.edit">
        Edit academic year <strong>{{ props.data.name }}</strong>.
      </DialogDescription>
      <DialogDescription v-else>
        Create a new academic year.
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

      <DatePickerNotSelectedPrevious
        name="startDate"
        label="Start date"
        :model-value="startDate"
        :disabled="isLoading"
        @update:model-value="handleStartDateChange"
      />

      <DatePickerNotSelectedPrevious
        name="endDate"
        label="End date"
        :model-value="endDate"
        :disabled="isLoading"
        @update:model-value="handleEndDateChange"
      />

      <FormField v-slot="{ value }" name="generationSlug">
        <FormItem>
          <FormLabel>Generation</FormLabel>

          <FormControl>
            <Combobox
              name="generation"
              :data="dataCombobox"
              :disabled="isLoading"
              :model-value="value"
              @update:model-value="setFieldValue('generationSlug', $event)"
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
