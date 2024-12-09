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
    permissions: ['admin.*']
  },
  {
    title: 'generations',
    icon: 'fluent:people-team-16-regular',
    link: '/admin/generations',
    permissions: ['admin.*']
  },
  {
    title: 'academicYears',
    icon: 'material-symbols:calendar-clock-outline-rounded',
    link: '/admin/academic-years',
    permissions: ['admin.*']
  },
  {
    title: 'semesters',
    icon: 'carbon:calendar',
    link: '/admin/semesters',
    permissions: ['admin.*']
  },
  {
    title: 'classes',
    icon: 'eos-icons:product-classes-outlined',
    link: '/admin/classes',
    permissions: ['admin.*', 'teacher.*']
  },
  {
    title: 'grades',
    icon: 'flowbite:clipboard-check-outline',
    link: '/grades',
    permissions: []
  },
  {
    title: 'attendances',
    icon: 'material-symbols:person-raised-hand-outline',
    link: '/admin/attendances',
    permissions: ['admin.*', 'teacher.*']
  },
  {
    title: 'schedules',
    icon: 'carbon:calendar',
    link: '/admin/schedules',
    permissions: ['admin.*']
  },
  {
    title: 'roles',
    icon: 'eos-icons:role-binding-outlined',
    link: '/admin/roles',
    permissions: ['admin.*']
  },
  {
    title: 'users',
    icon: 'fluent:people-20-regular',
    link: '/admin/users',
    permissions: ['admin.*']
  },
  {
    title: 'teachers',
    icon: 'hugeicons:teaching',
    link: '/admin/teachers',
    permissions: ['admin.*']
  },
  {
    title: 'students',
    icon: 'ph:student',
    link: '/admin/students',
    permissions: ['admin.*']
  },
  {
    title: 'attendances',
    icon: 'material-symbols:person-raised-hand-outline',
    link: '/attendances',
    permissions: ['student.*']
  },
  {
    title: 'chat',
    icon: 'token:chat',
    link: '/chat',
    permissions: []
  },
  {
    title: 'gemini',
    icon: 'mdi:robot-happy-outline',
    link: '/gemini',
    permissions: []
  }
]

export const navMenuBottom: NavMenuItems = [
  {
    title: 'classrooms.index',
    icon: 'mdi:google-classroom',
    link: '/classrooms',
    permissions: ['teacher.*', 'student.*']
  }
]
