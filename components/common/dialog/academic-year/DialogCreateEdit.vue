<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useForm } from 'vee-validate'
import DatePicker from '~/components/base/DatePicker.vue'
import { type DateValue, parseDate, today, getLocalTimeZone } from '@internationalized/date'

const { $academicYearStore, $generationStore, $bus } = useNuxtApp()

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

  if (!props.edit) {
    await $academicYearStore.createAcademicYear(values)

    isLoading.value = false
    handleClose()
    return
  }

  await $academicYearStore.updateAcademicYear(props.data.slug, values)
  isLoading.value = false
  handleClose()
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

      <FormField v-slot="{ componentField }" name="generationSlug">
        <FormItem>
          <FormLabel>Generation</FormLabel>

          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select generation..." />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="generation in $generationStore.generations"
                  :key="generation.slug"
                  :value="generation.slug"
                >
                  {{ generation.name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      </FormField>
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
