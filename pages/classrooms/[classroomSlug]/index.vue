<script setup lang="ts">
import type { Article } from '~/schema'

const { $classroomStore, $bus } = useNuxtApp()
const route = useRoute()
const echo = useEcho()

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
const articlesClassroom = ref<Article[]>([])
const code = ref<string>('')
const teachersClassroom = ref<object[]>([])
const studentsClassroom = ref<object[]>([])

const stopAllListeners = () => {
  echo.leaveAllChannels()
}

const subscribeToPrivateChannel = () => {
  const articleIds = articlesClassroom.value.map((article: any) => article.id)

  articleIds.forEach((articleId: number) => {
    echo
      .private(`article.${articleId}`)
      .listen('.comment.created', (e: object) => {
        $bus.emit('article:commented', {
          articleId,
          ...e
        })
      })
      .error((e: object) => {
        console.error('Private channel error', e)
      })
  })
}

onMounted(async () => {
  $bus.on('article:created', (article: any) => {
    articlesClassroom.value.push(article)
  })

  $bus.on('article:commented', (val: any) => {
      const { articleId, ...comment } = val

      const article = articlesClassroom.value.find((article: any) => article.id === articleId)

      if (article) {
        article.comments.push(comment)
      }
    }
  )

  const { className: name, classCode, articles } = await $classroomStore.fetchDetailClassroom(classSlug)
  className.value = name
  code.value = classCode
  articlesClassroom.value = articles
  subscribeToPrivateChannel()

  const { teachers, students } = await $classroomStore.fetchPeopleClassroom(classSlug)
  teachersClassroom.value = teachers
  studentsClassroom.value = students
})

onBeforeUnmount(() => {
  $bus.off('article:created')
  $bus.off('article:commented')

  stopAllListeners()
})

const data = [
  {
    title: 'Material 1',
    slug: 'material-1',
    subject: 'Math',
    filePath: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    title: 'Material 2',
    slug: 'material-2',
    subject: 'Physics',
    filePath: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    title: 'Material 3',
    slug: 'material-3',
    subject: 'Chemistry',
    filePath: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    title: 'Material 4',
    slug: 'material-4',
    subject: 'Math',
    filePath: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  }
]
</script>

<template>
  <ClientOnly>
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

          <TabsTrigger value="materials">
            Materials
          </TabsTrigger>
        </TabsList>

        <ClassroomCodeMobile :class-name="className" :code="code" />
      </div>

      <TabsContent value="bulletin-board" class="focus-visible:ring-0 focus-visible:ring-offset-0">
        <ClassroomBulletinBoard
          :articles-classroom="articlesClassroom"
          :class-name="className"
          :class-slug="classSlug"
          :code="code"
        />
      </TabsContent>

      <TabsContent value="homework" class="focus-visible:ring-0 focus-visible:ring-offset-0">
        <ClassroomHomework />
      </TabsContent>

      <TabsContent value="people" class="focus-visible:ring-0 focus-visible:ring-offset-0">
        <ClassroomPeople :teachers-classroom="teachersClassroom" :students-classroom="studentsClassroom" />
      </TabsContent>

      <TabsContent value="materials" class="focus-visible:ring-0 focus-visible:ring-offset-0">
        <ClassroomMaterials :data="data" />
      </TabsContent>
    </Tabs>
  </ClientOnly>
</template>
