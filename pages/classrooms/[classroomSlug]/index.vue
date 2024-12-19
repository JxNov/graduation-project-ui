<script setup lang="ts">
import type { Article } from '~/schema'

const { $classroomStore, $homeworkStore, $materialStore, $subjectStore, $semesterStore, $bus } = useNuxtApp()
const route = useRoute()
const echo = useEcho()
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
    subscribeToPrivateChannel()
  })

  $bus.on('article:commented', (val: any) => {
      const { articleId, ...comment } = val

      const article = articlesClassroom.value.find((article: any) => article.id === articleId)

      if (article) {
        if (Array.isArray(article.comments)) {
          const commentIndex = article.comments.findIndex((c: any) => c.id === comment.id)
          if (commentIndex !== -1) {
            article.comments[commentIndex] = comment
          } else {
            article.comments.push(comment)
          }
        } else {
          article.comments = [comment]
        }
      }
    }
  )

  $bus.on('article:deleted', (articleId: number) => {
    const index = articlesClassroom.value.findIndex((article: any) => article.id === articleId)
    articlesClassroom.value.splice(index, 1)
  })

  const { className: name, classCode, articles } = await $classroomStore.fetchDetailClassroom(classSlug)
  className.value = name
  code.value = classCode
  articlesClassroom.value = articles
  subscribeToPrivateChannel()

  const { teachers, students } = await $classroomStore.fetchPeopleClassroom(classSlug)
  teachersClassroom.value = teachers
  studentsClassroom.value = students

  await fetchData()
})

onBeforeUnmount(() => {
  $bus.off('article:created')
  $bus.off('article:commented')
  $bus.off('article:deleted')

  stopAllListeners()
})

async function fetchData() {
  await Promise.all([
    $homeworkStore.fetchHomeworks(route.params.classroomSlug as string),
    $materialStore.fetchMaterialClass(classSlug),
    $subjectStore.fetchSubjects(),
    $semesterStore.fetchSemesters()
  ])
}
</script>

<template>
  <Tabs default-value="bulletin-board">
    <div class="flex justify-between items-center">
      <TabsList>
        <TabsTrigger as-child value="bulletin-board">
          Bulletin Board
        </TabsTrigger>

        <TabsTrigger as-child value="homework">
          Homework
        </TabsTrigger>

        <TabsTrigger as-child value="people">
          People
        </TabsTrigger>

        <TabsTrigger as-child value="materials">
          Materials
        </TabsTrigger>
      </TabsList>

      <ClassroomCodeMobile :class-name="className" :code="code" />
    </div>

    <TabsContent value="bulletin-board" class="focus-visible:ring-0 focus-visible:ring-offset-0" :id="useIdFunction">
      <ClassroomBulletinBoard
        :articles-classroom="articlesClassroom"
        :class-name="className"
        :class-slug="classSlug"
        :code="code"
      />
    </TabsContent>

    <TabsContent value="homework" class="focus-visible:ring-0 focus-visible:ring-offset-0" :id="useIdFunction">
      <ClassroomHomework />
    </TabsContent>

    <TabsContent value="people" class="focus-visible:ring-0 focus-visible:ring-offset-0" :id="useIdFunction">
      <ClassroomPeople :teachers-classroom="teachersClassroom" :students-classroom="studentsClassroom" />
    </TabsContent>

    <TabsContent value="materials" class="focus-visible:ring-0 focus-visible:ring-offset-0" :id="useIdFunction">
      <ClassroomMaterials :data="$materialStore.materialClass" />
    </TabsContent>
  </Tabs>
</template>
