<template>
<div class="page-quill scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <h1>Update Holiday</h1>
        <el-form ref="form" :rules="rules" :model="form">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="Select Overtime Type" prop="ovtTypeId">
                        <el-select v-model="form.ovtTypeId" filterable placeholder="Select">
                            <el-option v-for="item in selectOvt" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Holiday Description" prop="description">
                        <el-input placeholder="Input Holiday Description" v-model="form.description"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Date" prop="date">
                        <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="Pick a date" v-model="form.date" style="width: 100%;"></el-date-picker>
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
                description: [{
                    required: true,
                    message: "Holiday Description is required!",
                    trigger: "blur"
                }],
                date: [{
                    required: true,
                    message: "Holiday Date is required!",
                    trigger: "blur"
                }],
                ovtTypeId: [{
                    required: true,
                    message: "Holiday Overtime Type is required!",
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
                    this.$store.dispatch(action.UPDATE_HOLIDAY, this.form);
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
                path: "/list-holiday"
            });
        }
    },
    computed: {
        ...mapGetters({
            content: getter.GET_HOLIDAY_DETAIL,
            selectOvt: getter.GET_DROPDOWN_OVT
        }),
    },
    created() {
        this.form.ovtTypeId = this.content[0].ovtType.id
        this.form.description = this.content[0].holiday.description
        this.form.date = this.content[0].holiday.date
        this.form.id = this.content[0].holiday.id
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
