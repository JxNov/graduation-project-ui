<script setup lang="ts">
import { PlusIcon } from '@radix-icons/vue'

const props = defineProps<{
  title: string
  data?: any
}>()
</script>

<template>
  <Card>
    <CardHeader class="flex flex-row justify-between items-center gap-4 select-none">
      <CardTitle>
        {{ props.title }} ({{ props.data?.length || 0 }})
      </CardTitle>
      <PlusIcon class="w-6 h-6 text-gray-500" />
    </CardHeader>

    <CardContent class="flex flex-col gap-4 select-none border-t pt-6">
      <div
        class="flex flex-row items-center gap-4"
        v-for="(item, index) in props.data"
        :key="index"
      >
        <Avatar>
          <AvatarImage :src="item.image || ''" :alt="item.name" />
          <AvatarFallback>{{ item.name[0] }}</AvatarFallback>
        </Avatar>

        <CardTitle>{{ item.name }}</CardTitle>
      </div>
    </CardContent>
  </Card>
</template>
