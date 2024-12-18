<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useForm } from 'vee-validate'
import Combobox from '~/components/base/Combobox.vue'

const { $studentStore, $academicYearStore, $teacherStore, $blockStore, $classStore, $bus } = useNuxtApp()

const props = defineProps<{
  data: any
}>()

const isLoading = ref<boolean>(false)

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

const formSchema = toTypedSchema(z.object({
  name: z.string(),
  username: z.string(),
  academicYearSlug: z.string(),
  blockSlug: z.string()
}))

const { setFieldValue, handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: props.data.name || '',
    username: props.data.username || '',
    academicYearSlug: props.data.academicYearSlug || '',
    blockSlug: props.data.blockSlug || ''
  }
})

const handleClose = () => {
  $bus.emit('close-dialog-up-to-class', false)
}

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true

  try {
    const response = await $classStore.promoteStudents(props.data.slug, {
      name: values.name,
      username: values.username,
      academicYearSlug: values.academicYearSlug,
      blockSlug: values.blockSlug
    })

    if (!response) {
      throw new Error('Lên lớp thất bại')
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
      <DialogTitle>
        Lên lớp
      </DialogTitle>

      <DialogDescription>
        Lên lớp khi kết thúc năm học
      </DialogDescription>
    </DialogHeader>

    <div class="space-y-6">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Tên lớp</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Tên lớp..." v-bind="componentField" :disabled="isLoading" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ value }" name="username">
        <FormItem>
          <FormLabel>GVCN</FormLabel>

          <FormControl>
            <Combobox name="giáo viên chủ nhiệm" :data="dataTeachersCombobox" :disabled="isLoading" :model-value="value"
              @update:model-value="setFieldValue('username', $event)" />
          </FormControl>

          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ value }" name="academicYearSlug">
        <FormItem>
          <FormLabel>Năm học</FormLabel>

          <FormControl>
            <Combobox name="năm học" :data="dataAcademicYearsCombobox" :disabled="isLoading" :model-value="value"
              @update:model-value="setFieldValue('academicYearSlug', $event)" />
          </FormControl>

          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ value }" name="blockSlug">
        <FormItem>
          <FormLabel>Khối</FormLabel>

          <FormControl>
            <Combobox name="khối" :data="dataBlocksCombobox" :disabled="isLoading" :model-value="value"
              @update:model-value="setFieldValue('blockSlug', $event)" />
          </FormControl>

          <FormMessage />
        </FormItem>
      </FormField>
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