<script setup lang="ts">
import { Button } from '~/components/ui/button'

const { $materialStore, $bus } = useNuxtApp()

interface DialogDeleteProps {
  data: any,
}

const props = defineProps<DialogDeleteProps>()

const isLoading = ref<boolean>(false)

const handleClose = () => {
  $bus.emit('close-dialog-delete-material-class', false)
}

const handleDelete = async () => {
  isLoading.value = true

  await $materialStore.deleteMaterial(props.data.slug)

  isLoading.value = false
  handleClose()
}
</script>

<template>
  <DialogHeader>
    <DialogTitle>Xóa tài liệu</DialogTitle>
    <DialogDescription>
      Bạn có chắc chắn muốn xóa tài liệu <strong>{{ data.title }}</strong>?
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
