<script setup lang="ts">
</script>

<template>
  <Card
    class="transition-all duration-300 ease-in-out shadow-md hover:shadow-xl hover:bg-muted/50 cursor-pointer select-none"
  >
    <CardHeader
      class="flex flex-row justify-between items-start gap-4 p-3"
    >
      <div class="flex flex-row items-start gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Time</CardDescription>
        </div>
      </div>
    </CardHeader>
  </Card>
</template>
