import ListUser from '../views/pages/company/list-company.vue'
import EditUser from '../views/pages/company/edit-company.vue'
import NewUser from '../views/pages/company/new-company.vue'
import Detail from '../views/pages/company/detail-company.vue'
import UserCompany from '../views/pages/company/list-user-company.vue'
import Departement from '../views/pages/company/departement.vue'
// import AssignCompany from '../views/pages/company/assign-user-company.vue'




import layouts from '../layout'

export default [{
        path: '/list-company',
        name: 'List Company',
        component: ListUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'List company',
            tags: ['User']
        },
    },
    {
        path: '/new-company',
        name: 'New Company',
        component: NewUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'New User',
            tags: ['User']
        },
    },
    {
        path: '/edit-company/:id',
        name: 'Edit Company',
        component: EditUser,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Edit Company',
            tags: ['User']
        },
    },
    {
        path: '/detail-company/:id',
        name: 'Detail Company',
        component: Detail,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Detail Company',
            tags: ['User']
        },
    },
    {
        path: '/detail-company/:id/list-user',
        name: 'List User Company',
        component: UserCompany,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'User Company',
            tags: ['User']
        },
    },
    {
        path: '/departement',
        name: 'Departement',
        component: Departement,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Departement',
            tags: ['Departement']
        },
    }

    // {
    //     path: '/detail-company/:id/list-user/assign',
    //     name: 'List Assign Company',
    //     component: AssignCompany,
    //     meta: {
    //         auth: true,
    //         layout: layouts.navLeft,
    //         searchable: false,
    //         title: 'Assign Company',
    //         tags: ['User']
    //     },
    // },




]