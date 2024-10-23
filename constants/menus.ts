import type {NavMenuItems} from '~/types/nav'

export const navMenu: NavMenuItems = [
    {
        title: 'Dashboard',
        icon: 'i-lucide-home',
        link: '/admin',
        permissions: [],
    },
    {
        title: 'General',
        icon: 'fluent:hat-graduation-12-regular',
        children: [
            {
                title: 'Generations',
                icon: 'fluent:people-team-16-regular',
                link: '/admin/generations',
                permissions: [],
            },
            {
                title: 'Students',
                icon: 'ph:student',
                link: '/admin/students',
                permissions: [],
            },
            {
                title: 'Teachers',
                icon: 'hugeicons:teaching',
                link: '/admin/teachers',
                permissions: [],
            },
            {
                title: 'Subjects',
                icon: 'carbon:document-subject',
                link: '/admin/subjects',
                permissions: [],
            },
            {
                title: 'Classes',
                icon: 'eos-icons:product-classes-outlined',
                link: '/admin/classes',
                permissions: [],
            },
        ],
    },
    {
        title: 'Roles',
        icon: 'eos-icons:role-binding-outlined',
        link: '/admin/roles',
        permissions: [],
    },
    {
        title: 'Users',
        icon: 'fluent:people-20-regular',
        link: '/admin/users',
        permissions: [],
    },
]

export const navMenuBottom: NavMenuItems = [
    {
        title: 'Help',
        icon: 'i-lucide-life-buoy',
        link: '',
    },
    {
        title: 'Account',
        icon: 'i-lucide-square-user',
        link: '',
    },
]
