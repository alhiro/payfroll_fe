
import * as getter from '../../getters-types'
export default {
[getter.GET_LIST_MASTERTAX](state) {
    return state.listMenu
},
[getter.GET_PAGINATE_MASTERTAX](state){
    return state.paginate
},
[getter.GET_MASTERTAX_TOTAL](state) {
    return state.totalMenu
},
[getter.GET_MASTERTAX_DETAIL](state) {
    return state.detailMenu
},
[getter.GET_DROPDOWN_OVT](state){
    return state.dropDown
},
};

