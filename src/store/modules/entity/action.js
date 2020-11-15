import * as action from "../../action-types";
import * as mutation from "../../mutation-types";
import localAxios from "../../../services/http/client";
import swal from "sweetalert2";
import * as typeS from "../../../services/path_service";
import router from "../../../router";

export default {
  async [action.SELECT_ENTITY]({ commit, dispatch }) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get("cma/entities/list", {
        headers: { Authorization: "Bearer " + token },
      });
      let objList = {
        dataList: data.data.data,
      };
      commit(mutation.SET_DROPDOWN_ENTITY, objList);
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  // async [action.ACTIVATE_ENTITY]({ commit, dispatch }, payload) {
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
  // async [action.SUSPEND_ENTITY]({ commit, dispatch }, payload) {
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

  async [action.LIST_ENTITY]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get(
        `cma/entities?page=${payload.page}&size=10&sort=${payload.sort}&sortBy=${payload.sortBy}&param=${payload.param}&isActive=${(payload.status != '99' ? payload.status : '')}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      let objList = {
        dataList: data.data.data,
        total: data.data.total,
        nextC: data.data.nextPageUrl,
        prevC: data.data.prevPageUrl,
        firstP: `cma/entities?page=${payload.page}&size=10&sort=${payload.sort}&sortBy=${payload.sortBy}&param=${payload.param}&isActive=${payload.status}`,
        fromPA: data.data.from,
      };
      commit(mutation.BUTTON_STATUS, false)
      commit(mutation.SET_ENTITY_LIST, objList);
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false)
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.CREATE_ENTITY]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      const jsonData = JSON.stringify({
        name: payload.name,
        npwp: payload.npwp,
        phone: payload.phone,
        email: payload.email,
        faxNo: payload.fax,
        dirName: payload.dirName,
        dirNpwp: payload.dirNpwp,
        zipCode: payload.zipcode,
        city: payload.city,
        bpjsTkNpp: payload.bpjstk,
        bpjsKesNpp: payload.bpjsks,
        remark: payload.note,
        klu: payload.klu,
        bpjsDtpStart: payload.dtp_start,
      });
      let masterPayroll = JSON.parse(localStorage.getItem('master_payroll'));
      let { data } = await localAxios.post("cma/entities", jsonData, {
        headers: {
          Authorization: "Bearer " + token,
          'PAYROLL-PARAM': "companyId="+masterPayroll.companyId+"&year=2020&month=1"
        },
      });
      commit(mutation.BUTTON_STATUS, false);
      dispatch(action.LIST_ENTITY,{
          page: 1,
          sort:"descending",
          sortBy:"id",
          param:"",
          status: 99,
      });
      swal("Succes!", "New Entity Created", "success");
      router.replace({
        path: "/list-entity",
      });
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.EDIT_ENTITY]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get("/cma/entities/" + payload, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      commit(mutation.SET_ENTITY_DETAIL, {
        data: data.data,
      });
      router.replace({
        path: "/edit-entity/" + payload,
      });
      return data;
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.ENTITY_DETAIL]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get("/cma/entities/" + payload, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      commit(mutation.SET_ENTITY_DETAIL, {
        data: data.data,
      });
      router.replace({
        path: "/detail-entity/" + payload,
      });
      return data;
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.UPDATE_ENTITY]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      const jsonData = JSON.stringify({
        name: payload.name,
        npwp: payload.npwp,
        phone: payload.phone,
        email: payload.email,
        faxNo: payload.fax,
        dirName: payload.dirName,
        dirNpwp: payload.dirNpwp,
        zipCode: payload.zipcode,
        city: payload.city,
        bpjsTkNpp: payload.bpjstk,
        bpjsKesNpp: payload.bpjsks,
        remark: payload.note,
        klu: payload.klu,
        bpjsDtpStart: payload.dtp_start,
      });

      let masterPayroll = JSON.parse(localStorage.getItem('master_payroll'));
      let cid = 1;
      if(masterPayroll)
        cid = masterPayroll.companyId;
      let { data } = await localAxios.put(
        "cma/entities/" + payload.id,
        jsonData,
        {
          headers: {
            Authorization: "Bearer " + token,
            'PAYROLL-PARAM': "companyId="+cid+"&year=2020&month=1"
          },
        }
      );
      commit(mutation.BUTTON_STATUS, false);
      dispatch(action.LIST_ENTITY,{
          page: 1,
          sort:"descending",
          sortBy:"id",
          param:"",
          status: 99,
      });
      swal("Succes!", "Entity Succesfully Updated", "success");
      router.replace({
        path: "/list-entity",
      });
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.DELETE_ENTITY]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.delete("cma/entities", {
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          id: payload.id,
        },
      });
      await dispatch(action.LIST_ENTITY, {
        page: payload.page,
        sort: payload.sort,
        sortBy: payload.sortBy,
        param: payload.param,
        status: payload.status
      })
      router.replace({
        path: "/list-entity",
      });
      swal("Succes!", "Entity Succesfuly Deleted", "success");
      commit(mutation.BUTTON_STATUS, false);
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
};
