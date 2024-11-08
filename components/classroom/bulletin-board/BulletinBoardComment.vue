<script setup lang="ts">
import { ChatBubbleIcon } from '@radix-icons/vue'

const isOpen = ref<boolean>(false)
</script>

<template>
  <Collapsible v-model:open="isOpen" class="flex flex-col gap-4 px-6 pt-6 pb-2">
    <CollapsibleTrigger as-child>
      <Button variant="ghost" class="max-w-56 gap-2 justify-start pl-2">
        <ChatBubbleIcon class="w-5 h-5" />
        <span>2 nhận xét về lớp học</span>
      </Button>
    </CollapsibleTrigger>

    <CollapsibleContent class="space-y-4">
      <div class="flex flex-row items-center gap-4">
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis
            ac neque.
          </p>
        </div>
      </div>

      <div class="flex flex-row items-center gap-4">
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis
            ac neque.
          </p>
        </div>
      </div>
    </CollapsibleContent>
  </Collapsible>
</template>
