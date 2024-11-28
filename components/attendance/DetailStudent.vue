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
    <div class="col-span-12 sm:col-span-6 xl:col-span-3 flex flex-row items-center gap-4">
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

    <div
      class="col-span-12 sm:col-span-6 xl:col-span-3 flex flex-row items-center sm:justify-end xl:justify-start gap-4">
      <!--      <div class="flex items-center border rounded-md bg-muted/80 select-none overflow-hidden">-->
      <!--        <Label-->
      <!--          class="text-gray-400 px-4 py-2 cursor-pointer"-->
      <!--          :class="{ 'bg-red-500 text-white transition-all': !isChecked }"-->
      <!--          :for="isChecked ? `attendance-${student.username}` : ''"-->
      <!--        >-->
      <!--          Vắng mặt-->
      <!--        </Label>-->

      <!--        <Switch-->
      <!--          class="hidden"-->
      <!--          :id="`attendance-${student.username}`"-->
      <!--          :checked="isChecked"-->
      <!--          @update:checked="isChecked = $event"-->
      <!--        />-->

      <!--        <Label-->
      <!--          class="text-gray-400 px-8 py-2 cursor-pointer"-->
      <!--          :class="{ 'bg-green-500 text-white transition-all': isChecked }"-->
      <!--          :for="!isChecked ? `attendance-${student.username}` : ''"-->
      <!--        >-->
      <!--          Đi học-->
      <!--        </Label>-->
      <!--      </div>-->

      <div class="flex items-center border rounded-md bg-muted/80 select-none overflow-hidden relative">
        <Label
          class="text-gray-400 px-4 py-2 cursor-pointer z-10 transition-all duration-500"
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
        />

        <Label
          class="text-gray-400 px-8 py-2 cursor-pointer z-10 transition-all duration-500"
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
      :class="{ 'sm:col-span-6' : reasonChecked === '5' }"
      v-if="!isChecked"
    >
      <Select @update:modelValue="checkReason($event)">
        <SelectTrigger>
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
      class="col-span-12 sm:col-span-6 xl:col-span-4 flex flex-row items-center gap-4"
      v-if="!isChecked && reasonChecked === '5'"
    >
      <Input placeholder="Lý do khác" />
    </div>
  </div>
</template>
