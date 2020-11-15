
import * as getter from '../../getters-types'
export default {
[getter.GET_LIST_PAYROLL_ITEM](state) {
    return state.listMenu
},
[getter.GET_PAGINATE_PAYROLL_ITEM](state){
    return state.paginate
},
[getter.GET_PAYROLL_ITEM_TOTAL](state) {
    return state.totalMenu
},
[getter.GET_PAYROLL_ITEM_DETAIL](state) {
    return state.detailMenu
},
// [getter.GET_DROPDOWN_TEAM](state){
//     return state.dropDown
// },
};

