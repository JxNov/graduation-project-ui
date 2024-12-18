<script setup lang="ts">
import { toast } from 'vue-sonner'
import { EnterFullScreenIcon } from '@radix-icons/vue'

const props = defineProps<{
  className: string
  code: string
}>()

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
  <Card>
    <CardHeader>
      <CardTitle>Mã lớp</CardTitle>
    </CardHeader>

    <CardContent class="flex items-center">
      <TooltipProvider>
        <Tooltip :delay-duration="0">
          <TooltipTrigger>
            <p
              class="text-lg text-gray-800 dark:text-white font-bold transition-colors duration-300 cursor-pointer hover:text-primary"
              @click="copyToClipboard(props.code)"
            >
              {{ props.code }}
            </p>
          </TooltipTrigger>

          <TooltipContent>
            <p>Nhấn để sao chép</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog>
        <DialogTrigger as-child>
          <EnterFullScreenIcon
            class="w-6 h-6 ml-2 text-primary cursor-pointer transition-transform duration-300 hover:scale-125"
          />
        </DialogTrigger>

        <DialogContent class="max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Mã lớp</DialogTitle>
          </DialogHeader>

          <div class="flex flex-col items-center justify-center py-16">
            <p class="text-9xl text-gray-800 dark:text-white font-bold">
              {{ props.code }}
            </p>
          </div>

          <DialogTitle>{{ props.className }}</DialogTitle>
        </DialogContent>
      </Dialog>
    </CardContent>
  </Card>
</template>
