import * as action from "../../action-types";
import * as mutation from "../../mutation-types";
import localAxios from "../../../services/http/client";
import swal from "sweetalert2";
import * as typeS from "../../../services/path_service";
import router from "../../../router";

export default {
  async [action.SELECT_DEPARTMENT]({ commit, dispatch }) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get("ose/dept?page=1&size=99", {
        headers: { Authorization: "Bearer " + token },
      });
      let objList = {
        dataList: data.data.data,
      };
      commit(mutation.SET_DROPDOWN_DEPARTMENT, objList);
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  // async [action.ACTIVATE_DEPARTMENT]({ commit, dispatch }, payload) {
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
  // async [action.SUSPEND_DEPARTMENT]({ commit, dispatch }, payload) {
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

  async [action.LIST_DEPARTMENT]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get(
        "ose/dept?page=" + payload.page + "&size=10",
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
        firstP: "ose/dept?page=1&size=10",
        fromPA: data.data.from,
      };
      commit(mutation.SET_DEPARTMENT_LIST, objList);
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.CREATE_DEPARTMENT]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      const jsonData = JSON.stringify({
        comId: payload.comId,
        depName: payload.depName,
        depOrder: payload.depOrder,
        depCode: payload.depCode,
        depLevel: payload.depLevel.toString(),
        deptParentId: payload.deptParentId,
        entitiesId: payload.entitiesId
       
      });
      let { data } = await localAxios.post("ose/dept", jsonData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      commit(mutation.BUTTON_STATUS, false);
      dispatch(action.LIST_DEPARTMENT, { page: 1 });
      swal("Succes!", "New Department Created", "success");
      router.replace({
        path: "/list-department",
      });
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
  // async [action.CHECK_DEPARTMENT]({ commit, dispatch }, payload) {
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
  async [action.DETAIL_DEPARTMENT]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get("/ose/dept/" + payload, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      commit(mutation.SET_DEPARTMENT_DETAIL, {
        data: data.data,
      });
      router.replace({
        path: "/edit-department/" + payload,
      });
      return data;
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.DEPARTMENT_DETAIL]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get("/ose/dept/" + payload, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      commit(mutation.SET_DEPARTMENT_DETAIL, {
        data: data.data,
      });
      router.replace({
        path: "/detail-department/" + payload,
      });
      return data;
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.UPDATE_DEPARTMENT]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      const jsonData = JSON.stringify({
        comId: payload.comId,
        depName: payload.depName,
        depOrder: payload.depOrder,
        depCode: payload.depCode,
        depLevel: payload.depLevel.toString(),
        deptParentId: payload.deptParentId,
        entitiesId: payload.entitiesId
      });

      let { data } = await localAxios.put(
        "ose/dept/" + payload.id,
        jsonData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      commit(mutation.BUTTON_STATUS, false);
      dispatch(action.LIST_DEPARTMENT);
      swal("Succes!", "Department Succesfully Updated", "success");
      router.replace({
        path: "/list-department",
      });
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.DELETE_DEPARTMENT]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      const Body = JSON.stringify({
        id: payload,
      });
      let { data } = await localAxios.delete("ose/dept", {
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          id: payload,
        },
      });
      await dispatch(action.LIST_DEPARTMENT, {
        page: 1,
      });
      swal("Succes!", "Department Succesfuly Deleted", "success");
      commit(mutation.BUTTON_STATUS, false);
      router.replace({
        path: "/list-department",
      });
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
};
