<script setup lang="ts">
import { ConfigProvider } from 'radix-vue'
import HomeworkInstruct from '~/components/classroom/homework/HomeworkInstruct.vue'

const { $classroomStore } = useNuxtApp()
const useIdFunction = () => useId()

const title = 'Chi tiết bài tập'
const description = 'Chi tiết bài tập'
const route = useRoute()

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

onMounted(async () => {
  const { className: name, classCode } = await $classroomStore.fetchDetailClassroom(classSlug)
  className.value = name
  code.value = classCode
})
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
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
        <HomeworkInstruct />
      </TabsContent>

      <TabsContent value="student-homework" class="focus-visible:ring-0 focus-visible:ring-offset-0">
        Bài tập của học sinh
      </TabsContent>
    </Tabs>
  </ConfigProvider>
</template>
