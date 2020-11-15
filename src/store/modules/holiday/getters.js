
import * as getter from '../../getters-types'
export default {
[getter.GET_LIST_HOLIDAY](state) {
    return state.listMenu
},
[getter.GET_PAGINATE_HOLIDAY](state){
    return state.paginate
},
[getter.GET_HOLIDAY_TOTAL](state) {
    return state.totalMenu
},
[getter.GET_HOLIDAY_DETAIL](state) {
    return state.detailMenu
},
// Duplicate
// [getter.GET_DROPDOWN_OVT](state){
//     return state.dropDown
// },
};

