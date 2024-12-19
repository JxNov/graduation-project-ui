<script setup lang="ts">
import { Checkbox } from '~/components/ui/checkbox'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useForm } from 'vee-validate'
import DatePicker from '~/components/base/DatePicker.vue'
import { type DateValue, getLocalTimeZone, parseDate, today } from '@internationalized/date'

const { $userStore, $bus } = useNuxtApp()

interface DialogEditProps {
  data?: any,
  edit?: boolean,
}

const props = defineProps<DialogEditProps>()

const isLoading = ref<boolean>(false)
const dateOfBirth = ref<DateValue>(today(getLocalTimeZone()))

const initialValues = ref<any>({
  name: '',
  dateOfBirth: dateOfBirth.value.toString(),
  gender: 'Male',
  address: '',
  phone: ''
})

if (props.edit) {
  console.log(props.data)
  const formatDateOfBirth = props.data.dateOfBirth.split('/').reverse().join('-')

  initialValues.value = {
    name: props.data.name,
    dateOfBirth: formatDateOfBirth,
    gender: props.data.gender,
    address: props.data.address,
    phone: props.data.phoneNumber
  }
  dateOfBirth.value = parseDate(formatDateOfBirth)
}

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
  })
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
    if (props.edit) {
      const response = await $userStore.updateUser(props.data.username, {
        name: values.name,
        dateOfBirth: values.dateOfBirth,
        gender: values.gender,
        address: values.address,
        phone: values.phone
      })

      if (!response) {
        throw new Error('Không cập nhật được người dùng')
      }

      isLoading.value = false
      handleClose()
      return
    }

    const response = await $userStore.createUser({
      name: values.name,
      dateOfBirth: values.dateOfBirth,
      gender: values.gender,
      address: values.address,
      phone: values.phone
    })

    if (!response) {
      throw new Error('Không tạo được người dùng')
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
      <DialogTitle v-if="edit">
        Chỉnh sửa người dùng
      </DialogTitle>
      <DialogTitle v-else>
        Tạo mới người dùng
      </DialogTitle>

      <DialogDescription v-if="edit">
        Chỉnh sửa thông tin người dùng
      </DialogDescription>
      <DialogDescription v-else>
        Tạo mới người dùng
      </DialogDescription>
    </DialogHeader>

    <div class="space-y-6">
      <FormField v-slot="{ componentField }" name="name" :validate-on-blur="!isFieldDirty">
        <FormItem>
          <FormLabel>Tên</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Tên" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <DatePicker name="startDate" label="Ngày sinh" :model-value="dateOfBirth" :disabled="isLoading"
                  @update:model-value="handleChangeDateOfBirth" />

      <FormField v-slot="{ componentField }" type="radio" name="gender">
        <FormItem class="space-y-3">
          <FormLabel>Giới tính</FormLabel>

          <FormControl>
            <RadioGroup class="flex space-x-6" v-bind="componentField">
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