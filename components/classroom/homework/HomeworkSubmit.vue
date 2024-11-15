<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, useField } from 'vee-validate'
import { z } from 'zod'

const formSchema = toTypedSchema(z.object({
  file: z.instanceof(File).nullable().refine(file => file !== null, {
    message: 'File is required'
  })
}))

const { handleSubmit, errors } = useForm({
  validationSchema: formSchema
})

const { value: file, errorMessage: fileError, handleChange: handleFileChange } = useField('file')

const onSubmit = handleSubmit((values) => {
  console.log(values)
})
</script>

<template>
  <Card>
    <CardHeader class="flex flex-row justify-between items-center">
      <CardTitle class="2xl:text-xl">Bài tập của bạn</CardTitle>

      <CardDescription>Đã giao</CardDescription>
    </CardHeader>

    <CardContent>
      <form @submit="onSubmit" class="flex flex-col justify-between gap-4">
        <FormField name="file">
          <FormItem>
            <FormControl>
              <Input type="file" @change="handleFileChange" />
            </FormControl>
            <FormMessage v-if="fileError">{{ fileError }}</FormMessage>
          </FormItem>
        </FormField>

        <Button type="submit" class="w-full select-none">Gửi bài</Button>

        <!--        <Button type="button" variant="outline" disabled class="w-full select-none">Gửi bài</Button>-->

        <!--        <div class="flex items-center justify-center">-->
        <!--          <CardDescription class="text-xs italic">Không thể nộp bài tập sau ngày đến hạn</CardDescription>-->
        <!--        </div>-->
      </form>
    </CardContent>
  </Card>
</template>