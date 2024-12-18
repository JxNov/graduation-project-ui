<script setup lang="ts">
import { ChatBubbleIcon, DotsVerticalIcon } from '@radix-icons/vue'
import { checkPermissions } from '~/utils/checkPermissions'
import { ConfigProvider } from 'radix-vue'

const { $authStore, $articleStore } = useNuxtApp()
const useIdFunction = () => useId()

defineProps<{
  comments: any
}>()

const emits = defineEmits<{
  (e: 'editComment', comment: any): void
  (e: 'deleteComment', comment: any): void
}>()

const isOpen = ref<boolean>(false)

const teacherPermissions = checkPermissions($authStore.user.permissions, ['teacher.read'])

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

const editComment = (comment: any) => {
  emits('editComment', comment)
}

const deleteComment = async (comment: any) => {
  try {
    const response = await $articleStore.deleteComment(comment.id)

    if (response.status !== 'success') {
      throw new Error('Xóa bình luận thất bại')
    }

    emits('deleteComment', comment)
  } catch (error) {
    throw error
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
      <div class="flex justify-between" v-for="comment in comments" :key="comment.id">
        <div class="flex items-start gap-4">
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

        <ConfigProvider :use-id="useIdFunction">
          <DropdownMenu v-if="teacherPermissions || $authStore.user.username === comment.username">
            <DropdownMenuTrigger as-child>
              <Button
                variant="ghost"
                class="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
              >
                <DotsVerticalIcon class="h-4 w-4" />
                <span class="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-[160px]">
              <DropdownMenuItem
                v-if="$authStore.user.username === comment.username"
                @click="editComment(comment)"
              >
                Sửa
              </DropdownMenuItem>
              <DropdownMenuSeparator v-if="$authStore.user.username === comment.username" />

              <DropdownMenuItem @click="deleteComment(comment)">
                Xóa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ConfigProvider>
      </div>
    </CollapsibleContent>
  </Collapsible>
</template>
