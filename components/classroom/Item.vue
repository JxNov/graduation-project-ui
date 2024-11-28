<script setup lang='ts'>
import type { Classroom } from '~/schema'

const props = defineProps<{
  classroom: Classroom
}>()

const classroom = computed(() => props.classroom)

const router = useRouter()

const redirect = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div
    class="rounded-xl border bg-card text-card-foreground shadow flex flex-col h-full transition-colors duration-300 hover:bg-muted/50 overflow-hidden cursor-pointer">
    <div class="relative h-28">
      <CardHeader class="relative">
        <div class="absolute inset-0">
          <!--          <img-->
          <!--            src="https://images.unsplash.com/photo-1720048170996-40507a45c720?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"-->
          <!--            alt="Background Image"-->
          <!--            class="object-cover w-full h-full"-->
          <!--          />-->
          <div class="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500" />
        </div>
        <div class="absolute inset-0 bg-black opacity-50" />

        <div class="relative z-10">
          <CardTitle
            class="text-2xl text-white hover:underline mb-2"
            @click="redirect(`/classrooms/${classroom.classSlug}`)"
          >
            {{ classroom.className }}
          </CardTitle>

          <CardDescription class="flex items-center justify-between">
            <span class="text-sm text-white hover:underline">
              {{ classroom.teacherName }}
            </span>
          </CardDescription>
        </div>
      </CardHeader>

      <Avatar size="base" class="absolute -bottom-1/4 right-6">
        <AvatarImage :src="classroom.teacherImage || ''" alt="@radix-vue" />
        <AvatarFallback>{{ classroom.teacherName[0] }}</AvatarFallback>
      </Avatar>
    </div>

    <CardContent class="mt-10 mb-4">
      <p class="text-sm text-gray-500 dark:text-white">
      </p>
    </CardContent>

    <CardFooter class="flex justify-end border-t pt-6">
      <Button type="button" @click="redirect(`/classrooms/${classroom.classSlug}`)">
        Details
      </Button>
    </CardFooter>
  </div>
</template>