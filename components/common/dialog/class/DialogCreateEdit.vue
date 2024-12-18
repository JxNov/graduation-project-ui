<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useForm } from 'vee-validate'
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
        throw new Error('Tạo mới lớp học thất bại')
      }

      isLoading.value = false
      handleClose()
      return
    }

    const response = await $classStore.updateClass(props.data.slug, values)

    if (!response) {
      throw new Error('Cập nhật lớp học thất bại')
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
      <DialogTitle v-if="props.edit">Sửa lớp học</DialogTitle>
      <DialogTitle v-else>Tạo mới lớp học</DialogTitle>

      <DialogDescription v-if="props.edit">
        Sửa lớp học <strong>{{ props.data.name }}</strong>.
      </DialogDescription>
      <DialogDescription v-else>
        Tạo mới 1 lớp học.
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
