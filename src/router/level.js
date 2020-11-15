import ListUser from '../views/pages/level/list-level.vue'
import EditUser from '../views/pages/level/edit-level.vue'
import NewUser from '../views/pages/level/new-level.vue'
import Detail from '../views/pages/level/detail-level.vue'




import layouts from '../layout'

export default [{
        path: '/list-level',
        name: 'List Level',
        component: ListUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'List Level',
            tags: ['User']
        },
    },
    {
        path: '/new-level',
        name: 'New Level',
        component: NewUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'New Level',
            tags: ['User']
        },
    },
    {
        path: '/edit-level/:id',
        name: 'Edit Level',
        component: EditUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Edit Level',
            tags: ['User']
        },
    },
    {
        path: '/detail-level/:id',
        name: 'Detail Level',
        component: Detail,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Detail Level',
            tags: ['User']
        },
    },




]