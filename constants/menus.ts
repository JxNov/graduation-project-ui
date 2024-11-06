import type {NavMenuItems} from '~/types/nav'

export const navMenu: NavMenuItems = [
    {
        title: 'Home',
        icon: 'i-lucide-home',
        link: '/admin',
        permissions: [],
    },
    {
        title: 'Enroller',
        icon: 'fluent:hat-graduation-12-regular',
        children: [
            {
                title: 'To do',
                icon: 'fluent:people-team-16-regular',
                link: '/admin/generations',
                permissions: [],
            },
            {
                title: 'WEB201401',
                icon: '',
                link: '/admin/students',
                permissions: [],
            },
            // {
            //     title: 'Khởi sự doanh nghiệp',
            //     icon: '',
            //     link: '/admin/teachers',
            //     permissions: [],
            // },
            // {
            //     title: 'Subjects',
            //     icon: 'carbon:document-subject',
            //     link: '/admin/subjects',
            //     permissions: [],
            // },
            // {
            //     title: 'Classes',
            //     icon: 'eos-icons:product-classes-outlined',
            //     link: '/admin/classes',
            //     permissions: [],
            // },
        ],
    },
    {
        title: 'Archived classes',
        icon: 'eos-icons:role-binding-outlined',
        link: '/admin/roles',
        permissions: [],
    },

    {
        title: 'Attendance',
        icon: 'material-symbols-light:history-edu-outline',
        link: '/admin/RallCall',
        permissions: [],
    },

    {
        title: 'Setting',
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
