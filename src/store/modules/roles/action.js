import * as action from "../../action-types";
import * as mutation from "../../mutation-types";
import localAxios from "../../../services/http/client";
import swal from "sweetalert2";
import * as typeS from "../../../services/path_service";
import router from "../../../router";

export default {
  async [action.DATA_ID_USER]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get("/user/" + payload, {
        headers: { Authorization: "Bearer " + token },
      });

      commit(mutation.SET_ROLES_DETAIL, {
        forUser: data.data,
      });
      router.replace({ path: "/detail-user/" + payload });
      return data.data;
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.EDIT_ROLES_MENUS]({ commit, dispatch }, payload) {
    let token = localStorage.getItem("token");
    return await localAxios.get("uma/roles/" + payload.id, {
        headers: { Authorization: "Bearer " + token },
    });
  },
  async [action.EDIT_ROLES]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get("uma/roles/" + payload, {
        headers: { Authorization: "Bearer " + token },
      });

      commit(mutation.SET_ROLES_DETAIL, {
        forUser: data.data,
      });
      router.replace({ path: "/edit-roles/" + payload });
      return data.data;
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.EDIT_USER_ENTERPRISE]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get("/user/" + payload, {
        headers: { Authorization: "Bearer " + token },
      });

      commit(mutation.SET_USER_DETAIL, {
        forUser: data.data,
      });
      router.replace({ path: "/edit-user-enterprise/" + payload });
      return data.data;
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.DROPDOWN_USER]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get(
        "/user/?dropdown=1&limit=100" + (payload ? "&q=" + payload : ""),
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      let objList = {
        dataList: data.data.data,
      };
      commit(mutation.SET_LOADING, false);
      commit(mutation.SET_DROPDOWN_USER, objList);
    } catch (err) {
      commit(mutation.SET_LOADING, false);
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.LIST_DATA_ROLES]({ commit, dispatch }) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get(
        "/uma/roles?page=1&size=99&sort=asc&sortBy=id",
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      let objList = {
        dataList: data.data.data,
      };
      // console.log(objList, 'this is select')
      commit(mutation.SET_USER_ROLES, objList);
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.CREATE_DATA_ROLES]({ commit, dispatch }, payloads) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.post(
        "/uma/roles",
        {
          // holdingId       : payloads.holdingId,
          // holdingName     : payloads.holdingName,
          // comId           : payloads.comId,
          // comName         : payloads.comName,
          roleDesc: payloads.roleDesc,
          roleTitle: payloads.roleTitle,
          roleAccess: payloads.roleAccess,
          roleType: payloads.roleType,
        },
        { headers: { Authorization: "Bearer " + token } }
      );
      commit(mutation.BUTTON_STATUS, false);
      router.replace({ path: "/role-management" });
      swal("Succes!", "New Role Succesfully Created", "success");
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.LIST_ROLES]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get(
        "uma/roles?page=" + payload.page + "&size="+payload.size+
        "&sort="+payload.order+"&sortBy="+payload.sortBy+"&param="+payload.search,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      let objList = {
        dataList: data.data.data,
        total: data.data.total,
        nextC: data.data.nextPageUrl,
        prevC: data.data.prevPageUrl,
        firstP: "uma/roles?page=1&size=10&sort=asc&sortBy=id&param",
        fromPA: data.data.from,
      };
      commit(mutation.BUTTON_STATUS, false);
      commit(mutation.SET_LIST_ROLES, objList);
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.UPDATE_DATA_ROLES]({ commit, dispatch }, payloads) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.put(
        "uma/roles/" + payloads.idRoles,
        {
          // holdingId       : payloads.holdingId,
          // holdingName     : payloads.holdingName,
          // comId           : payloads.comId,
          // comName         : payloads.comName,
          roleDesc: payloads.roleDesc,
          roleTitle: payloads.roleTitle,
          roleAccess: payloads.roleAccess,
          roleType: payloads.roleType,
        },
        { headers: { Authorization: "Bearer " + token } }
      );
      commit(mutation.BUTTON_STATUS, false);
      swal("Succes!", "Role Succesfully Updated", "success");
      router.replace({ path: "/role-management" });
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.DROPDOWN_D_AVAILABLE]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get(
        `/user/available-for-order?dropdown=1&identerprise=${payload}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      let objList = {
        dataList: data.data,
      };
      commit(mutation.SET_USER_D_AVAILABLE, objList);
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.LIST_USER_ENTERPRISE]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get(
        "/user/?user_type=1&page=" +
          payload.page +
          "&identerprise=" +
          payload.identerprise +
          "&q=" +
          payload.q +
          "&status=" +
          payload.status,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      let objList = {
        dataList: data.data.data,
        total: data.data.total,
        nextC: data.data.next_page_url,
        prevC: data.data.prev_page_url,
        firstP: data.data.first_page_url,
        fromPA: data.data.from,
      };
      commit(mutation.BUTTON_STATUS, false);
      commit(mutation.SET_LIST_USER, objList);
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.LIST_USER_ASSIGNEE]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get(
        "/user/?user_type=2&page=" + payload.page,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      let objList = {
        dataList: data.data.data,
        total: data.data.total,
        nextC: data.data.next_page_url,
        prevC: data.data.prev_page_url,
        firstP: data.data.first_page_url,
        fromPA: data.data.from,
      };

      commit(mutation.SET_LIST_USER, objList);
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.ASSIGN_USER]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      const jsonData = JSON.stringify({
        userId: payload.userId,
      });

      let { data } = await localAxios.post(
        "cma/companies/"+payload.companyId+"/assign",
        jsonData,
        { headers: { Authorization: "Bearer " + token } }
      );
      commit(mutation.BUTTON_STATUS, false);
      dispatch(action.LIST_DATA_USER, {
        page: 1,
        status: 1,
    });
    router.replace( {path: '/detail-company/' + payload.companyId + '/list-user'})
    swal("Succes!", "User Assgined", "success");
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.UNASSIGN_USER]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      const jsonData = JSON.stringify({
        userId: payload.userId,
      });

      let { data } = await localAxios.post(
        "cma/companies/"+payload.companyId+"/unassign",
        jsonData,
        { headers: { Authorization: "Bearer " + token } }
      );
      commit(mutation.BUTTON_STATUS, false);
      dispatch(action.LIST_DATA_USER, {
        page: 1,
        status: 1,
    });
    router.replace( {path: '/detail-company/' + payload.companyId})
    swal("Succes!", "User Unassgined", "success");
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.SUSPEND_USER]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      const jsonData = JSON.stringify({
        reason_suspend: payload.reason_suspend,
      });

      let { data } = await localAxios.put(
        "/user/suspend/" + payload.users_id,
        jsonData,
        { headers: { Authorization: "Bearer " + token } }
      );
      commit(mutation.SET_BUTTON_SUSPEND, false);
      commit(mutation.BUTTON_STATUS, false);
      if (payload.forenterprise) {
        dispatch(action.LIST_USER_ENTERPRISE, {
          page: 1,
          q: "",
          identerprise: payload.identerprise,
          status: 1,
        });
      } else {
        dispatch(action.LIST_DATA_USER, {
          page: 1,
          q: "",
          status: 1,
        });
      }
      dispatch(action.TOTAL_ACCOUNT_USER);
      dispatch(action.GRAFIK_DASHBOARD);
      // router.replace({ path: '/user'})
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      commit(mutation.SET_BUTTON_SUSPEND, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.ACTIVATE_USER]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      const jsonData = JSON.stringify({
        reason_suspend: null,
      });
      let { data } = await localAxios.put(
        "/user/activate/" + payload.users_id,
        jsonData,
        { headers: { Authorization: "Bearer " + token } }
      );
      if (payload.forenterprise) {
        dispatch(action.LIST_USER_ENTERPRISE, {
          page: 1,
          q: "",
          identerprise: payload.identerprise,
          status: 3,
        });
      } else {
        dispatch(action.LIST_DATA_USER, {
          page: 1,
          q: "",
          status: 3,
        });
        router.replace({ path: "/user" });
      }
      commit(mutation.SET_BUTTON_ACTIVE, false);
      dispatch(action.TOTAL_ACCOUNT_USER);
      dispatch(action.GRAFIK_DASHBOARD);
    } catch (err) {
      commit(mutation.SET_BUTTON_ACTIVE, false);
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.DELETE_ROLES]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.delete("uma/roles", {
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
            id: payload.id
        }
      });
      const perPayload =  {
        page: 1,
        search: "",
        filter: "",
        order: "asc",
        sortBy: "id",
        size: 10
      };
      dispatch(action.LIST_ROLES, perPayload);
      router.push({name : "List Roles"});
      commit(mutation.BUTTON_STATUS, false);
      commit(mutation.SET_BUTTON_DELETE, false);
      swal("Succes!", "Role Succesfully Deleted", "success");
    } catch (err) {
      commit(mutation.SET_BUTTON_DELETE, false);
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.RESEND_PIN]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.post(
        payload.pin_type,
        { id_user: payload.id },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      commit(mutation.SET_RESEND_PIN_BUTTON, false);
      commit(mutation.BUTTON_STATUS, false);
      swal("success to resend pin", "", "success");
    } catch (err) {
      commit(mutation.SET_RESEND_PIN_BUTTON, false);
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.TOTAL_ACCOUNT_USER]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get("user/total-account", {
        headers: { Authorization: "Bearer " + token },
      });
      commit(mutation.BUTTON_STATUS, false);
      commit(mutation.SET_TOTAL_ACCOUNT_USER, data.data);
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.LIST_MENU_TOP_LEVEL]({ commit }) {
    try {
      let token = localStorage.getItem("token");
      await localAxios.get(typeS.menu_top, {
        headers: { Authorization: "Bearer " + token },
      }).then(res=> {
        if(res.status == 200) {
          commit(mutation.SET_ALL_LIST_ROLE, res.data.data);
        }
      });
      commit(mutation.BUTTON_STATUS, false);
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.FETCH_SELECTED_ROLE]({ commit }, payload) {
    try {
      let token = localStorage.getItem("token");
      return await localAxios.get(typeS.menu_list+'/'+payload.id, {
        headers: { Authorization: "Bearer " + token },
      });
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.POST_ROLE_MENU]({ dispatch, commit }, payload) {
    try {
      let token = localStorage.getItem("token");
      return await localAxios.post(typeS.post_menu, payload, {
        headers: { Authorization: "Bearer " + token },
      });
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      dispatch(action.DATA_ERROR, err);
    }
  }
};
