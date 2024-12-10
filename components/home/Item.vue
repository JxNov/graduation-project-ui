<script setup lang='ts'>
const router = useRouter()

const props = defineProps<{
  data: {
    id: number
    title: string
    category: string
  }[]
}>()

const title = computed(() => {
  return props.data[0].category === 'learning' ? 'Thông tin học tập' : props.data[0].category === 'event' ? 'Thông tin hoạt động' : 'Thông tin học phí'
})

const category = computed(() => {
  return props.data[0].category
})

const redirect = (id: number) => {
  router.push(`/posts/${id}`)
}
</script>

<template>
  <Card class="h-[calc(100vh-7rem)]">
    <CardHeader>
      <CardTitle class="text-2xl text-primary">
        {{ title }}
      </CardTitle>
    </CardHeader>

    <CardContent>
      <ScrollArea class="w-full h-[calc(100vh-18rem)]">
        <div
          class="flex items-center justify-between cursor-pointer border-b border-gray-200 py-4 hover:bg-primary-foreground"
          v-for="item in props.data"
          :key="item.id"
          @click="redirect(item.id)"
        >
          <h3 class="text-lg font-semibold text-primary">
            {{ item.title }}
          </h3>
        </div>
      </ScrollArea>
    </CardContent>

    <CardFooter class="flex justify-end px-6 pb-6">
      <Button type="button" @click="router.push(`/posts/category/${category}`)">
        Xem thêm
      </Button>
    </CardFooter>
  </Card>
</template>