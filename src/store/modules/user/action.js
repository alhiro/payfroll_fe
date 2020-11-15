import * as action from '../../action-types'
import * as mutation from '../../mutation-types'
import localAxios from '../../../services/http/client'
import swal from 'sweetalert2'
import * as typeS from '../../../services/path_service'
import router from '../../../router'


export default {
    async [action.DATA_ID_USER]({commit, dispatch}, payload) {
        try {
            let token = localStorage.getItem('token');
            let { data } = await localAxios.get( '/user/'+payload,
                { headers: {'Authorization': 'Bearer '+token }
                })

            commit(mutation.SET_USER_DETAIL, {
                forUser : data.data,
                
            })
            router.replace({ path: '/detail-user/'+payload})
            return data.data
        }
        catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.EDIT_USER]({commit, dispatch}, payload) {
        try {
            let token = localStorage.getItem('token');
            let { data } = await localAxios.get( 'uma/user/'+payload,
                { headers: {'Authorization': 'Bearer '+token }
                })

            commit(mutation.SET_USER_DETAIL, {
                forUser : data.data,
                
            })
            router.replace({ path: '/edit-user/'+payload})
            return data.data
        }
        catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.EDIT_USER_ENTERPRISE]({commit, dispatch}, payload) {
        try {
            let token = localStorage.getItem('token');
            let { data } = await localAxios.get( '/user/'+payload,
                { headers: {'Authorization': 'Bearer '+token }
                })

            commit(mutation.SET_USER_DETAIL, {
                forUser : data.data,
                
            })
            router.replace({ path: '/edit-user-enterprise/'+payload})
            return data.data
        }
        catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.DROPDOWN_USER]({commit, dispatch}, payload) {
        try{
            let token = localStorage.getItem('token')
            let {data} = await localAxios.get('/user/?dropdown=1&limit=100'+(payload ? '&q='+payload : ''), {
                headers: {'Authorization': 'Bearer '+token}
            })
            let objList = {
                dataList : data.data.data,
            }
            commit(mutation.SET_LOADING, false);
            commit(mutation.SET_DROPDOWN_USER, objList )
        }catch (err) {
            commit(mutation.SET_LOADING, false);
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.USER_ROLES]({commit, dispatch}) {
        try{
            let token = localStorage.getItem('token')
            let {data} = await localAxios.get('/uma/roles?page=1&size=99&sort=asc&sortBy=id', {
                headers: {'Authorization': 'Bearer '+token}
            })
            
            let objList = {
                dataList : data.data.data,
            }
            // console.log(objList, 'this is select')
            commit(mutation.SET_USER_ROLES, objList )
        
        }catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.NEW_USER_ROLES]({commit, dispatch}) {
        let token = localStorage.getItem('token')
        await localAxios.get('/uma/roles/list-kp', {
            headers: {'Authorization': 'Bearer '+token}
        }).then(res=> {
            let objList = {
                dataList : res.data.data,
            }
            commit(mutation.SET_USER_ROLES, objList )
        }).catch(err=> {
            dispatch(action.DATA_ERROR, err)
        })
    },
    async [action.GET_COUNTRY]({commit, dispatch}) {
        let token = localStorage.getItem('token')
        await localAxios.get(typeS.country, {
            headers: {'Authorization': 'Bearer '+token}
        }).then(res=> {
            commit(mutation.SET_COUNTRIES, res.data.data )
        }).catch(err=> {
            dispatch(action.DATA_ERROR, err)
        })
    },
    async [action.CREATE_DATA_USER]({commit, dispatch}, payloads) {
        try{
            let token = localStorage.getItem('token');
            const formData = new FormData()
            let { data } = await localAxios.post('/uma/user/register' ,
            {   roleId: payloads.roleId,
                countryId: parseInt(payloads.countryId),
                email: payloads.email,
                username: payloads.username,
                mobile: payloads.mobile,
                // password: payloads.password,
                employeeNo: payloads.employeeNo,
                fullname: payloads.fullname
            },
                { headers: {'Authorization': 'Bearer '+token}
                })
                commit(mutation.BUTTON_STATUS, false)
                router.replace({ path: '/list-user'})
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
    async [action.LIST_DATA_USER]({commit, dispatch}, payload) {
        try{
            let token = localStorage.getItem('token');
            let {data} = await localAxios.get('uma/user?page='+payload.page+'&size=10&isActive='+(payload.status != '99' ? payload.status : ''), {
                headers: {'Authorization': 'Bearer '+token}
            })
            // console.log(data.data.data, 'this is data')
            let objList = {
                dataList    : data.data.data,
                total       : data.data.total,
                nextC       : data.data.nextPageUrl,
                prevC       : data.data.prevPageUrl,
                firstP      : 'uma/user?page=1&size=10&isActive='+payload.status,
                fromPA      : data.data.from
            };
            commit(mutation.BUTTON_STATUS, false);
            commit(mutation.SET_LIST_USER, objList )
            }catch (err) {
                commit(mutation.BUTTON_STATUS, false);
                dispatch(action.DATA_ERROR, err)
            }
    },
    async [action.UPDATE_DATA_USER]({commit, dispatch}, payloads) {
        try{
            let token = localStorage.getItem('token');
            let { data } = await localAxios.put('uma/user/'+payloads.id,
            {   roleId: payloads.roleId,
                countryId: parseInt(payloads.countryId),
                email: payloads.email,
                username: payloads.username,
                mobile: payloads.mobile,
                employeeNo: payloads.employeeNo
            },
                { headers: {'Authorization': 'Bearer '+token}
                })
                commit(mutation.BUTTON_STATUS, false)
                router.replace({ path: '/list-user'})
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
    async [action.DROPDOWN_D_AVAILABLE]({commit, dispatch}, payload) {
        try{
            let token = localStorage.getItem('token')
            let {data} = await localAxios.get(`/user/available-for-order?dropdown=1&identerprise=${payload}`, {
                headers: {'Authorization': 'Bearer '+token}
            })
            let objList = {
                dataList : data.data,
            }
            commit(mutation.SET_USER_D_AVAILABLE, objList )
        }catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.LIST_USER_ENTERPRISE]({commit, dispatch}, payload) {
        try{
            let token = localStorage.getItem('token')
            let {data} = await localAxios.get('/user/?user_type=1&page='+payload.page+'&identerprise='+payload.identerprise+'&q='+payload.q+'&status='+payload.status, {
                headers: {'Authorization': 'Bearer '+token}
            })

            let objList = {
                dataList    : data.data.data,
                total       : data.data.total,
                nextC       : data.data.next_page_url,
                prevC       : data.data.prev_page_url,
                firstP      : data.data.first_page_url,
                fromPA      : data.data.from,
    
            };
            commit(mutation.BUTTON_STATUS, false);
            commit(mutation.SET_LIST_USER, objList )
        
        }catch (err) {
            commit(mutation.BUTTON_STATUS, false);
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.LIST_USER_ASSIGNEE]({commit, dispatch}, payload) {
        try{
            let token = localStorage.getItem('token')
            let {data} = await localAxios.get('/user/?user_type=2&page='+payload.page, {
                headers: {'Authorization': 'Bearer '+token}
            })

            let objList = {
                dataList    : data.data.data,
                total       : data.data.total,
                nextC       : data.data.next_page_url,
                prevC       : data.data.prev_page_url,
                firstP      : data.data.first_page_url,
                fromPA      : data.data.from,
    
            }
            
            commit(mutation.SET_LIST_USER, objList )
        
        }catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    },
    // async [action.ASSIGN_USER]({commit, dispatch}, payload) {
    //     try{
    //         let token = localStorage.getItem('token');
    //         const jsonData = JSON.stringify({
    //             identerprise        : payload.identerprise,
    //             userid              : payload.userid,
               
    //         });

    //         let { data } = await localAxios.put('/user/assign-to-enterprise',
    //             jsonData,
    //             { headers: {'Authorization': 'Bearer '+token }
    //             })
    //             commit(mutation.BUTTON_STATUS, false)
    //             dispatch(action.LIST_USER_ENTERPRISE,{page: payload.page, identerprise: payload.identerprise})
    //             router.replace('/list-user-enterprise/'+payload.identerprise)
    //     }catch(err){
    //         commit(mutation.BUTTON_STATUS, false)
    //         swal("You need at least 1 user to assign")
    //         dispatch(action.DATA_ERROR, err)
    //     }
    // },
    async [action.SUSPEND_USER]({commit, dispatch}, payload) {
        try{
            let token = localStorage.getItem('token');
            const jsonData = JSON.stringify({
                reason_suspend           : payload.reason_suspend,
            });

            let { data } = await localAxios.put( '/user/suspend/'+ payload.users_id,
                jsonData,
                { headers: {'Authorization': 'Bearer '+token }
                });
                commit(mutation.SET_BUTTON_SUSPEND, false);
                commit(mutation.BUTTON_STATUS, false)
                if(payload.forenterprise){ 
                    dispatch(action.LIST_USER_ENTERPRISE, {
                    page    : 1,
                    q: '',
                    identerprise: payload.identerprise,
                    status  : 1});
                }else{
                    dispatch(action.LIST_DATA_USER, {
                        page    : 1,
                        q       : '',
                        status  : 1});
                }
            dispatch(action.TOTAL_ACCOUNT_USER);
            dispatch(action.GRAFIK_DASHBOARD);
                // router.replace({ path: '/user'})
        }catch(err){
            commit(mutation.BUTTON_STATUS, false);
            commit(mutation.SET_BUTTON_SUSPEND, false);
            swal(err.response.data.message,'', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.ACTIVATE_USER]({commit, dispatch}, payload) {
        try{
            let token = localStorage.getItem('token');
            const jsonData = JSON.stringify({
                reason_suspend           : null,
            });
            let { data } = await localAxios.put('/user/activate/'+payload.users_id,
            jsonData,
                { headers: {'Authorization': 'Bearer '+token }
                });
                if(payload.forenterprise){ 
                    dispatch(action.LIST_USER_ENTERPRISE, {
                    page    : 1,
                    q: '',
                    identerprise: payload.identerprise,
                    status  : 3});
                }else{
                    dispatch(action.LIST_DATA_USER, {
                        page    : 1,
                        q       : '',
                        status  : 3});
                        router.replace({ path: '/user'})
                }
            commit(mutation.SET_BUTTON_ACTIVE, false);
            dispatch(action.TOTAL_ACCOUNT_USER);
            dispatch(action.GRAFIK_DASHBOARD);
        }catch(err){
            commit(mutation.SET_BUTTON_ACTIVE, false);
            commit(mutation.BUTTON_STATUS, false);
            swal(err.response.data.message,'', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.DELETE_USER]({commit, dispatch}, payload) {
        try {
            let token = localStorage.getItem('token');
            let { data } = await localAxios.delete('uma/user/delete',{
                headers: {
                    Authorization: "Bearer " + token,
                  },
                  data: {
                      id: payload.id
                  }
                });
            await dispatch(action.LIST_DATA_USER, {page: payload.page, status: payload.status})
            router.replace({ path: '/list-user'})
            swal(
                'Succes!',
                'User Succesfully Deleted',
                'success'
                )
            commit(mutation.BUTTON_STATUS, false);
            commit(mutation.SET_BUTTON_DELETE, false);
        }catch (err) {
            commit(mutation.SET_BUTTON_DELETE, false);
            commit(mutation.BUTTON_STATUS, false);
            swal(err.response.data.message,'', 'error')
            dispatch(action.DATA_ERROR, err)

        }
    },
    async [action.RESEND_PIN]({commit, dispatch}, payload) {
        try {
            let token = localStorage.getItem('token');
            let { data } = await localAxios.post(payload.pin_type,
                { id_user : payload.id },{
                headers: {
                    'Authorization'     : 'Bearer '+token
                }
            });
            commit(mutation.SET_RESEND_PIN_BUTTON, false);
            commit(mutation.BUTTON_STATUS, false);
            swal('success to resend pin','', 'success')
        }catch (err) {
            commit(mutation.SET_RESEND_PIN_BUTTON, false);
            commit(mutation.BUTTON_STATUS, false);
            swal(err.response.data.message,'', 'error');
            dispatch(action.DATA_ERROR, err)

        }
    },
    async [action.TOTAL_ACCOUNT_USER]({commit, dispatch}, payload) {
        try{
            let token = localStorage.getItem('token');
            let { data } = await localAxios.get('user/total-account',
                {
                    headers: {'Authorization': 'Bearer '+token}
                });
            commit(mutation.BUTTON_STATUS, false);
            commit(mutation.SET_TOTAL_ACCOUNT_USER, data.data)

        }catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.LIST_MASTER_PAYROLL]({commit, dispatch}, payload) {
        try{
            let token = localStorage.getItem('token');
            let response  = await localAxios.get(typeS.get_payrolls+"?page="+payload.page+"&size="+payload.size+"&sort="+payload.sort,
                {
                    headers: {'Authorization': 'Bearer '+token}
                });
            commit(mutation.BUTTON_STATUS, false);
            commit(mutation.SET_LIST_PAYROLLS, response.data.data.data)
        }catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            dispatch(action.DATA_ERROR, err)
            //dispatch(action.LOGOUT)
            swal(err.response.data.error_description,'', 'error')
            commit(mutation.CLEAR_AUTH_DATA);
            localStorage.clear();
            router.replace({ path: '/login'})
        }
    },
    async [action.SET_PAYROLL]({ }, payload) {
        localStorage.setItem('master_payroll', JSON.stringify(payload))
    },
    async [action.FETCH_MENU]({ commit, dispatch }) {
        try{
            let token = localStorage.getItem('token');
            let response  = await localAxios.get(typeS.user_menus,
                {
                    headers: {'Authorization': 'Bearer '+token}
                });
            commit(mutation.BUTTON_STATUS, false);
            commit(mutation.SET_ROLE_MENUS, response.data.data)
            localStorage.setItem('menu_roles', JSON.stringify(response.data.data))
        } catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.error_description,'', 'error')
            if(err.response.status == 401) {
                commit(mutation.CLEAR_AUTH_DATA);
                localStorage.clear();
                router.replace({ path: '/login'})
            }
        }
    },
    async [action.LIST_TAX_ROLE]({ commit, dispatch }) {
        let token = localStorage.getItem('token');
        await localAxios.get(typeS.master_tax,{
            headers: {'Authorization': 'Bearer '+token}
        }).then(res=> {
            commit(mutation.SET_TAX_REGULATION, res.data.data);
        }).catch(err=> {
            console.log(err)
        });
    },
    async [action.POST_TAX_SETTING]({ commit, dispatch }, payload) {
        let token = localStorage.getItem('token');
        return await localAxios.post(typeS.master_tax, payload, {
            headers: {'Authorization': 'Bearer '+token}
        });
    },
    
};