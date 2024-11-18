<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import Combobox from '~/components/base/Combobox.vue'

const { $studentStore, $academicYearStore, $generationStore, $bus } = useNuxtApp()

const dataAcademicYearsCombobox = $academicYearStore.academicYears.map((academicYear) => ({
  value: academicYear.slug,
  label: academicYear.name
}))
const dataGenerationsCombobox = $generationStore.generations.map((generation) => ({
  value: generation.slug,
  label: generation.name
}))

const isLoading = ref<boolean>(false)

const formSchema = toTypedSchema(z.object({
  file: z.array(z.instanceof(File)),
  academicYearSlug: z.string(),
  generationSlug: z.string()
}))

const { setFieldValue, handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    file: [],
    academicYearSlug: '',
    generationSlug: ''
  }
})

const handleClose = () => {
  $bus.emit('close-dialog-import', false)
}

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  const file = values.file[0]

  const data = {
    file,
    academicYearSlug: values.academicYearSlug,
    generationSlug: values.generationSlug
  }

  try {
    const response = await $studentStore.importStudents(data)

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
      <DialogTitle>Import Student</DialogTitle>

      <DialogDescription>
        Import students from a Excel file
      </DialogDescription>
    </DialogHeader>

    <FormField v-slot="{ value }" name="generationSlug">
      <FormItem>
        <FormLabel>Generation</FormLabel>

        <FormControl>
          <Combobox
            name="generation"
            :data="dataGenerationsCombobox"
            :disabled="isLoading"
            :model-value="value"
            @update:model-value="setFieldValue('generationSlug', $event)"
          />
        </FormControl>

        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ value }" name="academicYearSlug">
      <FormItem>
        <FormLabel>Academic year</FormLabel>

        <FormControl>
          <Combobox
            name="academic year"
            :data="dataAcademicYearsCombobox"
            :disabled="isLoading"
            :model-value="value"
            @update:model-value="setFieldValue('academicYearSlug', $event)"
          />
        </FormControl>

        <FormMessage />
      </FormItem>
    </FormField>

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