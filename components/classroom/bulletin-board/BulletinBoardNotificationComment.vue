<script setup lang="ts">
import { ChatBubbleIcon } from '@radix-icons/vue'

defineProps<{
  comments: any
}>()

const isOpen = ref<boolean>(false)

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
</script>

<template>
  <Collapsible v-model:open="isOpen" class="flex flex-col gap-4 px-6 pt-6 pb-2">
    <CollapsibleTrigger as-child>
      <Button type="button" variant="ghost" class="max-w-fit gap-2 justify-center pl-2">
        <ChatBubbleIcon class="w-5 h-5" />
        <span>{{ comments.length }} nhận xét</span>
      </Button>
    </CollapsibleTrigger>

    <CollapsibleContent class="space-y-4">
      <div class="flex flex-row items-start gap-4" v-for="comment in comments" :key="comment.id">
        <Avatar>
          <AvatarImage :src="comment.userImage || ''" :alt="comment.name[0]" />
          <AvatarFallback>{{ comment.name.split(' ').map((name: string) => name[0]).join('') }}</AvatarFallback>
        </Avatar>

        <div>
          <CardTitle>
            {{ comment.name }}
            <span class="text-xs ml-3">
              {{ countDateDays(comment.createdAt) }} trước
            </span>
          </CardTitle>

          <div class="text-sm prose" v-html="comment.content" />
        </div>
      </div>
    </CollapsibleContent>
  </Collapsible>
</template>
