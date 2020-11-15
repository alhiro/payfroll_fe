<template>
<div class="page-quill scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <h1>{{title}}</h1>
        <el-form ref="form" :rules="rules" :model="form">
            <el-row :gutter="20">
<!--                <el-col :span="8">-->
<!--                    <el-form-item label="Company Name" prop="companyId">-->
<!--                        <el-select v-model="form.companyId" filterable placeholder="Select">-->
<!--                            <el-option v-for="item in selectCom" :key="item.id" :label="item.name" :value="item.id"></el-option>-->
<!--                        </el-select>-->
<!--                    </el-form-item>-->
<!--                </el-col>-->
                <el-col :span="8">
                    <el-form-item label="Name" prop="name">
                        <el-input placeholder="Input Name" v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Type Name" prop="typeName">
                        <el-input placeholder="Input Type Name" v-model="form.typeName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Tax Mode" prop="taxMode">
                        <el-select v-model="form.taxMode" filterable placeholder="Select">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="All Employee" prop="allEmp">
                        <el-select v-model="form.allEmp" filterable placeholder="Select">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Carry Forward" prop="carryForward">
                        <el-select v-model="form.carryForward" filterable placeholder="Select">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Wage Bpjs Tk" prop="wageBpjsTk">
                        <el-select v-model="form.wageBpjsTk" filterable placeholder="Select">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Wage Bpjs Kes" prop="wageBpjsKes">
                        <el-select v-model="form.wageBpjsKes" filterable placeholder="Select">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="PM" prop="pm">
                        <el-input placeholder="Input PM" v-model="form.pm"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Order" prop="order">
                        <el-input placeholder="Input Order" v-model="form.order"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="A1no" prop="a1no">
                        <el-input placeholder="Input A1no" v-model="form.a1no"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Year" prop="year">
                        <el-input placeholder="Input Year" v-on:keypress.native="isNumber" maxlength="4" v-model="form.year"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Code" prop="code">
                        <el-input placeholder="Input Code" v-model="form.code"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Type" prop="type">
                        <el-input placeholder="Input Type" v-model="form.type"></el-input>
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
            title: 'Create New Payroll Item',
            options: [{
               value: 'Y',
               label: 'Yes'
            },{
                value: 'N',
                label: 'No'
            }],
            form: {
                companyId: null,
                year: null,
                code: "",
                type: "",
                typeName: "",
                name: "",
                taxMode: "",
                allEmp: "",
                carryForward: "",
                wageBpjsTk: "",
                wageBpjsKes: "",
                pm: "",
                order: null,
                a1no: null
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
                    if(this.$route.params.id){
                        this.$store.dispatch(action.UPDATE_PAYROLL_ITEM, this.form);
                    }else {
                        this.$store.dispatch(action.CREATE_PAYROLL_ITEM, this.form);
                    }
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
                path: "/list-payroll-item"
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
            content: getter.GET_PAYROLL_ITEM_DETAIL
        }),

    },
    created() {
        if(this.$route.params.id) {
            if (this.content !== null) {
                this.form.year = this.content.companySetting.year;
                this.form.code = this.content.code;
                this.form.type = this.content.type;
                this.form.typeName = this.content.typeName;
                this.form.name = this.content.name;
                this.form.taxMode = this.content.taxMode;
                this.form.allEmp = this.content.allEmp;
                this.form.carryForward = this.content.carryForward;
                this.form.wageBpjsTk = this.content.wageBpjsTk;
                this.form.wageBpjsKes = this.content.wageBpjsKes;
                this.form.pm = this.content.pm;
                this.form.order = this.content.order;
                this.form.a1no = this.content.a1no;
                this.title = 'Edit Payroll Item'
            }
        }
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
