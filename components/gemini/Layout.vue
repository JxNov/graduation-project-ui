<script lang="ts" setup>
import { refDebounced } from '@vueuse/core'
import { Search } from 'lucide-vue-next'
import type { Gemini } from '~/schema'

const useIdFunction = () => useId()

const props = defineProps<{
  data: Gemini[]
}>()

const selectedGemini = ref<number | undefined>(undefined)
const searchValue = ref('')
const debouncedSearch = refDebounced(searchValue, 250)

const filteredGeminiList = computed(() => {
  let output: Gemini[] = []
  const searchValue = debouncedSearch.value?.trim().toLowerCase()
  if (!searchValue) {
    output = props.data
  } else {
    output = props.data.filter((item) => {
      return item.title.toLowerCase().includes(searchValue)
    })
  }

  return output
})

const selectedGeminiData = computed(() => props.data?.find(item => item?.id === selectedGemini.value))
</script>

<template>
  <div class="bg-card rounded-md overflow-hidden">
    <TooltipProvider :delay-duration="0">
      <ResizablePanelGroup
        id="resize-panel-group-1"
        direction="horizontal"
        class="h-full max-h-[820px] items-stretch"
      >
        <ResizablePanel class="max-w-[350px]" :id="useIdFunction">
          <div class="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <form>
              <div class="relative">
                <Search class="absolute left-2 top-2.5 size-4 text-muted-foreground" />
                <Input v-model="searchValue" placeholder="Tìm kiếm..." class="pl-8" />
              </div>
            </form>
          </div>

          <GeminiList v-model:selected-gemini="selectedGemini" :items="filteredGeminiList" />
        </ResizablePanel>

        <div
          class="relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 [&[data-orientation=vertical]]:h-px [&[data-orientation=vertical]]:w-full [&[data-orientation=vertical]]:after:left-0 [&[data-orientation=vertical]]:after:h-1 [&[data-orientation=vertical]]:after:w-full [&[data-orientation=vertical]]:after:-translate-y-1/2 [&[data-orientation=vertical]]:after:translate-x-0 [&[data-orientation=vertical]>div]:rotate-90" />

        <ResizablePanel :id="useIdFunction">
          <GeminiDisplay :data="selectedGeminiData" />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  </div>
</template>
