<script setup lang="ts">
import { ConfigProvider } from 'radix-vue'
import { DotsVerticalIcon } from '@radix-icons/vue'
import { checkPermissions } from '~/utils/checkPermissions'

const props = defineProps<{
  homework: any
}>()

const emits = defineEmits<{
  (e: 'editHomework', homework: any): void
  (e: 'deleteHomework', homework: any): void
}>()

const { $authStore } = useNuxtApp()
const useIdFunction = () => useId()
const router = useRouter()
const route = useRoute()

const teacherPermissions = checkPermissions($authStore.user.permissions, ['teacher.read'])

const isOpen = ref<boolean>(false)

const redirect = (path: string) => {
  router.push(path)
}

const editHomework = (homework: any) => {
  emits('editHomework', homework)
}

const deleteHomework = (homework: any) => {
  emits('deleteHomework', homework)
}
</script>

<template>
  <Collapsible v-model:open="isOpen">
    <Card
      class="transition-all duration-300 ease-in-out shadow-md hover:shadow-xl hover:bg-muted/50 cursor-pointer">
      <CollapsibleTrigger as-child>
        <CardHeader class="flex flex-row justify-between items-center gap-4 select-none">
          <div class="flex flex-row items-center gap-4">
            <Avatar>
              <AvatarImage :src="homework.teacherImage || ''" :alt="homework.teacherName" />
              <AvatarFallback>
                {{ homework.teacherName.split(' ').map((name: string) => name[0]).join('') }}
              </AvatarFallback>
            </Avatar>

            <CardTitle>{{ homework.title }}</CardTitle>
          </div>

          <div class="flex flex-row items-center gap-4">
            <CardDescription>{{ homework.dueDate }}</CardDescription>

            <ConfigProvider :use-id="useIdFunction" v-if="teacherPermissions">
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
                  <DropdownMenuItem @click="editHomework(homework)">
                    Sửa
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem @click="deleteHomework(homework)">
                    Xóa
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
            <CardDescription v-if="!homework.dueDate">Không có ngày đến hạn</CardDescription>
            <p class="text-sm" v-else>
              Tiêu chí:
              <span class="font-semibold">{{ homework.criteria }}</span>
            </p>
          </div>

          <div class="flex flex-row items-start gap-10">
            <div class="border-l-2 pl-4">
              <p class="text-4xl pb-2">{{ homework.submitted }}</p>
              <CardDescription>Đã nộp</CardDescription>
            </div>

            <div class="border-l-2 pl-4">
              <p class="text-4xl pb-2">{{ homework.notSubmitted }}</p>
              <CardDescription>Đã giao</CardDescription>
            </div>
          </div>
        </CardContent>

        <CardFooter class="border-t pt-6 flex gap-2">
          <Button type="button" variant="outline" @click="isOpen = false">Đóng</Button>
          <Button
            type="button"
            @click="redirect(`/classrooms/${route.params.classroomSlug}/homeworks/${homework.slug}`)"
          >
            Xem chi tiết
          </Button>
        </CardFooter>
      </CollapsibleContent>
    </Card>
  </Collapsible>
</template>
