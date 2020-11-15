
import * as getter from '../../getters-types'
export default {
[getter.GET_LIST_MENU](state) {
    return state.listMenu
},
[getter.GET_PAGINATE_MENU](state){
    return state.paginate
},
[getter.GET_MENU_TOTAL](state) {
    return state.totalMenu
},
[getter.GET_MENU_DETAIL](state) {
    return state.detailMenu
},
[getter.GET_MENU_PARENT](state) {
    return state.menuParent
},
};

