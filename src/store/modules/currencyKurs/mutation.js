import * as mutation from '../../mutation-types'

export default {
    /**
     * for list corporate need to next click and other
     * */
    [mutation.SET_CURRENCY_KURS_LIST](state, payload){
        state.listMenu               = payload.dataList
        state.totalMenu              = payload.total
        state.paginate.nextClick    = payload.nextC
        state.paginate.prevClick    = payload.prevC
        state.paginate.firstPage    = payload.firstP
        state.paginate.fromP        = payload.fromPA
    },
    [mutation.SET_CURRENCY_KURS_DETAIL](state, payload) {
        state.detailMenu = payload
    },
    // [mutation.SET_DROPDOWN_LEVEL](state, payload){
    //     state.dropDown  = payload.dataList
    // },

};