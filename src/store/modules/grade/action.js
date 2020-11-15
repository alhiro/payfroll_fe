import * as action from "../../action-types";
import * as mutation from "../../mutation-types";
import localAxios from "../../../services/http/client";
import swal from "sweetalert2";
import * as typeS from "../../../services/path_service";
import router from "../../../router";

export default {
  // async [action.SELECT_GRADE]({ commit, dispatch }) {
  //   try {
  //     let token = localStorage.getItem("token");
  //     let { data } = await localAxios.get("cma/entities?page=1&size=10", {
  //       headers: { Authorization: "Bearer " + token },
  //     });
  //     let objList = {
  //       dataList: data.data.data,
  //     };
  //     commit(mutation.SET_DROPDOWN_GRADE, objList);
  //   } catch (err) {
  //     dispatch(action.DATA_ERROR, err);
  //   }
  // },
  // async [action.ACTIVATE_GRADE]({ commit, dispatch }, payload) {
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
  // async [action.SUSPEND_GRADE]({ commit, dispatch }, payload) {
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

  async [action.LIST_GRADE]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get(
        "ose/grade?page=" + payload.page + "&size=10",
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
        firstP: "ose/grade?page=1&size=10",
        fromPA: data.data.from,
      };
      commit(mutation.SET_GRADE_LIST, objList);
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.CREATE_GRADE]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      const jsonData = JSON.stringify({
        comId: payload.comId,
        graName: payload.graName,
        graOrder: payload.graOrder,
        graCode: payload.graCode
       
      });
      let { data } = await localAxios.post("ose/grade", jsonData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      commit(mutation.BUTTON_STATUS, false);
      dispatch(action.LIST_GRADE, { page: 1 });
      swal("Succes!", "New Grade Created", "success");
      router.replace({
        path: "/list-grade",
      });
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
  // async [action.CHECK_GRADE]({ commit, dispatch }, payload) {
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
  async [action.DETAIL_GRADE]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get("/ose/grade/" + payload, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      commit(mutation.SET_GRADE_DETAIL, {
        data: data.data,
      });
      router.replace({
        path: "/edit-grade/" + payload,
      });
      return data;
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.GRADE_DETAIL]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get("/ose/grade/" + payload, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      commit(mutation.SET_GRADE_DETAIL, {
        data: data.data,
      });
      router.replace({
        path: "/detail-grade/" + payload,
      });
      return data;
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.UPDATE_GRADE]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      const jsonData = JSON.stringify({
        comId: payload.comId,
        graName: payload.graName,
        graOrder: payload.graOrder,
        graCode: payload.graCode
      });

      let { data } = await localAxios.put(
        "ose/grade/" + payload.id,
        jsonData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      commit(mutation.BUTTON_STATUS, false);
      dispatch(action.LIST_GRADE);
      swal("Succes!", "Grade Succesfully Updated", "success");
      router.replace({
        path: "/list-grade",
      });
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.DELETE_GRADE]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      const Body = JSON.stringify({
        id: payload,
      });
      let { data } = await localAxios.delete("ose/grade", {
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          id: payload,
        },
      });
      await dispatch(action.LIST_GRADE, {
        page: 1,
      });
      swal("Succes!", "Grade Succesfuly Deleted", "success");
      commit(mutation.BUTTON_STATUS, false);
      router.replace({
        path: "/list-grade",
      });
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
};
