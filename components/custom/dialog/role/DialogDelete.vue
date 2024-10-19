<script setup lang="ts">
import {toast} from "vue-sonner";
import {Button} from "~/components/ui/button";

const {$roleStore, $bus} = useNuxtApp();

interface DialogEditRoleProps {
  data: any,
}

const props = defineProps<DialogEditRoleProps>()

const isLoading = ref<boolean>(false)

const handleClose = () => {
  $bus.emit('close-dialog-delete-role', false);
}

const handleDelete = async () => {
  isLoading.value = true

  try {
    const response = await $roleStore.deleteRole(props.data.slug)

    if (!response) {
      throw new Error('Failed to delete role')
    }

    toast.success('Role deleted successfully', {
      action: {
        label: 'Undo',
      },
    })
    isLoading.value = false
    handleClose()
  } catch (e) {
    isLoading.value = false
    toast.error('Failed to delete role', {
      action: {
        label: 'Undo',
      },
    })
  }
}
</script>

<template>
  <DialogHeader>
    <DialogTitle>Delete Role</DialogTitle>
    <DialogDescription>
      Are you sure you want to delete <strong>{{ data.name }}</strong> role?
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
