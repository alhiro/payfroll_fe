import ListUser from '../views/pages/companySetting/list-setting'
import EditUser from '../views/pages/companySetting/edit-setting.vue'
import NewUser from '../views/pages/companySetting/new-setting.vue'
// import Detail from '../views/pages/grade/detail-grade.vue'




import layouts from '../layout'

export default [{
        path: '/list-company-setting',
        name: 'List Company Setting',
        component: ListUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'List Company Setting',
            tags: ['User']
        },
    },
    {
        path: '/new-company-setting',
        name: 'New Company Setting',
        component: NewUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'New Company Setting',
            tags: ['User']
        },
    },
    {
        path: '/edit-company-setting/:id',
        name: 'Edit Company Setting',
        component: EditUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Edit Company Setting',
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
