<script lang="ts" setup>
import type { Chat, ChatPreview } from '~/schema'

const { $authStore } = useNuxtApp()

interface ChatDisplayProps {
  preview: ChatPreview | undefined,
  data: Chat[]
}

const props = defineProps<ChatDisplayProps>()

const previewFallbackName = computed(() => {
  return props.preview?.title
    .split(' ')
    .map(chunk => chunk[0])
    .join('')
})

const firstConversation = computed(() => {
  return props.data.length > 0 ? props.data[0] : null
})

const messages = computed(() => {
  return firstConversation.value ? firstConversation.value.messages : []
})
</script>

<template>
  <div class="flex h-full flex-col">
    <div v-if="preview" class="flex flex-1 flex-col">
      <div class="flex items-start p-4">
        <div class="flex items-start gap-4 text-sm">
          <Avatar>
            <AvatarFallback>
              {{ previewFallbackName }}
            </AvatarFallback>
          </Avatar>
          <div class="grid gap-1">
            <div class="font-semibold">
              {{ preview.title }}
            </div>

            <div class="line-clamp-1 text-xs">
              <span class="font-medium">Reply-To:</span> {{ preview.title }}
            </div>
          </div>
        </div>
      </div>
      <Separator />

      <ScrollArea class="max-h-[500px]">
        <div class="flex flex-col p-4 gap-2">
          <div v-for="mess in messages" :key="mess.messageID">
            <div class="flex items-center gap-2" v-if="$authStore.user.username !== mess.username">
              <div
                v-if="!messages[messages.indexOf(mess) + 1] || messages[messages.indexOf(mess) + 1].username !== mess.username">
                <Avatar>
                  <AvatarFallback>
                    {{ mess.name.split(' ').map((name: string) => name[0]).join('') }}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div v-else class="h-10 w-10" />

              <div class="bg-primary rounded-full py-2 px-4 max-w-fit">
                <div class="flex-1 whitespace-pre-wrap text-sm text-primary-foreground">
                  {{ mess.message }}
                </div>
              </div>
            </div>

            <div class="flex flex-row-reverse items-center gap-2" v-else>
              <div class="bg-primary rounded-full py-2 px-4 max-w-fit">
                <div class="flex-1 whitespace-pre-wrap text-sm text-primary-foreground">
                  {{ mess.message }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>

      <Separator class="mt-auto" />
      <div class="p-4">
        <form>
          <div class="grid gap-4">
            <Textarea
              class="p-4 h-24 resize-none"
              :placeholder="`Reply ${preview.title}...`"
            />

            <Button
              type="button"
              size="sm"
              class="ml-auto"
            >
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>

    <div v-else class="p-8 text-center text-muted-foreground">
      No message selected
    </div>
  </div>
</template>
