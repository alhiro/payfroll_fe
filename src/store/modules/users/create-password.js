import localAxios from '../../../services/http/client'
import router from '../../../router'
import Swal from 'sweetalert2'
import * as action from '../../action-types'
import * as mutation from '../../mutation-types'
import * as getter from '../../getters-types'
import * as typeS from '../../../services/path_service'

const state = {
  token: null,
  statusEmail: null
};

const getters = {
  [getter.GET_STATUS_EMAIL](state) {
    return state.statusEmail
  }
};

const actions = {
  async [action.SEND_EMAIL]({ commit, dispatch }, payload) {
    try {
      let { data } = await localAxios.post(typeS.forgot_password, JSON.stringify({
        emailOrUsername: payload.email
      }));
      commit(mutation.SET_STATUS_EMAIL, data.status)
      commit(mutation.BUTTON_STATUS, false)
    }
    catch (err) {
      commit(mutation.BUTTON_STATUS, false)
      dispatch(action.DATA_ERROR, err)
    }
  },
  async [action.CHANGE_PASSWORD]({ commit, dispatch }, payload) {
    try {
      const formData = JSON.stringify({
        newPassword: payload.password,
        token: payload.token
      });
      await localAxios.post(typeS.reset_password, formData)
      dispatch(action.DATA_ERROR, null)
      Swal({
        title: "Sukses",
        text: "Password baru sukses dibuat",
        type: "success",
        allowOutsideClick: false,
        heightAuto: false,
      }).then(function() {
        router.replace('/login')
      })
    }
    catch (err) {
      dispatch(action.DATA_ERROR, err)
      Swal({
        title: "Error",
        text: err.response.data.message,
        type: "error",
        allowOutsideClick: false,
        heightAuto: false,
      })
    }
  },
  async [action.CREATE_PASSWORD]({ commit, dispatch }, payload) {
    try {
      const formData = JSON.stringify({
          password: payload.password,
      });
      await localAxios.post(typeS.create_password,
      formData, {
        headers: {
          'token': payload.token
        }
      })
      dispatch(action.DATA_ERROR, null)
      Swal({
        title: "Sukses",
        text: "Password sukses dibuat",
        type: "success",
        allowOutsideClick: false,
        heightAuto: false,
      }).then(function() {
        router.replace('/login')
      })
    }
    catch (err) {
      dispatch(action.DATA_ERROR, err)
      Swal({
        title: "Error",
        text: err.response.data.message,
        type: "error",
        allowOutsideClick: false,
        heightAuto: false,
      })
    }
  },
  async [action.CHECK_TOKEN]({ commit, dispatch }, token) {
    try {
      await localAxios.post(typeS.check_token, {}, {
        headers: {
          'token': token
        }
      })
    } catch (err) {
      dispatch(action.DATA_ERROR, err)
    }
  },
};

const mutations = {
  [mutation.SET_STATUS_EMAIL](state, payload) {
    state.statusEmail = payload
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}