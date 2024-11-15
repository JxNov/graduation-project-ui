<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'

const isOpen = ref<boolean>(false)
const isOpenDialog = ref<boolean>(false)

const formSchema = toTypedSchema(z.object({
  content: z.string().default('')
}))

const { handleSubmit, values, setFieldValue } = useForm({
  validationSchema: formSchema,
  initialValues: {
    content: ''
  }
})

const onSubmit = handleSubmit((values) => {
  console.log(values)
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
    <Card class="cursor-pointer select-none rounded-t-none shadow-none border-none">
      <CardHeader class="flex flex-row items-center gap-4" @click="toggleCollapsible">
        <Avatar>
          <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
          <AvatarFallback>CN</AvatarFallback>
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
                  />
                </FormControl>
              </FormItem>
            </FormField>
          </CardContent>

          <CardFooter class="flex justify-end space-x-2">
            <Button type="button" variant="outline" @click="toggleCollapsible">Hủy</Button>

            <Button type="submit">Submit</Button>
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
