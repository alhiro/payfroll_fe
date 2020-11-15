<template>
<div class="page-quill scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <el-form ref="form" :rules="rules" :model="form">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="Menu Link" prop="menuLink">
                        <el-input placeholder="Input Menu Link" v-model="form.menuLink"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Menu Hint En" prop="menuHintEn">
                        <el-input placeholder="Input Menu Hint En" v-model="form.menuHintEn"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Menu Hint Id" prop="menuHintId">
                        <el-input placeholder="Input Menu Hint Id" v-model="form.menuHintId"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Menu Label En" prop="menuLabelEn">
                        <el-input placeholder="Input Menu Label En" v-model="form.menuLabelEn"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Menu Label Id" prop="menuLabelId">
                        <el-input placeholder="Input Menu Label Id" v-model="form.menuLabelId"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Menu Parent Id" prop="menuParentId">
                        <el-select v-model="form.menuParentId" filterable placeholder="Menu Parent Id">
                            <el-option v-for="item in menuParent" :key="item.menu_id" :label="item.menu_hint_en" :value="item.menu_id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Menu Type" prop="menuType">
                        <el-select v-model="form.menuType" filterable placeholder="Select Menu Type">
                            <el-option v-for="item in menuTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Menu Icon"><br/>
                        <v-select v-model="form.menuIcon" :options="menuIcons" label="name" placeholder="Select Icon Menu">
                            <template slot="option" slot-scope="option">
                                <span class="mdi" :class="option.value"></span>
                                {{ option.name }}
                            </template>
                        </v-select>
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
            },
            menuTypes: [
                {id: 1, name: 'Klik Payroll'},
                {id: 2, name: 'Holding/ Consultant'},
                {id: 3, name: 'Company'}
            ],
            menuIcons: [
                {value: 'mdi mdi-account-settings-variant', name: 'mdi-account-settings-variant'},
                {value: 'mdi mdi-account-network', name: 'mdi-account-network'},
                {value: 'mdi mdi-account-multiple', name: 'mdi-account-multiple'},
                {value: 'mdi mdi-cash', name: 'mdi-cash'},
                {value: 'mdi mdi-chart-areaspline', name: 'mdi-chart-areaspline'},
                {value: 'mdi mdi-package-variant', name: 'mdi-package-variant'},
            ],   
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
                menuLink: [{
                    required: true,
                    message: "Menu Link is required!",
                    trigger: "blur"
                }],
                menuHintEn: [{
                    required: true,
                    message: "Menu Hint En is required!",
                    trigger: "blur"
                }],
                menuHintId: [{
                    required: true,
                    message: "Menu Hint Id is required!",
                    trigger: "blur"
                }],
                menuLabelEn: [{
                    required: true,
                    message: "Menu Label En is required!",
                    trigger: "blur"
                }],
                menuLabelId: [{
                    required: true,
                    message: "Menu Label Id is required!",
                    trigger: "blur"
                }],
                menuLink: [{
                    required: true,
                    message: "Menu Link is required!",
                    trigger: "blur"
                }],
                menuIcon: [{
                    required: true,
                    message: "Menu Icon is required!",
                    trigger: "blur"
                }],
                menuParentId: [{
                    required: true,
                    message: "Menu Parent Id is required!",
                    trigger: "blur"
                }],
                menuType: [{
                    required: true,
                    message: "Menu Type is required!",
                    trigger: "blur"
                }],
            },
        };
    },
    methods: {
        onSubmit(formName) {
            let obj = {
                menuLink: this.form.menuLink,
                menuHintEn: this.form.menuHintEn,
                menuHintId: this.form.menuHintId,
                menuLabelEn: this.form.menuLabelEn,
                menuLabelId: this.form.menuLabelId,
                menuIcon: this.form.menuIcon,
                menuParentId: this.form.menuParentId,
                menuType: this.form.menuType,
                menuId: this.form.menuId
            };
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$store.commit(mutation.BUTTON_STATUS, true)
                    this.$store.dispatch(action.UPDATE_MENU, this.form);
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
                path: "/menu-management"
            });
        }
    },
    computed: {
        ...mapGetters({
            menuParent: getter.GET_MENU_PARENT,
            content: getter.GET_MENU_DETAIL
        }),
    },
    created() {
        this.form.menuLink = this.content.menu_link
        this.form.menuHintEn = this.content.menu_hint_en
        this.form.menuHintId = this.content.menu_hint_id
        this.form.menuLabelEn = this.content.menu_label_en
        this.form.menuLabelId = this.content.menu_label_id
        this.form.menuIcon = this.content.menu_icon
        this.form.menuParentId = this.content.menu_parent_id
        this.form.menuType = this.content.menu_type
        this.form.menuId = this.content.menu_id
    },
    mounted() {
        this.$store.dispatch(action.MENU_PARENT);
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
