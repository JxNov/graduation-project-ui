<script setup lang="ts">
import { Checkbox } from '~/components/ui/checkbox'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useForm } from 'vee-validate'
import DatePicker from '~/components/base/DatePicker.vue'
import { type DateValue, getLocalTimeZone, today } from '@internationalized/date'

const { $userStore, $bus } = useNuxtApp()

const isLoading = ref<boolean>(false)
const dateOfBirth = ref<DateValue>(today(getLocalTimeZone()))

const initialValues = ref<any>({
  name: '',
  dateOfBirth: dateOfBirth.value.toString(),
  gender: 'Male',
  address: '',
  phone: ''
})

const formSchema = toTypedSchema(z.object({
  name: z.string().max(50),
  dateOfBirth: z.string(),
  gender: z.enum(['Male', 'Female'], {
    required_error: 'You need to select a notification type.'
  }),
  address: z.string(),
  phone: z.string().min(10).refine((value) => {
    return !isNaN(Number(value))
  }, {
    message: 'Phone number must be a number not a string.'
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
    const response = await $userStore.createUser({
      name: values.name,
      dateOfBirth: values.dateOfBirth,
      gender: values.gender,
      address: values.address,
      phone: values.phone
    })

    if (!response) {
      throw new Error('Failed to create user')
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
        Create/Edit User
      </DialogTitle>

      <DialogDescription>
        Create or edit user role and permission
      </DialogDescription>
    </DialogHeader>

    <div class="space-y-6">
      <FormField v-slot="{ componentField }" name="name" :validate-on-blur="!isFieldDirty">
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Full name" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <DatePicker
        name="startDate"
        label="Start date"
        :model-value="dateOfBirth"
        :disabled="isLoading"
        @update:model-value="handleChangeDateOfBirth"
      />

      <FormField v-slot="{ componentField }" type="radio" name="gender">
        <FormItem class="space-y-3">
          <FormLabel>Gender</FormLabel>

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
                  Male
                </FormLabel>
              </FormItem>

              <FormItem class="flex items-center space-y-0 gap-x-3">
                <FormControl>
                  <RadioGroupItem value="Female" />
                </FormControl>
                <FormLabel class="font-normal">
                  Female
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="address" :validate-on-blur="!isFieldDirty">
        <FormItem>
          <FormLabel>Address</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Ex: Me Linh - Ha Noi" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="phone" :validate-on-blur="!isFieldDirty">
        <FormItem>
          <FormLabel>Phone</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Ex: 0123456789" v-bind="componentField" />
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