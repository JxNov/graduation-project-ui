import type { NavMenuItems } from '~/types/nav'

export const navMenuClassroom: NavMenuItems = [
  {
    title: 'classrooms.home',
    icon: 'mdi:google-classroom',
    link: '/classrooms',
    permissions: []
  },
  {
    title: 'classrooms.registered',
    icon: 'gravity-ui:graduation-cap',
    children: [
      {
        title: 'classrooms.todos',
        icon: 'material-symbols:contextual-token-add-outline-sharp',
        link: '/classrooms/todos',
        permissions: []
      }
    ]
  }
]

export const navMenuClassroomBottom: NavMenuItems = [
  {
    title: 'home',
    icon: 'i-lucide-home',
    link: '/',
    permissions: []
  }
]
