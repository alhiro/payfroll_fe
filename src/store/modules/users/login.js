import localAxios from '../../../services/http/client'
// import googleAxios from '../../../services/google/firebase'
// import logins from '../../../assets/data/login_status'
import router from '../../../router'
import * as action from '../../action-types'
import * as mutation from '../../mutation-types'
import { setLStorage } from '../../../utils/manageLocalStorage'
import * as typeS from '../../../services/path_service'

const state = {
    idToken: null,
};

const getters = {

};

const actions = {
    // [action.SET_LOGOUT_TIMER]({ commit }, expirationTime) {
    //     setTimeout(() => {
    //         commit('setLogout');
    //         router.replace('login')
    //     }, expirationTime)
    // },
    async [action.LOGIN]({ commit, dispatch }, authData) {
        try {
            const jsonData = JSON.stringify({
                username: authData.username,
                password: authData.password,
            });
            let { data } = await localAxios.post(typeS.login, jsonData);
            if (data.code === '200') {
                let token = data.data.access_token;
                commit(mutation.AUTH_USER, {
                    token
                });
                await localAxios.get(typeS.role_access, {
                    headers: { 'Authorization': 'Bearer ' + token }
                }).then(res=> {
                    if(res.status == 200) {
                        const now = new Date();
                        const expirationDate = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000);
                        localStorage.setItem('expirationDate', expirationDate)
                        localStorage.setItem('email', authData.email);
                        localStorage.setItem('token', token)
                        //localStorage.setItem('rules', JSON.stringify(role.data.data.data));
                        localStorage.setItem('rules_master', res.data.data.masterPayrollAccess);
                        commit('setLogin', data.status);
                        commit(mutation.BUTTON_STATUS, false)
                        if(res.data.data.masterPayrollAccess) {
                            router.replace('master-payroll');
                        } else {
                            router.replace('dashboard'); 
                        }
                    }
                })
                // let userProfile = await localAxios.get(typeS.user_profile, {
                //     headers: { 'Authorization': 'Bearer ' + token }
                // })
            }else{
                commit(mutation.BUTTON_STATUS, false)
                dispatch(action.DATA_ERROR, data)
            }
        } catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            dispatch(action.DATA_ERROR, err)
        }
    },
    [action.AUTO_LOGIN]({ commit }) {
        const token = localStorage.getItem('token');
        const rules_master = localStorage.getItem('rules_master');
        const master_payroll = localStorage.getItem('master_payroll');

        let tokenCon = token != null
        if (!token) {
            return
        }
        const expirationDate = localStorage.getItem('expirationDate');
        const now = new Date();
        if (now >= expirationDate) {
            return
        }
        let firstPath = router.currentRoute.path;
        let fPath = firstPath.split("/")[1];
        if (fPath === 'activation-email') {
            return
        }
        if (fPath === 'reset-password') {
            return
        }
        if (fPath === 'create-password') {
            return
        }
        commit(mutation.AUTH_USER, { token: token });
        commit('setLogin', tokenCon);

         // Must set payroal first if have access master payroll
        if(rules_master === true && master_payroll === null) {
            router.replace('master-payroll');
        }
    },
    async [action.LOGOUT]({ commit, dispatch }) {
        try {
            const token = localStorage.getItem('token');
            const AuthStr = 'Bearer ';
            let logoutUser = await localAxios.post(typeS.logout,'', {
                headers: { 'Authorization': 'Bearer ' + token }
            })
            commit(mutation.CLEAR_AUTH_DATA);
            localStorage.clear();
        } catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    }
};

const mutations = {
    [mutation.AUTH_USER](state, userData) {
        state.idToken = userData.token
    },
    [mutation.CLEAR_AUTH_DATA](state) {
        state.idToken = null
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}