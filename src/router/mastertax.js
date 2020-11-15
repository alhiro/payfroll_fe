import Edit from '../views/pages/mastertax/edit-mastertax.vue';
import List from '../views/pages/mastertax/list-mastertax.vue';
import New from '../views/pages/mastertax/new-mastertax.vue';


import layouts from '../layout'

export default [{
        path: '/list-mastertaxtype',
        name: 'Master Tax Type',
        component: List,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Master Tax Type',
            tags: ['Holiday']
        },
    },
    {
        path: '/new-mastertaxtype',
        name: 'New Master Tax Type',
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
        path: '/list-mastertaxtype/:id',
        name: 'Edit Master Tax Type',
        component: Edit,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Edit Master Tax Type',
            tags: ['Holiday']
        },
    },
]
