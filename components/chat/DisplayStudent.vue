<script lang="ts" setup>
const { $authStore, $chatStore } = useNuxtApp()
const echo = useEcho()

const id = ref<number | null>(null)
const isLoading = ref<boolean>(false)
const text = ref<string>('')

const subscribeToPrivateChannel = (usernameUnique: string[]) => {
  usernameUnique.forEach(username => {
    echo
      .private(`chat-with-admin.${username}`)
      .listen('.chat', (e: any) => {
        messages.value.push(e)
      })
      .error((e: object) => {
        console.error('Private channel error', e)
      })
  })
}

onMounted(async () => {
  if (!$chatStore.chatPreviews.length) {
    const chat = await $chatStore.getChatPreviewStudents()
    id.value = chat?.[0].id
    await $chatStore.getChatStudent(id.value)
    for (const chat of $chatStore.chats) {
      const usernameAll = chat.messages.map(message => message.username)
      const usernameUnique = [...new Set(usernameAll)]
      subscribeToPrivateChannel(usernameUnique)
    }
  }
})

const stopAllListeners = () => {
  echo.leaveAllChannels()
}

const firstConversation = computed(() => {
  return $chatStore.chats.length > 0 ? $chatStore.chats[0] : null
})

const messages = computed(() => {
  return firstConversation.value ? firstConversation.value.messages : []
})

const onSubmit = async () => {
  isLoading.value = true

  try {
    const response = await $chatStore.createChatStudent(text.value)

    if (!response) {
      throw new Error('Failed to send message')
    }

    text.value = ''
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    throw error
  }
}

onBeforeUnmount(() => {
  stopAllListeners()
})
</script>

<template>
  <div class="bg-card rounded-md overflow-hidden">
    <div class="h-[820px]">
      <div class="flex h-full flex-col">
        <div class="flex flex-1 flex-col">
          <div class="flex items-start p-4">
            <div class="flex items-start gap-4 text-sm">
              <Avatar>
                <AvatarFallback>
                  AD
                </AvatarFallback>
              </Avatar>
              <div class="grid gap-1">
                <div class="font-semibold">
                  Admin
                </div>

                <div class="line-clamp-1 text-xs">
                  <span class="font-medium">Send:</span> Admin
                </div>
              </div>
            </div>
          </div>
          <Separator />

          <ScrollArea class="max-h-[500px] flex flex-col p-4">
            <template v-for="mess in messages" :key="mess.messageID">
              <div class="flex items-center gap-2" v-if="$authStore.user.username !== mess.username">
                <div
                  v-if="!messages[messages.indexOf(mess) + 1] || messages[messages.indexOf(mess) + 1].username !== mess.username"
                >
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
                <Textarea
                  class="p-4 h-24 resize-none"
                  placeholder="Send message to admin..."
                  :disabled="isLoading"
                  v-model="text"
                />

                <Button
                  type="submit"
                  size="sm"
                  class="ml-auto"
                  :disabled="isLoading"
                >
                  Send
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
