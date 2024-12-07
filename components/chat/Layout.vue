<script lang="ts" setup>
import { refDebounced } from '@vueuse/core'
import { Search } from 'lucide-vue-next'
import type { Chat, ChatPreview } from '~/schema'

const { $chatStore } = useNuxtApp()

interface ChatProps {
  preview: ChatPreview[]
}

const props = defineProps<ChatProps>()

const selectedChat = ref<number | undefined>(props.preview[0]?.id)
const searchValue = ref('')
const debouncedSearch = refDebounced(searchValue, 250)
const messages = ref<Chat[]>([])

const filteredChatList = computed(() => {
  let output: ChatPreview[] = []
  const searchValue = debouncedSearch.value?.trim().toLowerCase()
  if (!searchValue) {
    output = props.preview
  } else {
    output = props.preview.filter((item) => {
      return item.title.toLowerCase().includes(searchValue)
    })
  }

  return output
})

const selectedChatData = computed(() => props.preview.find(item => item.id === selectedChat.value))

watchEffect(async () => {
  if (selectedChatData.value?.id) {
    messages.value = await $chatStore.getChatAdmin(selectedChatData.value.id)
  }
})
</script>

<template>
  <ClientOnly>
    <div class="bg-card rounded-md overflow-hidden">
      <TooltipProvider :delay-duration="0">
        <ResizablePanelGroup
          id="resize-panel-group-1"
          direction="horizontal"
          class="h-full max-h-[820px] items-stretch"
        >
          <ResizablePanel class="max-w-[350px]">
            <div class="flex items-center px-4 py-2">
              <h1 class="text-xl font-bold">
                Inbox
              </h1>
            </div>
            <Separator />
            <div class="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div class="relative">
                  <Search class="absolute left-2 top-2.5 size-4 text-muted-foreground" />
                  <Input v-model="searchValue" placeholder="Search" class="pl-8" />
                </div>
              </form>
            </div>

            <ChatList v-model:selected-chat="selectedChat" :items="filteredChatList" />
          </ResizablePanel>

          <div
            class="relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 [&[data-orientation=vertical]]:h-px [&[data-orientation=vertical]]:w-full [&[data-orientation=vertical]]:after:left-0 [&[data-orientation=vertical]]:after:h-1 [&[data-orientation=vertical]]:after:w-full [&[data-orientation=vertical]]:after:-translate-y-1/2 [&[data-orientation=vertical]]:after:translate-x-0 [&[data-orientation=vertical]>div]:rotate-90" />

          <ResizablePanel>
            <ChatDisplay :preview="selectedChatData" :data="messages" />
          </ResizablePanel>
        </ResizablePanelGroup>
      </TooltipProvider>
    </div>
  </ClientOnly>
</template>
