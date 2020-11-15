import * as mutation from '../../mutation-types'

export default {
    /**
     * for list corporate need to next click and other
     * */
    [mutation.SET_GRADE_LIST](state, payload){
        state.listMenu               = payload.dataList
        state.totalMenu              = payload.total
        state.paginate.nextClick    = payload.nextC
        state.paginate.prevClick    = payload.prevC
        state.paginate.firstPage    = payload.firstP
        state.paginate.fromP        = payload.fromPA
    },
    [mutation.SET_GRADE_DETAIL](state, payload) {
        state.detailMenu = payload.data
    },
    // [mutation.SET_DROPDOWN_GRADE](state, payload){
    //     state.dropDown  = payload.dataList
    // },

};