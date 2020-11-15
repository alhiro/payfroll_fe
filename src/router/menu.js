import Admin from '../views/pages/menu/list-menu-admin.vue';
import Edit from '../views/pages/menu/edit-menu.vue';
import Menu from '../views/pages/menu/list-menu.vue';
import New from '../views/pages/menu/new-menu.vue';


import layouts from '../layout'

export default [{
        path: '/menu-management',
        name: 'menu',
        component: Admin,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Menu',
            tags: ['Menu']
        },
    },
    {
        path: '/manage-Menu',
        name: 'AdminMenu',
        component: Menu,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Admin Menu',
            tags: ['Menu']
        },
    },
    {
        path: '/new-menu',
        name: 'NewMenu',
        component: New,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Create Menu',
            tags: ['Menu']
        },
    },
    {
        path: '/menu-management/:id',
        name: 'EditMenu',
        component: Edit,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Edit Menu',
            tags: ['Menu']
        },
    },
]
