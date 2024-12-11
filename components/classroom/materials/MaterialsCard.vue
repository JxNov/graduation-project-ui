<script setup lang="ts">
import { getDownloadURL, ref as firebaseRef } from 'firebase/storage'
import { storage } from '~/config/firebase.config'

const props = defineProps<{
  data: any
}>()

const openFile = (filePath: string) => {
  // window.open(filePath, '_blank')
  const storageRef = firebaseRef(storage, filePath)
  getDownloadURL(storageRef).then((downloadURL) => {
  })
}

const downloadFile = (filePath: string, title: string) => {
  const url = URL.createObjectURL(new Blob([filePath], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }))
  const a = document.createElement('a')
  a.href = url
  a.download = title

  document.body.appendChild(a)
  a.click()
  URL.revokeObjectURL(url)
  document.body.removeChild(a)
}
</script>

<template>
  <div
    v-if="props.data.length"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
  >
    <Card v-for="(item, index) in props.data" :key="index">
      <CardHeader class="flex flex-row justify-between items-center gap-4">
        <CardTitle>
          {{ item.title }}
        </CardTitle>

        <CardDescription>
          {{ item.subjectName }}
        </CardDescription>
      </CardHeader>

      <CardContent v-if="item.description">
        <p class="text-sm">
          {{ item.description }}
        </p>
      </CardContent>

      <CardFooter class="flex justify-between items-center gap-2">
        <Button
          type="button"
          class="w-full"
          @click="openFile(item.file_path)"
        >
          Open
        </Button>

        <Button
          type="button"
          class="w-full"
          @click="downloadFile(item.file_path, item.title)"
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
