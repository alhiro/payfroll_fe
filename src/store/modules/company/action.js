import * as action from "../../action-types";
import * as mutation from "../../mutation-types";
import localAxios from "../../../services/http/client";
import swal from "sweetalert2";
import * as typeS from "../../../services/path_service";
import router from "../../../router";

export default {
  async [action.SELECT_COMPANY]({ commit, dispatch }) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get("cma/companies/list", {
        headers: { Authorization: "Bearer " + token },
      });
      let objList = {
        dataList: data.data,
      };
      commit(mutation.SET_DROPDOWN_COMPANY, objList);
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.ACTIVATE_COMPANY]({ commit, dispatch }, payload) {
    try {
      const jsonData = JSON.stringify({
        id: payload,
      });
      let token = localStorage.getItem("token");
      let { data } = await localAxios.put("cma/companies/unsuspend", jsonData, {
        headers: { Authorization: "Bearer " + token },
      });
      dispatch(action.COMPANY_DETAIL, payload);
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.SUSPEND_COMPANY]({ commit, dispatch }, payload) {
    try {
      const jsonData = JSON.stringify({
        id: payload,
      });
      let token = localStorage.getItem("token");
      let { data } = await localAxios.put("cma/companies/suspend", jsonData, {
        headers: { Authorization: "Bearer " + token },
      });
      dispatch(action.COMPANY_DETAIL, payload);
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },

  async [action.LIST_COMPANY]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get(
        "cma/companies?page=" + payload.page + "&size=10",
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
        firstP: "cma/companies?page=1&size=10",
        fromPA: data.data.from,
      };
      commit(mutation.SET_COMPANY_LIST, objList);
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.CREATE_COMPANY]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      const jsonData = JSON.stringify({
        holdingId: payload.holdingId,
        name: payload.name,
        npwp: payload.npwp,
        phone: payload.phone,
        email: payload.email,
        address: payload.address,
        zipCode: payload.zipcode,
        province: payload.province,
        branch: payload.branch,
        code: payload.code,
        year: payload.year,
        dbName: payload.dbName,
        city: payload.city,
      });
      let { data } = await localAxios.post("cma/companies", jsonData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      commit(mutation.BUTTON_STATUS, false);
      dispatch(action.LIST_COMPANY, { page: 1 });
      swal("Succes!", "New Company Created", "success");
      router.replace({
        path: "/list-company",
      });
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.CHECK_COMPANY]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      const jsonData = JSON.stringify({
        holdingName: payload.holdingName,
        holdingNpwp: payload.holdingNpwp,
      });

      let { data } = await localAxios.post(
        "cma/companies/check_availability",
        jsonData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      dispatch(action.DATA_ERROR, data);
      commit(mutation.BUTTON_STATUS, false);
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err.response.data);
    }
  },
  async [action.DETAIL_COMPANY]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get("/cma/companies/" + payload, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      commit(mutation.SET_COMPANY_DETAIL, {
        data: data.data,
      });
      router.replace({
        path: "/edit-company/" + payload,
      });
      return data;
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.COMPANY_DETAIL]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get("/cma/companies/" + payload, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      commit(mutation.SET_COMPANY_DETAIL, {
        data: data.data,
      });
      router.replace({
        path: "/detail-company/" + payload,
      });
      return data;
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.LIST_USER_COMPANY]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get("/cma/companies/" + payload, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      commit(mutation.SET_COMPANY_DETAIL, {
        data: data.data,
      });
      router.replace({
        path: "/detail-company/" + payload + "/list-user",
      });
      return data;
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.UPDATE_COMPANY]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      const jsonData = JSON.stringify({
        holdingId: payload.holdingId,
        name: payload.name,
        npwp: payload.npwp,
        phone: payload.phone,
        email: payload.email,
        address: payload.address,
        zipCode: payload.zipCode,
        province: payload.province,
        branch: payload.branch,
        code: payload.code,
        year: payload.year,
        dbName: payload.dbName,
        city: payload.city,
      });

      let { data } = await localAxios.put(
        "cma/companies/" + payload.id,
        jsonData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      commit(mutation.BUTTON_STATUS, false);
      dispatch(action.LIST_COMPANY);
      swal("Succes!", "Company Succesfully Updated", "success");
      router.replace({
        path: "/list-company",
      });
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.DELETE_COMPANY]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      const Body = JSON.stringify({
        id: payload,
      });
      let { data } = await localAxios.delete("cma/companies", {
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
            id: payload
        }
      });
      await dispatch(action.LIST_COMPANY, {
        page: 1,
      });
      swal("Succes!", "Company Succesfuly Deleted", "success");
      commit(mutation.BUTTON_STATUS, false);
      router.replace({
        path: "/list-company",
      });
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.GENERAL_INFORMATION]({ commit, dispatch }) {
    let masterPayroll = localStorage.getItem("master_payroll");
    masterPayroll = JSON.parse(masterPayroll);
    let payrollParam = "companyId="+masterPayroll.companyId+"&year="+masterPayroll.year+"&month="+masterPayroll.month
      let token = localStorage.getItem("token");
      await localAxios.get("ose/general-information", {
        headers: {
          Authorization: "Bearer " + token,
          "PAYROLL-PARAM": payrollParam
        }
      }).then(res=> {
        if(res.status == 200) {
          commit(mutation.SET_GENERAL_INFO, res.data.data);
        }
      });

  },
  async [action.ENTITY_LIST]({ commit, dispatch }) {
    let masterPayroll = localStorage.getItem("master_payroll");
    masterPayroll = JSON.parse(masterPayroll);
    let payrollParam = "companyId="+masterPayroll.companyId+"&year="+masterPayroll.year+"&month="+masterPayroll.month
      let token = localStorage.getItem("token");
      await localAxios.get("ose/dept/level?entityId="+masterPayroll.id, {
        headers: {
          Authorization: "Bearer " + token,
          "PAYROLL-PARAM": payrollParam
        }
      }).then(res=> {
        if(res.status == 200) {
          commit(mutation.SET_ENTITY_LIST, res.data.data);
        }
      });
  },
  async [action.ENTITY_COMPANY]({ commit, dispatch }) {
    let masterPayroll = localStorage.getItem("master_payroll");
    masterPayroll = JSON.parse(masterPayroll);
    let payrollParam = "companyId="+masterPayroll.companyId+"&year="+masterPayroll.year+"&month="+masterPayroll.month
      let token = localStorage.getItem("token");
      return await localAxios.get("cma/entities/by_company", {
        headers: {
          Authorization: "Bearer " + token,
          "PAYROLL-PARAM": payrollParam
        }
      });
  },
  async [action.SAVE_GENERAL_INFORMATION]({ commit, dispatch }, payload) {
    let masterPayroll = localStorage.getItem("master_payroll");
    masterPayroll = JSON.parse(masterPayroll);
    let payrollParam = "companyId="+masterPayroll.companyId+"&year="+masterPayroll.year+"&month="+masterPayroll.month
      let token = localStorage.getItem("token");
      await localAxios.post("ose/general-information", payload, {
        headers: {
          Authorization: "Bearer " + token,
          "PAYROLL-PARAM": payrollParam
        }
      }).then(res=> {
        if(res.status == 200) {
          swal("Succes!", "General Information has been updated", "success");
        }
      });
  },
  async [action.POST_DEPARTEMENT]({ commit, dispatch }, payload) {
    let masterPayroll = localStorage.getItem("master_payroll");
    masterPayroll = JSON.parse(masterPayroll);
    let payrollParam = "companyId="+masterPayroll.companyId+"&year="+masterPayroll.year+"&month="+masterPayroll.month
      let token = localStorage.getItem("token");
      return await localAxios.post("ose/dept", payload, {
        headers: {
          Authorization: "Bearer " + token,
          "PAYROLL-PARAM": payrollParam
        }
      });
  }
};
