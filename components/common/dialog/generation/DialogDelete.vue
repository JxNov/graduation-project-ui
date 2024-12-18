<script setup lang="ts">
import { Button } from '~/components/ui/button'

const { $generationStore, $bus } = useNuxtApp()

interface DialogDeleteProps {
  data: any,
}

const props = defineProps<DialogDeleteProps>()

const isLoading = ref<boolean>(false)

const handleClose = () => {
  $bus.emit('close-dialog-delete', false)
}

const handleDelete = async () => {
  isLoading.value = true

  await $generationStore.deleteGeneration(props.data.slug)

  isLoading.value = false
  handleClose()
}
</script>

<template>
  <DialogHeader>
    <DialogTitle>Xóa khóa học sinh</DialogTitle>
    <DialogDescription>
      Bạn có chắc chắn muốn xóa khóa học sinh <strong>{{ data.name }}</strong> ?
    </DialogDescription>
  </DialogHeader>

  <DialogFooter>
    <Button type="button" variant="outline" @click="handleClose" :disabled="isLoading">
      Hủy
    </Button>

    <Button type="button" variant="default" @click="handleDelete" :disabled="isLoading">
      Xóa
    </Button>
  </DialogFooter>
</template>
