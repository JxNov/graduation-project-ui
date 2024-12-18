<script lang="ts" setup>
import type { Chat, ChatPreview } from '~/schema'

const { $authStore, $chatStore, $bus } = useNuxtApp()
const echo = useEcho()

interface ChatDisplayProps {
  preview: ChatPreview | undefined,
  data: Chat[]
}

const props = defineProps<ChatDisplayProps>()

const isLoading = ref<boolean>(false)
const text = ref<string>('')

const previewFallbackName = computed(() => {
  return props.preview?.title
    .split(' ')
    .map(chunk => chunk[0])
    .join('')
})

const stopAllListeners = () => {
  echo.leaveAllChannels()
}

const firstConversation = computed(() => {
  return props.data.length > 0 ? props.data[0] : null
})

const messages = computed(() => {
  return firstConversation.value ? firstConversation.value.messages : []
})

const studentUsername = computed(() => {
  return messages.value.find(item => item.username !== $authStore.user.username)?.username || ''
})

const subscribeToPrivateChannel = () => {
  echo
    .private(`chat-with-admin.${$authStore.user.username}`)
    .listen('.chat', (e: any) => {
      messages.value.push(e)
    })
    .error((e: object) => {
      console.error('Private channel error', e)
    })
}

const onSubmit = async () => {
  isLoading.value = true

  try {
    const response = await $chatStore.createChatAdmin(studentUsername.value, text.value)

    if (!response) {
      throw new Error('Gửi tin nhắn thất bại')
    }

    text.value = ''
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    throw error
  }
}

onMounted(() => {
  $bus.on('newMessage', (e: any) => {
    messages.value.push(e)
  })
  subscribeToPrivateChannel()
})

onBeforeUnmount(() => {
  stopAllListeners()
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
              <span class="font-medium">Trả lời:</span> {{ preview.title }}
            </div>
          </div>
        </div>
      </div>
      <Separator />

      <ScrollArea class="max-h-[500px] flex flex-col p-4">
        <template v-for="mess in messages" :key="mess.messageID">
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

            <div class="bg-secondary rounded-full py-2 px-5 max-w-fit">
              <div class="flex-1 whitespace-pre-wrap text-sm text-primary">
                {{ mess.message }}
              </div>
            </div>
          </div>

          <div class="flex flex-row-reverse items-center gap-2 mt-1" v-else>
            <div class="bg-primary rounded-full py-2 px-5 max-w-fit">
              <div class="flex-1 whitespace-pre-wrap text-sm text-primary-foreground">
                {{ mess.message }}
              </div>
            </div>
          </div>
        </template>
      </ScrollArea>

      <Separator class="mt-auto" />
      <div class="p-4">
        <form @submit.prevent="onSubmit">
          <div class="grid gap-4">
            <Textarea class="p-4 h-24 resize-none" :placeholder="`Trả lời ${preview.title}...`" :disabled="isLoading"
              v-model="text" />

            <Button type="submit" size="sm" class="ml-auto" :disabled="isLoading">
              Gửi
            </Button>
          </div>
        </form>
      </div>
    </div>

    <div v-else class="p-8 text-center text-muted-foreground">
      Không có tin nhắn nào được chọn
    </div>
  </div>
</template>
