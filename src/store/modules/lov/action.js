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

  async [action.LIST_LOV_DROPDOWN]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let compId = localStorage.getItem('compId')
      let { data } = await localAxios.get(
        `gco/lovs/list/${payload}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      let objList = {
        dataList: data.data
      };
      console.log('===================> ', objList)
      commit(mutation.SET_DROPDOWN_LOV_ID, objList);
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  // async [action.CREATE_COMPANY_SETTING]({ commit, dispatch }, payload) {
  //   try {
  //     let token = localStorage.getItem("token");
  //     let compId = localStorage.getItem('compId')
  //     const jsonData = JSON.stringify({
  //       status: payload.status,
  //       year  : payload.year
  //     });
  //     await localAxios.post(`ose/company/${compId}/settings`, jsonData, {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //         'Access-Control-Allow-Origin': '*'
  //       },
  //     });
  //     commit(mutation.BUTTON_STATUS, false);
  //     dispatch(action.LIST_COMPANY_SETTING, { page: 1 });
  //     swal("Succes!", "New Level Created", "success");
  //     router.replace({
  //       path: "/list-company-setting",
  //     });
  //   } catch (err) {
  //     commit(mutation.BUTTON_STATUS, false);
  //     swal(err.response.data.message, "", "error");
  //     dispatch(action.DATA_ERROR, err);
  //   }
  // },
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
  // async [action.UPDATE_COMPANY_SETTING]({ commit, dispatch }, payload) {
  //   try {
  //     let compId = localStorage.getItem('compId')
  //     let token = localStorage.getItem("token");
  //     const jsonData = JSON.stringify({
  //       status: payload.status,
  //       year  : payload.year
  //     });
  //
  //     await localAxios.put(
  //       `ose/company/${compId}/settings/${payload.id}`,
  //       jsonData,
  //       {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       }
  //     );
  //     commit(mutation.BUTTON_STATUS, false);
  //     dispatch(action.LIST_COMPANY_SETTING);
  //     swal("Succes!", "Level Succesfully Updated", "success");
  //     router.replace({
  //       path: "/list-company-setting",
  //     });
  //   } catch (err) {
  //     commit(mutation.BUTTON_STATUS, false);
  //     swal(err.response.data.message, "", "error");
  //     dispatch(action.DATA_ERROR, err);
  //   }
  // },
  // async [action.DELETE_COMPANY_SETTING]({ commit, dispatch }, payload) {
  //   try {
  //     let token = localStorage.getItem("token");
  //     let compId = localStorage.getItem('compId')
  //     await localAxios.delete(`ose/company/${compId}/settings`, {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //       },
  //       data: {
  //         id: payload.id,
  //       },
  //     });
  //     await dispatch(action.LIST_COMPANY_SETTING, {
  //       page: 1,
  //     });
  //     swal("Succes!", "Level Succesfuly Deleted", "success");
  //     commit(mutation.BUTTON_STATUS, false);
  //     router.replace({
  //       path: "/list-company-setting",
  //     });
  //   } catch (err) {
  //     commit(mutation.BUTTON_STATUS, false);
  //     swal(err.response.data.message, "", "error");
  //     dispatch(action.DATA_ERROR, err);
  //   }
  // },
};
