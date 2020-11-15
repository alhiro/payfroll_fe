import ListUser from '../views/pages/entity/list-entity.vue'
import EditUser from '../views/pages/entity/edit-entity.vue'
import NewUser from '../views/pages/entity/new-entity.vue'
import Detail from '../views/pages/entity/detail-entity.vue'




import layouts from '../layout'

export default [{
        path: '/list-entity',
        name: 'List Entity',
        component: ListUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'List Entity',
            tags: ['User']
        },
    },
    {
        path: '/new-entity',
        name: 'NewEntity',
        component: NewUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'New Entity',
            tags: ['User']
        },
    },
    {
        path: '/edit-entity/:id',
        name: 'EditEntity',
        component: EditUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Edit Entity',
            tags: ['User']
        },
    },
    {
        path: '/detail-entity/:id',
        name: 'DetailEntity',
        component: Detail,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Detail Entity',
            tags: ['User']
        },
    },




]