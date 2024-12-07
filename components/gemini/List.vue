<script lang="ts" setup>
import { ScrollArea } from '~/components/ui/scroll-area'
import { cn } from '~/lib/utils'
import type { Gemini } from '~/schema'

interface GeminiListProps {
  items: Gemini[]
}

defineProps<GeminiListProps>()
const selectedGemini = defineModel<number>('selectedGemini', { required: false })
</script>

<template>
  <ScrollArea class="h-[calc(100dvh-72px-56px-3rem-53px-30px)] flex">
    <div class="flex-1 flex flex-col gap-2 p-4 pt-0">
      <TransitionGroup name="list" appear>
        <button
          v-for="item of items"
          :key="item.id"
          :class="cn(
            'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent w-full',
            selectedGemini === item.id && 'bg-muted',
          )"
          @click="selectedGemini = item.id"
        >
          <div class="flex w-full flex-col gap-1">
            <div class="flex items-center">
              <div class="flex items-center gap-2">
                <div class="font-semibold">
                  {{ item.title }}
                </div>
              </div>
            </div>
          </div>
        </button>
      </TransitionGroup>
    </div>
  </ScrollArea>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

.list-leave-active {
  position: absolute;
}
</style>
