import * as getter from '../../getters-types'

export default {
  [getter.GET_LIST_USER_KLIKPAYROLL](state) {
    return state.listUser
  },
  [getter.GET_PAGINATE_USER_KLIKPAYROLL](state){
    return state.paginate
  },
  [getter.GET_USER_TOTAL_KLIKPAYROLL](state) {
    return state.userTotal
  },
  [getter.GET_USER_ROLES_KLIKPAYROLL](state) {
    return state.userRoles
  },
} 
