
import * as getter from '../../getters-types'
export default {
[getter.GET_LIST_CONSULTANT](state) {
    return state.listMenu
},
[getter.GET_PAGINATE_CONSULTANT](state){
    return state.paginate
},
[getter.GET_CONSULTANT_TOTAL](state) {
    return state.totalMenu
},
[getter.GET_CONSULTANT_DETAIL](state) {
    return state.detailMenu
},
[getter.GET_DROPDOWN_HOLDINGS](state){
    return state.dropDown
},
};

