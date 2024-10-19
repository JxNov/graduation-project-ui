<script setup lang="ts">
import type {ColumnDef} from "@tanstack/vue-table";
import type {Role} from "~/schema";
import {roleSchema} from "~/schema";
import {createColumns} from "~/components/custom/table/columns";
import {RoleDialogCreateEdit, RoleDialogDelete} from "~/components/custom/dialog/role";
import {toast} from "vue-sonner";
import {useThrottle} from "~/composables/useThrottle";

const {$roleStore, $bus} = useNuxtApp();

onMounted(async () => {
  if (!$roleStore.modules.length) {
    await $roleStore.fetchModules();
  }

  if (!$roleStore.roles.length) {
    await $roleStore.fetchRoles();
  }

  if (!$roleStore.permissions.length) {
    await $roleStore.fetchPermissions();
  }
})

const isCreating = ref<boolean>(false);
const isEditing = ref(false);
const isDeleting = ref(false);
let selectedRole = reactive<Role | object>({});

$bus.on('open-dialog-edit-role', (row: Role) => {
  isEditing.value = true;
  selectedRole = row;
})

$bus.on('open-dialog-delete-role', (row: Role) => {
  isDeleting.value = true;
  selectedRole = row;
})

$bus.on('close-dialog-create-edit-role', (value: boolean) => {
  isCreating.value = value;
  isEditing.value = value;
  selectedRole = {};
})

$bus.on('close-dialog-delete-role', (value: boolean) => {
  isDeleting.value = value;
  selectedRole = {};
})

const valueRoles = $roleStore.roles.map((role: Role) => {
  return {label: role.name, value: role.name}
})

const columns = createColumns([
  ['select'],
  ['name', 'Role', 'w-1/3'],
  ['actions'],
], roleSchema, 'open-dialog-edit-role', 'open-dialog-delete-role') as ColumnDef<Role>[]

const filters = [
  {
    name: 'name',
    label: 'Role',
    values: valueRoles,
  },
]

const reloadData = useThrottle(() => {
  const promise = () => $roleStore.reloadData();

  return toast.promise(promise, {
    loading: 'Reloading data...',
    success: 'Data reloaded successfully',
    error: 'Data reloaded failed',
  });
}, 60000, 'role')

const handleInteractOutside = (event: Event) => {
  const target = event.target as HTMLElement;
  if (target?.closest('[data-sonner-toaster]')) return event.preventDefault()
}

const handleCloseDialog = () => {
  isCreating.value = false;
  isEditing.value = false;
  isDeleting.value = false;
  selectedRole = {};
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h2 class="text-4xl font-bold tracking-tight">Roles</h2>
      <Button variant="default" @click="isCreating = true">
        Create new role
      </Button>
    </div>

    <LayoutTable :data="$roleStore.roles" :columns="columns" :filters="filters" :reload-data="reloadData"/>
  </div>

  <Dialog :open="isCreating" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[550px]" @interact-outside="handleInteractOutside">
      <RoleDialogCreateEdit/>
    </DialogContent>
  </Dialog>

  <Dialog :open="isEditing" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[550px]" @interact-outside="handleInteractOutside">
      <RoleDialogCreateEdit :data="selectedRole" edit/>
    </DialogContent>
  </Dialog>

  <Dialog :open="isDeleting" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">
      <RoleDialogDelete :data="selectedRole"/>
    </DialogContent>
  </Dialog>
</template>