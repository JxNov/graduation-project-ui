<script setup lang="ts">
import { ConfigProvider } from 'radix-vue'
import { ClassroomBulletinBoard } from '~/components/classroom/bulletin-board'

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

          <TabsTrigger value="classwork">
            Classwork
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

      <TabsContent value="bulletin-board">
        <ClassroomBulletinBoard />
      </TabsContent>

      <TabsContent value="classwork">
        2
      </TabsContent>

      <TabsContent value="people">
        3
      </TabsContent>

      <TabsContent value="grades">
        4
      </TabsContent>
    </Tabs>
  </ConfigProvider>
</template>
