<template>
<div class="page-quill scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <h1>Create New Level</h1>
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
                    <el-form-item label="Level Name" prop="levName">
                        <el-input placeholder="Input Level Name" v-model="form.levName"></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="12">
                    <el-form-item label="Level Code" prop="levCode">
                        <el-input placeholder="Input Level Code" v-model="form.levCode"></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="12">
                    <el-form-item label="Level Order" prop="levOrder">
                        <el-input placeholder="Input Level Order" v-on:keypress.native="isNumber" v-model="form.levOrder"></el-input>
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
                levName: [{
                    required: true,
                    message: "Level Name is required!",
                    trigger: "blur"
                }],
                 levOrder: [{
                    required: true,
                    message: "Level Order is required!",
                    trigger: "blur"
                }],
                 levCode: [{
                    required: true,
                    message: "Level Code is required!",
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
                    this.$store.dispatch(action.CREATE_LEVEL, this.form);
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
                path: "/list-level"
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
            selectCom: getter.GET_DROPDOWN_COMPANY
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
