<script setup lang="ts">
import { Button } from '~/components/ui/button'

const { $semesterStore, $bus } = useNuxtApp()

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

  await $semesterStore.deleteSemester(props.data.slug)

  isLoading.value = false
  handleClose()
}
</script>

<template>
  <DialogHeader>
    <DialogTitle>Xóa học kỳ</DialogTitle>
    <DialogDescription>
      Bạn có chắc chắn muốn xóa học kỳ <strong>{{ data.name }}</strong>?
    </DialogDescription>
  </DialogHeader>

  <DialogFooter class="gap-2">
    <Button type="button" variant="outline" @click="handleClose" :disabled="isLoading">
      Cancel
    </Button>

    <Button type="button" variant="default" @click="handleDelete" :disabled="isLoading">
      Delete
    </Button>
  </DialogFooter>
</template>
