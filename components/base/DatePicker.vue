<script setup lang="ts">
import { cn } from '~/lib/utils'
import { type DateValue, getLocalTimeZone, today } from '@internationalized/date'
import { useVModel } from '@vueuse/core'
import {
  CalendarRoot,
  type CalendarRootEmits,
  type CalendarRootProps,
  useDateFormatter,
  useForwardPropsEmits
} from 'radix-vue'
import { createDecade, createYear, toDate } from 'radix-vue/date'
import { computed, type HTMLAttributes, type Ref } from 'vue'
import { CalendarIcon } from '@radix-icons/vue'

const { locale } = useI18n()

interface CalendarProps {
  name: string,
  label: string,
}

const props = withDefaults(defineProps<CalendarRootProps & CalendarProps & { class?: HTMLAttributes['class'] }>(), {
  modelValue: undefined,
  placeholder() {
    return today(getLocalTimeZone())
  },
  weekdayFormat: 'short'
})
const emits = defineEmits<CalendarRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, placeholder: __, ...delegated } = props

  return delegated
})

const placeholder = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: today(getLocalTimeZone())
}) as Ref<DateValue>

const forwarded = useForwardPropsEmits(delegatedProps, emits)

const formatter = useDateFormatter(locale.value)

const value = computed({
  get: () => placeholder.value,
  set: val => {
    placeholder.value = val
    emits('update:modelValue', val)
  }
})

watch(value, (newValue) => {
  emits('update:modelValue', newValue)
})
</script>

<template>
  <FormField :name="name">
    <FormItem class="flex flex-col">
      <FormLabel>{{ props.label }}</FormLabel>
      <Popover>
        <PopoverTrigger as-child>
          <Button
            variant="outline"
            :class="cn(
          'w-full justify-start text-left font-normal',
          !value && 'text-muted-foreground',
        )"
          >
            <CalendarIcon class="mr-2 h-4 w-4" />
            {{
              value ? formatter.custom(toDate(value), {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              }) : 'Pick a date'
            }}
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
          <CalendarRoot
            v-slot="{ date, grid, weekDays }"
            v-model:placeholder="placeholder"
            v-bind="forwarded"
            :class="cn('rounded-md border p-3 bg-card w-fit', props.class)"
          >
            <CalendarHeader>
              <CalendarHeading class="flex w-full items-center justify-between gap-2">
                <Select
                  :default-value="placeholder.month.toString()"
                  @update:model-value="(v: string) => {
                    if (!v || !placeholder) return;
                    if (Number(v) === placeholder?.month) return;
                    placeholder = placeholder.set({
                      month: Number(v),
                    })
                  }"
                >
                  <SelectTrigger aria-label="Select month" class="w-[60%]">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent class="max-h-[200px]">
                    <SelectItem
                      v-for="month in createYear({ dateObj: date })"
                      :key="month.toString()" :value="month.month.toString()"
                    >
                      {{ formatter.custom(toDate(month), { month: 'long' }) }}
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  :default-value="placeholder.year.toString()"
                  @update:model-value="(v: string) => {
                    if (!v || !placeholder) return;
                    if (Number(v) === placeholder?.year) return;
                    placeholder = placeholder.set({
                      year: Number(v),
                    })
                  }"
                >
                  <SelectTrigger aria-label="Select year" class="w-[40%]">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent class="max-h-[200px]">
                    <SelectItem
                      v-for="yearValue in createDecade({ dateObj: date, startIndex: -10, endIndex: 10 })"
                      :key="yearValue.toString()" :value="yearValue.year.toString()"
                    >
                      {{ yearValue.year }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </CalendarHeading>
            </CalendarHeader>

            <div class="flex flex-col space-y-4 pt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
              <CalendarGrid v-for="month in grid" :key="month.value.toString()">
                <CalendarGridHead>
                  <CalendarGridRow>
                    <CalendarHeadCell
                      v-for="day in weekDays" :key="day"
                    >
                      {{ day }}
                    </CalendarHeadCell>
                  </CalendarGridRow>
                </CalendarGridHead>
                <CalendarGridBody class="grid">
                  <CalendarGridRow v-for="(weekDates, index) in month.rows" :key="`weekDate-${index}`"
                                   class="mt-2 w-full">
                    <CalendarCell
                      v-for="weekDate in weekDates"
                      :key="weekDate.toString()"
                      :date="weekDate"
                    >
                      <CalendarCellTrigger
                        :day="weekDate"
                        :month="month.value"
                      />
                    </CalendarCell>
                  </CalendarGridRow>
                </CalendarGridBody>
              </CalendarGrid>
            </div>
          </CalendarRoot>
        </PopoverContent>
      </Popover>
    </FormItem>
  </FormField>
</template>
