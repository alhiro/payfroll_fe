import * as action from '../../action-types'
import * as mutation from '../../mutation-types'
import localAxios from '../../../services/http/client'
import swal from 'sweetalert2'
import * as typeS from '../../../services/path_service'
import router from '../../../router'

export default {
    async [action.LIST_MENU]({ commit, dispatch }, payload) {
            try {
                let token = localStorage.getItem('token')
                let { data } = await localAxios.get(
                    'uma/menus?page='+payload.page+'&size=10&param='+payload.search+
                    "&isActive="+payload.filter+"&sort="+payload.order+"&sortBy="+payload.sortBy, {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                let objList = {
                    dataList: data.data.data,
                    total: data.data.total,
                    nextC: data.data.next_page_url,
                    prevC: data.data.prev_page_url,
                    firstP: 'uma/menus?page=1&size=10',
                    fromPA: data.data.from
                }
                commit(mutation.SET_MENU_LIST, objList)
            } catch (err) {
                dispatch(action.DATA_ERROR, err)
            }
    },
    async [action.CREATE_MENU]({ commit, dispatch }, payload) {
        try {
            let icon 
            if(payload.menuIcon.value != undefined) {
                icon = payload.menuIcon.value
            } else {
                icon = payload.menuIcon
            }
            let token = localStorage.getItem('token');
            const jsonData = JSON.stringify({
                menuLink: payload.menuLink,
                menuHintEn: payload.menuHintEn,
                menuHintId: payload.menuHintId,
                menuLabelEn: payload.menuLabelEn,
                menuLabelId: payload.menuLabelId,
                menuIcon: icon,
                menuParentId: payload.menuParentId,
                menuType: payload.menuType
            });

            let { data } = await localAxios.post('uma/menus',
                jsonData,
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
            commit(mutation.BUTTON_STATUS, false)
            dispatch(action.LIST_MENU, payload)
            swal(
                'Succes!',
                'New Menu Created',
                'success'
                )
            router.replace({ path: '/menu-management' })
        } catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message, '', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.DETAIL_MENU]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token');
            let { data } = await localAxios.get('/uma/menus/' + payload,
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                })

            commit(mutation.SET_MENU_DETAIL, {
                data: data.data,

            })
            router.replace({ path: '/menu-management/' + payload })
            return data

        }
        catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.UPDATE_MENU]({ commit, dispatch }, payload) {
        try {
            let icon 
            if(payload.menuIcon.value != undefined) {
                icon = payload.menuIcon.value
            } else {
                icon = payload.menuIcon
            }
            let token = localStorage.getItem('token');
            const jsonData = JSON.stringify({
                menuLink: payload.menuLink,
                menuHintEn: payload.menuHintEn,
                menuHintId: payload.menuHintId,
                menuLabelEn: payload.menuLabelEn,
                menuLabelId: payload.menuLabelId,
                menuIcon: icon,
                menuParentId: payload.menuParentId,
                menuType: payload.menuType
            });

            let { data } = await localAxios.put('uma/menus/' + payload.menuId,
                jsonData,
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
            commit(mutation.BUTTON_STATUS, false)
            dispatch(action.LIST_MENU)
            swal(
                'Succes!',
                'Menu Succesfully Updated',
                'success'
                )
            router.replace({ path: '/menu-management' })
        } catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message, '', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.DELETE_MENU]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token');
            let { data } = await localAxios.delete('uma/menus', {
                headers: {
                    Authorization: "Bearer " + token,
                  },
                  data: {
                      id: payload
                  }
            })
            await dispatch(action.LIST_MENU, {page: 1})
            swal(
                'Succes!',
                'Menu Succesfuly Deleted',
                'success'
                )
            commit(mutation.BUTTON_STATUS, false)
            router.replace({ path: '/menu-management' })
        } catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message, '', 'error')
            dispatch(action.DATA_ERROR, err)

        }
    },
    async [action.ACTIVATE_MENU]({ commit, dispatch }, payload) {
        let pathService = payload.active ? "uma/menus/"+payload.menu_id+"/set-inactive" : "uma/menus/"+payload.menu_id+"/set-active" 
        try {
            let token = localStorage.getItem('token');
            await localAxios.patch(pathService, {},{
                headers: {Authorization: "Bearer " + token}
            })
            const payload = {
                page: 1,
                search: "",
                filter: "",
                order: "asc",
                sortBy: "id"
            };
            await dispatch(action.LIST_MENU, payload);
            if(payload.active) {
                swal(
                    'Succes!',
                    'Menu Succesfuly Inactivated',
                    'success'
                    )
            } else {
                swal(
                    'Succes!',
                    'Menu Succesfuly activated',
                    'success'
                 )
            }
            commit(mutation.BUTTON_STATUS, false)
            router.replace({ path: '/menu-management' })
        } catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message, '', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.MENU_PARENT]({commit, dispatch}) {
        try{
            let token = localStorage.getItem('token')
            let {data} = await localAxios.get('uma/menus/list-top-level', {
                headers: {'Authorization': 'Bearer '+token}
            })
            
            let objList = {
                dataList : data.data,
            }
            // console.log(objList, 'this is select')
            commit(mutation.SET_MENU_PARENT, objList )
        
        }catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    }
};