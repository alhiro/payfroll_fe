import * as action from "../../action-types";
import * as mutation from "../../mutation-types";
import localAxios from "../../../services/http/client";
import swal from "sweetalert2";
import * as typeS from "../../../services/path_service";
import router from "../../../router";

export default {
  async [action.SELECT_LEVEL]({ commit, dispatch }) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get("ose/levels?page=1&size=99", {
        headers: { Authorization: "Bearer " + token },
      });
      let objList = {
        dataList: data.data.data,
      };
      commit(mutation.SET_DROPDOWN_LEVEL, objList);
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  // async [action.ACTIVATE_LEVEL]({ commit, dispatch }, payload) {
  //   try {
  //     const jsonData = JSON.stringify({
  //       id: payload,
  //     });
  //     let token = localStorage.getItem("token");
  //     let { data } = await localAxios.put("cma/entities/unsuspend", jsonData, {
  //       headers: { Authorization: "Bearer " + token },
  //     });
  //     dispatch(action.ENTITY_DETAIL, payload);
  //   } catch (err) {
  //     dispatch(action.DATA_ERROR, err);
  //   }
  // },
  // async [action.SUSPEND_LEVEL]({ commit, dispatch }, payload) {
  //   try {
  //     const jsonData = JSON.stringify({
  //       id: payload,
  //     });
  //     let token = localStorage.getItem("token");
  //     let { data } = await localAxios.put("cma/entities/suspend", jsonData, {
  //       headers: { Authorization: "Bearer " + token },
  //     });
  //     dispatch(action.ENTITY_DETAIL, payload);
  //   } catch (err) {
  //     dispatch(action.DATA_ERROR, err);
  //   }
  // },

  async [action.LIST_LEVEL]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get(
        "ose/levels?page=" + payload.page + "&size=10",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      let objList = {
        dataList: data.data.data,
        total: data.data.total,
        nextC: data.data.next_page_url,
        prevC: data.data.prev_page_url,
        firstP: "ose/levels?page=1&size=10",
        fromPA: data.data.from,
      };
      commit(mutation.SET_LEVEL_LIST, objList);
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.CREATE_LEVEL]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      const jsonData = JSON.stringify({
        comId: payload.comId,
        levName: payload.levName,
        levOrder: payload.levOrder,
        levCode: payload.levCode
       
      });
      let { data } = await localAxios.post("ose/levels", jsonData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      commit(mutation.BUTTON_STATUS, false);
      dispatch(action.LIST_LEVEL, { page: 1 });
      swal("Succes!", "New Level Created", "success");
      router.replace({
        path: "/list-level",
      });
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
  // async [action.CHECK_LEVEL]({ commit, dispatch }, payload) {
  //   try {
  //     let token = localStorage.getItem("token");
  //     const jsonData = JSON.stringify({
  //       holdingName: payload.holdingName,
  //       holdingNpwp: payload.holdingNpwp,
  //     });

  //     let { data } = await localAxios.post(
  //       "cma/entities/check_availability",
  //       jsonData,
  //       {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       }
  //     );
  //     dispatch(action.DATA_ERROR, data);
  //     commit(mutation.BUTTON_STATUS, false);
  //   } catch (err) {
  //     commit(mutation.BUTTON_STATUS, false);
  //     swal(err.response.data.message, "", "error");
  //     dispatch(action.DATA_ERROR, err.response.data);
  //   }
  // },
  async [action.DETAIL_LEVEL]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get("/ose/levels/" + payload, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      commit(mutation.SET_LEVEL_DETAIL, {
        data: data.data,
      });
      router.replace({
        path: "/edit-level/" + payload,
      });
      return data;
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.LEVEL_DETAIL]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get("/ose/levels/" + payload, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      commit(mutation.SET_LEVEL_DETAIL, {
        data: data.data,
      });
      router.replace({
        path: "/detail-level/" + payload,
      });
      return data;
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.UPDATE_LEVEL]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      const jsonData = JSON.stringify({
        comId: payload.comId,
        levName: payload.levName,
        levOrder: payload.levOrder,
        levCode: payload.levCode
      });

      let { data } = await localAxios.put(
        "ose/levels/" + payload.id,
        jsonData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      commit(mutation.BUTTON_STATUS, false);
      dispatch(action.LIST_LEVEL);
      swal("Succes!", "Level Succesfully Updated", "success");
      router.replace({
        path: "/list-level",
      });
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.DELETE_LEVEL]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      const Body = JSON.stringify({
        id: payload,
      });
      let { data } = await localAxios.delete("ose/levels", {
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          id: payload,
        },
      });
      await dispatch(action.LIST_LEVEL, {
        page: 1,
      });
      swal("Succes!", "Level Succesfuly Deleted", "success");
      commit(mutation.BUTTON_STATUS, false);
      router.replace({
        path: "/list-level",
      });
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
};
