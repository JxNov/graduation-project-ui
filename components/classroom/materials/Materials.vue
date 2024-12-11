<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { refDebounced } from '@vueuse/core'
import MaterialsCard from './MaterialsCard.vue'
import { checkPermissions } from '~/utils/checkPermissions'
import { PlusIcon } from '@radix-icons/vue'

const { $authStore } = useNuxtApp()

interface MaterialProps {
  data: any
}

const props = defineProps<MaterialProps>()

type Material = {
  title: string
  slug: string
  subjectName: string
  subjectSlug: string
  filePath: string
}

const searchValue = ref<string>('')
const selectedSubject = ref<string>('')
const debouncedSearch = refDebounced(searchValue, 250)
const teacherPermissions = checkPermissions($authStore.user.permissions, ['teacher.read'])

const filteredMaterialList = computed(() => {
  let output: Material[] = []
  const searchValue = debouncedSearch.value?.trim().toLowerCase()
  const subjectValue = selectedSubject.value.toLowerCase()
  if (!searchValue && !subjectValue) {
    output = props.data
  } else {
    output = props.data.filter((item: any) => {
      return (item.subjectSlug.toLowerCase().includes(searchValue) || item.title.toLowerCase().includes(searchValue)) && item.subjectSlug.toLowerCase().includes(subjectValue)
    })
  }

  return output
})

const getMaterialSubject = computed(() => {
  const subjectList = props.data.map((item: any) => item.subjectSlug)
  return Array.from(new Set(subjectList))
})

const getName = (slug: string) => {
  const subject = props.data.find((item: any) => item.subjectSlug === slug)
  return subject.subjectName
}

const clearSearch = () => {
  searchValue.value = ''
  selectedSubject.value = ''
}
</script>

<template>
  <div class="w-full flex flex-col gap-4 xl:px-16 mt-10">
    <div class="flex justify-end" v-if="teacherPermissions">
      <Drawer>
        <DrawerTrigger as-child>
          <Button type="button">
            <PlusIcon class="w-6 h-6 mr-1" />
            Create Homework
          </Button>
        </DrawerTrigger>

        <DrawerContent class="h-full">
          <div class="mx-auto w-full max-w-screen-xl">
            <DrawerHeader>
              <DrawerTitle>Create Homework</DrawerTitle>
              <DrawerDescription>Fill in the form below to create a new homework.</DrawerDescription>
            </DrawerHeader>


            <DrawerFooter>
              <Button>Submit</Button>

              <DrawerClose as-child>
                <Button variant="outline">
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>

    <Card class="flex justify-between items-center gap-4 p-4">
      <CardTitle class="text-2xl">
        Materials List
      </CardTitle>

      <form>
        <div class="flex justify-end gap-2">
          <div class="relative">
            <Search class="absolute left-2 top-2.5 size-4 text-muted-foreground" />
            <Input v-model="searchValue" placeholder="Search" class="pl-8" />
          </div>

          <Select v-model="selectedSubject">
            <SelectTrigger class="w-[180px]">
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Subjects</SelectLabel>
                <SelectItem
                  v-for="(subject, index) in getMaterialSubject"
                  :key="index"
                  :value="subject as string"
                >
                  {{ getName(subject as string) }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button
            type="button"
            variant="outline"
            @click="clearSearch"
          >
            Clear filters
          </Button>
        </div>
      </form>
    </Card>

    <MaterialsCard :data="filteredMaterialList" />
  </div>
</template>
