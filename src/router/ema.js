import MyGeneral from '../views/pages/ema/import-employee.vue';



import layouts from '../layout'

export default [{
    path: '/employee-management/import',
    name: 'Import Employee',
    component: MyGeneral,
    meta: {
        auth: true,
        layout: layouts.navLeft,
        searchable: false,
        title: 'Import Employee',
        tags: ['Document']
    },
}, ]