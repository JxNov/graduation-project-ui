<script setup lang="ts">
import Code from '../Code.vue'
import BulletinBoardEditor from './BulletinBoardEditor.vue'
import BulletinBoardHomework from './BulletinBoardHomework.vue'
import BulletinBoardNotification from './BulletinBoardNotification.vue'
import BulletinBoardHomeworkDueDate from './BulletinBoardHomeworkDueDate.vue'
import { scrollToFragment } from '@/utils/scrollToFragment'
import { checkPermissions } from '~/utils/checkPermissions'

const { $authStore, $homeworkStore } = useNuxtApp()
const route = useRoute()

defineProps<{
  articlesClassroom: any
  className: string
  classSlug: string
  code: string
}>()

const teacherPermissions = checkPermissions($authStore.user.permissions, ['teacher.read'])
const isDueDate = ref<boolean>(false)

const calculateDueDate = (dueDate: string) => {
  const dueDateInMs = new Date(dueDate).getTime()
  const currentDate = new Date().getTime()
  const diffTime = dueDateInMs - currentDate
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

onMounted(async () => {
  const homeworks = $homeworkStore.homeworks.filter((homework: any) => {
    const dueDate = calculateDueDate(homework.dueDate)
    return dueDate <= 3 && dueDate >= 0
  })

  isDueDate.value = homeworks.length > 0
})
</script>

<template>
  <div class="w-full flex flex-col gap-4 xl:px-28 mt-10">
    <div class="relative w-full h-56 rounded-lg overflow-hidden">
      <!--      <img-->
      <!--        src="https://images.unsplash.com/photo-1720048170996-40507a45c720?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"-->
      <!--        alt="Background Image"-->
      <!--        class="object-cover w-full h-full"-->
      <!--      />-->
      <div class="absolute inset-0 bg-gradient-to-br from-primary to-primary-foreground/50" />
      <div class="absolute inset-0 bg-black opacity-50" />

      <p class="absolute bottom-4 left-4 flex items-center justify-center text-white text-4xl font-bold z-10">
        {{ className }}
      </p>
    </div>

    <div class="grid grid-cols-12 gap-4">
      <div class="hidden md:block col-span-3 space-y-4">
        <Code :class-name="className" :code="code" />

        <Card v-if="!teacherPermissions">
          <CardHeader>
            <CardTitle>Sắp đến hạn</CardTitle>
            <!--            <CardDescription>Tuyệt vời, không có bài tập nào sắp đến hạn!</CardDescription>-->
            <CardDescription v-if="!isDueDate">Tuyệt vời, không có bài tập nào sắp đến hạn!</CardDescription>
          </CardHeader>

          <CardContent class="flex flex-col gap-4">
            <template v-for="homework in $homeworkStore.homeworks" :key="homework.slug">
              <BulletinBoardHomeworkDueDate
                :data="homework"
                v-if="calculateDueDate(homework.dueDate) <= 3 && calculateDueDate(homework.dueDate) >= 0"
                @click="scrollToFragment(homework.slug)"
              />
            </template>
          </CardContent>
        </Card>
      </div>

      <div class="col-span-12 md:col-span-9">
        <div class="flex flex-col gap-4">
          <BulletinBoardEditor :class-slug="classSlug" v-if="teacherPermissions" />

          <template v-for="homework in $homeworkStore.homeworks" :key="homework.slug">
            <BulletinBoardHomework
              :data="homework"
              :id="homework.slug"
            />
          </template>

          <BulletinBoardNotification
            v-for="article in articlesClassroom"
            :key="article.id"
            :article="article"
          />
        </div>
      </div>
    </div>
  </div>
</template>
