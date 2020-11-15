import * as getter from '../../getters-types'

export default {
  [getter.GET_LIST_HOLDING](state) {
    return state.listHolding
  },
  [getter.GET_PAGINATE_HOLDING](state){
    return state.paginate
  },
  [getter.GET_TOTAL_HOLDING](state) {
    return state.totalHolding
  },
  [getter.GET_DETAIL_HOLDING](state) {
    return state.detailHolding
  },
} 
