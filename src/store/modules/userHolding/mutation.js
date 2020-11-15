import * as mutation from '../../mutation-types'

export default {
  [mutation.SET_LIST_USER_HOLDING](state, payload){
    state.listUser              = payload.dataList
    state.userTotal             = payload.total
    state.paginate.nextClick    = payload.nextC
    state.paginate.prevClick    = payload.prevC
    state.paginate.firstPage    = payload.firstP
    state.paginate.fromP        = payload.fromPA
  },
  [mutation.SET_USER_ROLES_HOLDING](state, payload){
    state.userRoles  = payload.dataList
  },
} 
