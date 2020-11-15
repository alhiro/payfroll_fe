<template>
<div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <el-form ref="form" :rules="rules" :model="form">
            <h2>Edit Role</h2>
            <el-row :gutter="20">
                <el-col :lg="12">
                    <el-form-item label="Role Description" prop="roleDesc">
                        <el-input placeholder="Input Role Description" maxLength="100" v-model="form.roleDesc" v-on:keypress.native="noSpecialChar"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="12">
                    <el-form-item label="Role Title" prop="roleTitle">
                        <el-input placeholder="Input Role Title" maxLength="30" v-model="form.roleTitle" v-on:keypress.native="noSpecialChar"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="12">
                    <el-form-item label="Role Type" prop="roleType">
                        <el-select v-model="form.roleType" filterable placeholder="Role Type">
                            <el-option
                            v-for="item in roleTypes"
                            :key="item.key"
                            :label="item.valueId"
                            :value="item.key">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-row>
            <el-col :offset="19" :span="2">
                <el-button :loading="button" @click="onSubmit('form')" type="success">Submit</el-button>
            </el-col>
            <el-col :offset="1" :span="2">
                <el-button @click="Cancel()" type="succes">Cancel</el-button>
            </el-col>
        </el-row>
    </div>
</div>
</template>

<script>
import router from "../../../router";
import moment from "moment";
import Affix from "@/components/Affix";
import {
    mapGetters,
    mapActions
} from "vuex";
import * as getter from "../../../store/getters-types";
import * as action from "../../../store/action-types";
import * as mutation from '../../../store/mutation-types';
export default {
    name: "EditDriver",
    data() {
        return {
            roleTypes: [],
            form: {
                roleType: "",
                roleTitle: "",
                roleDesc: "",
                roleId: '',
                countryId: '',
                email: '',
                username: '',
                mobile: '',
                employeeNo: '',
                holdingId: '',
                comId: '',
            },
            rules: {
                holdingId: [{
                    required: true,
                    message: "Holding Id is required!",
                    trigger: "blur"
                }],
                holdingName: [{
                    required: true,
                    message: "Holding Name is required!",
                    trigger: "blur"
                }],
                comId: [{
                    required: true,
                    message: "Company Id is required!",
                    trigger: "blur"
                }],
                comName: [{
                    required: true,
                    message: "Company Name is required!",
                    trigger: "blur"
                }],
                roleDesc: [{
                    required: true,
                    message: "Role Description is required!",
                    trigger: "blur"
                }],
                roleTitle: [{
                    required: true,
                    message: "Role Title is required!",
                    trigger: "blur"
                }],
                roleAccess: [{
                    required: false,
                    message: "Role Access is required!",
                    trigger: "blur"
                }],
                roleType: [{
                        required: true,
                        message: "Role Type is required!",
                        trigger: "blur"
                    },

                ],
                menuType: [{
                    required: true,
                    message: "Menu Type is required!",
                    trigger: "blur"
                }],
            },
        };
    },
    methods: {
        noSpecialChar(evt) {
            evt = evt ? evt : window.event;
            var charCode = evt.which ? evt.which : evt.keyCode;
            if (( charCode >= 65 && charCode <= 90 ) || ( charCode >= 97 && charCode <= 122 )  || ( charCode >= 48 && charCode <= 57 ) || charCode==8) {
                return true;
            } else {
                evt.preventDefault()
            }
        },
        onSubmit(formName) {
            let obj = {
                holdingId: this.form.holdingId,
                holdingName: this.form.holdingName,
                comId: this.form.comId,
                comName: this.form.comName,
                roleDesc: this.form.roleDesc,
                roleTitle: this.form.roleTitle,
                roleAccess: this.form.roleAccess,
                roleType: this.form.roleType,
                idRoles: this.form.idRoles
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$store.commit(mutation.BUTTON_STATUS, true)
                    this.$store.dispatch(action.UPDATE_DATA_ROLES, obj)
                } else {
                    return false;
                }
            });
        },

        Cancel() {
            this.$router.replace({
                path: "/role-management"
            });
        },
        isNumber(evt) {
            evt = evt ? evt : window.event;
            var charCode = evt.which ? evt.which : evt.keyCode;
            if (
                charCode > 31 &&
                (charCode < 48 || charCode > 57)
            ) {
                evt.preventDefault();
            } else {
                return true;
            }
        },
    },

    computed: {
        ...mapGetters({
            error: getter.GET_ERROR,
            button: getter.GET_BUTTON,
            roles: getter.ROLES,
            selectHold: getter.GET_DROPDOWN_HOLDINGS,
            selectCom: getter.GET_DROPDOWN_COMPANY
        }),
    },
    mounted() {
        this.$store.dispatch(action.LIST_HOLDING_TYPE, 11).then(res=> {
            if(res.status == 200) {
               this.roleTypes = res.data.data;
            }
        });
    },
    created() {
        this.$store.dispatch(action.EDIT_ROLES_MENUS, {id:this.$route.params.id}).then(res=> {
            this.form.roleDesc = res.data.data.roleDesc
            this.form.roleTitle = res.data.data.roleTitle
            this.form.roleAccess = res.data.data.roleAccess
            this.form.roleType = String(res.data.data.roleType)
            this.form.idRoles = res.data.data.id
        });
    },

};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/_variables";

.card-base {
    padding: 20px;
}

.el-row {
    // display: flex;
    // align-items: center;
    // justify-content: center;
    padding: 0px 10px;
    margin-bottom: 10px;

    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 5px;
}

.el-radio {
    margin: 0 150px 0 10px;
}

.el-select {
    width: 100%;
}

.thumbnail {
    position: relative;
    width: 300px;
    height: 300px;
    overflow: hidden;
}

.thumbnail img {
    position: absolute;
    left: 50%;
    top: 50%;
    height: 100%;
    width: auto;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

.thumbnail img.portrait {
    width: 100%;
    height: auto;
}

a {
    border-style: dotted;
    border-radius: 15px;
    padding: 10px;
    height: 150px;
}

td {
    padding: 10px;
}
</style>
