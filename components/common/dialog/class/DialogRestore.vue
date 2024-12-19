<script setup lang="ts">
import { Button } from '~/components/ui/button'

const { $classStore, $bus } = useNuxtApp()

interface DialogRestoreProps {
  data: any,
}

const props = defineProps<DialogRestoreProps>()

const isLoading = ref<boolean>(false)

const handleClose = () => {
  $bus.emit('close-dialog-restore', false)
}

const handleRestore = async () => {
  isLoading.value = true

  try {
    const response = await $classStore.restoreClass(props.data.slug)

    if (!response) {
      throw new Error('Không thể khôi phục lớp học')
    }

    isLoading.value = false
    handleClose()
  } catch (error) {
    isLoading.value = false
  }
}
</script>

<template>
  <DialogHeader>
    <DialogTitle>Khôi phục lớp học</DialogTitle>
    <DialogDescription>
      Bạn có muốn khôi phục lớp học <strong>{{ data.name }}</strong> ?
    </DialogDescription>
  </DialogHeader>

  <DialogFooter>
    <Button type="button" variant="outline" @click="handleClose" :disabled="isLoading">
      Hủy
    </Button>

    <Button type="button" variant="default" @click="handleRestore" :disabled="isLoading">
      Khôi phục
    </Button>
  </DialogFooter>
</template>
