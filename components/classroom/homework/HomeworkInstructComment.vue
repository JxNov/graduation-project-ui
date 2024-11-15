<script setup lang="ts">
</script>

<template>
  <div class="flex flex-row items-start gap-4">
    <Avatar>
      <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>

    <div>
      <CardTitle>
        Card Title
        <span class="text-xs ml-3">03:18</span>
      </CardTitle>

      <p class="text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis
        ac neque.
      </p>
    </div>
  </div>
</template>
