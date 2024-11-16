<script setup lang="ts">

const props = defineProps<{
  student: {
    username: string
    name: string
    avatar: string
  }

  checked: boolean
}>()

const emits = defineEmits<{
  (e: 'update:checked', value: boolean): void
}>()

const isChecked = ref<boolean>(props.checked)

const reasons = [
  { name: 'Có phép', value: '1' },
  { name: 'Không phép', value: '2' },
  { name: 'Khác', value: '5' }
]

const reasonChecked = ref<string>('')

const checkReason = (reason: string) => {
  reasonChecked.value = reason
}

watchEffect(() => {
  if (isChecked.value) {
    reasonChecked.value = ''
  }

  emits('update:checked', isChecked.value)
})
</script>

<template>
  <div class="grid grid-cols-12 gap-4">
    <div class="col-span-12 sm:col-span-6 lg:col-span-3 flex flex-row items-center gap-4">
      <Avatar size="sm">
        <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div>
        <CardTitle class="text-lg">
          {{ student.name }}
        </CardTitle>
      </div>
    </div>

    <div class="col-span-12 sm:col-span-6 lg:col-span-3 flex flex-row items-center gap-4">
      <div class="flex items-center space-x-2 py-2 px-4 border rounded-md bg-muted/80">
        <Label
          class="text-gray-400"
          :class="{ 'text-red-500': !isChecked }"
        >
          Vắng mặt
        </Label>

        <Switch :checked="isChecked" @update:checked="isChecked = $event" />

        <Label
          class="text-gray-400"
          :class="{ 'text-green-500': isChecked }"
        >
          Đi học
        </Label>
      </div>
    </div>

    <div
      class="col-span-12 lg:col-span-3 flex flex-row items-center gap-4"
      :class="{ 'sm:col-span-6' : reasonChecked === '5' }"
      v-if="!isChecked"
    >
      <Select @update:modelValue="checkReason($event)">
        <SelectTrigger class="lg:w-[180px]">
          <SelectValue placeholder="Lý do vắng" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectItem v-for="reason in reasons" :key="reason.value" :value="reason.value">
              {{ reason.name }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <div
      class="col-span-12 sm:col-span-6 lg:col-span-3 flex flex-row items-center gap-4"
      v-if="!isChecked && reasonChecked === '5'"
    >
      <Input placeholder="Lý do khác" />
    </div>
  </div>
</template>
