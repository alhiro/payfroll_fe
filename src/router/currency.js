import CurrencyList from '../views/pages/currency/currency-list.vue'
import layouts from '../layout'

export default [
  {
    path: '/currency-list',
    name: 'CurrencyList',
    component: CurrencyList,
    meta: {
      auth: true,
      layout: layouts.navLeft,
      searchable: false,
      title: 'Currency List',
      tags: ['Currency']
    },
  },
]