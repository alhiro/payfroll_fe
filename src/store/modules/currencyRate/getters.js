
import * as getter from '../../getters-types'
export default {
[getter.GET_LIST_CURRENCY_RATE](state) {
    return state.listMenu
},
[getter.GET_PAGINATE_CURRENCY_RATE](state){
    return state.paginate
},
[getter.GET_CURRENCY_RATE_TOTAL](state) {
    return state.totalMenu
},
[getter.GET_CURRENCY_RATE_DETAIL](state) {
    return state.detailMenu
},
// [getter.GET_DROPDOWN_LEVEL](state){
//     return state.dropDown
// },
};

