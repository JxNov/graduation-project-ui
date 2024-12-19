<script setup lang="ts">
import { Button } from '~/components/ui/button'

const { $userStore, $bus } = useNuxtApp()

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

  try {
    const response = await $userStore.deleteUser(props.data.username)

    if (!response) {
      throw new Error('Xóa người dùng không thành công')
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
    <DialogTitle>Xóa người dùng</DialogTitle>
    <DialogDescription>
      Bạn có muốn xóa người dùng <strong>{{ data.name }}</strong> không ?
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
