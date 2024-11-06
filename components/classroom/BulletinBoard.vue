<script setup lang="ts">
import { toast } from 'vue-sonner'

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      toast.success('Đã sao chép mã lớp vào clipboard', {
        action: {
          label: 'Đóng'
        }
      })
    })
    .catch(() => {
      toast.error('Sao chép mã lớp vào clipboard thất bại', {
        action: {
          label: 'Đóng'
        }
      })
    })
}
</script>

<template>
  <div class="w-full flex flex-col gap-4 lg:px-28 mt-10">
    <div class="relative w-full h-56 rounded-lg overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1720048170996-40507a45c720?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"
        alt="Background Image"
        class="object-cover w-full h-full"
      />
      <div class="absolute inset-0 bg-black opacity-50" />

      <p class="absolute bottom-4 left-4 flex items-center justify-center text-white text-4xl font-bold z-10">
        Bulletin Board
      </p>
    </div>

    <div class="grid grid-cols-12 gap-4">
      <div class="hidden md:block col-span-3 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Mã lớp</CardTitle>
          </CardHeader>

          <CardContent>
            <p
              class="text-lg text-gray-800 dark:text-white font-bold cursor-pointer"
              @click="copyToClipboard('ABC123')"
            >
              ABC123
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sắp đến hạn</CardTitle>
            <CardDescription>Tuyệt vời, không có bài tập nào sắp đến hạn!</CardDescription>
          </CardHeader>

          <CardContent>
          </CardContent>

          <CardFooter class="flex justify-end">
            <Button variant="default" color="primary">Xem tất cả</Button>
          </CardFooter>
        </Card>
      </div>

      <div class="col-span-12 md:col-span-9">
        <div class="flex flex-col gap-4">
          <ClassroomBulletinBoardEditor />

          <ClassroomBulletinBoardCard />
          <ClassroomBulletinBoardCard />
          <ClassroomBulletinBoardCard />
        </div>
      </div>
    </div>
  </div>
</template>
