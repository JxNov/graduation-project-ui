<script setup lang="ts">
import { checkPermissions } from '~/utils/checkPermissions'

const { $chatStore, $authStore, $bus } = useNuxtApp()
const echo = useEcho()

const studentPermissions = checkPermissions($authStore.user.permissions, ['student.read'])

const stopAllListeners = () => {
  echo.leaveAllChannels()
}

const subscribeToPrivateChannel = (username: string) => {
  echo
    .private(`chat-with-admin.${username}`)
    .listen('.chat', (e: any) => {
      $bus.emit('newMessage', e)
    })
    .error((e: object) => {
      console.error('Private channel error', e)
    })
}

onMounted(async () => {
  if (!$chatStore.chatPreviews.length) {
    if (!studentPermissions) {
      await $chatStore.getChatPreviewAdmin()
      for (const chat of $chatStore.chatPreviews) {
        await $chatStore.getChatAdmin(chat.id)
        const usernameAll = $chatStore.chats.map(chat => chat.messages.map(message => message.username)).flat()
        const usernameUnique = [...new Set(usernameAll)]
        subscribeToPrivateChannel(usernameUnique.find(username => username !== $authStore.user.username) || '')
      }
    }
  }
})

const preview = computed(() => $chatStore.chatPreviews)

onBeforeUnmount(() => {
  stopAllListeners()
})
</script>

<template>
  <ChatDisplayStudent v-if="studentPermissions" />
  <ChatLayout :preview="preview" v-else />
</template>