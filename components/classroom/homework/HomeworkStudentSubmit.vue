<script setup lang="ts">
</script>

<template>
  <Card
    class="transition-all duration-300 ease-in-out shadow-md hover:shadow-xl hover:bg-muted/50 cursor-pointer">
    <CardHeader class="flex flex-row items-center gap-4 select-none">
      <Avatar>
        <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <CardTitle>Name</CardTitle>
    </CardHeader>

    <CardContent>
      <img
        src="https://via.placeholder.com/150"
        alt="placeholder"
        class="w-full h-24 object-cover rounded-md aspect-square"
      />

      <div class="flex flex-col items-start mt-4">
        <p class="text-sm">File name</p>
        <p class="text-sm text-green-500">Submitted</p>
      </div>
    </CardContent>
  </Card>
</template>

