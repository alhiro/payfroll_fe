
import * as getter from '../../getters-types'
export default {
[getter.GET_LIST_TEAM](state) {
    return state.listMenu
},
[getter.GET_PAGINATE_TEAM](state){
    return state.paginate
},
[getter.GET_TEAM_TOTAL](state) {
    return state.totalMenu
},
[getter.GET_TEAM_DETAIL](state) {
    return state.detailMenu
},
[getter.GET_DROPDOWN_TEAM](state){
    return state.dropDown
},
};

