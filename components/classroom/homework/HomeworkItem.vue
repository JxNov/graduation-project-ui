<script setup lang="ts">
import { ConfigProvider } from 'radix-vue'
import { DotsVerticalIcon } from '@radix-icons/vue'

const useIdFunction = () => useId()
const router = useRouter()
const route = useRoute()

const isOpen = ref<boolean>(false)

const redirect = (path: string) => {
  router.push(path)
}

onMounted(() => {
  console.log(route)
})
</script>

<template>
  <Collapsible v-model:open="isOpen">
    <Card
      class="transition-all duration-300 ease-in-out shadow-md hover:shadow-xl hover:bg-muted/50 cursor-pointer">
      <CollapsibleTrigger as-child>
        <CardHeader class="flex flex-row justify-between items-center gap-4 select-none">
          <div class="flex flex-row items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <CardTitle>Card Title</CardTitle>
          </div>

          <div class="flex flex-row items-center gap-4">
            <CardDescription>Time</CardDescription>

            <ConfigProvider :use-id="useIdFunction">
              <DropdownMenu>
                <DropdownMenuTrigger as-child @click.stop>
                  <Button
                    variant="ghost"
                    class="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                  >
                    <DotsVerticalIcon class="h-4 w-4" />
                    <span class="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" class="w-[160px]">
                  <DropdownMenuItem>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ConfigProvider>
          </div>
        </CardHeader>
      </CollapsibleTrigger>

      <CollapsibleContent class="space-y-2">
        <CardContent class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 border-t pt-6">
          <div class="flex flex-col gap-4">
            <CardDescription>Không có ngày đến hạn</CardDescription>
            <p class="text-sm">Due date</p>
          </div>

          <div class="flex flex-row items-start gap-10">
            <div class="border-l-2 pl-4">
              <p class="text-4xl pb-2">0</p>
              <CardDescription>Đã nộp</CardDescription>
            </div>

            <div class="border-l-2 pl-4">
              <p class="text-4xl pb-2">0</p>
              <CardDescription>Đã giao</CardDescription>
            </div>
          </div>
        </CardContent>

        <CardFooter class="border-t pt-6 flex gap-2">
          <Button type="button" variant="outline" @click="isOpen = false">Đóng</Button>
          <Button type="button" @click="redirect(`/classrooms/${route.params.classroomSlug}/homeworks/1`)">
            Details
          </Button>
        </CardFooter>
      </CollapsibleContent>
    </Card>
  </Collapsible>
</template>
