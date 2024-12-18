<script setup lang="ts">
import { Checkbox } from '~/components/ui/checkbox'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useForm } from 'vee-validate'
import DatePicker from '~/components/base/DatePicker.vue'
import { type DateValue, getLocalTimeZone, today } from '@internationalized/date'
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
const dateOfBirth = ref<DateValue>(today(getLocalTimeZone()))

const initialValues = ref<any>({
  name: '',
  dateOfBirth: dateOfBirth.value.toString(),
  gender: 'Male',
  address: '',
  phone: '',
  academicYearSlug: '',
  generationSlug: ''
})

const formSchema = toTypedSchema(z.object({
  name: z.string().max(50),
  dateOfBirth: z.string(),
  gender: z.enum(['Male', 'Female'], {
    required_error: 'Bạn cần chọn giới tính.'
  }),
  address: z.string(),
  phone: z.string().min(10).refine((value) => {
    return !isNaN(Number(value))
  }, {
    message: 'Số điện thoại phải là số chứ không phải chuỗi.'
  }),
  academicYearSlug: z.string(),
  generationSlug: z.string()
}))

const { setFieldValue, handleSubmit, isFieldDirty } = useForm({
  validationSchema: formSchema,
  initialValues: initialValues.value
})

const handleChangeDateOfBirth = (date: DateValue) => {
  dateOfBirth.value = date
  setFieldValue('dateOfBirth', date.toString())
}

const handleClose = () => {
  $bus.emit('close-dialog-create-edit', false)
}

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true

  try {
    const response = await $studentStore.createStudent({
      name: values.name,
      dateOfBirth: values.dateOfBirth,
      gender: values.gender,
      address: values.address,
      phone: values.phone,
      academicYearSlug: values.academicYearSlug,
      generationSlug: values.generationSlug
    })

    if (!response) {
      throw new Error('Tạo mới học sinh thất bại')
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
        Tạo mới học sinh
      </DialogTitle>

      <DialogDescription>
        Tạo mới 1 học sinh
      </DialogDescription>
    </DialogHeader>

    <div class="space-y-6">
      <FormField v-slot="{ componentField }" name="name" :validate-on-blur="!isFieldDirty">
        <FormItem>
          <FormLabel>Tên học sinh</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Tên học sinh" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <DatePicker
        name="startDate"
        label="Ngày sinh"
        :model-value="dateOfBirth"
        :disabled="isLoading"
        @update:model-value="handleChangeDateOfBirth"
      />

      <FormField v-slot="{ componentField }" type="radio" name="gender">
        <FormItem class="space-y-3">
          <FormLabel>Giới tính</FormLabel>

          <FormControl>
            <RadioGroup
              class="flex space-x-6"
              v-bind="componentField"
            >
              <FormItem class="flex items-center space-y-0 gap-x-3">
                <FormControl>
                  <RadioGroupItem value="Male" />
                </FormControl>
                <FormLabel class="font-normal">
                  Nam
                </FormLabel>
              </FormItem>

              <FormItem class="flex items-center space-y-0 gap-x-3">
                <FormControl>
                  <RadioGroupItem value="Female" />
                </FormControl>
                <FormLabel class="font-normal">
                  Nữ
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="address" :validate-on-blur="!isFieldDirty">
        <FormItem>
          <FormLabel>Địa chỉ</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Ex: Me Linh - Ha Noi" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="phone" :validate-on-blur="!isFieldDirty">
        <FormItem>
          <FormLabel>Số điện thoại</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Ex: 0123456789" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ value }" name="generationSlug">
        <FormItem>
          <FormLabel>Khóa học sinh</FormLabel>

          <FormControl>
            <Combobox
              name="khóa học sinh"
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
          <FormLabel>Năm học</FormLabel>

          <FormControl>
            <Combobox
              name="năm học"
              :data="dataAcademicYearsCombobox"
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
        Hủy
      </Button>

      <Button type="submit" :disabled="isLoading">
        Lưu
      </Button>
    </DialogFooter>
  </form>
</template>