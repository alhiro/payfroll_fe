import * as action from "../../action-types";
import * as mutation from "../../mutation-types";
import localAxios from "../../../services/http/client";
import swal from "sweetalert2";
import * as typeS from "../../../services/path_service";
import router from "../../../router";

export default {
  async [action.LIST_CURRENCY_KURS]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get(
        `ose/rate-items?page=${payload.page}&size=10`,
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
        firstP: "ose/rate-items?page=1&size=10",
        fromPA: data.data.from,
      };
      commit(mutation.SET_CURRENCY_KURS_LIST, objList);
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.CREATE_CURRENCY_KURS]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      const jsonData = JSON.stringify({
        payrollItemId: payload.payrollItemId,
        currencyId: payload.currencyId,
        currencyCode: payload.currencyCode,
        amount: payload.amount
      });
      await localAxios.post(`ose/rate-items`, jsonData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      commit(mutation.BUTTON_STATUS, false);
      dispatch(action.LIST_CURRENCY_KURS, { page: 1 });
      swal("Succes!", "New Currency Kurs Created", "success");
      router.replace({
        path: "/list-currency-kurs",
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
  async [action.UPDATE_CURRENCY_KURS]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      const jsonData = JSON.stringify({
        payrollItemId: payload.payrollItemId,
        currencyId: payload.currencyId,
        currencyCode: payload.currencyCode,
        amount: payload.amount
      });

      await localAxios.put(
        `ose/rate-items/${payload.id}`,
        jsonData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      commit(mutation.BUTTON_STATUS, false);
      dispatch(action.LIST_CURRENCY_KURS);
      swal("Succes!", "Currency Kurs Succesfully Updated", "success");
      router.replace({
        path: "/list-currency-kurs",
      });
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.DELETE_CURRENCY_KURS]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      await localAxios.delete(`ose/rate-items`, {
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          id: payload.id,
        },
      });
      await dispatch(action.LIST_CURRENCY_KURS, {
        page: 1,
      });
      swal("Succes!", "Currency Kurs Succesfuly Deleted", "success");
      commit(mutation.BUTTON_STATUS, false);
      router.replace({
        path: "/list-currency-kurs",
      });
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
};
