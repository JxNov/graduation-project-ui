<script setup lang="ts">
import Code from '../Code.vue'
import BulletinBoardEditor from './BulletinBoardEditor.vue'
import BulletinBoardHomework from './BulletinBoardHomework.vue'
import BulletinBoardHomeworkComment from './BulletinBoardHomeworkComment.vue'
import BulletinBoardNotification from './BulletinBoardNotification.vue'
import BulletinBoardHomeworkDueDate from './BulletinBoardHomeworkDueDate.vue'
import { scrollToFragment } from '@/utils/scrollToFragment'
import { checkPermissions } from '~/utils/checkPermissions'

const { $authStore } = useNuxtApp()

defineProps<{
  articlesClassroom: any
  className: string
  classSlug: string
  code: string
}>()

const teacherPermissions = checkPermissions($authStore.user.permissions, ['teacher.read'])
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

        <Card>
          <CardHeader>
            <CardTitle>Sắp đến hạn</CardTitle>
            <CardDescription>Tuyệt vời, không có bài tập nào sắp đến hạn!</CardDescription>
          </CardHeader>

          <!--          <CardContent class="flex flex-col gap-4">-->
          <!--            <BulletinBoardHomeworkDueDate @click="scrollToFragment('1')" />-->
          <!--            <BulletinBoardHomeworkDueDate @click="scrollToFragment('2')" />-->
          <!--          </CardContent>-->
        </Card>
      </div>

      <div class="col-span-12 md:col-span-9">
        <div class="flex flex-col gap-4">
          <BulletinBoardEditor :class-slug="classSlug" v-if="teacherPermissions" />

          <!--          <BulletinBoardHomework id="1">-->
          <!--            <BulletinBoardHomeworkComment />-->
          <!--          </BulletinBoardHomework>-->

          <!--          <BulletinBoardHomework id="2" />-->
          <!--          <BulletinBoardHomework id="3" />-->

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
