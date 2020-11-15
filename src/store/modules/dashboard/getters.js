import * as getter from '../../getters-types'
export default {
    [getter.GET_DASHBOARD](state) {
        return state.dashData
    },
    [getter.GET_DASHBOARD_GRAFIK](state){
        return state.grafikDash
    },
    [getter.GET_DASHBOARD_PIE](state){
        return state.pieDash
    },
    [getter.GET_ACTIVE](state){
        return state.active
    },
    [getter.GET_INACTIVE](state){
        return state.inactive
    },
    [getter.GET_ALL_USER](state){
        return state.all
    }
};