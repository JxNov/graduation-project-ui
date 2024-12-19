<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import DatePicker from '~/components/base/DatePicker.vue'
import Combobox from '~/components/base/Combobox.vue'
import { type DateValue, getLocalTimeZone, parseDate, today } from '@internationalized/date'

const { $subjectStore, $semesterStore, $homeworkStore, $authStore, $bus } = useNuxtApp()
const route = useRoute()

interface DialogEditProps {
  data?: any,
  edit?: boolean,
}

const props = defineProps<DialogEditProps>()

const dataSemestersCombobox = $semesterStore.semesters.map((semester) => ({
  value: semester.slug,
  label: semester.name
}))
const dataSubjectsCombobox = $subjectStore.subjects.map((subject) => ({
  value: subject.slug,
  label: subject.name
}))

const dueDate = ref<DateValue>(today(getLocalTimeZone()))
const isLoading = ref<boolean>(false)
const initialValues = ref<any>({
  dueDate: dueDate.value.toString()
})

if (props.edit) {
  const formatDueDate = props.data.dueDate.split('/').reverse().join('-')

  initialValues.value = {
    title: props.data.title,
    dueDate: formatDueDate,
    criteria: props.data.criteria,
    semesterSlug: props.data.semesterSlug,
    subjectSlug: props.data.subjectSlug
  }

  dueDate.value = parseDate(formatDueDate)
}

const formSchema = toTypedSchema(z.object({
  title: z.string(),
  dueDate: z.string(),
  criteria: z.string(),
  semesterSlug: z.string(),
  subjectSlug: z.string()
}))

const { setFieldValue, handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: initialValues.value
})

const handleClose = () => {
  $bus.emit('close-dialog-create-edit', false)
}

const handleChangeDueDate = (date: DateValue) => {
  dueDate.value = date
  setFieldValue('dueDate', date.toString())
}

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true

  const data = {
    title: values.title,
    dueDate: values.dueDate,
    criteria: values.criteria,
    semesterSlug: values.semesterSlug,
    subjectSlug: values.subjectSlug,
    classSlug: route.params.classroomSlug as string,
    username: $authStore.user.username
  }

  try {
    if (props.edit) {
      const response = await $homeworkStore.updateHomework(props.data.slug, data)

      if (!response) {
        throw new Error('Failed to update material')
      }

      handleClose()
      return
    }

    const response = await $homeworkStore.createHomework(data)

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
  <form class="space-y-6 px-1" @submit="onSubmit">
    <DialogHeader>
      <DialogTitle v-if="props.edit">
        Cập nhật bài tập
      </DialogTitle>
      <DialogTitle v-else>
        Tạo bài tập
      </DialogTitle>

      <DialogDescription v-if="props.edit">
        Cập nhật bài tập
      </DialogDescription>
      <DialogDescription v-else>
        Tạo bài tập
      </DialogDescription>
    </DialogHeader>

    <div class="space-y-6">
      <FormField v-slot="{ componentField }" name="title">
        <FormItem>
          <FormLabel>Tiêu đề</FormLabel>

          <FormControl>
            <Input type="text" placeholder="Title..." v-bind="componentField" :disabled="isLoading" />
          </FormControl>

          <FormMessage />
        </FormItem>
      </FormField>

      <DatePicker
        name="startDate"
        label="Start date"
        :model-value="dueDate"
        :disabled="isLoading"
        @update:model-value="handleChangeDueDate"
      />

      <FormField v-slot="{ componentField }" name="criteria">
        <FormItem>
          <FormLabel>Tiêu chí bài tập</FormLabel>
          <FormControl>
          <Textarea
            placeholder="Criteria"
            class="resize-none h-24"
            v-bind="componentField"
          />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <div class="grid grid-cols-2 gap-6">
        <FormField v-slot="{ value }" name="subjectSlug">
          <FormItem>
            <FormLabel>Môn học</FormLabel>

            <FormControl>
              <Combobox
                name="subject"
                :data="dataSubjectsCombobox"
                :disabled="isLoading"
                :model-value="value"
                @update:model-value="setFieldValue('subjectSlug', $event)"
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ value }" name="semesterSlug">
          <FormItem>
            <FormLabel>Kỳ học</FormLabel>

            <FormControl>
              <Combobox
                name="semester"
                :data="dataSemestersCombobox"
                :disabled="isLoading"
                :model-value="value"
                @update:model-value="setFieldValue('semesterSlug', $event)"
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>
      </div>
    </div>

    <DialogFooter class="gap-2">
      <Button type="button" variant="outline" @click="handleClose" :disabled="isLoading">
        Hủy
      </Button>

      <Button type="submit" :disabled="isLoading">
        Lưu
      </Button>
    </DialogFooter>
  </form>
</template>