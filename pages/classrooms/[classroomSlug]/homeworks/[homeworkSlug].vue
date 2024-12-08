<script setup lang="ts">
import HomeworkInstruct from '~/components/classroom/homework/HomeworkInstruct.vue'
import HomeworkStudent from '~/components/classroom/homework/HomeworkStudent.vue'

const { $classroomStore, $homeworkStore } = useNuxtApp()
const route = useRoute()

const title = 'Chi tiết bài tập'
const description = 'Chi tiết bài tập'

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
const code = ref<string>('')
const homework = ref<any>(null)

onMounted(async () => {
  const { className: name, classCode } = await $classroomStore.fetchDetailClassroom(classSlug)
  className.value = name
  code.value = classCode

  if (!$homeworkStore.homeworks.length) {
    await $homeworkStore.fetchHomeworks(route.params.classroomSlug as string)
  }

  homework.value = $homeworkStore.homeworks.find((homework: any) => homework.slug === route.params.homeworkSlug)
})
</script>

<template>
  <ClientOnly>
    <Tabs default-value="instruct">
      <div class="flex justify-between items-center">
        <TabsList>
          <TabsTrigger value="instruct">
            Instruct
          </TabsTrigger>

          <TabsTrigger value="student-homework">
            Student Homework
          </TabsTrigger>
        </TabsList>

        <ClassroomCodeMobile :class-name="className" :code="code" />
      </div>

      <TabsContent value="instruct" class="focus-visible:ring-0 focus-visible:ring-offset-0">
        <HomeworkInstruct :data="homework" />
      </TabsContent>

      <TabsContent value="student-homework" class="focus-visible:ring-0 focus-visible:ring-offset-0">
        <HomeworkStudent />
      </TabsContent>
    </Tabs>
  </ClientOnly>
</template>
