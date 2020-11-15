import * as mutation from '../../mutation-types'
export default {
    [mutation.SET_DROPDOWN_USER](state, payload){
        state.dropDown  = payload.dataList
    },
    [mutation.SET_USER_D_AVAILABLE](state, payload){
        state.userAvList  = payload.dataList
    },
    [mutation.SET_LIST_USER](state, payload){
        state.listUser              = payload.dataList
        state.userTotal             = payload.total
        state.paginate.nextClick    = payload.nextC
        state.paginate.prevClick    = payload.prevC
        state.paginate.firstPage    = payload.firstP
        state.paginate.fromP        = payload.fromPA
    },
    [mutation.SET_USER_ROLES](state, payload){
        state.userRoles  = payload.dataList
    },
    [mutation.SET_USER_DETAIL](state, payload){
        state.detailUser  = payload.forUser
    },
    [mutation.SET_USER_RES](state, payload){
        state.user               = payload.userdata
       
    },
    [mutation.SET_USER_ASSIGNEE](state, payload){
        state.userAssignee         = payload.dataList
       
    },
    [mutation.SET_USER_ENTERPRISE](state, payload){
        state.userEnterprise         = payload.dataList
    },
    [mutation.SET_TOTAL_ACCOUNT_USER](state, payload){
        state.totalAccountD = payload
    },
    [mutation.SET_LIST_PAYROLLS](state, payload){
        state.listMasterPayroll = payload
    },
    [mutation.SET_ROLE_MENUS](state, payload){
        state.listRoleMenus = payload
    },
    [mutation.SET_REGENCIES](state, payload){
        state.listRegencies = payload
    },
    [mutation.SET_HOLDING_TYPE](state, payload){
        state.listHoldingType = payload
    },
    [mutation.SET_COUNTRIES](state, payload){
        state.listCountries = payload
    },
    [mutation.SET_TAX_REGULATION](state, payload){
        state.taxRegulations = payload
    },
};