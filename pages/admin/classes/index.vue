<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { Class } from '~/schema'
import { classSchema } from '~/schema'
import { createColumns } from '~/composables/columns'
import {
  ClassDialogDistribution,
  ClassDialogCreateEdit,
  ClassDialogDelete,
  ClassDialogAssignStudent,
  ClassDialogAssignTeacher,
  ClassDialogUpToClass
} from '~/components/common/dialog/class'
import { checkPermissions } from '~/utils/checkPermissions'
import { Button } from '~/components/ui/button'
import { extractValue } from '~/utils/extractValue'
import { Trash2 } from 'lucide-vue-next'

const { $authStore, $academicYearStore, $classStore, $teacherStore, $studentStore, $blockStore, $bus } = useNuxtApp()
const router = useRouter()

const adminPermissions = checkPermissions($authStore.user.permissions, ['admin.create'])

const isDistribution = ref<boolean>(false)
const isCreating = ref<boolean>(false)
const isEditing = ref<boolean>(false)
const isAssigningStudent = ref<boolean>(false)
const isAssigningTeacher = ref<boolean>(false)
const isUpToClass = ref<boolean>(false)
const isDeleting = ref<boolean>(false)
const selectedValue = ref<Class | object>({})
const selectedClassSlug = ref<string>('')

onMounted(async () => {
  $bus.on('open-dialog-edit', (row: Class) => {
    isEditing.value = true
    selectedValue.value = row
  })

  $bus.on('open-dialog-delete', (row: Class) => {
    isDeleting.value = true
    selectedValue.value = row
  })

  $bus.on('close-dialog-create-edit', (value: boolean) => {
    isCreating.value = value
    isEditing.value = value
    selectedValue.value = {}
  })

  $bus.on('close-dialog-assign-student', (value: boolean) => {
    isAssigningStudent.value = value
    selectedClassSlug.value = ''
  })

  $bus.on('close-dialog-assign-teacher', (value: boolean) => {
    isAssigningTeacher.value = value
    selectedClassSlug.value = ''
  })

  $bus.on('close-dialog-up-to-class', (value: boolean) => {
    isUpToClass.value = value
    selectedValue.value = {}
  })

  $bus.on('close-dialog-delete', (value: boolean) => {
    isDeleting.value = value
    selectedValue.value = {}
  })

  $bus.on('close-dialog-distribution', (value: boolean) => {
    isDistribution.value = value
  })

  $bus.on('delete-rows', (values: Class[]) => {
    const slugs = values.map((value) => value.slug)
    console.log(slugs)
  })

  await fetchData()
})

onBeforeUnmount(() => {
  $bus.off('open-dialog-edit')
  $bus.off('open-dialog-delete')
  $bus.off('close-dialog-create-edit')
  $bus.off('close-dialog-assign-student')
  $bus.off('close-dialog-up-to-class')
  $bus.off('close-dialog-delete')
  $bus.off('delete-rows')
})

const columns = createColumns(
  [
    ['name', 'Lớp học'],
    ['teacherName', 'GVCN'],
    ['numberOfStudents', 'Số lượng học sinh'],
    ['code', 'Mã lớp', '', {
      enableSorting: false
    }],
    ['academicYearName', 'Năm học'],
    ['actions', '', '', {
      enableSorting: false,
      enableHiding: false
    }]
  ],
  classSchema,
  [
    {
      accessorKey: 'button',
      title: '',
      render: (row) => {
        const isAdmin = checkPermissions($authStore.user.permissions, ['admin.create'])
        const block9 = $blockStore.blocks.find((block) => block.slug === 'khoi-9')
        const blockSlug = row.original.blockSlug

        return h('div', { class: 'truncate px-2' },
          h('div', { class: 'flex items-center gap-2' }, [
            h(Button, {
              variant: 'outline',
              size: 'sm',
              onClick: () => {
                router.push(`/admin/classes/${row.original.slug}`)
              }
            }, { default: () => 'Điểm' }),
            isAdmin && block9 && blockSlug !== 'khoi-9' && h(Button, {
              variant: 'outline',
              size: 'sm',
              onClick: () => {
                selectedValue.value = row.original
                isUpToClass.value = true
              }
            }, { default: () => 'Lên lớp' }),
            isAdmin && h(Button, {
              variant: 'outline',
              size: 'sm',
              onClick: () => {
                selectedClassSlug.value = row.original.slug
                isAssigningStudent.value = true
              }
            }, { default: () => 'Thêm học sinh' }),
            isAdmin && h(Button, {
              variant: 'outline',
              size: 'sm',
              onClick: () => {
                selectedClassSlug.value = row.original.slug
                isAssigningTeacher.value = true
              }
            }, { default: () => 'Thêm giáo viên dạy' })
          ])
        )
      },
      options: {
        enableSorting: false,
        enableHiding: false
      },
      before: 'actions'
    }
  ],
  'admin.update',
  'admin.delete'
) as ColumnDef<Class>[]

