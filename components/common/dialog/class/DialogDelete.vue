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
    <DialogTitle>Delete Generation</DialogTitle>
    <DialogDescription>
      Are you sure you want to delete <strong>{{ data.name }}</strong> generation?
    </DialogDescription>
  </DialogHeader>

  <DialogFooter>
    <Button type="button" variant="outline" @click="handleClose" :disabled="isLoading">
      Cancel
    </Button>

    <Button type="button" variant="default" @click="handleDelete" :disabled="isLoading">
      Delete
    </Button>
  </DialogFooter>
</template>
