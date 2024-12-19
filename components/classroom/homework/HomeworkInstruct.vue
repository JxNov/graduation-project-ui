<script setup lang="ts">
import { ConfigProvider } from 'radix-vue'
import { ChatBubbleIcon, DotsVerticalIcon } from '@radix-icons/vue'
import HomeworkInstructComment from './HomeworkInstructComment.vue'
import HomeworkInstructEditor from './HomeworkInstructEditor.vue'
import HomeworkSubmit from './HomeworkSubmit.vue'
import { checkPermissions } from '~/utils/checkPermissions'

const { $authStore } = useNuxtApp()
const useIdFunction = () => useId()

const props = defineProps<{
  data: any
  userSubmittedAssignment?: any
}>()

const studentPermissions = checkPermissions($authStore.user.permissions, ['student.read'])
const teacherPermissions = checkPermissions($authStore.user.permissions, ['teacher.read'])
</script>

<template>
  <div class="grid lg:grid-cols-12 gap-4 xl:px-24 mt-10">
    <div class="h-fit lg:hidden" v-if="studentPermissions">
      <HomeworkSubmit :data="userSubmittedAssignment" :due-date="data?.dueDate" />
    </div>


    <Card
      class="lg:col-span-8 2xl:col-span-9"
      :class="{ 'lg:col-span-12 2xl:col-span-12': !studentPermissions }"
    >
      <CardHeader class="flex lg:flex-row justify-between items-center">
        <div class="flex flex-row items-start gap-4">
          <Avatar>
            <AvatarImage :src="data?.teacherImage || ''" :alt="data?.teacherName" />
            <AvatarFallback>{{ data?.teacherName.split(' ').map((name: string) => name[0]).join('') }}
            </AvatarFallback>
          </Avatar>

          <div class="flex flex-col gap-2">
            <CardTitle class="text-3xl">{{ data?.title }}</CardTitle>
            <CardDescription>
              {{ data?.teacherName }}
            </CardDescription>
          </div>
        </div>

        <div class="w-full flex-row-reverse flex justify-between items-center lg:w-fit lg:flex-col lg:items-end gap-4">
          <!--          <ConfigProvider :use-id="useIdFunction" v-if="teacherPermissions">-->
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
          <!--                  Sửa-->
          <!--                </DropdownMenuItem>-->
          <!--                <DropdownMenuSeparator />-->

          <!--                <DropdownMenuItem>-->
          <!--                  Xóa-->
          <!--                </DropdownMenuItem>-->
          <!--              </DropdownMenuContent>-->
          <!--            </DropdownMenu>-->
          <!--          </ConfigProvider>-->

          <CardTitle
            class="pr-2 ml-14"
            v-if="data?.dueDate"
          >
            Đến hạn {{ data?.dueDate }}
          </CardTitle>
        </div>
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

    <div class="hidden lg:block lg:col-span-4 2xl:col-span-3 h-fit" v-if="studentPermissions">
      <HomeworkSubmit :data="userSubmittedAssignment" :due-date="data?.dueDate" />
    </div>
  </div>
</template>

