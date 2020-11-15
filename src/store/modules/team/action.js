import * as action from "../../action-types";
import * as mutation from "../../mutation-types";
import localAxios from "../../../services/http/client";
import swal from "sweetalert2";
import * as typeS from "../../../services/path_service";
import router from "../../../router";

export default {
  // async [action.SELECT_TEAM]({ commit, dispatch }) {
  //   try {
  //     let token = localStorage.getItem("token");
  //     let { data } = await localAxios.get("cma/entities?page=1&size=10", {
  //       headers: { Authorization: "Bearer " + token },
  //     });
  //     let objList = {
  //       dataList: data.data.data,
  //     };
  //     commit(mutation.SET_DROPDOWN_TEAM, objList);
  //   } catch (err) {
  //     dispatch(action.DATA_ERROR, err);
  //   }
  // },
  // async [action.ACTIVATE_TEAM]({ commit, dispatch }, payload) {
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
  // async [action.SUSPEND_TEAM]({ commit, dispatch }, payload) {
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

  async [action.LIST_TEAM]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get(
        "ose/teams?page=" + payload.page + "&size=10",
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
        firstP: "ose/teams?page=1&size=10",
        fromPA: data.data.from,
      };
      commit(mutation.SET_TEAM_LIST, objList);
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.CREATE_TEAM]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      const jsonData = JSON.stringify({
        comId: payload.comId,
        temName: payload.temName,
        temSaturday: payload.saturday,
        temSunday: payload.sunday
       
      });
      let { data } = await localAxios.post("ose/teams", jsonData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      commit(mutation.BUTTON_STATUS, false);
      dispatch(action.LIST_TEAM, { page: 1 });
      swal("Succes!", "New Team Created", "success");
      router.replace({
        path: "/list-team",
      });
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
  // async [action.CHECK_TEAM]({ commit, dispatch }, payload) {
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
  async [action.DETAIL_TEAM]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get("/ose/teams/" + payload, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      commit(mutation.SET_TEAM_DETAIL, {
        data: data.data,
      });
      router.replace({
        path: "/edit-team/" + payload,
      });
      return data;
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.TEAM_DETAIL]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get("/ose/teams/" + payload, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      commit(mutation.SET_TEAM_DETAIL, {
        data: data.data,
      });
      router.replace({
        path: "/detail-team/" + payload,
      });
      return data;
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.UPDATE_TEAM]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      const jsonData = JSON.stringify({
        comId: payload.comId,
        temName: payload.temName,
        temSaturday: payload.saturday,
        temSunday: payload.sunday
      });

      let { data } = await localAxios.put(
        "ose/teams/" + payload.id,
        jsonData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      commit(mutation.BUTTON_STATUS, false);
      dispatch(action.LIST_TEAM);
      swal("Succes!", "Team Succesfully Updated", "success");
      router.replace({
        path: "/list-team",
      });
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.DELETE_TEAM]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      const Body = JSON.stringify({
        id: payload,
      });
      let { data } = await localAxios.delete("ose/teams", {
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          id: payload,
        },
      });
      await dispatch(action.LIST_TEAM, {
        page: 1,
      });
      swal("Succes!", "Team Succesfuly Deleted", "success");
      commit(mutation.BUTTON_STATUS, false);
      router.replace({
        path: "/list-team",
      });
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
};
