<script setup lang="ts">
import draggable from 'vuedraggable'
import { Cross2Icon } from '@radix-icons/vue'
import { toast } from 'vue-sonner'

const subjects = [
  {
    id: 0,
    name: 'Chào cờ'
  },
  {
    id: 1,
    name: 'Sinh hoạt lớp'
  },
  {
    id: 2,
    name: 'Toán'
  },
  {
    id: 3,
    name: 'Văn'
  },
  {
    id: 4,
    name: 'Anh'
  },
  {
    id: 5,
    name: 'Lý'
  },
  {
    id: 6,
    name: 'Hóa'
  },
  {
    id: 7,
    name: 'Sinh'
  },
  {
    id: 8,
    name: 'Sử'
  },
  {
    id: 9,
    name: 'Địa'
  },
  {
    id: 10,
    name: 'GDCD'
  },
  {
    id: 11,
    name: 'Công nghệ'
  },
  {
    id: 12,
    name: 'Thể dục'
  },
  {
    id: 13,
    name: 'Âm nhạc'
  },
  {
    id: 14,
    name: 'Mỹ thuật'
  },
  {
    id: 15,
    name: 'Tin'
  },
  {
    id: 16,
    name: 'GDQP'
  },
  {
    id: 17,
    name: 'GDTC'
  }
]

const schedules = ref<any[]>([
  {
    id: 1,
    name: 'Thứ 2',
    morning: [],
    afternoon: []
  },
  {
    id: 2,
    name: 'Thứ 3',
    morning: [],
    afternoon: []
  },
  {
    id: 3,
    name: 'Thứ 4',
    morning: [],
    afternoon: []
  },
  {
    id: 4,
    name: 'Thứ 5',
    morning: [],
    afternoon: []
  },
  {
    id: 5,
    name: 'Thứ 6',
    morning: [],
    afternoon: []
  },
  {
    id: 6,
    name: 'Thứ 7',
    morning: [],
    afternoon: []
  }
])

const list = ref<any[]>(subjects)

const onChange = (day: any, period: any) => {
  if (day[period].length > 5) {
    day[period] = day[period].slice(0, 5)
    toast.error('Không thể thêm quá 5 môn học cho mỗi buổi')
  }
}

const remove = (day: any, id: any) => {
  const index = day.findIndex((item: any) => item.id === id)
  day.splice(index, 1)
}

const onSubmit = () => {
  console.log(schedules.value)
}
</script>

<template>
  <div class="bg-card p-4 rounded-md shadow">
    <h2 class="text-lg font-semibold mb-4">
      Thời khóa biểu: Lớp 6A1
    </h2>

    <form @submit.prevent="onSubmit">
      <div class="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead class="text-center h-10" colspan="3">
                Thời khóa biểu
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow class="hover:bg-transparent">
              <TableHead class="border-r text-center w-1/12">
                Thứ
              </TableHead>

              <TableHead class="border-r text-center">
                Sáng
              </TableHead>

              <TableHead class="border-r text-center">
                Chiều
              </TableHead>
            </TableRow>

            <TableRow
              class="hover:bg-transparent"
              v-for="(day, index) in schedules"
              :key="index"
            >
              <TableHead class="border-r text-center w-1/12">
                {{ day.name }}
              </TableHead>

              <TableCell class="border-r text-center h-12 w-2/6">
                <draggable
                  class="flex items-center gap-1"
                  :list="day.morning"
                  group="subjects"
                  @change="onChange(day, 'morning')"
                  item-key="id"
                >
                  <template #item="{ element }">
                    <div class="relative">
                      <div
                        class="cursor-move inline-flex items-center rounded-tl-xl rounded-br-xl border px-6 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80"
                      >
                        {{ element.name }}
                      </div>

                      <div
                        class="absolute top-0 right-0 cursor-pointer rounded-bl-xl p-1 text-xs font-semibold transition-colors bg-primary-foreground hover:bg-primary-foreground/90"
                        @click="remove(day.morning, element.id)"
                      >
                        <Cross2Icon
                          class="text-red-500 -mt-1 -mr-1"
                        />
                      </div>
                    </div>
                  </template>
                </draggable>
              </TableCell>

              <TableCell class="text-center h-12 w-2/6">
                <draggable
                  class="flex items-center gap-1"
                  :list="day.afternoon"
                  group="subjects"
                  @change="onChange(day, 'afternoon')"
                  item-key="id"
                >
                  <template #item="{ element }">
                    <div class="relative">
                      <div
                        class="cursor-move inline-flex items-center rounded-tl-xl rounded-br-xl border px-6 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80"
                      >
                        {{ element.name }}
                      </div>

                      <div
                        class="absolute top-0 right-0 cursor-pointer rounded-bl-xl p-1 text-xs font-semibold transition-colors bg-primary-foreground hover:bg-primary-foreground/90"
                        @click="remove(day.afternoon, element.id)"
                      >
                        <Cross2Icon
                          class="text-red-500 -mt-1 -mr-1"
                        />
                      </div>
                    </div>
                  </template>
                </draggable>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div class="flex justify-end mt-4">
        <Button type="submit">
          Lưu thời khóa biểu
        </Button>
      </div>
    </form>

    <div class="flex flex-col items-center justify-center mt-4">
      <h3 class="text-lg font-semibold mb-2">Danh sách môn học</h3>
      <draggable
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2"
        :list="list"
        :group="{ name: 'subjects', pull: 'clone', put: false }"
        @change="onChange"
        item-key="name"
        :sort="false"
      >
        <template #item="{ element }">
          <div
            class="cursor-move inline-flex items-center justify-center rounded-tl-xl rounded-br-xl border px-6 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80"
          >
            {{ element.name }}
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>
