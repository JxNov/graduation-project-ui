<script lang="ts" setup>
import type { Gemini } from '~/schema'

const { $authStore } = useNuxtApp()

interface GeminiDisplayProps {
  data?: Gemini
}

defineProps<GeminiDisplayProps>()
</script>

<template>
  <div class="flex h-full flex-col">
    <div v-if="data" class="flex flex-1 flex-col">
      <ScrollArea class="max-h-[500px] flex flex-col p-4">
        <template v-for="(item, index) in data.content" :key="index">
          <div class="flex flex-row-reverse items-center gap-2 mt-1">
            <div class="bg-primary rounded-full py-2 px-5 max-w-fit">
              <div class="flex-1 whitespace-pre-wrap text-sm text-primary-foreground">
                {{ item.question }}
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <div class="bg-secondary rounded-full py-2 px-5 max-w-fit">
              <div class="flex-1 whitespace-pre-wrap text-sm text-primary">
                {{ item.answer }}
              </div>
            </div>
          </div>
        </template>
      </ScrollArea>

      <Separator class="mt-auto" />
      <div class="p-4">
        <form>
          <div class="grid gap-4">
              <Textarea
                class="p-4 h-24 resize-none"
                :placeholder="`Enter your question here...`"
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
      No selected
    </div>
  </div>
</template>
