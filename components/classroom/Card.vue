<script setup lang='ts'>
</script>

<template>
  <Card
    class="flex flex-col h-full transition-colors duration-300 hover:bg-muted/60 dark:hover:bg-muted/80 overflow-hidden cursor-pointer">
    <div class="relative h-28">
      <CardHeader class="relative">
        <div class="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1720048170996-40507a45c720?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"
            alt="Background Image"
            class="object-cover w-full h-full"
          />
        </div>
        <div class="absolute inset-0 bg-black opacity-50" />

        <div class="relative z-10">
          <CardTitle
            class="text-2xl text-white hover:underline mb-2"
          >
            <NuxtLink to="/classrooms/1">Classroom</NuxtLink>
          </CardTitle>

          <CardDescription class="flex items-center justify-between">
            <span class="text-sm text-white hover:underline">Teacher</span>
          </CardDescription>
        </div>
      </CardHeader>

      <Avatar size="base" class="absolute -bottom-1/4 right-6">
        <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>


    <CardContent class="mt-10 mb-4">
      <p class="text-sm text-gray-500 dark:text-white">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed etiam, quam in
        aliquet.
      </p>
    </CardContent>

    <CardFooter class="flex justify-end border-t pt-6">
      <Button>
        <NuxtLink to="/classrooms/1">Details</NuxtLink>
      </Button>
    </CardFooter>
  </Card>
</template>