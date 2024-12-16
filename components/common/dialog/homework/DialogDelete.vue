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
    <DialogTitle>Delete Homework</DialogTitle>
    <DialogDescription>
      Are you sure you want to delete <strong>{{ data.title }}</strong> homework?
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
