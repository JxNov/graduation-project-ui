<script setup lang='ts'>
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import ProfileChangeImage from '~/components/profile/ProfileChangeImage.vue'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-icons/vue'

const { $authStore, $userStore } = useNuxtApp()

const capturedImages = ref<File[]>([])
const showOldPassword = ref<boolean>(false)
const showNewPassword = ref<boolean>(false)
const showConfirmPassword = ref<boolean>(false)
const isLoading = ref<boolean>(false)

const formSchema = toTypedSchema(z.object({
    oldPassword: z.string().min(6).optional(),
    newPassword: z.string().min(6).optional(),
    confirmPassword: z.string().min(6).optional()
  })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: 'Passwords don\'t match',
      path: ['confirmPassword']
    })
)

const { isFieldDirty, handleSubmit, setFieldValue } = useForm({
  validationSchema: formSchema
})

const togglePasswordVisibility = (field: string) => {
  switch (field) {
    case 'oldPassword':
      showOldPassword.value = !showOldPassword.value
      break
    case 'newPassword':
      showNewPassword.value = !showNewPassword.value
      break
    case 'confirmPassword':
      showConfirmPassword.value = !showConfirmPassword.value
      break
  }
}

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true

  try {
    const response = await $userStore.updateProfileInformation($authStore.user.username, {
      images: capturedImages.value,
      ...values
    })

    if (!response) {
      throw new Error('Failed to update profile information')
    }

    $authStore.user.image = response.data.image
    isLoading.value = false
    setFieldValue('oldPassword', undefined)
    setFieldValue('newPassword', undefined)
    setFieldValue('confirmPassword', undefined)
  } catch (error) {
    isLoading.value = false
    throw error
  }
})
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="flex flex-col gap-4">
      <div class="grid grid-cols-12 gap-4">
        <ProfileChangeImage
          :disabled="isLoading"
          v-if="!$authStore.user.image"
          @update:model-value="capturedImages = $event"
        />

        <div v-if="$authStore.user.image" :class="{ 'col-span-8': $authStore.user.image}" />
        <Card class="col-span-4">
          <CardHeader class="flex flex-row profiles-start gap-4">
            <h2 class="text-lg font-semibold">
              Change Password
            </h2>
          </CardHeader>

          <CardContent class="flex flex-col gap-4 border-t pt-6">
            <FormField v-slot="{ componentField }" name="oldPassword" :validate-on-blur="!isFieldDirty">
              <FormItem>
                <FormLabel>
                  Old Password
                </FormLabel>

                <FormControl>
                  <div class="relative">
                    <component
                      :is="showOldPassword ? EyeOpenIcon : EyeClosedIcon"
                      class="absolute right-2 top-2.5 size-4 text-muted-foreground cursor-pointer"
                      @click="togglePasswordVisibility('oldPassword')"
                    />

                    <Input
                      :type="showOldPassword ? 'text' : 'password'"
                      v-bind="componentField"
                      :disabled="isLoading"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="newPassword" :validate-on-blur="!isFieldDirty">
              <FormItem>
                <FormLabel>
                  New Password
                </FormLabel>

                <FormControl>
                  <div class="relative">
                    <component
                      :is="showNewPassword ? EyeOpenIcon : EyeClosedIcon"
                      class="absolute right-2 top-2.5 size-4 text-muted-foreground cursor-pointer"
                      @click="togglePasswordVisibility('newPassword')"
                    />

                    <Input
                      :type="showNewPassword ? 'text' : 'password'"
                      v-bind="componentField"
                      :disabled="isLoading"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="confirmPassword" :validate-on-blur="!isFieldDirty">
              <FormItem>
                <FormLabel>
                  Confirm Password
                </FormLabel>

                <FormControl>
                  <div class="relative">
                    <component
                      :is="showConfirmPassword ? EyeOpenIcon : EyeClosedIcon"
                      class="absolute right-2 top-2.5 size-4 text-muted-foreground cursor-pointer"
                      @click="togglePasswordVisibility('confirmPassword')"
                    />

                    <Input
                      :type="showConfirmPassword ? 'text' : 'password'"
                      v-bind="componentField"
                      :disabled="isLoading"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </CardContent>
        </Card>
      </div>

      <div class="flex justify-end">
        <Button
          type="submit"
          :disabled="isLoading"
        >
          Update Information
        </Button>
      </div>
    </div>
  </form>
</template>