import mutations from './mutation'
import getters from './getters'
import actions from './action'

const state = {
  listHolding: null,
  paginate : {
    nextClick   : null,
    prevClick   : null,
    firstPage   : null,
    fromP       : null
  },
  totalHolding: null,
  detailHolding:null
} 

export default {
  state,
  mutations,
  actions,
  getters
}
