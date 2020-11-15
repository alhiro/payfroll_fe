import * as action from "../../action-types";
import * as mutation from "../../mutation-types";
import localAxios from "../../../services/http/client";
import swal from "sweetalert2";
import * as typeS from "../../../services/path_service";
import router from "../../../router";

export default {

  async [action.LIST_PAYROLL_ITEM]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get(
        "ose/payroll-items?page=" + payload.page + "&size=10",
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
        firstP: "ose/payroll-items?page=1&size=10",
        fromPA: data.data.from,
      };
      console.log('masuk di object list item', objList)
      commit(mutation.SET_PAYROLL_ITEM_LIST, objList);
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.CREATE_PAYROLL_ITEM]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let compId = localStorage.getItem('compId')
      const jsonData = JSON.stringify({
        companyId: compId,
        year: payload.year,
        code: payload.code,
        type: payload.type,
        typeName: payload.typeName,
        name: payload.name,
        taxMode: payload.taxMode,
        allEmp: payload.allEmp,
        carryForward: payload.carryForward,
        wageBpjsTk: payload.wageBpjsTk,
        wageBpjsKes: payload.wageBpjsKes,
        pm: payload.pm,
        order: payload.order,
        a1no: payload.a1no
      });
      await localAxios.post("ose/payroll-items", jsonData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      commit(mutation.BUTTON_STATUS, false);
      dispatch(action.LIST_PAYROLL_ITEM, { page: 1 });
      swal("Succes!", "New Payroll Item Created", "success");
      router.replace({
        path: "/list-payroll-item",
      });
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
  // async [action.DETAIL_TEAM]({ commit, dispatch }, payload) {
  //   try {
  //     let token = localStorage.getItem("token");
  //     let { data } = await localAxios.get("/ose/teams/" + payload, {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //       },
  //     });
  //     commit(mutation.SET_TEAM_DETAIL, {
  //       data: data.data,
  //     });
  //     router.replace({
  //       path: "/edit-team/" + payload,
  //     });
  //     return data;
  //   } catch (err) {
  //     dispatch(action.DATA_ERROR, err);
  //   }
  // },
  // async [action.TEAM_DETAIL]({ commit, dispatch }, payload) {
  //   try {
  //     let token = localStorage.getItem("token");
  //     let { data } = await localAxios.get("/ose/teams/" + payload, {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //       },
  //     });
  //     commit(mutation.SET_TEAM_DETAIL, {
  //       data: data.data,
  //     });
  //     router.replace({
  //       path: "/detail-team/" + payload,
  //     });
  //     return data;
  //   } catch (err) {
  //     dispatch(action.DATA_ERROR, err);
  //   }
  // },
  async [action.UPDATE_PAYROLL_ITEM]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let compId = localStorage.getItem('compId')
      const jsonData = JSON.stringify({
        companyId: compId,
        year: payload.year,
        code: payload.code,
        type: payload.type,
        typeName: payload.typeName,
        name: payload.name,
        taxMode: payload.taxMode,
        allEmp: payload.allEmp,
        carryForward: payload.carryForward,
        wageBpjsTk: payload.wageBpjsTk,
        wageBpjsKes: payload.wageBpjsKes,
        pm: payload.pm,
        order: payload.order,
        a1no: payload.a1no
      });
      await localAxios.put(`ose/payroll-items/${compId}`, jsonData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      commit(mutation.BUTTON_STATUS, false);
      dispatch(action.LIST_PAYROLL_ITEM, { page: 1 });
      swal("Succes!", "Payroll Item Succesfully Updated", "success");
      router.replace({
        path: "/list-payroll-item",
      });
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
  // async [action.UPDATE_TEAM]({ commit, dispatch }, payload) {
  //   try {
  //     let token = localStorage.getItem("token");
  //     const jsonData = JSON.stringify({
  //       comId: payload.comId,
  //       temName: payload.temName,
  //       temSaturday: payload.saturday,
  //       temSunday: payload.sunday
  //     });
  //
  //     let { data } = await localAxios.put(
  //       "ose/teams/" + payload.id,
  //       jsonData,
  //       {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       }
  //     );
  //     commit(mutation.BUTTON_STATUS, false);
  //     dispatch(action.LIST_TEAM);
  //     swal("Succes!", "Team Succesfully Updated", "success");
  //     router.replace({
  //       path: "/list-team",
  //     });
  //   } catch (err) {
  //     commit(mutation.BUTTON_STATUS, false);
  //     swal(err.response.data.message, "", "error");
  //     dispatch(action.DATA_ERROR, err);
  //   }
  // },
  async [action.DELETE_PAYROLL_ITEM]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      await localAxios.delete("ose/payroll-items", {
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          id: payload,
        },
      });
      await dispatch(action.LIST_PAYROLL_ITEM, {
        page: 1,
      });
      swal("Succes!", "Payroll Item Succesfuly Deleted", "success");
      commit(mutation.BUTTON_STATUS, false);
      router.replace({
        path: "/list-payroll-item",
      });
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
};
