
import * as getter from '../../getters-types'
export default {
[getter.GET_LIST_COMPANY](state) {
    return state.listMenu
},
[getter.GET_PAGINATE_COMPANY](state){
    return state.paginate
},
[getter.GET_COMPANY_TOTAL](state) {
    return state.totalMenu
},
[getter.GET_COMPANY_DETAIL](state) {
    return state.detailMenu
},
[getter.GET_DROPDOWN_COMPANY](state){
    return state.dropDown
},
[getter.GET_GENERAL_INFO](state){
    return state.generalInfo
},
[getter.GET_ENTITY_LIST](state){
    return state.listEntity
},
};

