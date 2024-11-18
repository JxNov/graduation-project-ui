<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
import DatePicker from '~/components/base/DatePicker.vue'
import { type DateValue, parseDate, today, getLocalTimeZone } from '@internationalized/date'
import Combobox from '~/components/base/Combobox.vue'

const { $classStore, $teacherStore, $academicYearStore, $blockStore, $bus } = useNuxtApp()

interface DialogEditProps {
  data?: any,
  edit?: boolean,
}

const props = defineProps<DialogEditProps>()

const dataTeachersCombobox = $teacherStore.teachers.map((teacher) => ({
  value: teacher.username,
  label: teacher.name
}))
const dataAcademicYearsCombobox = $academicYearStore.academicYears.map((academicYear) => ({
  value: academicYear.slug,
  label: academicYear.name
}))
const dataBlocksCombobox = $blockStore.blocks.map((block) => ({
  value: block.slug,
  label: block.name
}))
const isLoading = ref<boolean>(false)
const initialValues = ref<any>({
  name: '',
  username: '',
  academicYearSlug: '',
  blockSlug: ''
})

if (props.edit) {
  initialValues.value = {
    name: props.data.name,
    username: props.data.username,
    academicYearSlug: props.data.academicYearSlug,
    blockSlug: props.data.blockSlug
  }
}

const formSchema = toTypedSchema(z.object({
  name: z.string().min(3).max(50),
  username: z.string(),
  academicYearSlug: z.string(),
  blockSlug: z.string()
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
      const response = await $classStore.createClass(values)

      if (!response) {
        throw new Error('Failed to create class')
      }

      isLoading.value = false
      handleClose()
      return
    }

    const response = await $classStore.updateClass(props.data.slug, values)

    if (!response) {
      throw new Error('Failed to update class')
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

      <FormField v-slot="{ value }" name="username">
        <FormItem>
          <FormLabel>Teacher</FormLabel>

          <FormControl>
            <Combobox
              name="teacher"
              :data="dataTeachersCombobox"
              :disabled="isLoading"
              :model-value="value"
              @update:model-value="setFieldValue('username', $event)"
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

      <FormField v-slot="{ value }" name="blockSlug">
        <FormItem>
          <FormLabel>Block</FormLabel>

          <FormControl>
            <Combobox
              name="block"
              :data="dataBlocksCombobox"
              :disabled="isLoading"
              :model-value="value"
              @update:model-value="setFieldValue('blockSlug', $event)"
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
