import ListUser from '../views/pages/userHolding/list-user-holding.vue'
import EditUser from '../views/pages/userHolding/edit-user-holding.vue'
import NewUser from '../views/pages/userHolding/new-user-holding.vue'
import layouts from '../layout'

export default [
  {
    path: '/list-user-holding',
    name: 'ListUserHolding',
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
    path: '/new-user-holding',
    name: 'NewUserHolding',
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
    path: '/edit-user-holding/:id',
    name: 'EditUserHolding',
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