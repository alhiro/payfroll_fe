import mutations from './mutation'
import getters from './getters'
import actions from './action'

// import enterprise from "../../../router/enterprise";

const state = {
    listMenu: null,
    detailMenu: null,
    paginate : {
        nextClick   : null,
        prevClick   : null,
        firstPage   : null,
        fromP       : null
    },
    totalMenu          : null,
    dropdown           : null,
};


export default {
    state,
    mutations,
    actions,
    getters
}