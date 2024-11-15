<script setup lang="ts">
import { PlusIcon } from '@radix-icons/vue'
</script>

<template>
  <Card>
    <CardHeader class="flex flex-row justify-between items-center gap-4 select-none">
      <CardTitle>Giáo viên</CardTitle>
      <PlusIcon class="w-6 h-6 text-gray-500" />
    </CardHeader>

    <CardContent class="flex flex-col gap-4 select-none border-t pt-6">
      <div class="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <CardTitle>Card Title</CardTitle>
      </div>

      <div class="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <CardTitle>Card Title</CardTitle>
      </div>

      <div class="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <CardTitle>Card Title</CardTitle>
      </div>
    </CardContent>
  </Card>
</template>
