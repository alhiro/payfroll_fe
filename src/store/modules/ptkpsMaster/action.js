import * as action from "../../action-types";
import * as mutation from "../../mutation-types";
import localAxios from "../../../services/http/client";
import swal from "sweetalert2";
import * as typeS from "../../../services/path_service";
import router from "../../../router";

export default {
  async [action.LIST_PTKPS_MASTER]({ commit, dispatch }) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await localAxios.get(
        `gco/master/ptkps?page=1&size=10`,
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
        firstP: 'gco/taxtype?page=1&size=10',
        fromPA: data.data.from
      }
      commit(mutation.SET_PTKPS_MASTER_LIST, objList);
      router.push('/update-ptkp-taxreg')
    } catch (err) {
      dispatch(action.DATA_ERROR, err);
    }
  },
  // async [action.CREATE_TAX_REGULATION]({ commit, dispatch }, payload) {
  //   try {
  //     let token = localStorage.getItem("token");
  //     let compId = localStorage.getItem('compId')
  //     let year = localStorage.getItem('year')
  //     // let i,
  //     //   len = payload.holdingPic,
  //     //     ptkps = [];
  //     // for (i = 0; i < len.length; i++) {
  //     //   ptkps.push({
  //     //     code: len[i].code,
  //     //     description: len[i].description,
  //     //     amount: len[i].amount,
  //     //   });
  //     // }
  //     const jsonData = JSON.stringify({
  //       companyId: compId,
  //       year,
  //       ostPct: payload.ostPct,
  //       osAmt: payload.osAmt,
  //       r1pct: payload.r1pct,
  //       r1amt: payload.r1amt,
  //       r2pct: payload.r2pct,
  //       r2amt: payload.r2amt,
  //       r3pct: payload.r3pct,
  //       r3amt: payload.r3amt,
  //       r4pct: payload.r4pct,
  //       r4amt: payload.r4amt,
  //       r5pct: payload.r5pct,
  //       r5amt: payload.r5amt,
  //       sev1pct: payload.sev1pct,
  //       sev1amt: payload.sev1amt,
  //       sev2pct: payload.sev2pct,
  //       sev2amt: payload.sev2amt,
  //       sev3pct: payload.sev3pct,
  //       sev3amt: payload.sev3amt,
  //       sev4pct: payload.sev4pct,
  //       sev4amt: payload.sev4amt,
  //       sev5pct: payload.sev5pct,
  //       sev5amt: payload.sev5amt,
  //       govMin: payload.govMin,
  //       govMax: payload.govMax,
  //       nog : payload.nog === true ? 0 : 1,
  //       ptkps:[
  //         {
  //           code: "S/0",
  //           description: "Single 0 Dependent",
  //           amount: payload.s0amt
  //         },
  //         {
  //           code: "S/1",
  //           description: "Single 1 Dependent",
  //           amount: payload.s1amt
  //         },
  //         {
  //           code: "S/2",
  //           description: "Single 2 Dependent",
  //           amount: payload.s2amt
  //         },
  //         {
  //           code: "S/3",
  //           description: "Single 3 Dependent",
  //           amount: payload.s3amt
  //         },
  //         {
  //           code: "M/0",
  //           description: "Married 0 Dependent",
  //           amount: payload.m0amt
  //         },
  //         {
  //           code: "M/1",
  //           description: "Married 1 Dependent",
  //           amount: payload.m1amt
  //         },
  //         {
  //           code: "M/2",
  //           description: "Married 2 Dependent",
  //           amount: payload.m2amt
  //         },
  //         {
  //           code: "M/3",
  //           description: "Married 3 Dependent",
  //           amount: payload.m3amt
  //         }
  //       ],
  //     });
  //     await localAxios.post(
  //       "ose/tax/regulations",
  //       jsonData,
  //       {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       }
  //     );
  //     commit(mutation.BUTTON_STATUS, false);
  //     dispatch(action.LIST_TAX_REGULATION, payload);
  //     swal("Succes!", "New Save Setting Created", "success");
  //     router.replace({
  //       path: "/list-tax-regulation",
  //     });
  //   } catch (err) {
  //     commit(mutation.BUTTON_STATUS, false);
  //     swal(err.response.data.message, "", "error");
  //     dispatch(action.DATA_ERROR, err);
  //   }
  // },
  // async [action.UPDATE_TAX_REGULATION]({ commit, dispatch }, payload) {
  //   try {
  //     let token = localStorage.getItem("token");
  //     let compId = localStorage.getItem('compId')
  //     let i,
  //         len = payload.holdingPic,
  //         ptkps = [];
  //     for (i = 0; i < len.length; i++) {
  //       ptkps.push({
  //         code: len[i].code,
  //         description: len[i].description,
  //         amount: len[i].amount,
  //       });
  //     }
  //     const jsonData = JSON.stringify({
  //       companyId: compId,
  //       year: payload.year,
  //       ostPct: payload.ostPct,
  //       osAmt: payload.osAmt,
  //       r1pct: payload.r1pct,
  //       r1amt: payload.r1amt,
  //       r2pct: payload.r2pct,
  //       r2amt: payload.r2amt,
  //       r3pct: payload.r3pct,
  //       r3amt: payload.r3amt,
  //       r4pct: payload.r4pct,
  //       r4amt: payload.r4amt,
  //       r5pct: payload.r5pct,
  //       r5amt: payload.r5amt,
  //       sev1pct: payload.sev1pct,
  //       sev1amt: payload.sev1amt,
  //       sev2pct: payload.sev2pct,
  //       sev2amt: payload.sev2amt,
  //       sev3pct: payload.sev3pct,
  //       sev3amt: payload.sev3amt,
  //       sev4pct: payload.sev4pct,
  //       sev4amt: payload.sev4amt,
  //       sev5pct: payload.sev5pct,
  //       sev5amt: payload.sev5amt,
  //       govMin: payload.govMin,
  //       govMax: payload.govMax,
  //       nog : payload.nog,
  //       ptkps,
  //     });
  //     console.log('payload gun', payload)
  //     await localAxios.put(
  //         `ose/tax/regulations/${payload.id}`,
  //         jsonData,
  //         {
  //           headers: {
  //             Authorization: "Bearer " + token,
  //           },
  //         }
  //     );
  //     commit(mutation.BUTTON_STATUS, false);
  //     dispatch(action.LIST_TAX_REGULATION, payload);
  //     swal("Succes!", "New Save Setting Updated", "success");
  //     router.replace({
  //       path: "/list-tax-regulation",
  //     });
  //   } catch (err) {
  //     commit(mutation.BUTTON_STATUS, false);
  //     swal(err.response.data.message, "", "error");
  //     dispatch(action.DATA_ERROR, err);
  //   }
  // },
  // async [action.DELETE_TAX_REGULATION]({ commit, dispatch }, payload) {
  //   try {
  //     let token = localStorage.getItem("token");
  //     await localAxios.delete("ose/tax/regulations", {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //       },
  //       data: {
  //         id: payload,
  //       },
  //     });
  //     await dispatch(action.LIST_TAX_REGULATION, {
  //       page: 1,
  //     });
  //     swal("Succes!", "Save Setting Succesfuly Deleted", "success");
  //     commit(mutation.BUTTON_STATUS, false);
  //     router.replace({
  //       path: "/list-tax-regulation",
  //     });
  //   } catch (err) {
  //     commit(mutation.BUTTON_STATUS, false);
  //     swal(err.response.data.message, "", "error");
  //     dispatch(action.DATA_ERROR, err);
  //   }
  // },
};
