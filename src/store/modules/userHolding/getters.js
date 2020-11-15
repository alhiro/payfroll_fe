import * as getter from '../../getters-types'

export default {
  [getter.GET_LIST_USER_HOLDING](state) {
    return state.listUser
  },
  [getter.GET_PAGINATE_USER_HOLDING](state){
    return state.paginate
  },
  [getter.GET_USER_TOTAL_HOLDING](state) {
    return state.userTotal
  },
  [getter.GET_USER_ROLES_HOLDING](state) {
    return state.userRoles
  },
} 
