
import * as getter from '../../getters-types'
export default {
[getter.GET_LIST_TAX_REGULATION](state) {
    return state.listMenu
},
[getter.GET_PAGINATE_TAX_REGULATION](state){
    return state.paginate
},
[getter.GET_TAX_REGULATION_TOTAL](state) {
    return state.totalMenu
},
[getter.GET_TAX_REGULATION_DETAIL](state) {
    return state.detailMenu
},
// [getter.GET_DROPDOWN_HOLDINGS](state){
//     return state.dropDown
// },
};

