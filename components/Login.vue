<script setup lang="ts">
import {h} from 'vue'
import {useForm} from 'vee-validate'
import {toTypedSchema} from '@vee-validate/zod'
import * as z from 'zod'
import {vAutoAnimate} from '@formkit/auto-animate/vue'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Toaster} from '@/components/ui/toast'
import {useToast} from '@/components/ui/toast/use-toast'
import {Mail} from 'lucide-vue-next'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const {toast} = useToast()

const formSchema = toTypedSchema(z.object({
  email: z.string().email(),
  password: z.string().min(8),
}))

const {isFieldDirty, handleSubmit} = useForm({
  validationSchema: formSchema,
})

const alertToast = (title: string, description: string, status: 'success' | 'error' = 'success') => {
  toast({
    title,
    description,
    duration: 5000,
    class: {
      'bg-green-500': status === 'success',
      'bg-red-500': status === 'error',
      'text-white': true,
    },
  })
}

const onSubmit = handleSubmit((values) => {
  // alertToast('Error', 'Invalid email or password', 'error')
  // alertToast('Success', 'Login successfully', 'success')
})
</script>

<template>
  <Toaster/>

  <main class="flex items-center justify-center min-h-screen bg-gray-100">
    <Card class="max-w-[320px] md:max-w-[400px] w-full">
      <CardHeader>
        <CardTitle class="text-center text-3xl">Login</CardTitle>
      </CardHeader>

      <CardContent>
        <form @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem class="mb-4">
              <FormLabel>Email</FormLabel>

              <FormControl>
                <Input type="text" placeholder="example@gmail.com" v-bind="componentField"/>
              </FormControl>

              <FormMessage/>
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>Password</FormLabel>

              <FormControl>
                <Input type="password" v-bind="componentField"/>
              </FormControl>

              <FormMessage/>
            </FormItem>
          </FormField>
        </form>
      </CardContent>

      <CardFooter>
        <div class="w-full">
          <Button class="w-full" @click="onSubmit">Login</Button>

          <div class="relative my-4">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t"/>
            </div>

            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button class="w-full" variant="outline">
            <Mail class="w-5 h-5 mr-2"/>
            @edu.vn
          </Button>

          <Button class="w-full mt-2" variant="secondary" @click="() => $router.push('/')">
            Back to Home
          </Button>
        </div>
      </CardFooter>
    </Card>
  </main>
</template>