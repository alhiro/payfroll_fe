import ListUser from '../views/pages/bank/list-bank.vue'
import EditUser from '../views/pages/bank/edit-bank.vue'
import NewUser from '../views/pages/bank/new-bank.vue'
import Detail from '../views/pages/bank/detail-bank.vue'




import layouts from '../layout'

export default [{
        path: '/list-bank',
        name: 'List Bank',
        component: ListUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'List Bank',
            tags: ['User']
        },
    },
    {
        path: '/new-bank',
        name: 'New Bank',
        component: NewUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'New Bank',
            tags: ['User']
        },
    },
    {
        path: '/edit-bank/:id',
        name: 'Edit Bank',
        component: EditUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Edit Bank',
            tags: ['User']
        },
    },
    {
        path: '/detail-bank/:id',
        name: 'Detail Bank',
        component: Detail,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Detail Bank',
            tags: ['User']
        },
    },




]