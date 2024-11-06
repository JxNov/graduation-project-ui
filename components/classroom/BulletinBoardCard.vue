<script setup lang="ts">
import { ConfigProvider } from 'radix-vue'
import { DotsVerticalIcon } from '@radix-icons/vue'

const useIdFunction = () => useId()
</script>

<template>
  <Card
    class="transition-shadow duration-300 ease-in-out shadow-md hover:shadow-xl cursor-pointer">
    <CardHeader class="flex flex-row justify-between items-center gap-4">
      <div class="flex flex-row items-center gap-4">
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
          <DropdownMenuTrigger as-child>
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
    </CardHeader>
  </Card>
</template>
