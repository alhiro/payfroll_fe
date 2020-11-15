<template>
<div class="page-quill scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <h1>Update Team</h1>
        <el-form ref="form" :rules="rules" :model="form">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="Company Name" prop="comId">
                        <el-select v-model="form.comId" filterable placeholder="Select">
                            <el-option v-for="item in selectCom" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Team Name" prop="temName">
                        <el-input placeholder="Input Team Name" v-model="form.temName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Saturday" prop="saturday">
                        <el-input placeholder="Input Saturday" v-on:keypress.native="isNumber" maxlength="2" v-model="form.saturday"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Sunday" prop="sunday">
                        <el-input placeholder="Input Sunday" v-on:keypress.native="isNumber" maxlength="2" v-model="form.sunday"></el-input>
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
                temName: [{
                    required: true,
                    message: "Team Name is required!",
                    trigger: "blur"
                }],
                saturday: [{
                    required: true,
                    message: "Saturday is required!",
                    trigger: "blur"
                }],
                sunday: [{
                    required: true,
                    message: "Sunday is required!",
                    trigger: "blur"
                }],
                graOrder: [{
                    required: true,
                    message: "Team Order is required!",
                    trigger: "blur"
                }],
                graCode: [{
                    required: true,
                    message: "Team Code is required!",
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
                    this.$store.dispatch(action.UPDATE_TEAM, this.form);
                } else {
                    return false;
                }
            });
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
                path: "/list-team"
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
            content: getter.GET_TEAM_DETAIL,
            errorMessage: getter.GET_ERROR_MESSAGE,
            selectHold: getter.GET_DROPDOWN_HOLDINGS,
            selectCom: getter.GET_DROPDOWN_COMPANY
        }),

    },
    created() {
        this.form.id = this.content.id
        this.form.comId = this.content.com_id
        this.form.temName = this.content.tem_name
        this.form.saturday = this.content.tem_saturday
        this.form.sunday = this.content.tem_sunday
    }
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
