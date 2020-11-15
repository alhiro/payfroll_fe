<template>
<div class="page-quill scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <h1>{{title}}</h1>
        <el-form ref="form" :rules="rules" :model="form">
            <el-row :gutter="20">
                <el-col :span="12" style="margin-top: 10px;">
                    <span><b>Maximum Occupational Support</b></span>
                </el-col>
                <el-col :span="12" style="margin-top: 10px;">
                    <span><b>Tax by Government</b></span>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="from regular income (%)" prop="ostPct">
                        <el-input :disabled="notPtkp" v-on:keypress.native="isNumber" placeholder="Input from regular income" maxlength="3" v-model="form.ostPct">

                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="For a month (in IDR)" prop="osAmt">
                        <el-input :disabled="notPtkp" v-on:keypress.native="isNumber" placeholder="Input For a month"  v-model="form.osAmt"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="Lower Limit(%)" prop="govMin">
                        <el-input :disabled="notPtkp" placeholder="Input Lower Limit" v-model="form.govMin" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="Upper Limit(in IDR)" prop="govMax">
                        <el-input :disabled="notPtkp" placeholder="Input Upper Limit" v-model="form.govMax" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24" style="margin-top: 10px;">
                    <span><b>Tarif</b></span>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="Rate 1 (%)" prop="r1pct">
                        <el-input :disabled="notPtkp" placeholder="Input Rate 1" maxlength="3" v-model="form.r1pct"  v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="Rate 1 (IDR)" prop="r1amt">
                        <el-input :disabled="notPtkp" placeholder="Input Rate 1" v-model="form.r1amt"  v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="Rate 2 (%)" prop="r2pct">
                        <el-input :disabled="notPtkp" placeholder="Input Rate 2" maxlength="3" v-model="form.r2pct" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="Rate 2 (IDR)" prop="r2amt">
                        <el-input :disabled="notPtkp" placeholder="Input Rate 2" v-model="form.r2amt" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="Rate 3 (%)" prop="r3pct">
                        <el-input :disabled="notPtkp" placeholder="Input Rate 3" maxlength="3" v-model="form.r3pct" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="Rate 3 (IDR)" prop="r3amt">
                        <el-input :disabled="notPtkp" placeholder="Input Rate 3" v-model="form.r3amt" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="Rate 4 (%)" prop="r4pct">
                        <el-input :disabled="notPtkp" placeholder="Input Rate 4" maxlength="3" v-model="form.r4pct" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="Rate 4 (IDR)" prop="r2amt">
                        <el-input :disabled="notPtkp" placeholder="Input Rate 4" v-model="form.r4amt" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="Rate 5 (%)" prop="r5pct">
                        <el-input :disabled="notPtkp" placeholder="Input Rate 5" maxlength="3" v-model="form.r5pct" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="Rate 5 (IDR)" prop="r5amt">
                        <el-input :disabled="notPtkp" placeholder="Input Rate 5" v-model="form.r5amt" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="24" style="margin-top: 10px;">
                    <span><b>Severance Tax</b></span>
                </el-col>

                <el-col :span="6">
                    <el-form-item label="Rate 1 (%)" prop="sev1pct">
                        <el-input :disabled="notPtkp" placeholder="Input sev1pct" maxlength="3" v-model="form.sev1pct" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="Rate 1 (IDR)" prop="sev1amt">
                        <el-input :disabled="notPtkp" placeholder="Input sev1amt" v-model="form.sev1amt" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="Rate 2 (%)" prop="sev2pct">
                        <el-input :disabled="notPtkp" placeholder="Input sev2pct" maxlength="3" v-model="form.sev2pct" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="Rate 2 (IDR)" prop="sev2amt">
                        <el-input :disabled="notPtkp" placeholder="Input sev2amt" v-model="form.sev2amt" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="Rate 3 (%)" prop="sev3pct">
                        <el-input :disabled="notPtkp" placeholder="Input sev3pct" maxlength="3" v-model="form.sev3pct" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="Rate 3 (IDR)" prop="sev3amt">
                        <el-input :disabled="notPtkp" placeholder="Input sev3amt" v-model="form.sev3amt" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="Rate 4 (%)" prop="sev4pct">
                        <el-input :disabled="notPtkp" placeholder="Input sev4pct" maxlength="3" v-model="form.sev4pct" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="Rate 4 (IDR)" prop="sev4amt">
                        <el-input :disabled="notPtkp" placeholder="Input sev4amt" v-model="form.sev4amt" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="Rate 5 (%)" prop="sev5pct">
                        <el-input :disabled="notPtkp" placeholder="Input sev5pct" maxlength="3" v-model="form.sev5pct" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="Rate 5 (IDR)" prop="sev5amt">
                        <el-input :disabled="notPtkp" placeholder="Input sev5amt" v-model="form.sev5amt" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>


                <el-col :span="24" style="margin-top: 10px;">
                        <span><b>Non-taxable Income</b></span>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="S/0  Single 0 Dependent" prop="s0amt">
                        <el-input :disabled="ptkpss" placeholder="Input Single 0 Dependent" v-model="form.s0amt" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="S/1  Single 1 Dependent" prop="s1amt">
                        <el-input :disabled="ptkpss" placeholder="Input Single 1 Dependent" v-model="form.s1amt" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="S/2  Single 2 Dependent" prop="s2amt">
                        <el-input :disabled="ptkpss" placeholder="Input Single 2 Dependent" v-model="form.s2amt" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="S/3  Single 3 Dependent" prop="s3amt">
                        <el-input :disabled="ptkpss" placeholder="Input Single 3 Dependent" v-model="form.s3amt" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="M/0  Married 0 Dependent" prop="m0amt">
                        <el-input :disabled="ptkpss" placeholder="Input Married 0 Dependent"  v-model="form.m0amt" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="M/1  Married 1 Dependent" prop="m1amt">
                        <el-input :disabled="ptkpss" placeholder="Input Married 1 Dependent" v-model="form.m1amt" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="M/2  Married 2 Dependent" prop="m2amt">
                        <el-input :disabled="ptkpss" placeholder="Input Married 2 Dependent"  v-model="form.m2amt" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="M/3  Married 3 Dependent" prop="m3amt">
                        <el-input :disabled="ptkpss" placeholder="Input Married 3 Dependent" v-model="form.m3amt" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="24" style="margin-top: 10px;">
                    <el-checkbox v-model="form.nog" :disabled="netgross">
                        <span><b>Use Net on Gross Method</b></span>
                    </el-checkbox>
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
            title : 'Create New Save Setting',
            ptkpss: false,
            notPtkp: false,
            netgross: false,
            form: {
                year: '',
                holdingName: '',
                nog: false,
                // holdingPic: [{
                //     key: 0,
                //     code: null,
                //     description: null,
                //     amount: null,
                // }],
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
                    if(this.$route.params.id || this.$route.path === '/reset-tax-regulation' || this.$route.path === '/update-ptkp-taxreg' ) {
                        this.$store.dispatch(action.UPDATE_TAX_REGULATION,
                            {...this.form,
                                    id : this.content.id,
                                    compId: this.content.companySetting.comId,
                                    year: this.content.companySetting.year
                            });
                    }else {
                        this.$store.dispatch(action.CREATE_TAX_REGULATION, this.form);
                    }

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
                path: "/list-tax-regulation"
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
            content: getter.GET_TAX_REGULATION_DETAIL,
            button: getter.GET_BUTTON,
            errorMessage: getter.GET_ERROR_MESSAGE,
            resetData: getter.GET_TAX_REGULATION_MASTER_DETAIL,
            listptkps: getter.GET_LIST_PTKPS
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
        if(this.$route.params.id) {
            if (this.content !== null) {
                this.form.year = this.content.year
                this.form.ostPct = this.content.ostPct
                this.form.osAmt = this.content.osAmt
                this.form.r1pct = this.content.r1pct
                this.form.r1amt = this.content.r1amt
                this.form.r2pct = this.content.r2pct
                this.form.r2amt = this.content.r2amt
                this.form.r3pct = this.content.r3pct
                this.form.r3amt = this.content.r3amt
                this.form.r4pct = this.content.r4pct
                this.form.r4amt = this.content.r4amt
                this.form.r5pct = this.content.r5pct
                this.form.r5amt = this.content.r5amt
                this.form.sev1pct = this.content.sev1pct
                this.form.sev1amt = this.content.sev1amt
                this.form.sev2pct = this.content.sev2pct
                this.form.sev2amt = this.content.sev2amt
                this.form.sev3pct = this.content.sev3pct
                this.form.sev3amt = this.content.sev3amt
                this.form.sev4pct = this.content.sev4pct
                this.form.sev4amt = this.content.sev4amt
                this.form.sev5pct = this.content.sev5pct
                this.form.sev5amt = this.content.sev5amt
                this.form.govMin = this.content.govMin
                this.form.govMax = this.content.govMax
                this.form.nog = this.content.nog
                this.form.id  = this.content.id
                for (let i = 0; i < this.content.ptkps.length; i++) {
                    if(this.content.ptkps[i].code === 'S/0') {
                        this.form.s0amt = this.content.ptkps[i].amount
                    }else if(this.content.ptkps[i].code === 'S/1'){
                        this.form.s1amt = this.content.ptkps[i].amount
                    }else if(this.content.ptkps[i].code === 'S/2'){
                        this.form.s2amt = this.content.ptkps[i].amount
                    }else if(this.content.ptkps[i].code === 'S/3'){
                        this.form.s3amt = this.content.ptkps[i].amount
                    }else if(this.content.ptkps[i].code === 'M/0'){
                        this.form.m0amt = this.content.ptkps[i].amount
                    }else if(this.content.ptkps[i].code === 'M/1'){
                        this.form.m1amt = this.content.ptkps[i].amount
                    }else if(this.content.ptkps[i].code === 'M/2'){
                        this.form.m2amt = this.content.ptkps[i].amount
                    }else if(this.content.ptkps[i].code === 'M/3'){
                        this.form.m3amt = this.content.ptkps[i].amount
                    }
                }
            }
        }else if(this.$route.path === '/reset-tax-regulation'){
            if(this.resetData !== null){
                this.form.year = this.resetData.masterYear
                this.form.ostPct = this.resetData.masterOsPct
                this.form.osAmt = this.resetData.masterOsAmt
                this.form.r1pct = this.resetData.masterR1Pct
                this.form.r1amt = this.resetData.masterR1Amt
                this.form.r2pct = this.resetData.masterR2Pct
                this.form.r2amt = this.resetData.masterR2Amt
                this.form.r3pct = this.resetData.masterR3Pct
                this.form.r3amt = this.resetData.masterR3Amt
                this.form.r4pct = this.resetData.masterR4Pct
                this.form.r4amt = this.resetData.masterR4Amt
                this.form.r5pct = this.resetData.masterR5Pct
                this.form.r5amt = this.resetData.masterR5Amt
                this.form.sev1pct = this.resetData.masterSev1Pct
                this.form.sev1amt = this.resetData.masterSev1Amt
                this.form.sev2pct = this.resetData.masterSev2Pct
                this.form.sev2amt = this.resetData.masterSev2Amt
                this.form.sev3pct = this.resetData.masterSev3Pct
                this.form.sev3amt = this.resetData.masterSev3Amt
                this.form.sev4pct = this.resetData.masterSev4Pct
                this.form.sev4amt = this.resetData.masterSev4Amt
                this.form.sev5pct = this.resetData.masterSev5Pct
                this.form.sev5amt = this.resetData.masterSev5Amt
                this.form.govMin = this.resetData.masterGovMin
                this.form.govMax = this.resetData.masterGovMax
                this.form.nog = this.resetData.masterNog === 0 ? true : false
                this.form.id  = this.resetData.id
                this.title = 'Reset Save Setting'
                this.ptkpss = true
                this.netgross = true
                for (let i = 0; i < this.content.ptkps.length; i++) {
                    if(this.content.ptkps[i].code === 'S/0') {
                        this.form.s0amt = this.content.ptkps[i].amount
                    }else if(this.content.ptkps[i].code === 'S/1'){
                        this.form.s1amt = this.content.ptkps[i].amount
                    }else if(this.content.ptkps[i].code === 'S/2'){
                        this.form.s2amt = this.content.ptkps[i].amount
                    }else if(this.content.ptkps[i].code === 'S/3'){
                        this.form.s3amt = this.content.ptkps[i].amount
                    }else if(this.content.ptkps[i].code === 'M/0'){
                        this.form.m0amt = this.content.ptkps[i].amount
                    }else if(this.content.ptkps[i].code === 'M/1'){
                        this.form.m1amt = this.content.ptkps[i].amount
                    }else if(this.content.ptkps[i].code === 'M/2'){
                        this.form.m2amt = this.content.ptkps[i].amount
                    }else if(this.content.ptkps[i].code === 'M/3'){
                        this.form.m3amt = this.content.ptkps[i].amount
                    }
                }
            }
        }else if(this.$route.path === '/update-ptkp-taxreg') {
            if (this.content !== null) {
                this.form.year = this.content.year
                this.form.ostPct = this.content.ostPct
                this.form.osAmt = this.content.osAmt
                this.form.r1pct = this.content.r1pct
                this.form.r1amt = this.content.r1amt
                this.form.r2pct = this.content.r2pct
                this.form.r2amt = this.content.r2amt
                this.form.r3pct = this.content.r3pct
                this.form.r3amt = this.content.r3amt
                this.form.r4pct = this.content.r4pct
                this.form.r4amt = this.content.r4amt
                this.form.r5pct = this.content.r5pct
                this.form.r5amt = this.content.r5amt
                this.form.sev1pct = this.content.sev1pct
                this.form.sev1amt = this.content.sev1amt
                this.form.sev2pct = this.content.sev2pct
                this.form.sev2amt = this.content.sev2amt
                this.form.sev3pct = this.content.sev3pct
                this.form.sev3amt = this.content.sev3amt
                this.form.sev4pct = this.content.sev4pct
                this.form.sev4amt = this.content.sev4amt
                this.form.sev5pct = this.content.sev5pct
                this.form.sev5amt = this.content.sev5amt
                this.form.govMin = this.content.govMin
                this.form.govMax = this.content.govMax
                this.form.nog = this.content.nog
                this.form.id  = this.content.id
                this.title = 'Update New PTKP'
                this.notPtkp = true
                this.netgross = true
                for (let i = 0; i < this.listptkps.length; i++) {
                    if(this.listptkps[i].masterCode === 'S/0') {
                        this.form.s0amt = this.listptkps[i].masterAmt
                    }else if(this.listptkps[i].masterCode === 'S/1') {
                        this.form.s1amt = this.listptkps[i].masterAmt
                    }else if(this.listptkps[i].masterCode === 'S/2') {
                        this.form.s2amt = this.listptkps[i].masterAmt
                    }else if(this.listptkps[i].masterCode === 'S/3') {
                        this.form.s3amt = this.listptkps[i].masterAmt
                    }else if(this.listptkps[i].masterCode === 'M/0') {
                        this.form.m0amt = this.listptkps[i].masterAmt
                    }else if(this.listptkps[i].masterCode === 'M/1') {
                        this.form.m1amt = this.listptkps[i].masterAmt
                    }else if(this.listptkps[i].masterCode === 'M/2') {
                        this.form.m2amt = this.listptkps[i].masterAmt
                    }else if(this.listptkps[i].masterCode === 'M/3') {
                        this.form.m3amt = this.listptkps[i].masterAmt
                    }
                }
                console.log('mantapun', this.listptkps)
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
