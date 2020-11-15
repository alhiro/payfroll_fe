<template>
<div class="page-quill scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <h1>{{title}}</h1>
        <el-form ref="form" :rules="rules" :model="form">
            <el-row :gutter="20">
<!--                <el-col :span="12">-->
<!--                    <el-form-item label="Company Name" prop="comId">-->
<!--                        <el-select v-model="form.comId" filterable placeholder="Select">-->
<!--                            <el-option v-for="item in selectCom" :key="item.id" :label="item.name" :value="item.id"></el-option>-->
<!--                        </el-select>-->
<!--                    </el-form-item>-->
<!--                </el-col>-->
<!--                 <el-col :span="12">-->
<!--                    <el-form-item label="ID" prop="id">-->
<!--                        <el-input placeholder="Input Level Order" v-on:keypress.native="isNumber" maxlength="3" v-model="form.id"></el-input>-->
<!--                    </el-form-item>-->
<!--                </el-col>-->
                <el-col :span="12">
                    <el-form-item label="Rate Amount" prop="ratAmt">
                        <el-input placeholder="Input Rate Amount" v-on:keypress.native="isNumber" maxlength="6" v-model="form.ratAmt"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Rate Week" prop="ratWeek">
                        <el-input placeholder="Input Rate Week" v-on:keypress.native="isNumber" maxlength="6" v-model="form.ratWeek"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Rate Month" prop="ratMonth">
                        <el-input placeholder="Input Rate Month" v-on:keypress.native="isNumber" maxlength="6" v-model="form.ratMonth"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Rate Year" prop="ratYear">
                        <el-input placeholder="Input Rate Year" v-on:keypress.native="isNumber" maxlength="6" v-model="form.ratYear"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Currency ID" prop="curId">
                        <el-input placeholder="Input Currency Id" v-on:keypress.native="isNumber" maxlength="2" v-model="form.curId"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Start" prop="startDate">
                        <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="Pick a date" v-model="form.startDate" style="width: 100%;"></el-date-picker>
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
            title: 'Create New Currency Rate',
            form: {
            },
            rules: {
                ratAmt: [{
                    required: true,
                    message: "Rate Amount is required!",
                    trigger: "blur"
                }],
                ratWeek: [{
                    required: true,
                    message: "Rate Week is required!",
                    trigger: "blur"
                }],
                 ratMonth: [{
                    required: true,
                    message: "Rate Month is required!",
                    trigger: "blur"
                }],
                 ratYear: [{
                    required: true,
                    message: "Rate Year is required!",
                    trigger: "blur"
                }],
                startDate: [{
                    required: true,
                    message: "Start Date is required!",
                    trigger: "blur"
                }],
                curId: [{
                    required: true,
                    message: "Currency ID is required!",
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
                    // if(this.$route.params.id){
                    //     this.$store.dispatch(action.UPDATE_CURRENCY_RATE, this.form);
                    //     console.log('masuk d sini ')
                    // }else {
                        this.$store.dispatch(action.CREATE_CURRENCY_RATE, this.form);
                    // }
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
                path: "/list-currency-rate"
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
            content: getter.GET_CURRENCY_RATE_DETAIL,
        }),

    },
    created() {
        if(this.$route.params.id){
            if(this.content !== null){
                this.form.ratAmt = this.content.ratAmt
                this.form.ratWeek = this.content.ratWeek
                this.form.ratMonth = this.content.ratMonth
                this.form.ratYear = this.content.ratYear
                this.form.curId = this.content.curId
                this.form.startDate = this.content.start
                this.title = 'Edit Currency Rate'
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
