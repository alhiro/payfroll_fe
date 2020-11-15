import ListUser from '../views/pages/payrollItem/list-payroll-item'
// import EditUser from '../views/pages/team/edit-team.vue'
import NewUser from '../views/pages/payrollItem/new-payroll-item.vue'
// import Detail from '../views/pages/team/detail-team.vue'




import layouts from '../layout'

export default [{
    path: '/list-payroll-item',
    name: 'List Payroll Item',
    component: ListUser,
    meta: {
        auth: true,
        layout: layouts.navLeft,
        searchable: false,
        title: 'List Payroll Item',
        tags: ['User']
    },
},
    {
        path: '/new-payroll-item',
        name: 'New Payroll Item',
        component: NewUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'New Payroll Item',
            tags: ['User']
        },
    },
    {
        path: '/edit-payroll-item/:id',
        name: 'Edit Payroll Item',
        component: NewUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Edit Payroll Item',
            tags: ['User']
        },
    },
    // {
    //     path: '/detail-team/:id',
    //     name: 'Detail Team',
    //     component: Detail,
    //     meta: {
    //         auth: true,
    //         layout: layouts.navLeft,
    //         searchable: false,
    //         title: 'Detail Team',
    //         tags: ['User']
    //     },
    // },
    //



]
