<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useForm } from 'vee-validate'
import DatePicker from '~/components/base/DatePicker.vue'
import { type DateValue, parseDate, today, getLocalTimeZone } from '@internationalized/date'
import Combobox from '~/components/base/Combobox.vue'

const { $semesterStore, $academicYearStore, $bus } = useNuxtApp()

interface DialogEditProps {
  data?: any,
  edit?: boolean,
}

const props = defineProps<DialogEditProps>()

const dataCombobox = $academicYearStore.academicYears.map((academicYear) => ({
  value: academicYear.slug,
  label: academicYear.name
}))
const startDate = ref<DateValue>(today(getLocalTimeZone()))
const endDate = ref<DateValue>(today(getLocalTimeZone()).add({ years: 1 }))
const isLoading = ref<boolean>(false)
const initialValues = ref<any>({
  name: '',
  startDate: startDate.value.toString(),
  endDate: endDate.value.toString(),
  academicYearSlug: ''
})

if (props.edit) {
  const formatStartDate = props.data.startDate.split('/').reverse().join('-')
  const formatEndDate = props.data.endDate.split('/').reverse().join('-')
  const academicYearSlug = $academicYearStore.academicYears.find((academicYear) => academicYear.name === props.data.academicYearName)?.slug

  initialValues.value = {
    name: props.data.name,
    startDate: formatStartDate,
    endDate: formatEndDate,
    academicYearSlug: academicYearSlug
  }

  startDate.value = parseDate(formatStartDate)
  endDate.value = parseDate(formatEndDate)
}

const formSchema = toTypedSchema(z.object({
  name: z.string().min(3).max(50),
  startDate: z.string(),
  endDate: z.string(),
  academicYearSlug: z.string()
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
      const response = await $semesterStore.createSemester(values)

      if (!response) {
        throw new Error('Failed to create semester')
      }

      isLoading.value = false
      handleClose()
      return
    }

    const response = await $semesterStore.updateSemester(props.data.slug, values)

    if (!response) {
      throw new Error('Failed to update semester')
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

      <DatePicker
        name="startDate"
        label="Start date"
        :model-value="startDate"
        :disabled="isLoading"
        @update:model-value="handleStartDateChange"
      />

      <DatePicker
        name="endDate"
        label="End date"
        :model-value="endDate"
        :disabled="isLoading"
        @update:model-value="handleEndDateChange"
      />

      <FormField v-slot="{ value }" name="academicYearSlug">
        <FormItem>
          <FormLabel>Academic year</FormLabel>

          <FormControl>
            <Combobox
              name="academic year"
              :data="dataCombobox"
              :disabled="isLoading"
              :model-value="value"
              @update:model-value="setFieldValue('academicYearSlug', $event)"
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
