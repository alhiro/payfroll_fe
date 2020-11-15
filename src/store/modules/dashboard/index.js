import mutations from './mutation'
import getters from './getters'
import actions from './action'


const state = {
    dashData: null,
    grafikDash: null,
    pieDash: null,
    active: null,
    all: null,
    inactive: null
};



export default {
    state,
    mutations,
    actions,
    getters
}