<template>
<div class="page-quill scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <h1>Create New Company</h1>
        <el-form ref="form" :rules="rules" :model="form">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="Holding Name" prop="holdingId">
                        <el-select v-model="form.holdingId" filterable placeholder="Select">
                            <el-option v-for="item in selectHold" :key="item.id" :label="item.holdingName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Company Name" prop="name">
                        <el-input placeholder="Input Company Name" v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Company NPWP" prop="npwp">
                        <el-input placeholder="Input Company NPWP" v-model="form.npwp"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Company Email" prop="email">
                        <el-input placeholder="Input Company Email" v-model="form.email"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Company Phone" prop="phone">
                        <el-input placeholder="Input Company phone" v-model="form.phone" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Company Year" prop="year">
                        <el-input placeholder="Input Company Year" v-model="form.year" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Code" prop="code">
                        <el-input placeholder="Code" v-model="form.code"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Database" prop="dbName">
                        <el-input placeholder="Input Database" v-model="form.dbName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24" style="margin-top: 10px;">
                    <span><b>Address</b></span>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Company Address" prop="address">
                        <el-input placeholder="Input Company Address" v-model="form.address"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="City" prop="city">
                        <el-input placeholder="Input City" v-model="form.city"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Province" prop="province">
                        <el-input placeholder="Input Province" v-model="form.province"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="ZIP Code" prop="zipcode">
                        <el-input placeholder="Input ZIP Code" v-model="form.zipcode" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Branch" prop="branch">
                        <el-input placeholder="Input Branch Code" v-model="form.branch"></el-input>
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
                holdingId: [{
                    required: true,
                    message: "Holding Name is required!",
                    trigger: "blur"
                }],
                name: [{
                    required: true,
                    message: "Company Name is required!",
                    trigger: "blur"
                }],
                Type: [{
                    required: true,
                    message: "Company Type is required!",
                    trigger: "blur"
                }],
                npwp: [{
                    required: true,
                    message: "Company NPWP is required!",
                    trigger: "blur"
                }],
                address: [{
                    required: true,
                    message: "Company Address is required!",
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
                    message: "FAX Number is required!",
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
                    message: "Company Year is required!",
                    trigger: "blur"
                }],
                branch: [{
                    required: true,
                    message: "Company branch is required!",
                    trigger: "blur"
                }],
                code: [{
                    required: true,
                    message: "Company Code is required!",
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
                    this.$store.dispatch(action.CREATE_COMPANY, this.form);
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
                path: "/list-company"
            });
        },

        Check() {
            this.$store.commit(mutation.BUTTON_STATUS, true)
            this.$store.dispatch(action.CHECK_CONSULTANT, this.form);
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
        errorButton() {
            console.log(this.getError, 'error here')
            if (this.getError.code === '409') {
                return true
            } else if (this.getError.code === '200') {
                return false
            }
        },
    },
    computed: {
        ...mapGetters({
            getError: getter.GET_ERROR,
            userRoles: getter.GET_USER_ROLES,
            button: getter.GET_BUTTON,
            content: getter.GET_CONSULTANT_DETAIL,
            errorMessage: getter.GET_ERROR_MESSAGE,
            selectHold: getter.GET_DROPDOWN_HOLDINGS
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
