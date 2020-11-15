import mutations from './mutation'
import getters from './getters'
import actions from './action'

const state = {
  currencyList: null,
  paginate : {
    nextClick   : null,
    prevClick   : null,
    firstPage   : null,
    fromP       : null
  },
  currencyTotal: null,
} 

export default {
  state,
  mutations,
  actions,
  getters
}
