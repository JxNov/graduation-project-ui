<script setup lang="ts">
import { Button } from '~/components/ui/button'

const { $blockStore, $bus } = useNuxtApp()

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

  await $blockStore.deleteBlock(props.data.slug)

  isLoading.value = false
  handleClose()
}
</script>

<template>
  <DialogHeader>
    <DialogTitle>Delete block</DialogTitle>
    <DialogDescription>
      Are you sure you want to delete <strong>{{ data.name }}</strong> block?
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
