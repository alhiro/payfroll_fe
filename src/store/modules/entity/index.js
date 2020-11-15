import mutations from './mutation'
import getters from './getters'
import actions from './action'

// import enterprise from "../../../router/enterprise";

const state = {
    listEntity: null,
    detailEntity: null,
    paginate : {
        nextClick   : null,
        prevClick   : null,
        firstPage   : null,
        fromP       : null
    },
    totalEntity          : null,
    dropdown           : null
};


export default {
    state,
    mutations,
    actions,
    getters
}