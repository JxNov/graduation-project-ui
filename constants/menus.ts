import type {NavMenuItems} from '~/types/nav'

export const navMenu: NavMenuItems = [
    {
        title: 'Home',
        icon: 'i-lucide-home',
        link: '/',
    },
    {
        title: 'General',
        icon: 'fluent:hat-graduation-12-regular',
        children: [
            {
                title: 'Generations',
                icon: 'fluent:people-team-16-regular',
                link: '/admin/generations',
            },
            {
                title: 'Students',
                icon: 'ph:student',
                link: '/students',
            },
            {
                title: 'Teachers',
                icon: 'hugeicons:teaching',
                link: '/teachers',
            },
            {
                title: 'Subjects',
                icon: 'carbon:document-subject',
                link: '/subjects',
            },
            {
                title: 'Classes',
                icon: 'eos-icons:product-classes-outlined',
                link: '/classes',
            },
        ],
    },
    {
        title: 'Roles',
        icon: 'eos-icons:role-binding-outlined',
        link: '/admin/roles',
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
