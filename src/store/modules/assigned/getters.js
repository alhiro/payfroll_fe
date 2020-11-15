
import * as getter from '../../getters-types'
export default {
[getter.GET_LIST_ASSIGNED](state) {
    return state.listMenu
},
[getter.GET_PAGINATE_ASSIGNED](state){
    return state.paginate
},
[getter.GET_ASSIGNED_TOTAL](state) {
    return state.totalMenu
},
[getter.GET_ASSIGNED_DETAIL](state) {
    return state.detailMenu
},
[getter.GET_DROPDOWN_ASSIGNED](state){
    return state.dropDown
},
};

