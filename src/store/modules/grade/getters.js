
import * as getter from '../../getters-types'
export default {
[getter.GET_LIST_GRADE](state) {
    return state.listMenu
},
[getter.GET_PAGINATE_GRADE](state){
    return state.paginate
},
[getter.GET_GRADE_TOTAL](state) {
    return state.totalMenu
},
[getter.GET_GRADE_DETAIL](state) {
    return state.detailMenu
},
[getter.GET_DROPDOWN_GRADE](state){
    return state.dropDown
},
};

