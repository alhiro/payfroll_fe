<template>
<div class="page-quill scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <h1>Create New Holding</h1>
        <el-form ref="form" :rules="rules" :model="form">
            <el-row :gutter="20">
                <el-col :span="9">
                    <el-form-item label="Holding Name" prop="holdingName">
                        <el-input placeholder="Input Holding Name" v-model="form.holdingName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="9">
                    <el-form-item label="Holding NPWP" prop="holdingNpwp">
                        <el-input placeholder="Input Holding NPWP" v-model="form.holdingNpwp"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-button @click="Check()" style="width: 100%; margin-top: 38px;" type="warning">Check Availability</el-button>
                    <center>
                        <i v-if="errorButton === 1" style="color: red">{{getError.data.holdingNpwp}}<br>{{getError.data.holdingName}}</i>
                        <i v-if="errorButton === 3" style="color: red">{{getError.message}} </i>
                        <i v-if="errorButton === 2" style="color: green">Holding Name and NPWP are Availabile</i>
                    </center>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Holding Type" prop="holdingType">
                        <el-input placeholder="Input Holding Type" maxlength="2" v-model="form.holdingType" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Holding Email" prop="email">
                        <el-input placeholder="Input Holding Email" v-model="form.email"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24" style="margin-top: 10px;">
                    <span><b>Address</b></span>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Holding Address" prop="holdingAddress">
                        <el-input placeholder="Input Holding Address" v-model="form.holdingAddress"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="City" prop="city">
                        <el-input placeholder="Input City" v-model="form.city"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="ZIP Code" prop="zip">
                        <el-input placeholder="Input ZIP Code" v-model="form.zip" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="FAX Number" prop="fax">
                        <el-input placeholder="Input Fax Number" v-model="form.fax" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-col>
                        <span><b>Holding PIC</b></span>
                        <el-button class="el-icon-plus" type="success" size="mini" @click="addButton" circle style="margin-left: 10px"></el-button>
                    </el-col>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <div v-for="(domain, index) in form.holdingPic" :key="domain.key">
                    <el-col :span="11">
                        <div class="grid-content">
                            <el-form-item :prop="'holdingPic.' + index + '.picName'" :rules="[
                    {required: true, message: 'PIC Name can not be empty', trigger: 'blur' },
                    { min: 3, message: 'Name must be at least 3 characters long.' },
                    { max: 45, message: 'Name must not be greater than 45 characters long.'}
                    ]">
                                <el-input placeholder="PIC Name" v-model="domain.picName" class="leb_same"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="11">
                        <div class="grid-content">
                            <el-form-item :prop="'holdingPic.' + index + '.picEmail'" :rules="[
                    { required: true, message: 'PIC Email can not be empty', trigger: 'blur'},  {
                        type: 'email',
                        message: 'Please Input Valid Email',
                        trigger: ['blur', 'change']
                    }]">
                                <el-input type="email" placeholder="PIC Email" v-model="domain.picEmail" class="leb_same"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="11">
                        <div class="grid-content">
                            <el-form-item :prop="'holdingPic.' + index + '.picPhoneNumber'" :rules="[
                    { required: true, message: 'PIC Phone Number can not be empty', trigger: 'blur'}, 
                    { min: 10, message: 'Phone must be at least 10 digits.' },
                    { max: 45, message: 'Phone must not be greater than 45 digits.' }]">
                                <el-input placeholder="PIC Phone Number" v-model="domain.picPhoneNumber" class="leb_same" v-on:keypress.native="isNumber"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="11">
                        <div class="grid-content">
                            <el-form-item :prop="'holdingPic.' + index + '.picPosition'" :rules="[
                    { required: true, message: 'PIC Position can not be empty', trigger: 'blur'}]">
                                <el-input placeholder="PIC Position" v-model="domain.picPosition" class="leb_same"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="1">
                        <div class="grid-content">
                            <el-button class="el-icon-minus" type="danger" size="mini" @click.prevent="removeDomain(domain)" circle style="margin-top: 13px"></el-button>
                        </div>
                    </el-col>
                </div>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-col>
                        <span><b>Company Admin</b></span>
                    </el-col>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="Admin Name" prop="fullName">
                        <el-input placeholder="Input Full Name" v-model="form.fullName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Admin Username" prop="userName">
                        <el-input placeholder="Input Username" v-model="form.userName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Admin Email" prop="adminEmail">
                        <el-input placeholder="Input Email" type="email" v-model="form.adminEmail"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Admin Phone Number" prop="adminPhone">
                        <el-input placeholder="Input Phone Number" v-on:keypress.native="isNumber" v-model="form.adminPhone"></el-input>
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
                holdingName: '',
                holdingPic: [{
                    key: 0,
                    picName: null,
                    picPosition: null,
                    picEmail: null,
                    picPhoneNumber: null
                }],
            },
            rules: {
                holdingName: [{
                    required: true,
                    message: "Holding Name is required!",
                    trigger: "blur"
                }],
                holdingType: [{
                    required: true,
                    message: "Holding Type is required!",
                    trigger: "blur"
                }],
                holdingNpwp: [{
                    required: true,
                    message: "Holding NPWP is required!",
                    trigger: "blur"
                }],
                holdingAddress: [{
                    required: true,
                    message: "Holding Address is required!",
                    trigger: "blur"
                }],
                city: [{
                    required: true,
                    message: "City is required!",
                    trigger: "blur"
                }],
                zip: [{
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
                        trigger: "blur",

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
            },
        };
    },
    methods: {
        onSubmit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$store.commit(mutation.BUTTON_STATUS, true)
                    this.$store.dispatch(action.CREATE_CONSULTANT, this.form);
                } else {
                    return false;
                }
            });
        },
        addButton() {
            this.form.holdingPic.push({
                key: Date.now(),
                name: "",
                phone: ""
            });
        },
        removeDomain(item) {
            let index = this.form.holdingPic.indexOf(item);
            if (index !== -1) {
                this.form.holdingPic.splice(index, 1);
            }
        },
        Cancel() {
            this.$router.replace({
                path: "/list-consultant"
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
        }
    },
    computed: {
        ...mapGetters({
            getError: getter.GET_ERROR,
            userRoles: getter.GET_USER_ROLES,
            button: getter.GET_BUTTON,
            errorMessage: getter.GET_ERROR_MESSAGE,
        }),
        errorButton() {
            if (this.getError.code === '409') {
                return 1
            } else if (this.getError.code === '200') {
                return 2
            } else {
                return 3
            }
        },

    },
    async mounted() {
        await this.$store.dispatch(action.DATA_ERROR, '');
        this.$store.dispatch(action.USER_ROLES);
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
