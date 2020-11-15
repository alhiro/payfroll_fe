import * as action from '../../action-types'
import * as mutation from '../../mutation-types'
import localAxios from '../../../services/http/client'
import * as urls from '../../../services/path_service'

export default {
  async [action.COUNTRY_LIST]({commit, dispatch}) {
    try{
      let token = localStorage.getItem('token')
      let {data} = await localAxios.get(urls.country, {
        headers: {'Authorization': `Bearer ${token}`}
      })
      
      let objList = {
        country : data.data,
      }
      commit(mutation.SET_COUNTRY, objList )
    }catch (err) {
      dispatch(action.DATA_ERROR, err)
    }
  },
} 
