<script setup lang="ts">
import { Checkbox } from '~/components/ui/checkbox'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useForm } from 'vee-validate'
import TagsCombobox from '~/components/base/TagsCombobox.vue'

const { $userStore, $roleStore, $bus } = useNuxtApp()

const isLoading = ref<boolean>(false)
const selectAll = ref<boolean>(false)
const selectItems = ref<string[]>([])
const users = $userStore.users.map(user => ({ label: user.name, value: user.username }))

const items = [
  {
    id: 'create',
    label: 'Create'
  },
  {
    id: 'read',
    label: 'Read'
  },
  {
    id: 'update',
    label: 'Update'
  },
  {
    id: 'delete',
    label: 'Delete'
  }
] as const

const formSchema = toTypedSchema(z.object({
  items: z.array(z.string()),
  roles: z.array(z.string()),
  users: z.array(z.string()).min(1)
}))

const { setFieldValue, handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    items: [],
    roles: [],
    users: []
  }
})

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true

  try {
    const response = await $userStore.assignRolePermission(values)

    if (!response) {
      throw new Error('Failed to assign role and permission')
    }

    isLoading.value = false
    handleClose()
  } catch (error) {
    isLoading.value = false
  }
})

const handleClose = () => {
  $bus.emit('close-dialog-assign', false)
}

const handleSelectAll = () => {
  selectAll.value = !selectAll.value

  if (selectAll.value) {
    selectItems.value = $roleStore.modules.flatMap(module => {
      return items.map(item => `${module.name}.${item.id}`)
    })
  } else {
    selectItems.value = []
  }

  setFieldValue('items', selectItems.value)
}

const handleChange = (checked: boolean, value: string) => {
  if (checked) {
    selectItems.value.push(value)
  } else {
    const index = selectItems.value.indexOf(value)
    if (index > -1) {
      selectItems.value.splice(index, 1)
    }
  }

  selectAll.value = selectItems.value.length === $roleStore.modules.flatMap(module => items.map(item => `${module.name}.${item.id}`)).length

  setFieldValue('items', selectItems.value)
}
</script>

<template>
  <form class="space-y-6" @submit="onSubmit">
    <DialogHeader>
      <DialogTitle>Assign Role</DialogTitle>

      <DialogDescription>
        Assign a role to the selected user
      </DialogDescription>
    </DialogHeader>

    <div class="space-y-6">
      <FormField v-slot="{ value }" name="users">
        <FormItem>
          <FormLabel>Users</FormLabel>

          <FormControl>
            <TagsCombobox
              placeholder="Select users"
              :data="users"
              v-bind:model-value="value"
              @update:model-value="value"
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      </FormField>

      <div class="space-y-2">
        <p class="text-md font-semibold">List of roles</p>
        <div class="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>
                  Role
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>
                  <FormField name="roles">
                    <FormItem class="flex flex-row items-start space-x-3 space-y-0">
                      <FormField v-for="role in $roleStore.roles" v-slot="{ handleChange }" :key="role.slug"
                                 type="checkbox"
                                 :value="role.slug" :unchecked-value="false" name="roles">
                        <FormItem class="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              @update:checked="handleChange"
                            />
                          </FormControl>
                          <FormLabel class="font-normal">
                            {{ role.name }}
                          </FormLabel>
                        </FormItem>
                      </FormField>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <div class="space-y-2">
        <p class="text-md font-semibold">List of permissions</p>
        <div class="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>
                  Module
                </TableCell>

                <TableCell>
                  Permissions
                </TableCell>

                <TableCell>
                  <Checkbox
                    :disabled="isLoading"
                    :checked="selectAll"
                    @update:checked="handleSelectAll"
                  />

                  Select All
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              <template v-for="module in $roleStore.modules" :key="module.name">
                <TableRow>
                  <TableCell>
                    {{ module.title }}
                  </TableCell>

                  <TableCell>
                    <FormField name="items">
                      <FormItem class="flex flex-row items-start space-x-3 space-y-0">
                        <FormField
                          v-for="item in items"
                          :key="item.id"
                          type="checkbox"
                          :value="`${module.name}.${item.id}`"
                          :unchecked-value="false"
                          name="items"
                        >
                          <FormItem class="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                :disabled="isLoading"
                                :checked="selectItems.includes(`${module.name}.${item.id}`)"
                                @update:checked="checked => handleChange(checked, `${module.name}.${item.id}`)"
                              />
                            </FormControl>

                            <FormLabel class="font-normal ml-1">
                              {{ item.label }}
                            </FormLabel>
                          </FormItem>
                        </FormField>
                        <FormMessage />
                      </FormItem>
                    </FormField>
                  </TableCell>
                </TableRow>
              </template>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>

    <DialogFooter>
      <Button type="button" variant="outline" @click="handleClose" :disabled="isLoading">
        Cancel
      </Button>

      <Button type="submit" :disabled="isLoading">
        Save changes
      </Button>
    </DialogFooter>
  </form>
</template>