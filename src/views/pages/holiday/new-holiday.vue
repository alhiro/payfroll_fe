<template>
<div class="page-quill scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <h1>Create New Holiday</h1>
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
import * as getter from "../../../store/getters-types";
import * as action from "../../../store/action-types";
import * as mutation from '../../../store/mutation-types';
export default {
    name: "NewLocation",
    data() {
        return {
            form: {
                HolidayLink: '',
                HolidayHintEn: '',
                HolidayHintId: '',
                HolidayLabelEn: '',
                HolidayLabelId: '',
                HolidayIcon: '',
                HolidayParentId: '',
                HolidayType: '',
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
            let obj = {
                HolidayLink: this.form.HolidayLink,
                HolidayHintEn: this.form.HolidayHintEn,
                HolidayHintId: this.form.HolidayHintId,
            };
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$store.commit(mutation.BUTTON_STATUS, true)
                    this.$store.dispatch(action.CREATE_HOLIDAY, this.form);
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
            error: getter.GET_ERROR,
            userRoles: getter.GET_USER_ROLES,
            button: getter.GET_BUTTON,
            selectOvt: getter.GET_DROPDOWN_OVT
        })
    },
    mounted() {
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
