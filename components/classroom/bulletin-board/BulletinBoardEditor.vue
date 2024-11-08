<script setup lang="ts">
import Editor from '../Editor.vue'

const isOpen = ref<boolean>(false)
</script>

<template>
  <Collapsible v-model:open="isOpen">
    <Card class="cursor-pointer select-none">
      <CollapsibleTrigger as-child>
        <CardHeader class="flex flex-row items-center gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <CardDescription>Thông báo nội dung nào đó cho lớp học của bạn</CardDescription>
        </CardHeader>

        <CollapsibleContent>
          <CardContent>
            <Editor />
          </CardContent>

          <CardFooter class="flex justify-end">
            <Button variant="outline" @click="isOpen = false">Hủy</Button>
          </CardFooter>
        </CollapsibleContent>
      </CollapsibleTrigger>
    </Card>
  </Collapsible>
</template>
