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
    async [action.LIST_HOLIDAY]({ commit, dispatch }, payload) {
            try {
                let token = localStorage.getItem('token')
                let { data } = await localAxios.get('ose/holiday?page='+payload.page+'&size=10', {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                let objList = {
                    dataList: data.data.data,
                    total: data.data.total,
                    nextC: data.data.next_page_url,
                    prevC: data.data.prev_page_url,
                    firstP: 'ose/holiday?page=1&size=10',
                    fromPA: data.data.from
                }
                commit(mutation.SET_HOLIDAY_LIST, objList)
            } catch (err) {
                dispatch(action.DATA_ERROR, err)
            }
    },
    async [action.CREATE_HOLIDAY]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token');
            const jsonData = JSON.stringify({
                ovtTypeId: payload.ovtTypeId,
                description: payload.description,
                date: payload.date,
 
            });

            let { data } = await localAxios.post('ose/holiday',
                jsonData,
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
            commit(mutation.BUTTON_STATUS, false)
            dispatch(action.LIST_HOLIDAY, payload)
            swal(
                'Succes!',
                'New Holiday Created',
                'success'
                )
            router.replace({ path: '/list-holiday' })
        } catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message, '', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.DETAIL_HOLIDAY]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token');
            let { data } = await localAxios.get('ose/holidayovttype/by_holiday?holiday_id=' + payload,
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                })

            commit(mutation.SET_HOLIDAY_DETAIL, {
                data: data.data,

            })
            router.replace({ path: '/list-holiday/' + payload })
            return data

        }
        catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.UPDATE_HOLIDAY]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token');
            const jsonData = JSON.stringify({
                ovtTypeId: payload.ovtTypeId,
                description: payload.description,
                date: payload.date,
            });

            let { data } = await localAxios.put('ose/holiday/' + payload.id,
                jsonData,
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
            commit(mutation.BUTTON_STATUS, false)
            dispatch(action.LIST_HOLIDAY)
            swal(
                'Succes!',
                'Holiday Succesfully Updated',
                'success'
                )
            router.replace({ path: '/list-holiday' })
        } catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message, '', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.DELETE_HOLIDAY]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token');
            let { data } = await localAxios.delete('ose/holidayovttype', {
                headers: {
                    Authorization: "Bearer " + token,
                  },
                  data: {
                      id: payload
                  }
            })
            await dispatch(action.LIST_HOLIDAY, {page: 1})
            swal(
                'Succes!',
                'Holiday Succesfuly Deleted',
                'success'
                )
            commit(mutation.BUTTON_STATUS, false)
            router.replace({ path: '/list-holiday' })
        } catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message, '', 'error')
            dispatch(action.DATA_ERROR, err)

        }
    },

};