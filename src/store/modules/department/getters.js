
import * as getter from '../../getters-types'
export default {
[getter.GET_LIST_DEPARTMENT](state) {
    return state.listMenu
},
[getter.GET_PAGINATE_DEPARTMENT](state){
    return state.paginate
},
[getter.GET_DEPARTMENT_TOTAL](state) {
    return state.totalMenu
},
[getter.GET_DEPARTMENT_DETAIL](state) {
    return state.detailMenu
},
[getter.GET_DROPDOWN_DEPARTMENT](state){
    return state.dropDown
},
};

