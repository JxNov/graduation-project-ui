<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { toast } from 'vue-sonner'

const { $authStore, $generalStore } = useNuxtApp()

const isLoading = ref<boolean>(false)

const formSchema = toTypedSchema(z.object({
  password: z.string().min(8),
  email: z.string().email()
}))

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema
})

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true

  try {
    await $authStore.login(values)
    if (!$generalStore.isLogged) {
      throw new Error('Login failed!')
    }

    isLoading.value = false
    toast.success('Login successful!', {
      action: {
        label: 'Undo'
      }
    })
    navigateTo('/')
  } catch (error) {
    isLoading.value = false
    toast.error('Login failed!', {
      action: {
        label: 'Undo'
      }
    })
  }
})
</script>

<template>
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
          <Input type="password" v-bind="componentField" :disabled="isLoading" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit" class="w-full" :disabled="isLoading">
      <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
      {{ $t('auth.login.title') }}
    </Button>

    <Button type="button" variant="outline" class="w-full flex items-center justify-center gap-2">
      <Icon name="devicon:google" size="18" />
      <span>{{ $t('auth.login.google') }}</span>
    </Button>
  </form>
</template>
