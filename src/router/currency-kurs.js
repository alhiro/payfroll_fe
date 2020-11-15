import ListUser from '../views/pages/currencyKurs/list-currency'
// import EditUser from '../views/pages/companySetting/edit-setting.vue'
import NewUser from '../views/pages/currencyKurs/new-currency'
// import Detail from '../views/pages/grade/detail-grade.vue'




import layouts from '../layout'

export default [{
    path: '/list-currency-kurs',
    name: 'List Currency Kurs',
    component: ListUser,
    meta: {
        auth: true,
        layout: layouts.navLeft,
        searchable: false,
        title: 'List Currency Kurs',
        tags: ['User']
    },
},
    {
        path: '/new-currency-kurs',
        name: 'New Currency Kurs',
        component: NewUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'New Currency Kurs',
            tags: ['User']
        },
    },
    {
        path: '/edit-currency-kurs/:id',
        name: 'Edit Currency Kurs',
        component: NewUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Edit Currency Kurs',
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
