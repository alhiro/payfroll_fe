import ListUser from '../views/pages/userKlikpayroll/list-user-klikpayroll.vue'
import EditUser from '../views/pages/userKlikpayroll/edit-user-klikpayroll.vue'
import NewUser from '../views/pages/userKlikpayroll/new-user-klikpayroll.vue'
import layouts from '../layout'

export default [
  {
    path: '/list-user-klikpayroll',
    name: 'ListUserKlikpayroll',
    component: ListUser,
    meta: {
      auth: true,
      layout: layouts.navLeft,
      searchable: false,
      title: 'List User',
      tags: ['User']
    },
  },
  {
    path: '/new-user-klikpayroll',
    name: 'NewUserKlikpayroll',
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
    path: '/edit-user-klikpayroll/:id',
    name: 'EditUserKlikpayroll',
    component: EditUser,
    meta: {
      auth: true,
      layout: layouts.navLeft,
      searchable: false,
      title: 'Edit User',
      tags: ['User']
    },
  },
]