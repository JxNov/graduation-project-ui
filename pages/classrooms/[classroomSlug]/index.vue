<script setup lang="ts">
import { ConfigProvider } from 'radix-vue'
import BulletinBoard from '~/components/classroom/bulletin-board/BulletinBoard.vue'
import Homework from '~/components/classroom/homework/Homework.vue'
import People from '~/components/classroom/people/People.vue'

const useIdFunction = () => useId()

const title = 'Chi tiết lớp học'
const description = 'Chi tiết lớp học'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: '',
  twitterImage: '',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <Tabs default-value="bulletin-board">
      <div class="flex justify-between items-center">
        <TabsList>
          <TabsTrigger value="bulletin-board">
            Bulletin Board
          </TabsTrigger>

          <TabsTrigger value="homework">
            Homework
          </TabsTrigger>

          <TabsTrigger value="people">
            People
          </TabsTrigger>

          <TabsTrigger value="grades">
            Grades
          </TabsTrigger>
        </TabsList>

        <ClassroomCodeMobile />
      </div>

      <TabsContent value="bulletin-board" class="focus-visible:ring-0 focus-visible:ring-offset-0">
        <BulletinBoard />
      </TabsContent>

      <TabsContent value="homework" class="focus-visible:ring-0 focus-visible:ring-offset-0">
        <Homework />
      </TabsContent>

      <TabsContent value="people" class="focus-visible:ring-0 focus-visible:ring-offset-0">
        <People />
      </TabsContent>

      <TabsContent value="grades" class="focus-visible:ring-0 focus-visible:ring-offset-0">
        4
      </TabsContent>
    </Tabs>
  </ConfigProvider>
</template>
