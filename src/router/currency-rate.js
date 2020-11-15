import ListUser from '../views/pages/currencyRate/list-currency'
// import EditUser from '../views/pages/companySetting/edit-setting.vue'
import NewUser from '../views/pages/currencyRate/new-currency'
// import Detail from '../views/pages/grade/detail-grade.vue'




import layouts from '../layout'

export default [{
    path: '/list-currency-rate',
    name: 'List Currency Rate',
    component: ListUser,
    meta: {
        auth: true,
        layout: layouts.navLeft,
        searchable: false,
        title: 'List Currency Rate',
        tags: ['User']
    },
},
    {
        path: '/new-currency-rate',
        name: 'New Currency Rate',
        component: NewUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'New Currency Rate',
            tags: ['User']
        },
    },
    {
        path: '/edit-currency-rate/:id',
        name: 'Edit Currency Rate',
        component: NewUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Edit Currency Rate',
            tags: ['User']
        },
    },
    // {
    //     path: '/detail-grade/:id',
    //     name: 'Detail Grade',
    //     component: Detail,
    //     meta: {
    //         auth: true,
    //         layout: layouts.navLeft,
    //         searchable: false,
    //         title: 'Detail Grade',
    //         tags: ['User']
    //     },
    // },
]
