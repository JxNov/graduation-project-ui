<script setup lang="ts">
const color = useColorMode()
</script>

<template>
  <DropdownMenuSub>
    <DropdownMenuSubTrigger>
      <span>Theme</span>
    </DropdownMenuSubTrigger>

    <DropdownMenuPortal>
      <DropdownMenuSubContent>
        <DropdownMenuItem @click="color.preference = 'light'">
          <Icon name="i-ph-sun-dim-duotone" size="16" />
          <span class="ml-2">Light</span>
          <Icon v-if="color.preference === 'light'" name="i-radix-icons-check" size="16" class="ml-auto" />
        </DropdownMenuItem>

        <DropdownMenuItem @click="color.preference = 'dark'">
          <Icon name="i-ph-moon-stars-duotone" size="16" />
          <span class="ml-2">Dark</span>
          <Icon v-if="color.preference === 'dark'" name="i-radix-icons-check" size="16" class="ml-auto" />
        </DropdownMenuItem>

        <DropdownMenuItem @click="color.preference = 'system'">
          <Icon name="i-lucide-monitor" size="16" />
          <span class="ml-2">System</span>
          <Icon v-if="color.preference === 'system'" name="i-radix-icons-check" size="16" class="ml-auto" />
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuPortal>
  </DropdownMenuSub>
</template>
