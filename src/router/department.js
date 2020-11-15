import ListUser from '../views/pages/department/list-department.vue'
import EditUser from '../views/pages/department/edit-department.vue'
import NewUser from '../views/pages/department/new-department.vue'
import Detail from '../views/pages/department/detail-department.vue'




import layouts from '../layout'

export default [{
        path: '/list-department',
        name: 'List Department',
        component: ListUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'List Department',
            tags: ['User']
        },
    },
    {
        path: '/new-department',
        name: 'New Department',
        component: NewUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'New Department',
            tags: ['User']
        },
    },
    {
        path: '/edit-department/:id',
        name: 'Edit Department',
        component: EditUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Edit Department',
            tags: ['User']
        },
    },
    {
        path: '/detail-department/:id',
        name: 'Detail Department',
        component: Detail,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Detail Department',
            tags: ['User']
        },
    },




]