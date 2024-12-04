<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'

const { $authStore, $articleStore, $bus } = useNuxtApp()

const props = defineProps<{
  classSlug: string
}>()

const isOpen = ref<boolean>(false)
const isOpenDialog = ref<boolean>(false)
const isLoading = ref<boolean>(false)

const formSchema = toTypedSchema(z.object({
  content: z.string().default(''),
  classSlug: z.string().default('')
}))

const { handleSubmit, values, setFieldValue } = useForm({
  validationSchema: formSchema,
  initialValues: {
    content: '',
    classSlug: props.classSlug
  }
})

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true

  try {
    const response = await $articleStore.createArticle(values)

    if (!response) {
      throw new Error('Failed to create article')
    }

    setFieldValue('content', '')
    $bus.emit('article:created', response)
    isOpen.value = false
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
}
</script>

<template>
  <Collapsible v-model:open="isOpen">
    <Card class="select-none transition-shadow duration-300 ease-in-out shadow-md hover:shadow-xl">
      <CardHeader
        class="flex flex-row items-center gap-4 cursor-pointer"
        @click="toggleCollapsible"
      >
        <Avatar>
          <AvatarImage :src="$authStore.user.image || ''" :alt="$authStore.user.name" />
          <AvatarFallback>{{ $authStore.user.name.split(' ').map((name: string) => name[0]).join('') }}</AvatarFallback>
        </Avatar>

        <CardDescription>Thông báo nội dung nào đó cho lớp học của bạn</CardDescription>
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
