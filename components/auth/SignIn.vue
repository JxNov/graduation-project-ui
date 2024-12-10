<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { toast } from 'vue-sonner'
import { ConfigProvider } from 'radix-vue'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-icons/vue'

const { $authStore, $generalStore } = useNuxtApp()
const useIdFunction = () => useId()

const isLoading = ref<boolean>(false)
const showPassword = ref<boolean>(false)

const formSchema = toTypedSchema(z.object({
  password: z.string(),
  email: z.string().email()
}))

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema
})

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true

  await $authStore.login(values)

  if (!$generalStore.isLogged) {
    toast.error('Invalid credentials')
    isLoading.value = false
    return
  }

  isLoading.value = false
  navigateTo('/')
})
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <form class="grid gap-4" @submit.prevent="onSubmit">
      <FormField v-slot="{ componentField }" name="email">
        <FormItem class="mb-4">
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="text" placeholder="example@mail.com" v-bind="componentField" :disabled="isLoading" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <div class="relative">
              <component
                :is="showPassword ? EyeOpenIcon : EyeClosedIcon"
                class="absolute right-2 top-2.5 size-4 text-muted-foreground cursor-pointer"
                @click="togglePasswordVisibility"
              />

              <Input
                :type="showPassword ? 'text' : 'password'"
                v-bind="componentField"
                :disabled="isLoading"
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button type="submit" class="w-full" :disabled="isLoading">
        <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
        {{ $t('auth.login.title') }}
      </Button>

      <!--      <Button type="button" variant="outline" class="w-full flex items-center justify-center gap-2">-->
      <!--        <Icon name="devicon:google" size="18" />-->
      <!--        <span>{{ $t('auth.login.google') }}</span>-->
      <!--      </Button>-->
    </form>
  </ConfigProvider>
</template>
