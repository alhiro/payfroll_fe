import * as action from "../../action-types";
import * as mutation from "../../mutation-types";
import localAxios from "../../../services/http/client";
import swal from "sweetalert2";
import * as typeS from "../../../services/path_service";
import router from "../../../router";

export default {
  async [action.SELECT_HOLDINGS]({ commit, dispatch }) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get("cma/holdings/list", {
        headers: { Authorization: "Bearer " + token },
      });
      let objList = {
        dataList: data.data,
      };
      commit(mutation.SET_DROPDOWN_HOLDINGS, objList);
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.LIST_CONSULTANT]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get(
        "cma/holdings?page=" + payload.page + "&size=10",
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
        firstP: "cma/holdings?page=1&size=10",
        fromPA: data.data.from,
      };
      commit(mutation.SET_CONSULTANT_LIST, objList);
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.CREATE_CONSULTANT]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let i,
        len = payload.holdingPic,
        holdingPic = [];
      for (i = 0; i < len.length; i++) {
        holdingPic.push({
          picName: len[i].picName,
          picEmail: len[i].picEmail,
          picPosition: len[i].picPosition,
          picPhoneNumber: parseInt(len[i].picPhoneNumber),
        });
      }
      const jsonData = JSON.stringify({
        holdingType: payload.holdingType,
        holdingName: payload.holdingName,
        holdingNpwp: payload.holdingNpwp,
        holdingAddress: payload.holdingAddress,
        city: payload.city,
        zip: parseInt(payload.zip),
        email: payload.email,
        fax: parseInt(payload.fax),
        companyAdmin: {
          fullName: payload.fullName,
          userName: payload.userName,
          email: payload.adminEmail,
          phoneNumber: parseInt(payload.adminPhone),
        },
        availableDataUnique: true,
        holdingPic,
      });
      let { data } = await localAxios.post(
        "cma/holdings/register/auth",
        jsonData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      commit(mutation.BUTTON_STATUS, false);
      dispatch(action.LIST_CONSULTANT,{
          page: 1,
          sort:"descending",
          sortBy:"id",
          param:"",
          status: 99,
      });
      swal("Succes!", "New Holding Created", "success");
      router.replace({
        path: "/list-holding",
      });
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.REGISTER_CONSULTANT]({ commit, dispatch }, payload) {
    try {
      let i,
        len = payload.holdingPic,
        holdingPic = [];
      for (i = 0; i < len.length; i++) {
        holdingPic.push({
          picName: len[i].picName,
          picEmail: len[i].picEmail,
          picPosition: len[i].picPosition,
          picPhoneNumber: parseInt(len[i].picPhoneNumber),
        });
      }
      const jsonData = JSON.stringify({
        holdingType: payload.holdingType,
        holdingName: payload.holdingName,
        holdingNpwp: payload.holdingNpwp,
        holdingAddress: payload.holdingAddress,
        city: payload.city,
        zip: parseInt(payload.zip),
        email: payload.email,
        fax: parseInt(payload.fax),
        companyAdmin: {
          fullName: payload.fullName,
          userName: payload.userName,
          email: payload.adminEmail,
          phoneNumber: parseInt(payload.adminPhone),
        },
        availableDataUnique: true,
        holdingPic,
      });
      await localAxios.post("cma/holdings/register", jsonData);
      dispatch(action.DATA_ERROR, null);
      swal({
        title: "Berhasil",
        text: "Registrasi berhasil",
        type: "success",
        allowOutsideClick: false,
        heightAuto: false,
      }).then(function() {
        router.replace('/login')
      })
    } catch (err) {
      if (err.response.data.data !== null)
        swal("Error", "Holding atau NPWP sudah digunakan", "error")
      else
        swal("Error", err.response.data.message, "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.CHECK_REGISTER]({ commit, dispatch }, payload) {
    try {
      const jsonData = JSON.stringify({
        holdingName: payload.holdingName,
        holdingNpwp: payload.holdingNpwp,
      });

      let { data } = await localAxios.post(
        "cma/holdings/check_availability",
        jsonData
      );
      dispatch(action.DATA_ERROR, data);
    } catch (err) {
      dispatch(action.DATA_ERROR, err.response.data);
    }
  },
  async [action.CHECK_CONSULTANT]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      const jsonData = JSON.stringify({
        holdingName: payload.holdingName,
        holdingNpwp: payload.holdingNpwp,
      });

      let { data } = await localAxios.post(
        "cma/holdings/check_availability/auth",
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
      dispatch(action.DATA_ERROR, err.response.data);
    }
  },
  async [action.DETAIL_CONSULTANT]({ commit, dispatch }, payload) {
    let gotoEdit = payload.gotoEdit;
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get("/cma/holdings/" + payload.id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      commit(mutation.SET_CONSULTANT_DETAIL, {
        data: data.data,
      });
      if(gotoEdit){
        router.replace({
          path: "/edit-holding/" + payload.id,
        });
        return data;
      }else{
        return data;
      }
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.UPDATE_CONSULTANT]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token")
      let i,
        len = payload.holdingPic,
        holdingPic = [];
      for (i = 0; i < len.length; i++) {
        holdingPic.push({
          id: len[i].id,
          picName: len[i].picName,
          picEmail: len[i].picEmail,
          picPosition: len[i].picPosition,
          picPhoneNumber: parseInt(len[i].picPhoneNumber),
        });
      }
      for(i = 0; i< payload.deletedPic.length;i++){
        let j = JSON.stringify(payload.deletedPic[i]);
        await localAxios.delete("cma/holdings/pic", {
          headers: {
            Authorization: "Bearer " + token,
          },
          data: j,
        });
      }
      const jsonData = JSON.stringify({
        holdingType: payload.holdingType,
        holdingName: payload.holdingName,
        holdingNpwp: payload.holdingNpwp,
        holdingAddress: payload.holdingAddress,
        city: payload.city,
        zip: parseInt(payload.zip),
        email: payload.email,
        fax: parseInt(payload.fax),
        companyAdmin: {
          id: payload.adminId,
          fullName: payload.fullName,
          email: payload.adminEmail,
          phoneNumber: parseInt(payload.adminPhone),
        },
        holdingPic,
      });
      // console.log(jsonData,'json here')
      let { data } = await localAxios.put(
        "cma/holdings/" + payload.id,
        jsonData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      commit(mutation.BUTTON_STATUS, false);
      dispatch(action.LIST_CONSULTANT,{
          page: 1,
          sort:"descending",
          sortBy:"id",
          param:"",
          status: 99,
      });
      swal("Succes!", "Holding Succesfully Updated", "success");
      router.replace({
        path: "/list-holding",
      });
    } catch (err) {
      // console.log(err, 'hey this is err')
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.DELETE_CONSULTANT]({ commit, dispatch }, payload) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.delete("cma/holdings", {
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          id: payload,
        },
      });
      await dispatch(action.LIST_CONSULTANT, {
        page: 1,
      });
      swal("Succes!", "Consultant Succesfuly Deleted", "success");
      commit(mutation.BUTTON_STATUS, false);
      router.replace({
        path: "/list-consultant",
      });
    } catch (err) {
      commit(mutation.BUTTON_STATUS, false);
      swal(err.response.data.message, "", "error");
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.LIST_HOLDING_TYPE]({ commit, dispatch }, id) {
    try {
      let res = await localAxios.get(typeS.holding_type+id);
      commit(mutation.SET_HOLDING_TYPE, res.data.data);
      return res;
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  async [action.LIST_REGENCIES]({ commit, dispatch }) {
    try {
      let res = await localAxios.get(typeS.regencies);
      commit(mutation.SET_REGENCIES, res.data.data);
      return res;
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
};
