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
const users = $userStore.users.map(user => ({ label: user.name, value: user.email }))

const items = [
  {
    id: 'create',
    label: 'Thêm'
  },
  {
    id: 'read',
    label: 'Đọc'
  },
  {
    id: 'update',
    label: 'Sửa'
  },
  {
    id: 'delete',
    label: 'Xóa'
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

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true

  try {
    const response = await $userStore.assignRolePermission(values)

    if (!response) {
      throw new Error('Không thể chỉ định vai trò và quyền')
    }

    isLoading.value = false
    handleClose()
  } catch (error) {
    isLoading.value = false
  }
})
</script>

<template>
  <form class="space-y-6" @submit="onSubmit">
    <DialogHeader>
      <DialogTitle>Gán vai trò</DialogTitle>

      <DialogDescription>
        Gán vai trò cho người dùng đã chọn
      </DialogDescription>
    </DialogHeader>

    <div class="space-y-6">
      <FormField v-slot="{ value }" name="users">
        <FormItem>
          <FormLabel>Người dùng</FormLabel>

          <FormControl>
            <TagsCombobox placeholder="Chọn người dùng" :data="users" v-bind:model-value="value"
              @update:model-value="value" />
          </FormControl>

          <FormMessage />
        </FormItem>
      </FormField>

      <div class="space-y-2">
        <p class="text-md font-semibold">Danh sách vai trò</p>

        <FormField name="roles">
          <FormItem>
            <div class="grid grid-cols-4 gap-4">
              <FormField v-for="role in $roleStore.roles" v-slot="{ handleChange }" :key="role.slug" type="checkbox"
                :value="role.slug" :unchecked-value="false" name="roles">
                <FormItem class="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox @update:checked="handleChange" />
                  </FormControl>

                  <FormLabel class="font-normal">
                    {{ role.name }}
                  </FormLabel>
                </FormItem>
              </FormField>
            </div>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <div class="space-y-2">
        <p class="text-md font-semibold">Danh sách quyền</p>
        <div class="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>
                  Module
                </TableCell>

                <TableCell>
                  Quyền
                </TableCell>

                <TableCell class="w-24">
                  <Checkbox :disabled="isLoading" :checked="selectAll" @update:checked="handleSelectAll" />

                  Tất cả
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
                        <FormField v-for="item in items" :key="item.id" type="checkbox"
                          :value="`${module.name}.${item.id}`" :unchecked-value="false" name="items">
                          <FormItem class="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox :disabled="isLoading"
                                :checked="selectItems.includes(`${module.name}.${item.id}`)"
                                @update:checked="checked => handleChange(checked, `${module.name}.${item.id}`)" />
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
        Hủy
      </Button>

      <Button type="submit" :disabled="isLoading">
        Lưu
      </Button>
    </DialogFooter>
  </form>
</template>