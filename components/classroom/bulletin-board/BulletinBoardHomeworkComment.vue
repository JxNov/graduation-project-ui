<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'

const open = ref<boolean>(false)
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
</script>

<template>
  <CardFooter class="border-t pt-2 -mb-3" @click="isOpenDialog = true">
    <Button type="button" variant="link" class="p-0">
      2 nhận xét về lớp
    </Button>
  </CardFooter>

  <Dialog :open="isOpenDialog" @update:open="isOpenDialog = false">
    <DialogContent
      class="sm:max-w-[625px] max-h-[550px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border">
      <DialogHeader class="mb-2 pt-4">
        <DialogTitle>Nhận xét của lớp học</DialogTitle>
      </DialogHeader>

      <div class="grid gap-4 mb-2">
        <div class="flex flex-row items-start gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div>
            <CardTitle>
              Card Title
              <span class="text-xs ml-3">03:18</span>
            </CardTitle>

            <p class="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec,
              mattis
              ac neque.
            </p>
          </div>
        </div>

        <div class="flex flex-row items-start gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div>
            <CardTitle>
              Card Title
              <span class="text-xs ml-3">03:18</span>
            </CardTitle>

            <p class="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec,
              mattis
              ac neque.
            </p>
          </div>
        </div>
      </div>

      <Collapsible v-model:open="open">
        <div class="flex flex-col gap-4 cursor-pointer select-none rounded-t-none shadow-none border-none">
          <CollapsibleTrigger as-child>
            <div class="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <CardDescription>
                Thêm nhận xét trong lớp học...
              </CardDescription>
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <form @submit="onSubmit" class="flex flex-col gap-4">
              <div>
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
              </div>

              <div class="flex justify-end space-x-2">
                <Button type="submit">Gửi</Button>
              </div>
            </form>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </DialogContent>
  </Dialog>
</template>
