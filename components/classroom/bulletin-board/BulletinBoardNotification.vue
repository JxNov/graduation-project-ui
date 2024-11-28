<script setup lang="ts">
import { ConfigProvider } from 'radix-vue'
import { DotsVerticalIcon } from '@radix-icons/vue'
import BulletinBoardNotificationEditor from './BulletinBoardNotificationEditor.vue'
import BulletinBoardNotificationComment from './BulletinBoardNotificationComment.vue'

const { locale } = useI18n()

defineProps<{
  article: any
}>()

const useIdFunction = () => useId()

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString(locale.value, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
</script>

<template>
  <Card
    class="transition-shadow duration-300 ease-in-out shadow-md hover:shadow-xl">
    <CardHeader class="flex flex-row justify-between items-start gap-4">
      <div class="flex flex-row items-start gap-4">
        <Avatar>
          <AvatarImage :src="article.teacherImage || ''" :alt="article.teacherName" />
          <AvatarFallback>{{ article.teacherName[0] }}</AvatarFallback>
        </Avatar>

        <div>
          <CardTitle>{{ article.teacherName }}</CardTitle>
          <CardDescription>{{ article.publishedAt }}</CardDescription>
        </div>
      </div>

      <ConfigProvider :use-id="useIdFunction">
        <DropdownMenu>
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
            <DropdownMenuItem>
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ConfigProvider>
    </CardHeader>

    <CardContent v-html="article.content" />

    <BulletinBoardNotificationEditor :article-id="article.id">
      <BulletinBoardNotificationComment v-if="article.comments?.length" :comments="article.comments" />
    </BulletinBoardNotificationEditor>
  </Card>
</template>
