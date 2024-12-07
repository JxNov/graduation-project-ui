<script setup lang='ts'>
import { createColumns } from '~/composables/columns'
import { Badge } from '~/components/ui/badge'
import type { ColumnDef } from '@tanstack/vue-table'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import DetailStudent from './DetailStudent.vue'

type Student = {
  username: string
  name: string
  avatar: string
  attendance: boolean
}

const studentSchema = {
  username: {
    label: 'Username',
    type: 'text',
    sortable: true
  },
  name: {
    label: 'Name',
    type: 'text',
    sortable: true
  },
  avatar: {
    label: 'Avatar',
    type: 'image',
    sortable: false
  },
  attendance: {
    label: 'Attendance',
    type: 'boolean',
    sortable: true
  }
}

const students = [
  {
    username: 'student1',
    name: 'Student 1',
    image: ''
  },
  {
    username: 'student2',
    name: 'Student 2',
    image: ''
  },
  {
    username: 'student3',
    name: 'Student 3',
    image: ''
  },
  {
    username: 'student4',
    name: 'Student 4',
    image: ''
  },
  {
    username: 'student5',
    name: 'Student 5',
    image: ''
  }
]

const columns = createColumns(
  [],
  studentSchema,
  [
    {
      accessorKey: 'name',
      title: 'Name',
      render: (row) => h('div', { class: 'flex items-center gap-2' }, {
        default: () => {
          return [
            h(Avatar, {}, {
              default: () => [
                h(AvatarImage, {
                  src: row.original.image || '',
                  alt: row.getValue('name')
                }),
                h(AvatarFallback, {}, {
                  default: () => [
                    h('span', {}, row.getValue('name')[0])
                  ]
                })
              ]
            }),
            h('div', {}, row.getValue('name'))
          ]
        }
      }),
      before: 'score'
    },
    {
      accessorKey: 'score',
      title: '',
      render: (row) => h('div', { class: 'truncate' },
        h(Button, {
          variant: 'outline',
          size: 'sm',
          onClick: () => {
          }
        }, { default: () => 'Detail' })
      ),
      options: {
        enableSorting: false,
        enableHiding: false
      },
      before: 'actions'
    }
  ],
  'users.update',
  'users.delete'
) as ColumnDef<Student>[]
</script>

<template>
  <Card class="mb-4">
    <CardHeader class="flex flex-col sm:flex-row items-center justify-between gap-6">
      <div class="flex flex-row items-start gap-4">
        <Avatar size="base">
          <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div>
          <CardTitle class="text-2xl">
            Class
          </CardTitle>

          <CardDescription class="text-base">
            Teacher
          </CardDescription>
        </div>
      </div>

      <div class="flex flex-col sm:items-end gap-2">
        <CardTitle>
          30 student(s)
        </CardTitle>
      </div>
    </CardHeader>
  </Card>

  <!--  <LayoutTable-->
  <!--    :data="students"-->
  <!--    :columns="columns"-->
  <!--    :filters="[]"-->
  <!--  />-->

  <DetailStudent />
</template>