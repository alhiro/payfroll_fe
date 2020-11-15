import ListUser from '../views/pages/roles/list-roles.vue'
import EditUser from '../views/pages/roles/edit-roles.vue'
import NewUser from '../views/pages/roles/new-roles.vue'
import DetailUser from '../views/pages/roles/detail-roles.vue'
import RoleSetting from '../views/pages/roles/role-setting.vue'



import layouts from '../layout'

export default [{
        path: '/role-management',
        name: 'List Roles',
        component: ListUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'List Roles',
            tags: ['User']
        },
    },
    {
        path: '/new-roles',
        name: 'New Roles',
        component: NewUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'New User',
            tags: ['User']
        },
    },
    {
        path: '/detail-roles/:id',
        name: 'Detail Roles',
        component: DetailUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Detail User',
            tags: ['User']
        },
    },
    {
        path: '/edit-roles/:id',
        name: 'Edit Roles',
        component: EditUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Edit Roles',
            tags: ['User']
        },
    },
    {
        path: '/role-management/settings',
        name: 'role-setting',
        component: RoleSetting,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Edit Roles',
            tags: ['User']
        },
    },
]