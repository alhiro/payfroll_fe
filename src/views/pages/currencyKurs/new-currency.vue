<template>
<div class="page-quill scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <h1>{{title}}</h1>
        <el-form ref="form" :rules="rules" :model="form">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="Payroll Item ID" prop="payrollItemId">
                        <el-input placeholder="Input Payroll Item ID" v-on:keypress.native="isNumber" maxlength="2" v-model="form.payrollItemId"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Currency ID" prop="currencyId">
                        <el-input placeholder="Input Currency ID" v-on:keypress.native="isNumber" maxlength="6" v-model="form.currencyId"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Currency Code" prop="currencyCode">
                        <el-input placeholder="Input Currency Code" v-model="form.currencyCode" :disabled="currencyCodeStatus"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Amount" prop="amount">
                        <el-input placeholder="Input Amount" v-on:keypress.native="isNumber" maxlength="6" v-model="form.amount"></el-input>
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
            currencyCodeStatus: false,
            title : 'Create New Currency Rate',
            form: {
            },
            rules: {
                payrollItemId: [{
                    required: true,
                    message: "Payroll Item ID is required!",
                    trigger: "blur"
                }],
                currencyId: [{
                    required: true,
                    message: "currency ID is required!",
                    trigger: "blur"
                }],
                currencyCode: [{
                    required: true,
                    message: "Currency Code is required!",
                    trigger: "blur"
                }],
                amount: [{
                    required: true,
                    message: "Amount is required!",
                    trigger: "blur"
                }]
            },
        };
    },
    methods: {
        onSubmit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$store.commit(mutation.BUTTON_STATUS, true)
                    if(this.$route.params.id){
                        this.$store.dispatch(action.UPDATE_CURRENCY_KURS, {...this.form, id : this.form.id});
                    }else {
                        this.$store.dispatch(action.CREATE_CURRENCY_KURS, this.form);
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
                path: "/list-currency-kurs"
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
            content: getter.GET_CURRENCY_KURS_DETAIL,
        }),

    },
    created() {
        if(this.$route.params.id){
            if(this.content !== null){
                this.form.payrollItemId = this.content.payrollItem.id
                this.form.currencyId = this.content.currencyId
                this.form.currencyCode = this.content.currencyCode
                this.form.amount = this.content.amount
                this.form.id = this.content.id
                this.title = 'Edit Currency Rate'
                this.currencyCodeStatus = true
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
