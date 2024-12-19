<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { refDebounced } from '@vueuse/core'
import MaterialsCard from './MaterialsCard.vue'
import { checkPermissions } from '~/utils/checkPermissions'
import { PlusIcon } from '@radix-icons/vue'
import type { Material } from '~/schema'
import { MaterialClassDialogCreateEdit, MaterialClassDialogDelete } from '~/components/common/dialog/material-class'

const { $authStore, $bus } = useNuxtApp()

interface MaterialProps {
  data: any
}

const props = defineProps<MaterialProps>()

const isCreating = ref<boolean>(false)
const isEditing = ref<boolean>(false)
const isDeleting = ref<boolean>(false)
const selectedValue = ref<any>({})
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

const handleInteractOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (target?.closest('[data-sonner-toaster]')) return event.preventDefault()
}

const handleCloseDialog = () => {
  isCreating.value = false
  isEditing.value = false
  isDeleting.value = false
  selectedValue.value = {}
}

onMounted(() => {
  $bus.on('close-dialog-create-edit', (value: boolean) => {
    isCreating.value = value
    isEditing.value = value
    selectedValue.value = {}
  })

  $bus.on('open-dialog-edit-material-class', (value: any) => {
    isEditing.value = value.isEditing
    selectedValue.value = value.item
  })

  $bus.on('open-dialog-delete-material-class', (value: any) => {
    isDeleting.value = value.isDeleting
    selectedValue.value = value.item
  })

  $bus.on('close-dialog-delete-material-class', (value: boolean) => {
    isDeleting.value = value
    selectedValue.value = {}
  })
})

onBeforeUnmount(() => {
  $bus.off('close-dialog-create-edit')
  $bus.off('open-dialog-edit-material-class')
  $bus.off('open-dialog-delete-material-class')
  $bus.off('close-dialog-delete-material-class')
})
</script>

<template>
  <div class="w-full flex flex-col gap-4 xl:px-16 mt-10">
    <div class="flex justify-end" v-if="teacherPermissions">
      <Button
        type="button"
        @click="isCreating = true"
      >
        <PlusIcon class="size-4 mr-2" />
        Tạo tài liệu
      </Button>
    </div>

    <Card class="flex justify-between items-center gap-4 p-4">
      <CardTitle class="text-2xl">
        Danh sách tài liệu
      </CardTitle>

      <form>
        <div class="flex justify-end gap-2">
          <div class="relative">
            <Search class="absolute left-2 top-2.5 size-4 text-muted-foreground" />
            <Input v-model="searchValue" placeholder="Tìm kiếm" class="pl-8" />
          </div>

          <Select v-model="selectedSubject">
            <SelectTrigger class="w-[180px]">
              <SelectValue placeholder="Môn học" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Môn</SelectLabel>
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
            Xóa bộ lọc
          </Button>
        </div>
      </form>
    </Card>

    <MaterialsCard :data="filteredMaterialList" />
  </div>

  <Dialog :open="isCreating" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[550px]" @interact-outside="handleInteractOutside">
      <ScrollArea class="max-h-[650px] w-full px-2">
        <MaterialClassDialogCreateEdit />
      </ScrollArea>
    </DialogContent>
  </Dialog>

  <Dialog :open="isEditing" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[550px]" @interact-outside="handleInteractOutside">
      <ScrollArea class="max-h-[650px] w-full px-2">
        <MaterialClassDialogCreateEdit edit :data="selectedValue" />
      </ScrollArea>
    </DialogContent>
  </Dialog>

  <Dialog :open="isDeleting" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[550px]" @interact-outside="handleInteractOutside">
      <ScrollArea class="max-h-[650px] w-full px-2">
        <MaterialClassDialogDelete :data="selectedValue" />
      </ScrollArea>
    </DialogContent>
  </Dialog>
</template>
