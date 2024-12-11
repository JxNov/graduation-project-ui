<script lang="ts" setup>
import type { Gemini } from '~/schema'
import { DotFilledIcon } from '@radix-icons/vue'

const { $authStore, $geminiStore } = useNuxtApp()

interface GeminiDisplayProps {
  data?: Gemini
}

const props = defineProps<GeminiDisplayProps>()

const text = ref<string>('')
const isLoading = ref<boolean>(false)

const content = computed(() => props?.data?.content)

const scrollToBottom = () => {
  nextTick(() => {
    const scrollArea = document.getElementById('scroll-area')
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  })
}

const onSubmit = async () => {
  isLoading.value = true

  try {
    const question = text.value.trim()
    content.value?.push({ question, answer: '' })
    text.value = ''
    scrollToBottom()

    const response = await $geminiStore.askGemini(question)

    if (!response) {
      throw new Error('Failed to ask question')
    }

    isLoading.value = false

    content.value?.splice(-1, 1, { question, answer: response })
  } catch (error) {
    isLoading.value = false
    throw error
  }
}

const renderAnswer = (answer: string) => {
  if (!answer) return 'No answer yet'
  return answer
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/```(.*?)```/g, '<code>$1</code>')
}
</script>

<template>
  <div class="flex h-full flex-col justify-end">
    <div v-if="data" class="flex flex-1 flex-col pt-4">
      <div
        class="max-h-[500px] flex flex-col p-4 overflow-hidden overflow-y-auto scroll-smooth [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border"
        id="scroll-area"
      >
        <template v-for="(item, index) in content" :key="index">
          <div class="flex flex-col gap-4 mt-1">
            <div class="flex flex-row-reverse items-center gap-2 mt-4">
              <div class="bg-primary rounded-md py-2 px-5 max-w-fit">
                <div class="flex-1 whitespace-pre-wrap text-sm text-primary-foreground">
                  {{ item.question }}
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <div class="bg-secondary rounded-md py-2 px-5 max-w-fit">
                <div class="flex items-center -mx-2 -mb-1 text-primary" v-if="!item.answer && isLoading">
                  <DotFilledIcon class="w-5 h-5 -mx-1 animate-bounce delay-75" />
                  <DotFilledIcon class="w-5 h-5 -mx-1 animate-bounce delay-150" />
                  <DotFilledIcon class="w-5 h-5 -mx-1 animate-bounce delay-300" />
                </div>

                <div class="flex-1 whitespace-pre-wrap text-sm" v-else>
                  <div v-html="renderAnswer(item.answer)" />
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>

      <div class="pt-4" />
      <Separator class="mt-auto" />
      <div class="p-4">
        <form @submit.prevent="onSubmit">
          <div class="grid gap-4">
            <Textarea
              class="p-4 h-24 resize-none"
              :placeholder="`Enter your question here...`"
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

    <div v-else class="p-8 text-center text-muted-foreground">
      <form @submit.prevent="onSubmit">
        <div class="grid gap-4">
            <Textarea
              class="p-4 h-24 resize-none"
              :placeholder="`Enter your question here...`"
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
</template>
