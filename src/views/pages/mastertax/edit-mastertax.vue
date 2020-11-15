<template>
<div class="page-quill scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <h1>Edit Master Tax Type</h1>
        <el-form ref="form" :rules="rules" :model="form">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="Tax Code" prop="taxCode">
                        <el-input placeholder="Input Tax Code"  maxlength="4"  v-model="form.taxCode" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Tax Group" prop="taxGroup">
                        <el-input placeholder="Input Tax Group"  maxlength="1"  v-model="form.taxGroup"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Tax Type" prop="taxType">
                        <el-input placeholder="Input Tax Type" v-model="form.taxType"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Tax Description" prop="taxDesc">
                        <el-input placeholder="Input Description" v-model="form.taxDesc"></el-input>
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
import * as mutation from '../../../store/mutation-types';
import * as getter from "../../../store/getters-types";
import * as action from "../../../store/action-types";
export default {
    name: "EditLocation",
    data() {
        return {
            form: {
                menuLink: '',
                menuHintEn: '',
                menuHintId: '',
                menuLabelEn: '',
                menuLabelId: '',
                menuIcon: '',
                menuParentId: '',
                menuType: '',
                ovtTypeId: null,
                date: null,
            },
            select: [{
                    idrole: 2,
                    name: "Vendor"
                },
                {
                    idrole: 3,
                    name: "Enterprise"
                },
            ],
            rules: {
                taxCode: [{
                    required: true,
                    message: "Tax Code is required!",
                    trigger: "blur"
                }],
                taxDesc: [{
                    required: true,
                    message: "Tax Description is required!",
                    trigger: "blur"
                }],
                taxGroup: [{
                    required: true,
                    message: "Tax Group is required!",
                    trigger: "blur"
                }],
                taxType: [{
                    required: true,
                    message: "Tax Type is required!",
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
                    this.$store.dispatch(action.UPDATE_MASTERTAX, this.form);
                } else {
                    return false;
                }
            });
        },
        isNumber(evt) {
            evt = evt ? evt : window.event;
            var charCode = evt.which ? evt.which : evt.keyCode;
            if (
                charCode > 31 &&
                (charCode < 48 || charCode > 57)
            ) {
                evt.preventDefault();
            } else {
                return true;
            }
        },
        Cancel() {
            this.$router.replace({
                path: "/list-mastertaxtype"
            });
        }
    },
    computed: {
        ...mapGetters({
            content: getter.GET_MASTERTAX_DETAIL,
            selectOvt: getter.GET_DROPDOWN_OVT
        }),
    },
    created() {
        this.form.taxCode = this.content.taxCode
        this.form.taxDesc = this.content.taxDesc
        this.form.taxGroup = this.content.taxGroup
        this.form.taxType = this.content.taxType
        this.form.id = this.content.id
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