const valueAcademicYearName = extractValue($classStore.trashClasses, 'academicYearName')

const filters = [
  {
    name: 'academicYearName',
    label: 'Năm học',
    values: valueAcademicYearName
  }
]

const handleInteractOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (target?.closest('[data-sonner-toaster]')) return event.preventDefault()
}

const handleCloseDialog = () => {
  isDistribution.value = false
  isCreating.value = false
  isEditing.value = false
  isAssigningStudent.value = false
  isAssigningTeacher.value = false
  isUpToClass.value = false
  isDeleting.value = false
  selectedValue.value = {}
  selectedClassSlug.value = ''
}

async function fetchData() {
  const promises = []

  if (adminPermissions) {
    promises.push($teacherStore.fetchTeachers())
    promises.push($studentStore.fetchStudents())
    promises.push($blockStore.fetchBlocks())
    promises.push($academicYearStore.fetchAcademicYears())
    promises.push($classStore.fetchClasses())
  } else {
    promises.push($classStore.fetchClassForTeacher($authStore.user.username))
  }

  await Promise.all(promises)
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h2 class="text-4xl font-bold tracking-tight">Quản lý lớp học</h2>

      <div class="flex gap-2">
        <NuxtLink to="/admin/classes/trash">
          <Button variant="outline" v-if="adminPermissions" class="flex items-center gap-2">
            <Trash2 class="w-5 h-5" />
            Thùng rác
          </Button>
        </NuxtLink>

        <NuxtLink to="/admin/classes/repeat">
          <Button variant="outline" v-if="adminPermissions" class="flex items-center gap-2">
            Học sinh lưu ban
          </Button>
        </NuxtLink>

        <NuxtLink to="/admin/classes/surplus">
          <Button variant="outline" v-if="adminPermissions" class="flex items-center gap-2">
            Học sinh chưa xếp lớp
          </Button>
        </NuxtLink>

        <Button variant="outline" @click="isDistribution = true" v-if="adminPermissions">
          Phân lớp học sinh
        </Button>

        <Button variant="default" @click="isCreating = true" v-if="adminPermissions">
          Tạo mới lớp học
        </Button>
      </div>
    </div>

    <LayoutTable :data="$classStore.classes" :columns="columns" :filters="filters" />
  </div>

  <Dialog :open="isDistribution" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">
      <ClassDialogDistribution />
    </DialogContent>
  </Dialog>

  <Dialog :open="isCreating" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">
      <ClassDialogCreateEdit />
    </DialogContent>
  </Dialog>

  <Dialog :open="isEditing" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">
      <ClassDialogCreateEdit :data="selectedValue" edit />
    </DialogContent>
  </Dialog>

  <Dialog :open="isUpToClass" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">
      <ClassDialogUpToClass :data="selectedValue" />
    </DialogContent>
  </Dialog>

  <Dialog :open="isAssigningStudent" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">
      <ClassDialogAssignStudent :class-slug="selectedClassSlug" />
    </DialogContent>
  </Dialog>

  <Dialog :open="isAssigningTeacher" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">
      <ClassDialogAssignTeacher :class-slug="selectedClassSlug" />
    </DialogContent>
  </Dialog>

  <Dialog :open="isDeleting" @update:open="handleCloseDialog">
    <DialogContent class="sm:max-w-[425px]" @interact-outside="handleInteractOutside">
      <ClassDialogDelete :data="selectedValue" />
    </DialogContent>
  </Dialog>
</template>
