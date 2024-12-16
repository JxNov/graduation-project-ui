<script setup lang="ts">
import { ConfigProvider } from 'radix-vue'
import { DotsVerticalIcon } from '@radix-icons/vue'
import { checkPermissions } from '~/utils/checkPermissions'

const { $authStore, $bus } = useNuxtApp()
const useIdFunction = () => useId()

const props = defineProps<{
  data: any
}>()

const openFile = (filePath: string) => {
  // window.open(`https://docs.google.com/document/d/${filePath}/edit`, '_blank')
  window.open(`https://drive.google.com/file/d/${filePath}/view`, '_blank')
}

const downloadFile = (filePath: string) => {
  // window.open(`https://docs.google.com/document/d/${filePath}/export?format=docx`, '_blank')
  window.open(`https://drive.google.com/uc?export=download&id=${filePath}`, '_blank')
}

const teacherPermissions = checkPermissions($authStore.user.permissions, ['teacher.read'])

const editMaterial = (item: any) => {
  $bus.emit('open-dialog-edit-material-class', { isEditing: true, item })
}

const deleteMaterial = (item: any) => {
  $bus.emit('open-dialog-delete-material-class', { isDeleting: true, item })
}
</script>

<template>
  <div
    v-if="props.data.length"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
  >
    <Card v-for="(item, index) in props.data" :key="index"
          class="transition-all duration-300 ease-in-out shadow-md hover:shadow-xl hover:bg-muted/50 cursor-pointer">
      <CardHeader class="flex flex-row justify-between items-start gap-4">
        <div class="flex flex-col gap-1">
          <CardTitle>
            {{ item.title }}
          </CardTitle>

          <CardDescription>
            {{ item.subjectName }}
          </CardDescription>
        </div>

        <ConfigProvider :use-id="useIdFunction">
          <DropdownMenu v-if="teacherPermissions">
            <DropdownMenuTrigger as-child>
              <Button
                variant="ghost"
                class="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
              >
                <DotsVerticalIcon class="h-4 w-4" />
                <span class="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-[160px]">
              <DropdownMenuItem
                @click="editMaterial(item)"
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem @click="deleteMaterial(item)">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ConfigProvider>
      </CardHeader>

      <CardContent>
        <img
          v-if="item.filePath"
          :src="`https://drive.google.com/thumbnail?id=${item.filePath}`"
          class="object-cover w-full h-44 rounded-md aspect-square"
          :alt="item.title"
          loading="lazy"
        />

        <p class="text-sm mt-2" v-if="item.description">
          {{ item.description }}
        </p>
      </CardContent>

      <CardFooter class="flex justify-between items-center gap-2">
        <Button
          type="button"
          class="w-full"
          @click="openFile(item.filePath)"
        >
          Open
        </Button>

        <Button
          type="button"
          class="w-full"
          @click="downloadFile(item.filePath)"
        >
          Download
        </Button>
      </CardFooter>
    </Card>
  </div>

  <div v-else class="flex justify-center items-center h-96">
    <p class="text-2xl">
      No materials found
    </p>
  </div>
</template>
