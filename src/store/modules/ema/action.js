import * as action from "../../action-types";
import * as mutation from "../../mutation-types";
import localAxios from "../../../services/http/client";
import swal from "sweetalert2";
import * as typeS from "../../../services/path_service";
import router from "../../../router";

export default {
async [action.DOWNLOAD_BULK_EMPLOYEE]({commit, dispatch}, payload) {
    try {
        let token = localStorage.getItem('token');
        let {data} = await localAxios.get("ema/imports/download-template",
        formData,
            {
                headers: {'Authorization': 'Bearer ' + token}
            })
        let jsonfile = JSON.stringify(data.data).split(' ');
        let jsonT = jsonfile[1].split(':');
        let combJson = jsonT[1] +':'+ jsonT[2];
        let fileDownload = combJson.split('}')[0];
        commit(mutation.BUTTON_STATUS, false);
        return fileDownload
    } catch (err) {
        commit(mutation.BUTTON_STATUS, false);
        swal(err.response.data.message, '', 'error')
        dispatch(action.DATA_ERROR, err)
    }
},
async [action.UPLOAD_BULK_EMPLOYEE]({commit, dispatch}, payload) {
    try{
        let token = localStorage.getItem('token');
        const formData = new FormData()
        formData.append('file', payload.file);
        let { data } = await localAxios.post("ema/imports/"+payload.comId+"/new-employee",
            formData,
            { headers: {'Authorization': 'Bearer '+token, 'Content-Type': 'multipart/form-data'}
            })
            commit(mutation.BUTTON_STATUS, false)
            swal('File has been successfully uploaded!','', 'success')
    }catch(err){
        commit(mutation.BUTTON_STATUS, false)
        swal(err.response.data.message,'', 'error')
        dispatch(action.DATA_ERROR, err)
    }
},

}