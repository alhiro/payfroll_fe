import * as action from '../../action-types'
import * as mutation from '../../mutation-types'
import localAxios from '../../../services/http/client'
import swal from 'sweetalert2'
import * as typeS from '../../../services/path_service'
import router from '../../../router'

export default {
    async [action.SELECT_OVT]({ commit, dispatch }) {
        try {
          let token = localStorage.getItem("token");
          let { data } = await localAxios.get("ose/ovttype/list", {
            headers: { Authorization: "Bearer " + token },
          });
          let objList = {
            dataList: data.data,
          };
          commit(mutation.SET_DROPDOWN_OVT, objList);
        } catch (err) {
          dispatch(action.DATA_ERROR, err);
        }
      },
    async [action.LIST_MASTERTAX]({ commit, dispatch }, payload) {
            try {
                let token = localStorage.getItem('token')
                let { data } = await localAxios.get('gco/taxtype?page='+payload.page+'&size=10', {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                let objList = {
                    dataList: data.data.data,
                    total: data.data.total,
                    nextC: data.data.next_page_url,
                    prevC: data.data.prev_page_url,
                    firstP: 'gco/taxtype?page=1&size=10',
                    fromPA: data.data.from
                }
                commit(mutation.SET_MASTERTAX_LIST, objList)
            } catch (err) {
                dispatch(action.DATA_ERROR, err)
            }
    },
    async [action.CREATE_MASTERTAX]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token');
            const jsonData = JSON.stringify({
                taxCode: payload.taxCode,
                taxGroup: payload.taxGroup,
                taxType: payload.taxType,
                taxDesc: payload.taxDesc
 
            });

            let { data } = await localAxios.post('gco/taxtype',
                jsonData,
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
            commit(mutation.BUTTON_STATUS, false)
            dispatch(action.LIST_MASTERTAX, payload)
            swal(
                'Succes!',
                'New Master Tax Type Created',
                'success'
                )
            router.replace({ path: '/list-mastertaxtype' })
        } catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message, '', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.DETAIL_MASTERTAX]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token');
            let { data } = await localAxios.get('gco/taxtype/' + payload,
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                })

            commit(mutation.SET_MASTERTAX_DETAIL, {
                data: data.data,

            })
            router.replace({ path: '/list-mastertaxtype/' + payload })
            return data

        }
        catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.UPDATE_MASTERTAX]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token');
            const jsonData = JSON.stringify({
                taxCode: payload.taxCode,
                taxGroup: payload.taxGroup,
                taxType: payload.taxType,
                taxDesc: payload.taxDesc
            });

            let { data } = await localAxios.put('gco/taxtype/' + payload.id,
                jsonData,
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
            commit(mutation.BUTTON_STATUS, false)
            dispatch(action.LIST_MASTERTAX)
            swal(
                'Succes!',
                'Master Tax Type Succesfully Updated',
                'success'
                )
            router.replace({ path: '/list-mastertaxtype' })
        } catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message, '', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.DELETE_MASTERTAX]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token');
            let { data } = await localAxios.delete('gco/taxtype', {
                headers: {
                    Authorization: "Bearer " + token,
                  },
                  data: {
                      id: payload
                  }
            })
            await dispatch(action.LIST_MASTERTAX, {page: 1})
            swal(
                'Succes!',
                'Master Tax Type Succesfuly Deleted',
                'success'
                )
            commit(mutation.BUTTON_STATUS, false)
            router.replace({ path: '/list-mastertaxtype' })
        } catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message, '', 'error')
            dispatch(action.DATA_ERROR, err)

        }
    },

};