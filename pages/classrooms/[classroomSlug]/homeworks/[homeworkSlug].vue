<script setup lang="ts">
import HomeworkInstruct from '~/components/classroom/homework/HomeworkInstruct.vue'
import HomeworkStudent from '~/components/classroom/homework/HomeworkStudent.vue'
import { checkPermissions } from '~/utils/checkPermissions'

const { $classroomStore, $homeworkStore, $authStore } = useNuxtApp()
const route = useRoute()
const useIdFunction = () => useId()

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
const userSubmittedAssignment = ref<any>([])

const teacherPermissions = checkPermissions($authStore.user.permissions, ['teacher.read'])

onMounted(async () => {
  const { className: name, classCode } = await $classroomStore.fetchDetailClassroom(classSlug)
  className.value = name
  code.value = classCode

  if (!$homeworkStore.homeworks.length) {
    await $homeworkStore.fetchHomeworks(route.params.classroomSlug as string)
  }

  homework.value = $homeworkStore.homeworks.find((homework: any) => homework.slug === route.params.homeworkSlug)
  userSubmittedAssignment.value = await $homeworkStore.fetchDetailSubmittedAssignment(route.params.classroomSlug as string, route.params.homeworkSlug as string)
})

const handleUpdate = (data: any) => {
  const index = userSubmittedAssignment.value.findIndex((item: any) => item.studentUsername === data.studentUsername)
  userSubmittedAssignment.value[index] = data
}
</script>

<template>
  <Tabs default-value="instruct" v-if="teacherPermissions">
    <div class="flex justify-between items-center">
      <TabsList>
        <TabsTrigger value="instruct">
          Chi tiết
        </TabsTrigger>

        <TabsTrigger value="student-homework">
          Bài tập
        </TabsTrigger>
      </TabsList>

      <ClassroomCodeMobile :class-name="className" :code="code" />
    </div>

    <TabsContent value="instruct" class="focus-visible:ring-0 focus-visible:ring-offset-0" :id="useIdFunction">
      <HomeworkInstruct :data="homework" />
    </TabsContent>

    <TabsContent value="student-homework" class="focus-visible:ring-0 focus-visible:ring-offset-0" :id="useIdFunction">
      <HomeworkStudent :homework="homework" :data="userSubmittedAssignment" @update="handleUpdate" />
    </TabsContent>
  </Tabs>

  <HomeworkInstruct :data="homework" :user-submitted-assignment="userSubmittedAssignment" v-else />
</template>
