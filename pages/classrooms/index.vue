<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { checkPermissions } from '~/utils/checkPermissions'
import { PlusIcon } from '@radix-icons/vue'

const { $classroomStore, $authStore } = useNuxtApp()

const isLoading = ref<boolean>(false)
const isDialogOpen = ref<boolean>(false)

const teacherPermissions = checkPermissions($authStore.user.permissions, ['teacher.read'])
const studentPermissions = checkPermissions($authStore.user.permissions, ['student.read'])

onMounted(() => {
  if (!$classroomStore.classrooms.length) {
    if (teacherPermissions) {
      $classroomStore.fetchClassrooms()
    } else if (studentPermissions) {
      $classroomStore.fetchClassroomStudent()
    }
  }
})

const formSchema = toTypedSchema(z.object({
  code: z.string()
}))

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema
})

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true

  try {
    const response = await $classroomStore.joinClassroom(values.code)
    console.log(response)

    if (!response) {
      throw new Error('Failed to join classroom')
    }

    isLoading.value = false
    isDialogOpen.value = false
  } catch (error) {
    isLoading.value = false
  }
})

const handleInteractOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (target?.closest('[data-sonner-toaster]')) return event.preventDefault()
}
</script>

<template>
  <div class="flex justify-end">
    <Button @click="isDialogOpen = true">
      <PlusIcon class="w-6 h-6 mr-2" />
      Join Classroom
    </Button>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <ClassroomItem
      v-for="classroom in $classroomStore.classrooms"
      :key="classroom.classSlug"
      :classroom="classroom"
    />

    <div v-if="!$classroomStore.classrooms.length" class="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
      <p class="text-lg text-center text-gray-500">No classroom found</p>
    </div>
  </div>

  <Dialog :open="isDialogOpen" @update:open="isDialogOpen = $event">
    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">
      <DialogHeader>
        <DialogTitle>Join Classroom</DialogTitle>

        <DialogDescription>
          Enter the invitation code to join the classroom
        </DialogDescription>
      </DialogHeader>

      <form class="space-y-6" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="code" :validate-on-blur="!isFieldDirty">
          <FormItem>
            <FormLabel>Code</FormLabel>

            <FormControl>
              <Input type="text" placeholder="xxxxxxx" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <DialogFooter>
          <Button type="submit">
            Join
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
