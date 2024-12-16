<script setup lang="ts">
import { DotsVerticalIcon, DownloadIcon, EyeOpenIcon, Pencil1Icon } from '@radix-icons/vue'
import { ConfigProvider } from 'radix-vue'

defineProps<{
  data: any
}>()

const emits = defineEmits<{
  (e: 'openGradeAssignment', data: any): void
}>()

const useIdFunction = () => useId()

const openFileAssignment = (filePath: string) => {
  window.open(`https://drive.google.com/file/d/${filePath}/view`, '_blank')
}

const downloadFileAssignment = (filePath: string) => {
  window.open(`https://drive.google.com/uc?export=download&id=${filePath}`, '_blank')
}

const openGradeAssignment = (data: any) => {
  emits('openGradeAssignment', data)
}

const countDateDays = (date: string) => {
  const date1 = new Date(date)
  const date2 = new Date()

  const diffTime = Math.abs(date2.getTime() - date1.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays > 1) {
    return `${diffDays} ngày`
  } else {
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60))
    if (diffHours > 1) {
      return `${diffHours} giờ`
    } else {
      const diffMinutes = Math.ceil(diffTime / (1000 * 60))
      if (diffMinutes > 1) {
        return `${diffMinutes} phút`
      } else {
        return `${Math.ceil(diffTime / 1000)} giây`
      }
    }
  }
}

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('en-US').format(value)
}
</script>

<template>
  <div class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 3xl:col-span-2">
    <Card
      class="transition-all duration-300 ease-in-out shadow-md hover:shadow-xl hover:bg-muted/50">
      <CardHeader class="flex flex-row justify-between items-start ">
        <div class="flex flex-row items-center gap-4 select-none">
          <Avatar>
            <AvatarImage :src="data.studentName || ''" :alt="data.studentName" />
            <AvatarFallback>
              {{ data.studentName.split(' ').map((name: string) => name[0]).join('') }}
            </AvatarFallback>
          </Avatar>

          <CardTitle>{{ data.studentName }}</CardTitle>
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
              <DropdownMenuItem
                class="flex items-center gap-2 cursor-pointer"
                @click="openFileAssignment(data.filePath)"
              >
                <EyeOpenIcon class="w-4 h-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                class="flex items-center gap-2 cursor-pointer"
                @click="downloadFileAssignment(data.filePath)"
              >
                <DownloadIcon class="w-4 h-4" />
                Download
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ConfigProvider>
      </CardHeader>

      <CardContent>
        <img
          v-if="data.filePath"
          :src="`https://drive.google.com/thumbnail?id=${data.filePath}`"
          class="w-full h-44 object-cover rounded-md aspect-square cursor-pointer select-none"
          :alt="data.studentName"
          loading="lazy"
          @click="openFileAssignment(data.filePath)"
        />

        <div class="flex justify-between items-center mt-4">
          <p class="text-sm">
            {{ countDateDays(data.submittedAt) }} trước
          </p>

          <p class="text-sm text-green-500" v-if="data.score">
            Đã chấm điểm: {{ formatNumber(data.score) }}
          </p>

          <p class="text-sm text-red-500" v-else>
            Chưa chấm
          </p>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          class="flex flex-row items-center gap-2 w-full"
          :variant="data.score ? 'outline' : 'default'"
          @click="openGradeAssignment(data)"
        >
          <Pencil1Icon class="w-4 h-4" />
          {{ data.score ? 'Chấm điểm lại' : 'Chấm điểm' }}
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>

