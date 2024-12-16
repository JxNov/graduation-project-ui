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
        throw new Error('Failed to update material')
      }

      handleClose()
      return
    }

    const response = await $materialStore.createMaterialBlock(data)

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
        Edit Material for Block
      </DialogTitle>
      <DialogTitle v-else>
        Create Material for Block
      </DialogTitle>

      <DialogDescription v-if="props.edit">
        Edit Material
      </DialogDescription>
      <DialogDescription v-else>
        Create Material
      </DialogDescription>
    </DialogHeader>

    <div class="space-y-6">
      <FormField v-slot="{ componentField }" name="title">
        <FormItem>
          <FormLabel>Title</FormLabel>

          <FormControl>
            <Input type="text" placeholder="Title..." v-bind="componentField" :disabled="isLoading" />
          </FormControl>

          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="description">
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
          <Textarea
            placeholder="Material description"
            class="resize-none h-24"
            v-bind="componentField"
          />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField name="file">
        <FormItem>
          <FormLabel>File</FormLabel>
          <FormControl>
            <BaseDropzone
              :max-files="1"
              @update:model-value="setFieldValue('file', $event)"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ value }" name="subjectSlug">
        <FormItem>
          <FormLabel>Subject</FormLabel>

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