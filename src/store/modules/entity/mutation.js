import * as mutation from '../../mutation-types'

export default {
    /**
     * for list corporate need to next click and other
     * */
    [mutation.SET_ENTITY_LIST](state, payload){
        state.listEntity               = payload.dataList
        state.totalEntity              = payload.total
        state.paginate.nextClick    = payload.nextC
        state.paginate.prevClick    = payload.prevC
        state.paginate.firstPage    = payload.firstP
        state.paginate.fromP        = payload.fromPA
    },
    [mutation.SET_ENTITY_DETAIL](state, payload) {
        state.detailEntity = payload.data
    },
    [mutation.SET_DROPDOWN_ENTITY](state, payload){
        state.dropDown  = payload.dataList
    },

};