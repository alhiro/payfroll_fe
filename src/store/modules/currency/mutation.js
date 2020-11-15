import * as mutation from '../../mutation-types'

export default {
  [mutation.SET_CURRENCY_LIST](state, payload){
    state.currencyList          = payload.dataList
    state.currencyTotal         = payload.total
    state.paginate.nextClick    = payload.nextC
    state.paginate.prevClick    = payload.prevC
    state.paginate.firstPage    = payload.firstP
    state.paginate.fromP        = payload.fromPA
  },
} 
