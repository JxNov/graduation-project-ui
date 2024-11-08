<script setup lang="ts">
import Editor from '../Editor.vue'

const isOpen = ref<boolean>(false)
</script>

<template>
  <div class="border-t">
    <slot />

    <Collapsible v-model:open="isOpen">
      <Card class="cursor-pointer select-none rounded-t-none shadow-none border-none">
        <CollapsibleTrigger as-child>
          <CardHeader class="flex flex-row items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <CardDescription>
              Thêm nhận xét trong lớp học...
            </CardDescription>
          </CardHeader>

          <CollapsibleContent>
            <CardContent>
              <Editor />
            </CardContent>
          </CollapsibleContent>
        </CollapsibleTrigger>
      </Card>
    </Collapsible>
  </div>
</template>
