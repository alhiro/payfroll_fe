import * as action from "../../action-types";
import * as mutation from "../../mutation-types";
import localAxios from "../../../services/http/client";
import swal from "sweetalert2";
import * as typeS from "../../../services/path_service";
import router from "../../../router";

export default {
  // async [action.SELECT_LEVEL]({ commit, dispatch }) {
  //   try {
  //     let token = localStorage.getItem("token");
  //     let { data } = await localAxios.get("ose/levels?page=1&size=99", {
  //       headers: { Authorization: "Bearer " + token },
  //     });
  //     let objList = {
  //       dataList: data.data.data,
  //     };
  //     commit(mutation.SET_DROPDOWN_LEVEL, objList);
  //   } catch (err) {
  //     dispatch(action.DATA_ERROR, err);
  //   }
  // },

  async [action.LIST_CURRENCY_RATE]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get(
        `ose/rate?page=${payload.page}&size=10`,
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
        firstP: "ose/company/1/settings?page=1&size=10",
        fromPA: data.data.from,
      };
      commit(mutation.SET_CURRENCY_RATE_LIST, objList);
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.CREATE_CURRENCY_RATE]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let compId = localStorage.getItem('compId')
      const jsonData = JSON.stringify({
        comId: compId,
        curId: payload.curId,
        ratAmt: payload.ratAmt,
        ratMonth: payload.ratMonth,
        ratWeek: payload.ratWeek,
        ratYear: payload.ratYear,
        start: payload.startDate
      });
      await localAxios.post(`ose/rate`, jsonData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      commit(mutation.BUTTON_STATUS, false);
      dispatch(action.LIST_CURRENCY_RATE, { page: 1 });
      swal("Succes!", "New Currency Rate Created", "success");
      router.replace({
        path: "/list-currency-rate",
      });
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
  // async [action.DETAIL_LEVEL]({ commit, dispatch }, payload) {
  //   try {
  //     let token = localStorage.getItem("token");
  //     let { data } = await localAxios.get("/ose/levels/" + payload, {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //       },
  //     });
  //     commit(mutation.SET_LEVEL_DETAIL, {
  //       data: data.data,
  //     });
  //     router.replace({
  //       path: "/edit-company-setting/" + payload,
  //     });
  //     return data;
  //   } catch (err) {
  //     dispatch(action.DATA_ERROR, err);
  //   }
  // },
  // async [action.LEVEL_DETAIL]({ commit, dispatch }, payload) {
  //   try {
  //     let token = localStorage.getItem("token");
  //     let { data } = await localAxios.get("/ose/levels/" + payload, {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //       },
  //     });
  //     commit(mutation.SET_LEVEL_DETAIL, {
  //       data: data.data,
  //     });
  //     router.replace({
  //       path: "/detail-level/" + payload,
  //     });
  //     return data;
  //   } catch (err) {
  //     dispatch(action.DATA_ERROR, err);
  //   }
  // },
  async [action.UPDATE_CURRENCY_RATE]({ commit, dispatch }, payload) {
    try {
      let compId = localStorage.getItem('compId')
      let token = localStorage.getItem("token");
      const jsonData = JSON.stringify({
        comId: compId,
        curId: payload.curId,
        ratAmt: payload.ratAmt,
        ratMonth: payload.ratMonth,
        ratWeek: payload.ratWeek,
        ratYear: payload.ratYear,
        start: payload.startDate
      });

      await localAxios.put(
        `ose/rate`,
        jsonData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      commit(mutation.BUTTON_STATUS, false);
      dispatch(action.LIST_CURRENCY_RATE);
      swal("Succes!", "Currency Rate Succesfully Updated", "success");
      router.replace({
        path: "/list-currency-rate",
      });
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.DELETE_CURRENCY_RATE]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      await localAxios.delete(`ose/rate`, {
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          id: payload.id,
        },
      });
      await dispatch(action.LIST_CURRENCY_RATE, {
        page: 1,
      });
      swal("Succes!", "Currency Rate Succesfuly Deleted", "success");
      commit(mutation.BUTTON_STATUS, false);
      router.replace({
        path: "/list-currency-rate",
      });
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
};
