<script setup lang="ts">
import { Checkbox } from '~/components/ui/checkbox'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useForm } from 'vee-validate'

const { $roleStore, $bus } = useNuxtApp()

interface DialogEditProps {
  data?: any,
  edit?: boolean,
}

const props = defineProps<DialogEditProps>()

const isLoading = ref<boolean>(false)
const selectAll = ref<boolean>(false)
const selectItems = ref<string[]>([])
const initialValues = ref<any>({
  name: '',
  items: []
})

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

if (props.edit) {
  selectItems.value = props.data.permissions

  initialValues.value = {
    name: props.data.name,
    items: props.data.permissions
  }

  if (props.data.permissions.length === $roleStore.modules.flatMap(module => items.map(item => `${module.name}.${item.id}`)).length) {
    selectAll.value = true
  }
}

const formSchema = toTypedSchema(z.object({
  name: z.string().min(3).max(50),
  items: z.array(z.string())
}))

const { setFieldValue, handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: initialValues.value
})

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true

  try {
    if (!props.edit) {
      const response = await $roleStore.createRole(values)

      if (!response) {
        throw new Error('Failed to create role')
      }

      isLoading.value = false
      handleClose()
      return
    }

    const response = await $roleStore.updateRole(props.data.slug, values)

    if (!response) {
      throw new Error('Failed to update role')
    }

    isLoading.value = false
    handleClose()
  } catch (error) {
    isLoading.value = false
  }
})

const handleClose = () => {
  $bus.emit('close-dialog-create-edit', false)
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
      <DialogTitle v-if="props.edit">Edit role</DialogTitle>
      <DialogTitle v-else>Create new role</DialogTitle>

      <DialogDescription v-if="props.edit">
        Edit role <strong>{{ props.data.name }}</strong> with specific permissions here.
      </DialogDescription>
      <DialogDescription v-else>
        Create a new role with specific permissions.
      </DialogDescription>
    </DialogHeader>

    <div class="space-y-6">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Name</FormLabel>

          <FormControl>
            <Input type="text" placeholder="Name..." v-bind="componentField" :disabled="isLoading" />
          </FormControl>

          <FormMessage />
        </FormItem>
      </FormField>

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

                <TableCell class="w-24">
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
                        <FormField v-for="item in items" :key="item.id"
                                   type="checkbox"
                                   :value="`${module.name}.${item.id}`" :unchecked-value="false" name="items">
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

    <DialogFooter class="gap-2">
      <Button type="button" variant="outline" @click="handleClose" :disabled="isLoading">
        Cancel
      </Button>

      <Button type="submit" :disabled="isLoading">
        Save changes
      </Button>
    </DialogFooter>
  </form>
</template>