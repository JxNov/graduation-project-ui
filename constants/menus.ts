import type { NavMenuItems } from '~/types/nav'

export const navMenu: NavMenuItems = [
  {
    title: 'home',
    icon: 'i-lucide-home',
    link: '/',
    permissions: []
  },
  {
    title: 'dashboard',
    icon: 'hugeicons:dashboard-square-01',
    link: '/admin',
    permissions: []
  },
  {
    title: 'general',
    icon: 'gravity-ui:graduation-cap',
    children: [
      {
        title: 'generations',
        icon: 'fluent:people-team-16-regular',
        link: '/admin/generations',
        permissions: []
      },
      {
        title: 'academicYears',
        icon: 'material-symbols:calendar-clock-outline-rounded',
        link: '/admin/academic-years',
        permissions: []
      },
      {
        title: 'semesters',
        icon: 'carbon:calendar',
        link: '/admin/semesters',
        permissions: []
      },
      {
        title: 'blocks',
        icon: 'lucide:blocks',
        link: '/admin/blocks',
        permissions: []
      },
      {
        title: 'classes',
        icon: 'eos-icons:product-classes-outlined',
        link: '/admin/classes',
        permissions: []
      },
      {
        title: 'attendances',
        icon: 'material-symbols:person-raised-hand-outline',
        link: '/admin/attendances',
        permissions: []
      },
      {
        title: 'roles',
        icon: 'eos-icons:role-binding-outlined',
        link: '/admin/roles',
        permissions: []
      }
      // {
      //   title: 'students',
      //   icon: 'ph:student',
      //   link: '/admin/students',
      //   permissions: []
      // },
      // {
      //   title: 'teachers',
      //   icon: 'hugeicons:teaching',
      //   link: '/admin/teachers',
      //   permissions: []
      // },
      // {
      //   title: 'subjects',
      //   icon: 'carbon:document-subject',
      //   link: '/admin/subjects',
      //   permissions: []
      // },
    ]
  },
  {
    title: 'users',
    icon: 'fluent:people-20-regular',
    link: '/admin/users',
    permissions: []
  },
  {
    title: 'attendances',
    icon: 'material-symbols:person-raised-hand-outline',
    link: '/attendances',
    permissions: []
  }
]

export const navMenuBottom: NavMenuItems = [
  {
    title: 'classrooms.index',
    icon: 'mdi:google-classroom',
    link: '/classrooms',
    permissions: []
  }
]
