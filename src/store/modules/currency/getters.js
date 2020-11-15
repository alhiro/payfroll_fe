import * as getter from '../../getters-types'

export default {
[getter.GET_CURRENCY_LIST](state) {
    return state.currencyList
},
[getter.GET_PAGINATE_CURRENCY](state){
    return state.paginate
},
[getter.GET_CURRENCY_TOTAL](state) {
    return state.currencyTotal
},
};

