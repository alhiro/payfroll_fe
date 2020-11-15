import ListUser from '../views/pages/team/list-team.vue'
import EditUser from '../views/pages/team/edit-team.vue'
import NewUser from '../views/pages/team/new-team.vue'
import Detail from '../views/pages/team/detail-team.vue'




import layouts from '../layout'

export default [{
        path: '/list-team',
        name: 'List Team',
        component: ListUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'List Team',
            tags: ['User']
        },
    },
    {
        path: '/new-team',
        name: 'New Team',
        component: NewUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'New Team',
            tags: ['User']
        },
    },
    {
        path: '/edit-team/:id',
        name: 'Edit Team',
        component: EditUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Edit Team',
            tags: ['User']
        },
    },
    {
        path: '/detail-team/:id',
        name: 'Detail Team',
        component: Detail,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Detail Team',
            tags: ['User']
        },
    },




]