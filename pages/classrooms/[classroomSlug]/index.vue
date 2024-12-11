<script setup lang="ts">
import type { Article } from '~/schema'

const { $classroomStore, $materialStore, $bus } = useNuxtApp()
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

  if (!$materialStore.materials.length) {
    await $materialStore.fetchMaterialsClass(classSlug)
  }
})

onBeforeUnmount(() => {
  $bus.off('article:created')
  $bus.off('article:commented')

  stopAllListeners()
})
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
      <ClassroomMaterials :data="$materialStore.materials" />
    </TabsContent>
  </Tabs>
</template>
