<template>
<div class="page-quill scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <h1>Create New Entity</h1>
        <el-form ref="form" :rules="rules" :model="form">
            <el-row :gutter="20">
                <el-col :span="12" style="margin-top: 10px;">
                    <span><b>Entity</b></span>
                </el-col>
                <el-col :span="12" style="margin-top: 10px;">
                    <span><b>Information</b></span>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="Entity Name" prop="name">
                        <el-input placeholder="Input Entity Name" v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Director's Name" prop="dirName">
                        <el-input placeholder="Input Director's Name" v-model="form.dirName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Entity NPWP" prop="npwp">
                        <el-input placeholder="Input Entity NPWP" v-model="form.npwp"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Director's NPWP" prop="dirNpwp">
                        <el-input placeholder="Input Director's NPWP" v-model="form.dirNpwp"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Entity Phone" prop="phone">
                        <el-input placeholder="Input Entity phone" v-model="form.phone" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="BPJS TK" prop="bpjstk">
                        <el-input placeholder="Input BPJS TK" v-model="form.bpjstk"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Entity Email" prop="email">
                        <el-input placeholder="Input Entity Email" v-model="form.email"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="BPJS KS" prop="bpjsks">
                        <el-input placeholder="Input BPJS KS" v-model="form.bpjsks"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Fax Number" prop="fax">
                        <el-input placeholder="Input Fax Number" v-model="form.fax" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="KLU" prop="klu">
                        <el-input placeholder="Input KLU" v-model="form.klu"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="City" prop="city">
                        <el-select v-model="form.city" filterable placeholder="Select City">
                            <el-option
                            v-for="item in regencies"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Dtp Start" prop="dtp_start">
                        <el-date-picker type="date" placeholder="Pick a date" v-model="form.dtp_start" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="ZIP Code" prop="zipcode">
                        <el-input placeholder="Input ZIP Code" v-model="form.zipcode" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Keterangan" prop="note">
                        <el-input placeholder="Keterangan" v-model="form.note" type="textarea"></el-input>
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
    name: "NewEntity",
    data() {
        return {
            form: {
                
            },
            rules: {
                name: [{
                    required: true,
                    message: "Entity Name is required!",
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
                dtp_start: [{
                    required: true,
                    message: "DTP Start is required!",
                    trigger: "blur"
                }],
                phone: [{
                    required: true,
                    message: "Phone Number is required!",
                    trigger: "blur"
                }],
                klu: [{
                    required: true,
                    message: "KLU is required!",
                    trigger: "blur"
                }],
                bpjstk: [{
                    required: true,
                    message: "BPJS TK is required!",
                    trigger: "blur"
                }],
                bpjsks: [{
                    required: true,
                    message: "BPJS KS is required!",
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
                    this.$store.dispatch(action.CREATE_ENTITY, this.form);
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
                path: "/list-Entity"
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
    },
    computed: {
        ...mapGetters({
            getError: getter.GET_ERROR,
            button: getter.GET_BUTTON,
            content: getter.GET_ENTITY_DETAIL,
            errorMessage: getter.GET_ERROR_MESSAGE,
            regencies:getter.GET_LIST_REGENCIES
        }),
    },
    mounted() {
        this.$store.dispatch(action.LIST_REGENCIES);
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
