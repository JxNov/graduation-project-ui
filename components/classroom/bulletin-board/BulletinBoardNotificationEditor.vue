<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'

const { $authStore, $articleStore } = useNuxtApp()

const props = defineProps<{
  articleId: number
  comment?: any
}>()

const emits = defineEmits<{
  (e: 'removeComment', value: any): void
}>()

const isOpen = ref<boolean>(false)
const isOpenDialog = ref<boolean>(false)
const isLoading = ref<boolean>(false)

const formSchema = toTypedSchema(z.object({
  content: z.string().default(''),
  articleId: z.number(),
  commentId: z.number().optional().nullable()
}))

const { handleSubmit, values, setFieldValue } = useForm({
  validationSchema: formSchema,
  initialValues: {
    content: '',
    articleId: props.articleId,
    commentId: props.comment?.id
  }
})

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true

  try {
    if (values.commentId) {
      const response = await $articleStore.updateComment(values.commentId, {
        content: values.content
      })

      if (!response) {
        throw new Error('Failed to update article comment')
      }

      isOpenDialog.value = false
      isOpen.value = false
      setFieldValue('content', '')
      setFieldValue('commentId', null)
      emits('removeComment', null)
      isLoading.value = false
      return
    }

    const response = await $articleStore.createComment(values)

    if (!response) {
      throw new Error('Failed to create article comment')
    }

    isOpenDialog.value = false
    isOpen.value = false
    setFieldValue('content', '')
    emits('removeComment', null)
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
  }
})

const updateContent = (value: string) => {
  setFieldValue('content', value)
}

const toggleCollapsible = (event: Event) => {
  if (isOpen.value && values.content) {
    isOpenDialog.value = true
    event.stopPropagation()
    return
  }

  isOpen.value = !isOpen.value
}

const closeAll = () => {
  isOpenDialog.value = false
  isOpen.value = false
  setFieldValue('content', '')
  setFieldValue('commentId', null)
  emits('removeComment', null)
}

watchEffect(() => {
  if (props.comment) {
    isOpen.value = true
    setFieldValue('content', props.comment.content)
    setFieldValue('commentId', props.comment.id)

    const element = document.getElementById(`article-${props.articleId}`) as HTMLElement

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
  }
})
</script>

<template>
  <div class="border-t">
    <slot />

    <Collapsible v-model:open="isOpen">
      <Card class="select-none rounded-t-none shadow-none border-none" :id="`article-${props.articleId}`">
        <CardHeader
          class="cursor-pointer flex flex-row items-center gap-4"
          @click="toggleCollapsible"
        >
          <Avatar>
            <AvatarImage :src="$authStore.user.image || ''" :alt="$authStore.user.name" />
            <AvatarFallback>{{ $authStore.user.name.split(' ').map((name: string) => name[0]).join('') }}
            </AvatarFallback>
          </Avatar>

          <CardDescription>
            Thêm nhận xét trong lớp học...
          </CardDescription>
        </CardHeader>

        <CollapsibleContent>
          <form @submit="onSubmit">
            <CardContent>
              <FormField name="content">
                <FormItem>
                  <FormControl class="h-[13rem]">
                    <BaseTiptapEditor
                      :model-value="values.content ?? ''"
                      @update:model-value="updateContent"
                      :disabled="isLoading"
                    />
                  </FormControl>
                </FormItem>
              </FormField>
            </CardContent>

            <CardFooter class="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                @click="toggleCollapsible"
                :disabled="isLoading"
              >
                Hủy
              </Button>

              <Button type="submit" :disabled="isLoading">Submit</Button>
            </CardFooter>
          </form>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  </div>

  <Dialog :open="isOpenDialog" @update:open="isOpenDialog = $event">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader class="mb-10 pt-4">
        <DialogTitle>Bạn có chắc chắn muốn hủy bài viết?</DialogTitle>
      </DialogHeader>

      <DialogFooter class="gap-2">
        <Button type="button" variant="outline" @click="isOpenDialog = false">Hủy</Button>

        <Button type="button" variant="destructive" @click="closeAll">Đồng ý</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
