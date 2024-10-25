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
    icon: 'mage:dashboard',
    link: '/admin',
    permissions: []
  },
  {
    title: 'general',
    icon: 'fluent:hat-graduation-12-regular',
    children: [
      {
        title: 'generations',
        icon: 'fluent:people-team-16-regular',
        link: '/admin/generations',
        permissions: []
      },
      {
        title: 'students',
        icon: 'ph:student',
        link: '/admin/students',
        permissions: []
      },
      {
        title: 'teachers',
        icon: 'hugeicons:teaching',
        link: '/admin/teachers',
        permissions: []
      },
      {
        title: 'subjects',
        icon: 'carbon:document-subject',
        link: '/admin/subjects',
        permissions: []
      },
      {
        title: 'classes',
        icon: 'eos-icons:product-classes-outlined',
        link: '/admin/classes',
        permissions: []
      }
    ]
  },
  {
    title: 'roles',
    icon: 'eos-icons:role-binding-outlined',
    link: '/admin/roles',
    permissions: []
  },
  {
    title: 'users',
    icon: 'fluent:people-20-regular',
    link: '/admin/users',
    permissions: []
  }
]

export const navMenuBottom: NavMenuItems = [
  {
    title: 'help',
    icon: 'i-lucide-life-buoy',
    link: ''
  },
  {
    title: 'account',
    icon: 'i-lucide-square-user',
    link: ''
  }
]
