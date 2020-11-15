import * as mutation from '../../mutation-types'

export default {
  [mutation.SET_LIST_HOLDING](state, payload){
    state.listHolding              = payload.dataList
    state.totalHolding             = payload.total
    state.paginate.nextClick    = payload.nextC
    state.paginate.prevClick    = payload.prevC
    state.paginate.firstPage    = payload.firstP
    state.paginate.fromP        = payload.fromPA
  },
  [mutation.SET_DETAIL_HOLDING](state,payload){
      state.detailHolding = payload;
  }
} 
