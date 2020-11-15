import * as action from '../../action-types'
import * as mutation from '../../mutation-types'
import localAxios from '../../../services/http/client'
import swal from 'sweetalert2'

export default {
  async [action.CURRENCY_DATA_LIST]({commit, dispatch}, payload) {
    try{
      let token = localStorage.getItem('token')
      let {data} = await localAxios.get(
        `gco/currency?page=${payload.page}&size=${payload.size}&sort=${payload.sort}&sortBy=${payload.sortBy}&param=${payload.param}`, 
      {
        headers: {'Authorization': 'Bearer '+token}
      })
      
      let objList = {
        dataList    : data.data.data,
        total       : data.data.total,
        nextC       : data.data.nextPageUrl,
        prevC       : data.data.prevPageUrl,
        firstP      : `gco/currency?page=${payload.page}&size=${payload.size}&sort=${payload.sort}&sortBy=${payload.sortBy}&param=${payload.param}`,
        fromPA      : data.data.from
      }
      commit(mutation.SET_CURRENCY_LIST, objList)
    }catch (err) {
      commit(mutation.BUTTON_STATUS, false)
      dispatch(action.DATA_ERROR, err)
    }
  },
  async [action.CREATE_CURRENCY]({commit, dispatch}, payload) {
    try{
      let token = localStorage.getItem('token')
      await localAxios.post(`gco/currency`,
      {   
        curCode: payload.dataForCreate.curCode,
        curDesc: payload.dataForCreate.curDesc,
      },
      { headers: {'Authorization': `Bearer ${token}`}
      })
      commit(mutation.BUTTON_STATUS, false)
      await dispatch(action.CURRENCY_DATA_LIST, {
        page: payload.page,
        sort: payload.sort,
        sortBy: payload.sortBy,
        param: payload.param,
        size: payload.size
      })
      swal(
          'Berhasil',
          'Currency berhasil dibuat',
          'success'
          )
    }catch(err){
      swal(err.response.data.message,'', 'error')
      dispatch(action.DATA_ERROR, err)
    }
  },
  async [action.UPDATE_CURRENCY]({commit, dispatch}, payload) {
    try{
      let token = localStorage.getItem('token')
      await localAxios.put(`gco/currency/${payload.dataForUpdate.id}`,
      {   
        curCode: payload.dataForUpdate.curCode,
        curDesc: payload.dataForUpdate.curDesc,
      },
      { headers: {'Authorization': `Bearer ${token}`}
      })
      swal(
          'Berhasil',
          'Currency berhasil diupdate',
          'success'
          )
    }catch(err){
      swal(err.response.data.message,'', 'error')
      dispatch(action.DATA_ERROR, err)
    }

    await dispatch(action.CURRENCY_DATA_LIST, {
      page: payload.page,
      sort: payload.sort,
      sortBy: payload.sortBy,
      param: payload.param,
      size: payload.size
    })
  },
  async [action.DELETE_CURRENCY]({commit, dispatch}, payload) {
    try {
      let token = localStorage.getItem('token') 
      await localAxios.delete('gco/currency',{
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          id: payload.id
        }
      }) 
      await dispatch(action.CURRENCY_DATA_LIST, {
        page: payload.page,
        sort: payload.sort,
        sortBy: payload.sortBy,
        param: payload.param,
        size: payload.size
      })
      swal(
          'Berhasil',
          'Currency berhasil dihapus',
          'success'
          )
    }catch (err) {
      swal(err.response.data.message,'', 'error')
      dispatch(action.DATA_ERROR, err)
    }
  },
} 
