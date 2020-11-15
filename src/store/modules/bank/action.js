import * as action from "../../action-types";
import * as mutation from "../../mutation-types";
import localAxios from "../../../services/http/client";
import swal from "sweetalert2";
import * as typeS from "../../../services/path_service";
import router from "../../../router";

export default {
  // async [action.SELECT_BANK]({ commit, dispatch }) {
  //   try {
  //     let token = localStorage.getItem("token");
  //     let { data } = await localAxios.get("cma/entities?page=1&size=10", {
  //       headers: { Authorization: "Bearer " + token },
  //     });
  //     let objList = {
  //       dataList: data.data.data,
  //     };
  //     commit(mutation.SET_DROPDOWN_BANK, objList);
  //   } catch (err) {
  //     dispatch(action.DATA_ERROR, err);
  //   }
  // },
  // async [action.ACTIVATE_BANK]({ commit, dispatch }, payload) {
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
  // async [action.SUSPEND_BANK]({ commit, dispatch }, payload) {
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

  async [action.LIST_BANK]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get(
        "ose/bank?page=" + payload.page + "&size=10",
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
        firstP: "ose/bank?page=1&size=10",
        fromPA: data.data.from,
      };
      commit(mutation.SET_BANK_LIST, objList);
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.CREATE_BANK]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      const jsonData = JSON.stringify({
        address: payload.address,
        branch: payload.branch,
        name: payload.name,
        code: payload.code,
        city: payload.city,
        codeloc1: payload.codeloc1,
        codeloc2: payload.codeloc2,
        comId: payload.comId,
        swiftCode: payload.swiftCode
       
      });
      let { data } = await localAxios.post("ose/bank", jsonData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      commit(mutation.BUTTON_STATUS, false);
      dispatch(action.LIST_BANK, { page: 1 });
      swal("Succes!", "New Bank Created", "success");
      router.replace({
        path: "/list-bank",
      });
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
  // async [action.CHECK_BANK]({ commit, dispatch }, payload) {
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
  async [action.DETAIL_BANK]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get("/ose/bank/" + payload, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      commit(mutation.SET_BANK_DETAIL, {
        data: data.data,
      });
      router.replace({
        path: "/edit-bank/" + payload,
      });
      return data;
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.BANK_DETAIL]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get("/ose/bank/" + payload, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      commit(mutation.SET_BANK_DETAIL, {
        data: data.data,
      });
      router.replace({
        path: "/detail-bank/" + payload,
      });
      return data;
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.UPDATE_BANK]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      const jsonData = JSON.stringify({
        address: payload.address,
        branch: payload.branch,
        name: payload.name,
        code: payload.code,
        city: payload.city,
        codeloc1: payload.codeloc1,
        codeloc2: payload.codeloc2,
        comId: payload.comId,
        swiftCode: payload.swiftCode
      });

      let { data } = await localAxios.put(
        "ose/bank/" + payload.id,
        jsonData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      commit(mutation.BUTTON_STATUS, false);
      dispatch(action.LIST_BANK);
      swal("Succes!", "Bank Succesfully Updated", "success");
      router.replace({
        path: "/list-bank",
      });
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.DELETE_BANK]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      const Body = JSON.stringify({
        id: payload,
      });
      let { data } = await localAxios.delete("ose/bank", {
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          id: payload,
        },
      });
      await dispatch(action.LIST_BANK, {
        page: 1,
      });
      swal("Succes!", "Bank Succesfuly Deleted", "success");
      commit(mutation.BUTTON_STATUS, false);
      router.replace({
        path: "/list-bank",
      });
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
};
