import ListHolding from '../views/pages/holding/list-holding.vue'
import NewHolding from '../views/pages/holding/new-holding.vue'
import EditHolding from '../views/pages/holding/edit-holding.vue'
import layouts from '../layout'

export default [
  {
    path: '/list-holding',
    name: 'ListHolding',
    component: ListHolding,
    meta: {
      auth: true,
      layout: layouts.navLeft,
      searchable: false,
      title: 'List Holding',
      tags: ['Holding']
    },
  },
  {
    path: '/new-holding',
    name: 'NewHolding',
    component: NewHolding,
    meta: {
        auth: true,
        layout: layouts.navLeft,
        searchable: false,
        title: 'New Holding',
        tags: ['Holding']
    },
  },
  {
    path: '/edit-holding/:id',
    name: 'EditHolding',
    component: EditHolding,
    meta: {
        auth: true,
        layout: layouts.navLeft,
        searchable: false,
        title: 'Edit Holding',
        tags: ['Holding']
    },
  }
]