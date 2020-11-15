
import * as getter from '../../getters-types'
export default {
[getter.GET_LIST_COMPANY_SETTING](state) {
    return state.listMenu
},
[getter.GET_PAGINATE_COMPANY_SETTING](state){
    return state.paginate
},
[getter.GET_COMPANY_SETTING_TOTAL](state) {
    return state.totalMenu
},
[getter.GET_COMPANY_SETTING_DETAIL](state) {
    return state.detailMenu
},
// [getter.GET_DROPDOWN_LEVEL](state){
//     return state.dropDown
// },
};

