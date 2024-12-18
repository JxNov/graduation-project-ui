<script setup lang="ts">
import { Checkbox } from '~/components/ui/checkbox'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useForm } from 'vee-validate'
import TagsCombobox from '~/components/base/TagsCombobox.vue'

const { $userStore, $bus } = useNuxtApp()

const isLoading = ref<boolean>(false)

const users = $userStore.users.map(user => ({ label: user.name, value: user.email }))

const formSchema = toTypedSchema(z.object({
  email: z.array(z.string()).min(1)
}))

const { setFieldValue, handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    email: []
  }
})

const handleClose = () => {
  $bus.emit('close-dialog-restore', false)
}

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true

  try {
    const response = await $userStore.forgotPassword(values)

    if (!response) {
      throw new Error('Có lỗi xảy ra khi khôi phục mật khẩu')
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
        Khôi phục mật khẩu
      </DialogTitle>

      <DialogDescription>
        Khôi phục mật khẩu cho người dùng
      </DialogDescription>
    </DialogHeader>

    <div class="space-y-6">
      <FormField v-slot="{ value }" name="email">
        <FormItem>
          <FormLabel>Người dùng</FormLabel>

          <FormControl>
            <TagsCombobox
              placeholder="Chọn người dùng"
              :data="users"
              v-bind:model-value="value"
              @update:model-value="value"
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