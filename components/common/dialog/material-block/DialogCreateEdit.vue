<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import Combobox from '~/components/base/Combobox.vue'

const { $subjectStore, $blockStore, $materialStore, $bus } = useNuxtApp()

interface DialogEditProps {
  data?: any,
  edit?: boolean,
}

const props = defineProps<DialogEditProps>()

const dataBlocksCombobox = $blockStore.blocks.map((block) => ({
  value: block.slug,
  label: block.name
}))
const dataSubjectsCombobox = $subjectStore.subjects.map((subject) => ({
  value: subject.slug,
  label: subject.name
}))

const isLoading = ref<boolean>(false)
const initialValues = props.edit ? {
  title: props.data.title,
  description: props.data.description || '',
  file: [],
  blockSlug: props.data.blockSlug,
  subjectSlug: props.data.subjectSlug
} : {
  title: '',
  description: '',
  file: [],
  blockSlug: '',
  subjectSlug: ''
}

const formSchema = toTypedSchema(z.object({
  title: z.string(),
  description: z.string().nullable(),
  file: z.array(z.instanceof(File)),
  blockSlug: z.string(),
  subjectSlug: z.string()
}))

const { setFieldValue, handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: initialValues
})

const handleClose = () => {
  $bus.emit('close-dialog-create-edit', false)
}

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  const file = values.file[0]

  const data = {
    title: values.title,
    description: values.description,
    file,
    blockSlug: values.blockSlug,
    subjectSlug: values.subjectSlug
  }

  try {
    if (props.edit) {
      const response = await $materialStore.updateMaterialBlock(props.data.slug, data)

      if (!response) {
        throw new Error('Cập nhật tài liệu thất bại')
      }

      handleClose()
      return
    }

    const response = await $materialStore.createMaterialBlock(data)

    if (!response) {
      throw new Error('Thêm mới tài liệu thất bại')
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
        Sửa tài liệu khối học
      </DialogTitle>
      <DialogTitle v-else>
        Thêm mới tài liệu khối học
      </DialogTitle>

      <DialogDescription v-if="props.edit">
        Sửa tài liệu khối
      </DialogDescription>
      <DialogDescription v-else>
        Thêm mới tài liệu khối
      </DialogDescription>
    </DialogHeader>

    <div class="space-y-6">
      <FormField v-slot="{ componentField }" name="title">
        <FormItem>
          <FormLabel>Tiêu đề</FormLabel>

          <FormControl>
            <Input type="text" placeholder="Tiêu đề..." v-bind="componentField" :disabled="isLoading" />
          </FormControl>

          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="description">
        <FormItem>
          <FormLabel>Mô tả</FormLabel>
          <FormControl>
            <Textarea placeholder="Mô tả tài liệu" class="resize-none h-24" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField name="file">
        <FormItem>
          <FormLabel>Tài liệu</FormLabel>
          <FormControl>
            <BaseDropzone :max-files="1" @update:model-value="setFieldValue('file', $event)" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ value }" name="subjectSlug">
        <FormItem>
          <FormLabel>Môn học</FormLabel>

          <FormControl>
            <Combobox name="môn học" :data="dataSubjectsCombobox" :disabled="isLoading" :model-value="value"
              @update:model-value="setFieldValue('subjectSlug', $event)" />
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