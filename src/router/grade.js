import ListUser from '../views/pages/grade/list-grade.vue'
import EditUser from '../views/pages/grade/edit-grade.vue'
import NewUser from '../views/pages/grade/new-grade.vue'
import Detail from '../views/pages/grade/detail-grade.vue'




import layouts from '../layout'

export default [{
        path: '/list-grade',
        name: 'List Grade',
        component: ListUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'List Grade',
            tags: ['User']
        },
    },
    {
        path: '/new-grade',
        name: 'New Grade',
        component: NewUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'New Grade',
            tags: ['User']
        },
    },
    {
        path: '/edit-grade/:id',
        name: 'Edit Grade',
        component: EditUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Edit Grade',
            tags: ['User']
        },
    },
    {
        path: '/detail-grade/:id',
        name: 'Detail Grade',
        component: Detail,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Detail Grade',
            tags: ['User']
        },
    },




]