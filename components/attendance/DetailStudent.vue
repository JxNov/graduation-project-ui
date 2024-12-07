<script setup lang="ts">
const props = defineProps<{
  student: {
    name: string
    username: string
    userImage: string
    status: string
    reason?: string
  }
  disabled?: boolean
}>()

const emits = defineEmits<{
  (e: 'update:status', value: string): void
  (e: 'update:reason', value: string): void
}>()

const isChecked = ref<boolean>(props.student.status === 'Present')
const reasonOther = ref<string>(props.student.reason || '')

const status = [
  { name: 'Absent', value: 'Absent' },
  { name: 'Late', value: 'Late' },
  { name: 'Excused', value: 'Excused' },
  { name: 'Medical Leave', value: 'Medical Leave' },
  { name: 'Other', value: 'Other' }
]

const reasonChecked = ref<string>(props.student.status === 'Present' ? '' : props.student.status)

const checkReason = (reason: string) => {
  reasonChecked.value = reason
}

watchEffect(() => {
  if (isChecked.value) {
    reasonChecked.value = ''
    reasonOther.value = ''
    emits('update:status', 'Present')
    emits('update:reason', '')
  } else {
    emits('update:status', reasonChecked.value || 'Absent')

    if (reasonChecked.value === 'Other') {
      emits('update:reason', reasonOther.value || '')
    } else {
      emits('update:reason', '')
    }
  }
})
</script>

<template>
  <div class="grid grid-cols-12 gap-4">
    <div class="col-span-12 sm:col-span-6 xl:col-span-3 flex flex-row items-center gap-4">
      <Avatar size="sm">
        <AvatarImage :src="student.userImage || ''" :alt="student.name" />
        <AvatarFallback>{{ student.name[0] }}</AvatarFallback>
      </Avatar>

      <div>
        <CardTitle class="text-lg">
          {{ student.name }}
        </CardTitle>
      </div>
    </div>

    <div
      class="col-span-12 sm:col-span-6 xl:col-span-3 flex flex-row items-center sm:justify-end xl:justify-start gap-4">
      <div class="flex items-center border rounded-md bg-muted/80 select-none overflow-hidden relative">
        <Label
          class="text-gray-400 px-4 py-2 cursor-pointer z-[2] transition-all duration-500"
          :class="{'text-white': !isChecked}"
          :for="isChecked ? `attendance-${student.username}` : ''"
        >
          Vắng mặt
        </Label>

        <Switch
          class="hidden"
          :id="`attendance-${student.username}`"
          :checked="isChecked"
          @update:checked="isChecked = $event"
          :disabled="disabled"
        />

        <Label
          class="text-gray-400 px-8 py-2 cursor-pointer z-[2] transition-all duration-500"
          :class="{ 'text-white': isChecked }"
          :for="!isChecked ? `attendance-${student.username}` : ''"
        >
          Đi học
        </Label>

        <div
          class="absolute w-1/2 h-full top-0 left-0 transition-all duration-500"
          :class="{
          'bg-red-500': !isChecked,
          'bg-green-500 left-1/2': isChecked
        }"
        />
      </div>
    </div>

    <div
      class="col-span-12 xl:col-span-2 flex flex-row items-center gap-4"
      :class="{ 'sm:col-span-6' : reasonChecked === 'Other' }"
      v-if="!isChecked"
    >
      <Select @update:modelValue="checkReason($event)" :disabled="disabled" :default-value="props.student.status || ''">
        <SelectTrigger>
          <SelectValue placeholder="Lý do vắng" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectItem
              v-for="reason in status"
              :key="reason.value"
              :value="reason.value"
            >
              {{ reason.name }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <div
      class="col-span-12 sm:col-span-6 xl:col-span-4 flex flex-row items-center gap-4"
      v-if="!isChecked && reasonChecked === 'Other'"
    >
      <Input placeholder="Lý do khác" v-model="reasonOther" :disabled="disabled" />
    </div>
  </div>
</template>
