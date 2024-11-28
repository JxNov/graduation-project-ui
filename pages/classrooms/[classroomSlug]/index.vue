<script setup lang="ts">
import { ConfigProvider } from 'radix-vue'
import BulletinBoard from '~/components/classroom/bulletin-board/BulletinBoard.vue'
import Homework from '~/components/classroom/homework/Homework.vue'
import People from '~/components/classroom/people/People.vue'

const { $classroomStore, $bus } = useNuxtApp()
const useIdFunction = () => useId()
const route = useRoute()

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

const classSlug = route.params.classroomSlug as string
const className = ref<string>('')
const articlesClassroom = ref<object[]>([])
const code = ref<string>('')
const teachersClassroom = ref<object[]>([])
const studentsClassroom = ref<object[]>([])

onMounted(async () => {
  $bus.on('article:created', (article: any) => {
    articlesClassroom.value.unshift(article)
  })

  $bus.on('article:commented', async () => {
    const { articles } = await $classroomStore.fetchDetailClassroom(classSlug)
    articlesClassroom.value = articles
  })

  const { className: name, classCode, articles } = await $classroomStore.fetchDetailClassroom(classSlug)
  className.value = name
  code.value = classCode
  articlesClassroom.value = articles

  const { teachers, students } = await $classroomStore.fetchPeopleClassroom(classSlug)
  teachersClassroom.value = teachers
  studentsClassroom.value = students
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

        <ClassroomCodeMobile :class-name="className" :code="code" />
      </div>

      <TabsContent value="bulletin-board" class="focus-visible:ring-0 focus-visible:ring-offset-0">
        <BulletinBoard
          :articles-classroom="articlesClassroom"
          :class-name="className"
          :class-slug="classSlug"
          :code="code"
        />
      </TabsContent>

      <TabsContent value="homework" class="focus-visible:ring-0 focus-visible:ring-offset-0">
        <Homework />
      </TabsContent>

      <TabsContent value="people" class="focus-visible:ring-0 focus-visible:ring-offset-0">
        <People :teachers-classroom="teachersClassroom" :students-classroom="studentsClassroom" />
      </TabsContent>

      <TabsContent value="grades" class="focus-visible:ring-0 focus-visible:ring-offset-0">
        4
      </TabsContent>
    </Tabs>
  </ConfigProvider>
</template>
