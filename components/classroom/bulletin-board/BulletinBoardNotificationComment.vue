<script setup lang="ts">
import { ChatBubbleIcon } from '@radix-icons/vue'

defineProps<{
  comments: any
}>()

const isOpen = ref<boolean>(false)

const countDateDays = (date: string) => {
  const date1 = date.split(' ')[0].split('/')
  const time1 = date.split(' ')[1].split(':')
  const date2 = new Date()
  const time2 = [date2.getHours(), date2.getMinutes(), date2.getSeconds()]

  const date1Obj = new Date(Number(date1[2]), Number(date1[1]) - 1, Number(date1[0]), Number(time1[0]), Number(time1[1]), Number(time1[2]))
  const date2Obj = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate(), time2[0], time2[1], time2[2])

  const diffTime = Math.abs(date2Obj.getTime() - date1Obj.getTime())
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
      <Button type="button" variant="ghost" class="max-w-28 gap-2 justify-start pl-2">
        <ChatBubbleIcon class="w-5 h-5" />
        <span>{{ comments.length }} nhận xét</span>
      </Button>
    </CollapsibleTrigger>

    <CollapsibleContent class="space-y-4">
      <div class="flex flex-row items-start gap-4" v-for="comment in comments" :key="comment.id">
        <Avatar>
          <AvatarImage :src="comment.userImage || ''" :alt="comment.name[0]" />
          <AvatarFallback>{{ comment.name[0] }}</AvatarFallback>
        </Avatar>

        <div>
          <CardTitle>
            {{ comment.name }}
            <span class="text-xs ml-3">
              {{ countDateDays(comment.conmentAt) }} trước
            </span>
          </CardTitle>

          <p class="text-sm" v-html="comment.content" />
        </div>
      </div>
    </CollapsibleContent>
  </Collapsible>
</template>
