import * as action from '../../action-types'
import * as mutation from '../../mutation-types'
import localAxios from '../../../services/http/client'
import swal from 'sweetalert2'
import router from '../../../router'

export default {
  async [action.LIST_HOLDING]({commit, dispatch}, payload) {
    try{
      let token = localStorage.getItem('token')
      let {data} = await localAxios.get(
        `cma/holdings?page=${payload.page}&size=10&sort=${payload.sort}&sortBy=${payload.sortBy}&param=${payload.param}&isActive=${(payload.status != '99' ? payload.status : '')}`, 
      {
        headers: {'Authorization': 'Bearer '+token}
      })
      
      let objList = {
        dataList    : data.data.data,
        total       : data.data.total,
        nextC       : data.data.nextPageUrl,
        prevC       : data.data.prevPageUrl,
        firstP      : `cma/holdings?page=${payload.page}&size=10&sort=${payload.sort}&sortBy=${payload.sortBy}&param=${payload.param}&isActive=${payload.status}`,
        fromPA      : data.data.from
      } 
      commit(mutation.BUTTON_STATUS, false)
      commit(mutation.SET_LIST_HOLDING, objList)
    }catch (err) {
      commit(mutation.BUTTON_STATUS, false)
      dispatch(action.DATA_ERROR, err)
    }
  },
  async [action.ACTIVATE_HOLDING]({commit, dispatch}, payload) {
    try {
      let token = localStorage.getItem('token')

      await localAxios.put(`cma/holdings/update_isActive/${payload.id}`,
        {}, { headers: {'Authorization': `Bearer ${token}`}
      })
      await dispatch(action.LIST_HOLDING, {
        page: payload.page,
        sort: payload.sort,
        sortBy: payload.sortBy,
        param: payload.param,
        status: payload.status
      })
      router.replace({ path: '/list-holding'})
      swal(
          'Succes!',
          `User Succesfully ${activateText}`,
          'success'
          )
      commit(mutation.BUTTON_STATUS, false)
    }catch (err) {
      commit(mutation.BUTTON_STATUS, false)
      swal(err.response.data.message,'', 'error')
      dispatch(action.DATA_ERROR, err)
    }
  }
}
