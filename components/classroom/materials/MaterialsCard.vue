<script setup lang="ts">
const props = defineProps<{
  data: any
}>()

const openFile = (filePath: string) => {
  window.open(filePath, '_blank')
}

const downloadFile = (filePath: string, title: string) => {
  const url = URL.createObjectURL(new Blob([filePath]))
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
  <Card v-for="(item, index) in props.data" :key="index">
    <CardHeader class="flex flex-row justify-between items-center gap-4 select-none">
      <CardTitle>
        {{ item.title }}
      </CardTitle>

      <CardDescription>
        {{ item.subject }}
      </CardDescription>
    </CardHeader>

    <CardContent class="flex justify-between items-center gap-2">
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
    </CardContent>
  </Card>
</template>
