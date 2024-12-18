<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useForm } from 'vee-validate'
import Combobox from '~/components/base/Combobox.vue'

const { $classStore, $academicYearStore, $blockStore, $bus } = useNuxtApp()

const dataAcademicYearsCombobox = $academicYearStore.academicYears.map((academicYear) => ({
  value: academicYear.slug,
  label: academicYear.name
}))
const dataBlocksCombobox = $blockStore.blocks.map((block) => ({
  value: block.slug,
  label: block.name
}))
const isLoading = ref<boolean>(false)

const formSchema = toTypedSchema(z.object({
  academicYearSlug: z.string(),
  blockSlug: z.string()
}))

const { setFieldValue, handleSubmit } = useForm({
  validationSchema: formSchema
})

const handleClose = () => {
  $bus.emit('close-dialog-distribution', false)
}

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true

  try {
    const response = await $classStore.distributeStudents(values.academicYearSlug, values.blockSlug)

    if (!response) {
      throw new Error('Phân lớp học sinh thất bại')
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
      <DialogTitle>Phân lớp học sinh</DialogTitle>

      <DialogDescription>Phân bố học sinh theo khối trong năm học</DialogDescription>
    </DialogHeader>

    <div class="space-y-6">
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
