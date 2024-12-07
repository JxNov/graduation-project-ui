<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { refDebounced } from '@vueuse/core'
import MaterialsCard from './MaterialsCard.vue'

interface MaterialProps {
  data: any
}

const props = defineProps<MaterialProps>()

type Material = {
  title: string
  slug: string
  subject: string
  filePath: string
}

const searchValue = ref('')
const selectedSubject = ref('')
const debouncedSearch = refDebounced(searchValue, 250)

const filteredMaterialList = computed(() => {
  let output: Material[] = []
  const searchValue = debouncedSearch.value?.trim().toLowerCase()
  const subjectValue = selectedSubject.value.toLowerCase()
  if (!searchValue && !subjectValue) {
    output = props.data
  } else {
    output = props.data.filter((item: any) => {
      return (item.subject.toLowerCase().includes(searchValue) || item.title.toLowerCase().includes(searchValue)) && item.subject.toLowerCase().includes(subjectValue)
    })
  }

  return output
})

const getMaterialSubject = computed(() => {
  const subjectList = props.data.map((item: any) => item.subject)
  return Array.from(new Set(subjectList))
})

const clearSearch = () => {
  searchValue.value = ''
  selectedSubject.value = ''
}
</script>

<template>
  <div class="w-full flex flex-col gap-4 xl:px-16 mt-10">
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
                  {{ subject }}
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

    <div class="grid grid-cols-5 gap-4">
      <MaterialsCard :data="filteredMaterialList" />
    </div>
  </div>
</template>
