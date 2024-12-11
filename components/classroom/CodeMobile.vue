<script setup lang="ts">
import { toast } from 'vue-sonner'
import { DotsVerticalIcon, CopyIcon } from '@radix-icons/vue'
import { ConfigProvider } from 'radix-vue'

const useIdFunction = () => useId()

const props = defineProps<{
  className: string
  code: string
}>()

const open = ref<boolean>(false)

const handleInteractOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (target?.closest('[data-sonner-toaster]')) return event.preventDefault()
}

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      toast.success('Đã sao chép mã lớp vào clipboard')
    })
    .catch(() => {
      toast.error('Sao chép mã lớp vào clipboard thất bại')
    })
}
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <div class="md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button
            variant="ghost"
            class="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsVerticalIcon class="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" class="w-[160px]">
          <DropdownMenuItem @click="open = true">
            Mã lớp
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog :open="open" @update:open="open = false">
        <DialogContent class="max-w-[370px]" @interact-outside="handleInteractOutside">
          <DialogTitle>Mã lớp</DialogTitle>

          <div class="flex flex-col items-center justify-center py-16">
            <p class="text-7xl text-gray-800 dark:text-white font-bold">
              {{ props.code }}
            </p>
          </div>

          <div class="flex justify-between items-center">
            <DialogTitle>{{ props.className }}</DialogTitle>

            <p class="text-primary cursor-pointer flex items-center" @click="copyToClipboard(props.code)">
              <CopyIcon class="h-4 w-4 mr-2" />
              Copy
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  </ConfigProvider>
</template>
