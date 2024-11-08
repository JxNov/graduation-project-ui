<script setup lang="ts">
import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
  ListBulletIcon
} from '@radix-icons/vue'
</script>

<template>
  <div class="flex gap-3 border border-input rounded-lg p-1 my-2">
    <ToggleGroup type="multiple">
      <ToggleGroupItem size="sm" value="bold" aria-label="Toggle bold">
        <FontBoldIcon class="h-4 w-4" />
      </ToggleGroupItem>

      <ToggleGroupItem size="sm" value="italic" aria-label="Toggle italic">
        <FontItalicIcon class="h-4 w-4" />
      </ToggleGroupItem>

      <ToggleGroupItem size="sm" value="underline" aria-label="Toggle underline">
        <UnderlineIcon class="h-4 w-4" />
      </ToggleGroupItem>

      <ToggleGroupItem size="sm" value="list" aria-label="Toggle list">
        <ListBulletIcon class="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  </div>
</template>
