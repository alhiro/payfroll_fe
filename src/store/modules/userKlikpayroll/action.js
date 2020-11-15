import * as action from '../../action-types'
import * as mutation from '../../mutation-types'
import localAxios from '../../../services/http/client'
import swal from 'sweetalert2'
import router from '../../../router'

export default {
  async [action.LIST_DATA_USER_KLIKPAYROLL]({commit, dispatch}, payload) {
    try{
      let token = localStorage.getItem('token')
      let {data} = await localAxios.get(
        `uma/user/klikpayroll?page=${payload.page}&size=10&sort=${payload.sort}&sortBy=${payload.sortBy}&param=${payload.param}&isActive=${(payload.status != '99' ? payload.status : '')}`, 
      {
        headers: {'Authorization': 'Bearer '+token}
      })
      
      let objList = {
        dataList    : data.data,
        total       : data.total,
        nextC       : data.nextPageUrl,
        prevC       : data.prevPageUrl,
        firstP      : `uma/user/klikpayroll?page=${payload.page}&size=10&sort=${payload.sort}&sortBy=${payload.sortBy}&param=${payload.param}&isActive=${payload.status}`,
        fromPA      : data.from
      } 
      commit(mutation.BUTTON_STATUS, false)
      commit(mutation.SET_LIST_USER_KLIKPAYROLL, objList)
    }catch (err) {
      commit(mutation.BUTTON_STATUS, false)
      dispatch(action.DATA_ERROR, err)
    }
  },
  async [action.CREATE_DATA_USER_KLIKPAYROLL]({commit, dispatch}, payloads) {
    try{
      let token = localStorage.getItem('token')
      let masterPayroll = JSON.parse(localStorage.getItem('master_payroll'))
      
      await localAxios.post('/uma/user/register',
      {   
        roleId: payloads.roleId,
        countryId: 1,
        email: payloads.email,
        username: payloads.username,
        mobile: payloads.mobile,
        employeeNo: payloads.employeeNo,
        companyId: masterPayroll.companyId
      },
        { headers: {'Authorization': `Bearer ${token}`}
      })

      commit(mutation.BUTTON_STATUS, false)
      router.replace({ path: '/list-user-klikpayroll'})
      swal(
          'Succes!',
          'New User Succesfully Created',
          'success'
          )
    }catch(err){
      commit(mutation.BUTTON_STATUS, false)
      swal(err.response.data.message,'', 'error')
      dispatch(action.DATA_ERROR, err)
    }
  },
  async [action.EDIT_USER_KLIKPAYROLL]({commit, dispatch}, payload) {
    try {
      let token = localStorage.getItem('token')
      let { data } = await localAxios.get(`uma/user/${payload}`,
        { headers: {'Authorization': 'Bearer '+token }
      })

      commit(mutation.SET_USER_DETAIL, {
        forUser : data.data,
      })
      router.replace({ path: `/edit-user-klikpayroll/${payload}`})
      return data.data
    }
    catch (err) {
      dispatch(action.DATA_ERROR, err)
    }
},
  async [action.UPDATE_DATA_USER_KLIKPAYROLL]({commit, dispatch}, payloads) {
    try{
      let token = localStorage.getItem('token')
      await localAxios.put(`uma/user/${payloads.id}`,
      {   
        roleId: payloads.roleId,
        countryId: parseInt(payloads.countryId),
        email: payloads.email,
        username: payloads.username,
        mobile: payloads.mobile,
        employeeNo: payloads.employeeNo
      },
      { headers: {'Authorization': `Bearer ${token}`}
      })
      commit(mutation.BUTTON_STATUS, false)
      router.replace({ path: '/list-user-klikpayroll'})
      swal(
          'Succes!',
          'User Succesfully Updated',
          'success'
          )
    }catch(err){
      commit(mutation.BUTTON_STATUS, false)
      swal(err.response.data.message,'', 'error')
      dispatch(action.DATA_ERROR, err)
    }
  },
  async [action.DELETE_USER_KLIKPAYROLL]({commit, dispatch}, payload) {
    try {
      let token = localStorage.getItem('token') 
      await localAxios.delete('uma/user/delete',{
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          id: payload.id
        }
      }) 
      await dispatch(action.LIST_DATA_USER_KLIKPAYROLL, {
        page: payload.page,
        sort: payload.sort,
        sortBy: payload.sortBy,
        param: payload.param,
        status: payload.status
      })
      router.replace({ path: '/list-user-klikpayroll'})
      swal(
          'Succes!',
          'User Succesfully Deleted',
          'success'
          )
      commit(mutation.BUTTON_STATUS, false) 
      commit(mutation.SET_BUTTON_DELETE, false)
    }catch (err) {
      commit(mutation.SET_BUTTON_DELETE, false)
      commit(mutation.BUTTON_STATUS, false)
      swal(err.response.data.message,'', 'error')
      dispatch(action.DATA_ERROR, err)
    }
  },
  async [action.ACTIVATE_USER_KLIKPAYROLL]({commit, dispatch}, payload) {
    try {
      let token = localStorage.getItem('token')
      let activateText = payload.active === 0 ? 'Deactivated' : 'Activated'
      let urlActivate = payload.active === 0 ? 'set-inactive' : 'set-active'

      await localAxios.patch(`uma/user/${payload.id}/${urlActivate}`,
        {}, { headers: {'Authorization': `Bearer ${token}`}
      })
      await dispatch(action.LIST_DATA_USER_KLIKPAYROLL, {
        page: payload.page,
        sort: payload.sort,
        sortBy: payload.sortBy,
        param: payload.param,
        status: payload.status
      })
      router.replace({ path: '/list-user-klikpayroll'})
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
  },
  async [action.USER_ROLES_KLIKPAYROLL]({commit, dispatch}) {
    try{
      let token = localStorage.getItem('token')
      let {data} = await localAxios.get('/uma/roles/list-kp', {
        headers: {'Authorization': `Bearer ${token}`}
      })
      
      let objList = {
        dataList : data.data,
      }
      commit(mutation.SET_USER_ROLES_KLIKPAYROLL, objList )
    }catch (err) {
        dispatch(action.DATA_ERROR, err)
    }
  },
} 
