import mutations from './mutation'
import getters from './getters'
import actions from './action'

const state = {
  listUser: null,
  paginate : {
    nextClick   : null,
    prevClick   : null,
    firstPage   : null,
    fromP       : null
  },
  userTotal: null,
  userRoles: null,
  detailUser: null,
} 

export default {
  state,
  mutations,
  actions,
  getters
}
