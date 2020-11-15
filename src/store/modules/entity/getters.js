
import * as getter from '../../getters-types'
export default {
[getter.GET_LIST_ENTITY](state) {
    return state.listEntity
},
[getter.GET_PAGINATE_ENTITY](state){
    return state.paginate
},
[getter.GET_ENTITY_TOTAL](state) {
    return state.totalEntity
},
[getter.GET_ENTITY_DETAIL](state) {
    return state.detailEntity
},
[getter.GET_DROPDOWN_ENTITY](state){
    return state.dropDown
},
};

