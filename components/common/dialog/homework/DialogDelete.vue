<script setup lang="ts">
import { Button } from '~/components/ui/button'

const { $homeworkStore, $bus } = useNuxtApp()

interface DialogDeleteProps {
  data: any,
}

const props = defineProps<DialogDeleteProps>()

const isLoading = ref<boolean>(false)

const handleClose = () => {
  $bus.emit('close-dialog-delete-homework', false)
}

const handleDelete = async () => {
  isLoading.value = true

  await $homeworkStore.deleteHomework(props.data.slug)

  isLoading.value = false
  handleClose()
}
</script>

<template>
  <DialogHeader>
    <DialogTitle>Xóa bài tập</DialogTitle>
    <DialogDescription>
      Bạn có muốn xóa bài tập <strong>{{ data.title }}</strong> không?
    </DialogDescription>
  </DialogHeader>

  <DialogFooter class="gap-2">
    <Button type="button" variant="outline" @click="handleClose" :disabled="isLoading">
      Hủy
    </Button>

    <Button type="button" variant="default" @click="handleDelete" :disabled="isLoading">
      Xóa
    </Button>
  </DialogFooter>
</template>
