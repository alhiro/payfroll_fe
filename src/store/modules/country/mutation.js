import * as mutation from '../../mutation-types'

export default {
  [mutation.SET_COUNTRY](state, payload){
    state.country  = payload.country
  },
} 
