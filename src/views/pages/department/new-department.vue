<template>
<div class="page-quill scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <h1>Create New Department</h1>
        <el-form ref="form" :rules="rules" :model="form">
            <el-row :gutter="20">
                    <el-col :span="12">
                    <el-form-item label="Department Name" prop="depName">
                        <el-input placeholder="Input Department Name" v-model="form.depName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Company Name" prop="comId">
                        <el-select @click="lookcom()" v-model="form.comId" filterable placeholder="Select">
                            <el-option v-for="item in selectCom" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Entity" prop="entitiesId">
                        <el-select v-model="form.entitiesId" filterable placeholder="Select">
                            <el-option v-for="item in selectEnt" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Department Parent">
                        <el-select v-model="form.deptParentId" filterable placeholder="Select">
                            <!-- <el-option label="No Parent" value="foo"></el-option> -->
                            <el-option v-for="item in selectDep" :key="item.id" :label="item.depName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Department Level" prop="depLevel">
                       <el-input placeholder="Input Department Level" v-model="form.depLevel"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Department Code" prop="depCode">
                        <el-input placeholder="Input Department Name" v-model="form.depCode"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Department Order" prop="depOrder">
                        <el-input placeholder="Input Department Order" v-on:keypress.native="isNumber" v-model="form.depOrder"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
       <el-row>
            <el-col :offset="17" :span="3">
                <el-button style="width: 100%" @click="onSubmit('form')" type="success">Submit</el-button>
            </el-col>
            <el-col :offset="1" :span="3">
                <el-button style="width: 100%" @click="Cancel()" type="succes">Cancel</el-button>
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
    name: "NewLocation",
    data() {
        return {
            form: {
                Name: '',
                Pic: [{
                    key: 0,
                    picName: null,
                    picPosition: null,
                    picEmail: null,
                    picPhoneNumber: null
                }],
            },
            rules: {
                comId: [{
                    required: true,
                    message: "Company Name is required!",
                    trigger: "blur"
                }],
                depName: [{
                    required: true,
                    message: "Department Name is required!",
                    trigger: "blur"
                }],
                depOrder: [{
                    required: true,
                    message: "Department Order is required!",
                    trigger: "blur"
                }],
                depCode: [{
                    required: true,
                    message: "Department Code is required!",
                    trigger: "blur"
                }],
                depLevel: [{
                    required: true,
                    message: "Department Level is required!",
                    trigger: "blur"
                }],
                // deptParentId: [{
                //     required: true,
                //     message: "Department Parent is required!",
                //     trigger: "blur"
                // }],
                entitiesId: [{
                    required: true,
                    message: "Entity is required!",
                    trigger: "blur"
                }],
                Type: [{
                    required: true,
                    message: "Entity Type is required!",
                    trigger: "blur"
                }],
                npwp: [{
                    required: true,
                    message: "Entity NPWP is required!",
                    trigger: "blur"
                }],
                dirName: [{
                    required: true,
                    message: "Director's Name is required!",
                    trigger: "blur"
                }],
                dirNpwp: [{
                    required: true,
                    message: "Director's NPWP is required!",
                    trigger: "blur"
                }],

                address: [{
                    required: true,
                    message: "Entity Address is required!",
                    trigger: "blur"
                }],
                city: [{
                    required: true,
                    message: "City is required!",
                    trigger: "blur"
                }],
                zipcode: [{
                    required: true,
                    message: "ZIP Code is required!",
                    trigger: "blur"
                }],
                fax: [{
                    required: true,
                    message: "Fax Number is required!",
                    trigger: "blur"
                }],
                email: [{
                        required: true,
                        message: "Email is required!",
                        trigger: "blur"
                    },
                    {
                        type: "email",
                        message: "Please Input Valid Email",
                        trigger: ["blur", "change"]
                    }
                ],
                fullName: [{
                    required: true,
                    message: "Full Name is required!",
                    trigger: "blur"
                }],
                province: [{
                    required: true,
                    message: "Province is required!",
                    trigger: "blur"
                }],
                userName: [{
                    required: true,
                    message: "Username is required!",
                    trigger: "blur"
                }],
                adminEmail: [{
                        required: true,
                        message: "Email is required!",
                        trigger: "blur"
                    },
                    {
                        type: "email",
                        message: "Please Input Valid Email",
                        trigger: ["blur", "change"]
                    }
                ],
                adminPhone: [{
                    required: true,
                    message: "Phone Number is required!",
                    trigger: "blur"
                }],
                phone: [{
                    required: true,
                    message: "Phone Number is required!",
                    trigger: "blur"
                }],
                year: [{
                    required: true,
                    message: "Entity Year is required!",
                    trigger: "blur"
                }],
                branch: [{
                    required: true,
                    message: "Entity branch is required!",
                    trigger: "blur"
                }],
                code: [{
                    required: true,
                    message: "Entity Code is required!",
                    trigger: "blur"
                }],
                dbName: [{
                    required: true,
                    message: "Database Name is required!",
                    trigger: "blur"
                }],
            },
        };
    },
    methods: {
        onSubmit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$store.commit(mutation.BUTTON_STATUS, true)
                    this.$store.dispatch(action.CREATE_DEPARTMENT, this.form);
                } else {
                    return false;
                }
            });
        },
        lookcom(){
            console.log(this.selectCom, 'this is company yo')
        },
        addButton() {
            this.form.Pic.push({
                key: Date.now(),
                name: "",
                phone: ""
            });
        },
        removeDomain(item) {
            let index = this.form.Pic.indexOf(item);
            if (index !== -1) {
                this.form.Pic.splice(index, 1);
            }
        },
        Cancel() {
            this.$router.replace({
                path: "/list-department"
            });
        },

        isNumber(evt) {
            evt = evt ? evt : window.event;
            var charCode = evt.which ? evt.which : evt.keyCode;
            if (charCode > 33 && (charCode < 43 || charCode > 57)) {
                evt.preventDefault();
            } else {
                return true;
            }
        },
    },
    computed: {
        ...mapGetters({
            getError: getter.GET_ERROR,
            userRoles: getter.GET_USER_ROLES,
            button: getter.GET_BUTTON,
            errorMessage: getter.GET_ERROR_MESSAGE,
            selectHold: getter.GET_DROPDOWN_HOLDINGS,
            selectCom: getter.GET_DROPDOWN_COMPANY,
            selectEnt: getter.GET_DROPDOWN_ENTITY,
            selectDep: getter.GET_DROPDOWN_DEPARTMENT,
            selectLev: getter.GET_DROPDOWN_LEVEL
        }),

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
        margin-bottom: 20px;
    }
}

.el-col {
    border-radius: 5px;
}

.el-radio {
    margin: 0 160px 0 10px;
}

.el-select {
    width: 100%;
}

.page-quill {
    .card-base {
        box-sizing: border-box;

        .quill-editor {
            .ql-toolbar.ql-snow {
                border: none;
                background: lighten($background-color, 2%);
                border-bottom: 1px solid $background-color;
            }

            .ql-container.ql-snow {
                border: none;
            }
        }

        &.t-bubble {
            overflow: inherit;
        }
    }
}

@media (max-width: 768px) {
    .page-quill {
        .card-base {
            &.t-bubble {
                padding: 40px 20px;
            }
        }
    }
}
</style>
