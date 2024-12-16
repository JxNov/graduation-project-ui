<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, useField } from 'vee-validate'
import { z } from 'zod'

const { $authStore, $homeworkStore } = useNuxtApp()
const route = useRoute()

const props = defineProps<{
  data: any
  dueDate: string | undefined
}>()

const isLoading = ref<boolean>(true)
const isLoadingForm = ref<boolean>(false)
const isDueDate = ref<boolean>(false)
const dataUser = ref<any>(null)

const formSchema = toTypedSchema(z.object({
  file: z.instanceof(File)
    .refine((file) => file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type === 'application/zip', {
      message: 'File must be a PDF, DOCX, or ZIP'
    })
}))

const { handleSubmit, errors } = useForm({
  validationSchema: formSchema
})

const { value: file, errorMessage: fileError, handleChange: handleFileChange } = useField('file')

watch(() => props.dueDate, (dueDate) => {
  const currentDate = new Date()
  isDueDate.value = currentDate <= new Date(dueDate || '')
})

watch(() => props.data, (data) => {
  if (data.length > 0) {
    data.forEach((item: any) => {
      if (item.studentUsername === $authStore.user.username) {
        dataUser.value = item
      }
    })

    isLoading.value = false
  }
})

const onSubmit = handleSubmit(async (values) => {
  isLoadingForm.value = true

  const data = {
    username: $authStore.user.username,
    file: values.file
  }

  try {
    const response = await $homeworkStore.submitAssignment(route.params.homeworkSlug as string, data)

    if (!response) {
      throw new Error('Failed to submit assignment')
    }

    isLoadingForm.value = false
    dataUser.value = response
  } catch (error) {
    isLoadingForm.value = false
    throw error
  }
})

const openFileAssignment = (filePath: string) => {
  window.open(`https://drive.google.com/file/d/${filePath}/view`, '_blank')
}

const countDateDays = (date: string) => {
  const date1 = new Date(date)
  const date2 = new Date()

  const diffTime = Math.abs(date2.getTime() - date1.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays > 1) {
    return `${diffDays} ngày`
  } else {
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60))
    if (diffHours > 1) {
      return `${diffHours} giờ`
    } else {
      const diffMinutes = Math.ceil(diffTime / (1000 * 60))
      if (diffMinutes > 1) {
        return `${diffMinutes} phút`
      } else {
        return `${Math.ceil(diffTime / 1000)} giây`
      }
    }
  }
}

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('en-US').format(value)
}
</script>

<template>
  <Card>
    <CardHeader class="flex flex-row justify-between items-center">
      <CardTitle class="2xl:text-xl">Bài tập của bạn</CardTitle>

      <CardDescription
        :class="dataUser?.submittedAt ? 'text-green-500' : 'text-red-500'"
        v-if="!isLoading"
      >
        {{ dataUser?.submittedAt ? 'Đã nộp' : 'Chưa nộp' }}
      </CardDescription>
    </CardHeader>

    <CardContent v-if="isLoading">
      <div class="w-full h-32 bg-gray-200 rounded-md animate-pulse"></div>
    </CardContent>

    <CardContent v-else-if="dataUser?.filePath">
      <img
        v-if="dataUser.filePath"
        :src="`https://drive.google.com/thumbnail?id=${dataUser.filePath}`"
        class="w-full h-32 object-cover rounded-md aspect-square cursor-pointer"
        :alt="dataUser.studentName"
        loading="lazy"
        @click="openFileAssignment(dataUser.filePath)"
      />

      <div class="flex justify-between items-center mt-4">
        <p class="text-sm">
          {{ countDateDays(dataUser.submittedAt) }} trước
        </p>

        <p class="text-sm text-green-500" v-if="dataUser.score">
          Đã chấm điểm: {{ formatNumber(dataUser.score) }}
        </p>

        <p class="text-sm text-red-500" v-else>
          Chưa chấm
        </p>
      </div>

      <!--      <Button-->
      <!--        type="button"-->
      <!--        class="w-full select-none mt-4"-->
      <!--        variant="outline"-->
      <!--      >-->
      <!--        Huỷ nộp bài-->
      <!--      </Button>-->
    </CardContent>

    <CardContent v-else-if="isDueDate">
      <form @submit="onSubmit" class="flex flex-col justify-between gap-4" v-if="isDueDate">
        <FormField name="file">
          <FormItem>
            <FormControl>
              <Input type="file" @change="handleFileChange" :disabled="isLoadingForm" />
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit" class="w-full select-none" :disabled="isLoadingForm">
          Gửi bài
        </Button>
      </form>

      <div class="flex items-center justify-center" v-else>
        <CardDescription class="text-xs italic">Không thể nộp bài tập sau ngày đến hạn</CardDescription>
      </div>
    </CardContent>
  </Card>
</template>