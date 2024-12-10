<script setup lang="ts">
import type { Column } from '@tanstack/vue-table'
import { CheckIcon, PlusCircledIcon } from '@radix-icons/vue'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '~/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { Separator } from '~/components/ui/separator'
import { cn } from '~/lib/utils'
import type { TableValueFilter } from '~/types/table'

interface DataTableFacetedFilter {
  column?: Column<any, any>
  title?: string
  options: TableValueFilter[]
}

const { $bus } = useNuxtApp()
const props = defineProps<DataTableFacetedFilter>()

const selectedValues = ref(new Set(props.column?.getFilterValue() as string[]))

const processFacetedUniqueValues = (uniqueValues: Map<any, number>): Map<string, number> => {
  const mergedFacets = new Map()

  uniqueValues.forEach((count, key) => {
    const values = Array.isArray(key) ? key : [key]

    const uniqueEntryKeys = new Set(values)

    uniqueEntryKeys.forEach((value) => {
      if (mergedFacets.has(value)) {
        mergedFacets.set(value, mergedFacets.get(value) + count)
      } else {
        mergedFacets.set(value, count)
      }
    })
  })

  return mergedFacets
}

const facets = computed(() => {
  const uniqueValues = props.column?.getFacetedUniqueValues()

  if (uniqueValues instanceof Map) {
    return processFacetedUniqueValues(uniqueValues)
  }

  return new Map()
})

const filterFunction = (
  val: string[] | number[] | false[] | true[] | Record<number, any>[],
  term: string
): string[] | number[] | false[] | true[] | Record<number, any>[] => {

  if (Array.isArray(val) && val.length > 0) {
    if (typeof val[0] === 'object' && val[0] !== null) {
      return (val as Record<number, any>[]).filter(item =>
        item[0]?.toString().toLowerCase().includes(term.toLowerCase())
      )
    }

    if (typeof val[0] === 'string') {
      return (val as string[]).filter(item =>
        item.toLowerCase().includes(term.toLowerCase())
      )
    }

    if (typeof val[0] === 'number') {
      return (val as number[]).filter(item =>
        item.toString().includes(term)
      )
    }
  }

  return val
}

const clearFilters = () => {
  selectedValues.value.clear()
  props.column?.setFilterValue(undefined)
}

$bus.on('reset-filters', clearFilters)
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline" size="sm" class="h-8 border-dashed">
        <PlusCircledIcon class="mr-2 h-4 w-4" />
        {{ title }}
        <template v-if="selectedValues.size > 0">
          <Separator orientation="vertical" class="mx-2 h-4" />
          <Badge
            variant="secondary"
            class="rounded-sm px-1 font-normal lg:hidden"
          >
            {{ selectedValues.size }}
          </Badge>
          <div class="hidden space-x-1 lg:flex">
            <Badge
              v-if="selectedValues.size > 2"
              variant="secondary"
              class="rounded-sm px-1 font-normal"
            >
              {{ selectedValues.size }} selected
            </Badge>

            <template v-else>
              <!--              <Badge-->
              <!--                v-for="option in options-->
              <!--                  .filter((option) => selectedValues.has(option.value))"-->
              <!--                :key="option.value"-->
              <!--                variant="secondary"-->
              <!--                class="rounded-sm px-1 font-normal"-->
              <!--              >-->
              <!--                {{ option.label }}-->
              <!--              </Badge>-->

              <Badge
                variant="secondary"
                class="rounded-sm px-1 font-normal"
                v-for="selectedValue in selectedValues"
                :key="selectedValue"
              >
                {{ selectedValue }}
              </Badge>
            </template>
          </div>
        </template>
      </Button>
    </PopoverTrigger>

    <PopoverContent class="w-[200px] p-0" align="start">
      <Command :filter-function="filterFunction">
        <CommandInput :placeholder="title" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <template
              v-for="option in facets"
              :key="option[0]"
            >
              <CommandItem
                v-if="facets?.get(option[0])"
                :value="option"
                @select="() => {
                    const isSelected = selectedValues.has(option[0])
                    if (isSelected) {
                      selectedValues.delete(option[0])
                    } else {
                      selectedValues.add(option[0])
                    }
                    const filterValues = Array.from(selectedValues)
                    column?.setFilterValue(
                      filterValues.length ? filterValues : undefined,
                    )
                  }"
              >
                <div
                  :class="cn(
                      'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                      selectedValues.has(option[0])
                        ? 'bg-primary text-primary-foreground'
                        : 'opacity-50 [&_svg]:invisible',
                    )"
                >
                  <CheckIcon :class="cn('h-4 w-4')" />
                </div>
                <span>{{ option[0] }}</span>
                <span
                  v-if="facets?.get(option[0])"
                  class="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs"
                >
                  {{ facets.get(option[0]) }}
                </span>
              </CommandItem>
            </template>
          </CommandGroup>

          <template v-if="selectedValues.size > 0">
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                :value="{ label: 'Clear filters' }"
                class="justify-center text-center"
                @select="column?.setFilterValue(undefined); selectedValues.clear()"
              >
                Clear filters
              </CommandItem>
            </CommandGroup>
          </template>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
