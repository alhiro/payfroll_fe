
import * as getter from '../../getters-types'
export default {
[getter.GET_LIST_PTKPS](state) {
    return state.listMenu
},
[getter.GET_PAGINATE_PTKPS](state){
    return state.paginate
},
[getter.GET_PTKPS_TOTAL](state) {
    return state.totalMenu
},
// [getter.GET_TAX_REGULATION_MASTER_DETAIL](state) {
//     return state.detailReg
// },
// [getter.GET_DROPDOWN_HOLDINGS](state){
//     return state.dropDown
// },
};

