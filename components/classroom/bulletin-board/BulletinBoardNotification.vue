<script setup lang="ts">
import { ConfigProvider } from 'radix-vue'
import { DotsVerticalIcon } from '@radix-icons/vue'
import BulletinBoardNotificationEditor from './BulletinBoardNotificationEditor.vue'
import BulletinBoardNotificationComment from './BulletinBoardNotificationComment.vue'
import { checkPermissions } from '~/utils/checkPermissions'

const { $authStore, $articleStore, $bus } = useNuxtApp()
const useIdFunction = () => useId()

const props = defineProps<{
  article: any
}>()

const teacherPermissions = checkPermissions($authStore.user.permissions, ['teacher.read'])

const editComment = ref<any>(null)
const deleteComment = ref<any>(null)

const handleEditComment = (comment: any) => {
  editComment.value = comment
}

const hadleRemoveComment = (value: any) => {
  editComment.value = value
}

const handleDeleteComment = (comment: any) => {
  deleteComment.value = comment
}

const handleDeleteArticle = async () => {
  try {
    const response = await $articleStore.deleteArticle(props.article.id)

    if (response.status !== 'success') {
      throw new Error('Failed to delete article')
    }

    $bus.emit('article:deleted', props.article.id)
  } catch (error) {
    throw error
  }
}

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

watchEffect(() => {
  if (deleteComment.value) {
    const index = props.article.comments.findIndex((comment: any) => comment.id === deleteComment.value.id)
    props.article.comments.splice(index, 1)
  }
})
</script>

<template>
  <Card
    class="transition-shadow duration-300 ease-in-out shadow-md hover:shadow-xl">
    <CardHeader class="flex flex-row justify-between items-start gap-4">
      <div class="flex flex-row items-start gap-4">
        <Avatar>
          <AvatarImage :src="article.teacherImage || ''" :alt="article.teacherName" />
          <AvatarFallback>{{ article.teacherName.split(' ').map((name: string) => name[0]).join('') }}</AvatarFallback>
        </Avatar>

        <div>
          <CardTitle>{{ article.teacherName }}</CardTitle>
          <CardDescription>{{ countDateDays(article.createdAt) }} trước</CardDescription>
        </div>
      </div>

      <ConfigProvider :use-id="useIdFunction">
        <DropdownMenu v-if="teacherPermissions && $authStore.user.username === article.teacherUsername">
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
            <DropdownMenuItem @click="handleDeleteArticle">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ConfigProvider>
    </CardHeader>

    <CardContent v-html="article.content" />

    <BulletinBoardNotificationEditor
      :article-id="article.id"
      :comment="editComment"
      @remove-comment="hadleRemoveComment"
    >
      <BulletinBoardNotificationComment
        v-if="article.comments?.length"
        :comments="article.comments"
        @edit-comment="handleEditComment"
        @delete-comment="handleDeleteComment"
      />
    </BulletinBoardNotificationEditor>
  </Card>
</template>
