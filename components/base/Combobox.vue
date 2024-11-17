<script setup lang="ts">
import { CaretSortIcon, CheckIcon } from '@radix-icons/vue'
import { cn } from '@/lib/utils'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  name: string
  data: {
    label: string
    value: string
  }[]
  modelValue: string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string): void
}>()

const data = computed(() => props.data)

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: ''
})

const open = ref<boolean>(false)
const value = computed({
  get: () => modelValue.value,
  set: (newValue: string) => {
    modelValue.value = newValue
    emits('update:modelValue', newValue)
  }
})
</script>

<template>
  <div>
    <Popover :open="open" @update:open="open = $event">
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          role="combobox"
          :aria-expanded="open"
          class="w-full justify-between"
        >
          {{ value
          ? data.find((val) => val.value === value)?.label
          : `Select ${props.name}...` }}
          <CaretSortIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent class="max-w-full p-0">
        <Command>
          <CommandInput class="h-9" :placeholder="`Search ${props.name}...`" />
          <CommandEmpty>No {{ props.name }} found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandItem
                v-for="val in data"
                :key="val.value"
                :value="val.value"
                @select="(ev) => {
                if (typeof ev.detail.value === 'string') {
                  value = ev.detail.value
                }

                open = false
              }"
              >
                {{ val.label }}
                <CheckIcon
                  :class="cn(
                  'ml-auto h-4 w-4',
                  value === val.value ? 'opacity-100' : 'opacity-0',
                )"
                />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>
</template>
