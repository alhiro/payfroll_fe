import Edit from '../views/pages/holiday/edit-holiday.vue';
import List from '../views/pages/holiday/list-holiday.vue';
import New from '../views/pages/holiday/new-holiday.vue';


import layouts from '../layout'

export default [{
        path: '/list-holiday',
        name: 'Holiday',
        component: List,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Holiday',
            tags: ['Holiday']
        },
    },
    {
        path: '/new-holiday',
        name: 'New Holiday',
        component: New,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Create Holiday',
            tags: ['Holiday']
        },
    },
    {
        path: '/list-holiday/:id',
        name: 'Edit Holiday',
        component: Edit,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Edit Holiday',
            tags: ['Holiday']
        },
    },
]
