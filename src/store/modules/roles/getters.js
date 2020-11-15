
import * as getter from '../../getters-types'
export default {
[getter.GET_LIST_ROLES](state) {
    return state.listUser
},
[getter.GET_PAGINATE_ROLES](state){
    return state.paginate
},
[getter.GET_ROLES_A_LIST](state) {
    return state.userAvList
},
[getter.GET_ROLES_TOTAL](state) {
    return state.userTotal
},
[getter.GET_DROPDOWN_ROLES](state){
    return state.dropDown
},
[getter.GET_ROLES_ROLES](state) {
    return state.userRoles
},
[getter.ROLES](state) {
    return state.detailUser
},
[getter.SELECTED_ROLES](state) {
    return state.settingRole
},
[getter.ALL_MENU_TOP](state) {
    return state.allRoles
},

};

