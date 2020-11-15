
import * as getter from '../../getters-types'
export default {
[getter.GET_LIST_BANK](state) {
    return state.listMenu
},
[getter.GET_PAGINATE_BANK](state){
    return state.paginate
},
[getter.GET_BANK_TOTAL](state) {
    return state.totalMenu
},
[getter.GET_BANK_DETAIL](state) {
    return state.detailMenu
},
[getter.GET_DROPDOWN_BANK](state){
    return state.dropDown
},
};

