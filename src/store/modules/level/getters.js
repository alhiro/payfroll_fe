
import * as getter from '../../getters-types'
export default {
[getter.GET_LIST_LEVEL](state) {
    return state.listMenu
},
[getter.GET_PAGINATE_LEVEL](state){
    return state.paginate
},
[getter.GET_LEVEL_TOTAL](state) {
    return state.totalMenu
},
[getter.GET_LEVEL_DETAIL](state) {
    return state.detailMenu
},
[getter.GET_DROPDOWN_LEVEL](state){
    return state.dropDown
},
};

