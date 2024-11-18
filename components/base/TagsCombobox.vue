<script setup lang="ts">
import { ComboboxAnchor, ComboboxContent, ComboboxInput, ComboboxPortal, ComboboxRoot } from 'radix-vue'
import { useVModel } from '@vueuse/core'

const { $bus } = useNuxtApp()

const props = defineProps<{
  placeholder: string;
  data: {
    label: string;
    value: string;
  }[];
  modelValue: string[];
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string[]): void;
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: []
})

const open = ref<boolean>(false)
const searchTerm = ref<string>('')

const filteredData = computed(() =>
  props.data.filter(i => !modelValue.value.includes(i.value))
)

const getLabelByValue = (value: string) => {
  const item = props.data.find(i => i.value === value)
  return item ? item.label : value
}

onMounted(() => {
  $bus.on('close-tags-combobox', (value: boolean) => {
    open.value = value
  })
})

onBeforeUnmount(() => {
  $bus.off('close-tags-combobox')
})
</script>

<template>
  <TagsInput class="px-0 gap-0 w-full" :model-value="modelValue">
    <div class="flex gap-2 flex-wrap items-center px-3">
      <TagsInputItem v-for="item in modelValue" :key="item" :value="getLabelByValue(item)">
        <TagsInputItemText />
        <TagsInputItemDelete @click.prevent="modelValue.splice(modelValue.indexOf(item), 1)" />
      </TagsInputItem>
    </div>

    <ComboboxRoot v-model="modelValue" v-model:open="open" v-model:search-term="searchTerm" class="w-full">
      <ComboboxAnchor as-child>
        <ComboboxInput :placeholder="placeholder" as-child>
          <TagsInputInput class="w-full px-3" :class="modelValue.length > 0 ? 'mt-2' : ''" @keydown.enter.prevent />
        </ComboboxInput>
      </ComboboxAnchor>

      <ComboboxPortal>
        <ComboboxContent>
          <CommandList
            position="popper"
            class="w-[--radix-popper-anchor-width] rounded-md mt-2 border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50"
          >
            <CommandEmpty />
            <CommandGroup>
              <CommandItem
                v-for="val in filteredData" :key="val.value" :value="val.value"
                @select.prevent="(ev) => {
                  if (typeof ev.detail.value === 'string') {
                    searchTerm = ''
                    modelValue.push(ev.detail.value)
                  }

                  if (filteredData.length === 0) {
                    open = false
                  }
                }"
              >
                {{ val.label }} ({{ val.value }})
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </ComboboxContent>
      </ComboboxPortal>
    </ComboboxRoot>
  </TagsInput>
</template>
