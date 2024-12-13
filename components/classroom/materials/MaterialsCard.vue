<script setup lang="ts">
const props = defineProps<{
  data: any
}>()

const openFile = (filePath: string) => {
  window.open(`https://docs.google.com/document/d/${filePath}/edit`, '_blank')
}

const downloadFile = (filePath: string, title: string) => {
  window.open(`https://docs.google.com/document/d/${filePath}/export?format=docx`, '_blank')
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
          @click="openFile(item.filePath)"
        >
          Open
        </Button>

        <Button
          type="button"
          class="w-full"
          @click="downloadFile(item.filePath, item.title)"
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
