<script setup lang="ts">
import { ConfigProvider } from 'radix-vue'
import { DotsVerticalIcon } from '@radix-icons/vue'

const useIdFunction = () => useId()
const router = useRouter()

const redirect = (path: string) => {
  router.push(path)
}
</script>

<template>
  <Card
    class="transition-all duration-300 ease-in-out shadow-md hover:shadow-xl hover:bg-muted/50 cursor-pointer"
  >
    <CardHeader
      class="flex flex-row justify-between items-start gap-4"
      @click="redirect('/classrooms/1/homework/1')"
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
              Sửa
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ConfigProvider>
    </CardHeader>

    <slot />
  </Card>
</template>
