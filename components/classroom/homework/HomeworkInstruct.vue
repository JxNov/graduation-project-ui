<script setup lang="ts">
import { ConfigProvider } from 'radix-vue'
import { ChatBubbleIcon, DotsVerticalIcon } from '@radix-icons/vue'
import HomeworkInstructComment from './HomeworkInstructComment.vue'
import HomeworkInstructEditor from './HomeworkInstructEditor.vue'
import HomeworkSubmit from './HomeworkSubmit.vue'

const useIdFunction = () => useId()

defineProps<{
  data: any
}>()
</script>

<template>
  <div class="grid lg:grid-cols-12 gap-4 xl:px-24 mt-10">
    <div class="h-fit lg:hidden">
      <HomeworkSubmit />
    </div>

    <Card class="lg:col-span-8 2xl:col-span-9">
      <CardHeader class="flex lg:flex-row justify-between items-center">
        <div class="flex flex-row items-start gap-4">
          <Avatar>
            <AvatarImage :src="data?.teacher || ''" :alt="data?.teacher" />
            <AvatarFallback>{{ data?.teacher.split(' ').map((name: string) => name[0]).join('') }}
            </AvatarFallback>
          </Avatar>

          <div class="flex flex-col gap-2">
            <CardTitle class="text-3xl">{{ data?.title }}</CardTitle>
            <CardDescription>
              <!--              Nguyen Manh Dung [FPL HN] • 04 thg 11, 2024 (Đã chỉnh sửa 07 thg 11, 2024)-->
              <!--              {{ data?.teacher }} • {{ data?.createdAt }} (Đã chỉnh sửa {{ data?.updatedAt }})-->
              {{ data?.teacher }}
            </CardDescription>
            <!--            <CardTitle>100 points</CardTitle>-->
          </div>
        </div>

        <!--        <div-->
        <!--          class="w-full flex-row-reverse flex justify-between items-center lg:w-fit lg:flex-col lg:items-end gap-10">-->
        <!--          <ConfigProvider :use-id="useIdFunction">-->
        <!--            <DropdownMenu>-->
        <!--              <DropdownMenuTrigger as-child>-->
        <!--                <Button-->
        <!--                  variant="ghost"-->
        <!--                  class="flex h-8 w-8 p-0 data-[state=open]:bg-muted"-->
        <!--                >-->
        <!--                  <DotsVerticalIcon class="h-4 w-4" />-->
        <!--                  <span class="sr-only">Open menu</span>-->
        <!--                </Button>-->
        <!--              </DropdownMenuTrigger>-->
        <!--              <DropdownMenuContent align="end" class="w-[160px]">-->
        <!--                <DropdownMenuItem>-->
        <!--                  Edit-->
        <!--                </DropdownMenuItem>-->
        <!--                <DropdownMenuSeparator />-->

        <!--                <DropdownMenuItem>-->
        <!--                  Delete-->
        <!--                </DropdownMenuItem>-->
        <!--              </DropdownMenuContent>-->
        <!--            </DropdownMenu>-->
        <!--          </ConfigProvider>-->

        <!--          <CardTitle class="pr-2 ml-14">Đến hạn 11:22 08 thg 11, 2024</CardTitle>-->
        <!--        </div>-->

        <CardTitle>Đến hạn {{ data?.dueDate }}</CardTitle>
      </CardHeader>

      <CardContent class="border-t pt-6">
        <div class="prose">
          {{ data?.criteria }}
        </div>
      </CardContent>

      <!--      <div class="border-t">-->
      <!--        <div class="flex flex-col gap-6 px-6 pt-6 pb-2">-->
      <!--          <div class="flex flex-row items-center gap-2 pl-1">-->
      <!--            <ChatBubbleIcon class="w-5 h-5" />-->
      <!--            <span class="font-medium">2 nhận xét về lớp học</span>-->
      <!--          </div>-->

      <!--          <HomeworkInstructComment />-->
      <!--          <HomeworkInstructComment />-->
      <!--          <HomeworkInstructComment />-->
      <!--          <HomeworkInstructComment />-->
      <!--        </div>-->

      <!--        <HomeworkInstructEditor />-->
      <!--      </div>-->
    </Card>

    <div class="hidden lg:block lg:col-span-4 2xl:col-span-3 h-fit">
      <HomeworkSubmit />
    </div>
  </div>
</template>

