<template>
<div class="page-table scrollable only-y" id="affix-container">
    <el-dialog
        title="Create New Level"
        :visible.sync="dialogVisible"
        width="50%">
        <el-row :gutter="10">
            <el-col :span="10">
                <span class="demo-input-label">Departement Name</span>
            </el-col>
            <el-col :span="10">
                <el-input placeholder="Departement name" v-model="level.name"></el-input>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="10">
                <span class="demo-input-label">Departement Code</span>
            </el-col>
            <el-col :span="10">
                <el-input placeholder="Departement code" v-model="level.code"></el-input>
            </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="saveCompany()">Confirm</el-button>
        </span>
    </el-dialog>
    <div class="card-base card-shadow--medium bg-white">
        <el-row :gutter="10">
            <el-col :span="6">
                <el-button @click="dialogVisible = true" style="width: 100%; background: #04b3bf; border: 0px;"><b style="color: #ffffff">Create</b></el-button>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="16">
                <el-table
                    :data="this.listEntity"
                    :default-expand-all="expandTable"
                    style="width: 100%">
                    <el-table-column type="expand">
                    <template slot-scope="props">
                        <ul style="padding-left: 15px;">
                            <el-row v-for="(item,id) in props.row.child" :key="id">
                                <!-- <li> -->
                                    <el-col :span="12">
                                        <div class="grid-content bg-purple capitalize">{{item.name}}</div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="grid-content bg-purple-light" style="padding-left:26px;">
                                            <i style="font-size: 18px; color:#73c000; cursor:pointer;" class="mdi mdi-plus-box" @click="checkedSytem(item)"></i>
                                            <!-- <el-checkbox v-model="checkIdSystem[item.id]" :value="item.id" @change="checkedSytem($event, item, props.row)"></el-checkbox> -->
                                        </div>
                                    </el-col>
                                <!-- </li> -->
                                <ul class="ul-tree-wrapper">
                                    <template v-for="itemx in item.child">
                                        <div :key="itemx.id">

                                            <el-col :span="12">
                                                <div class="grid-content bg-purple capitalize">{{itemx.name}}</div>
                                            </el-col>
                                            <el-col :span="12">
                                                <div class="grid-content bg-purple-light" style="padding-left:13px;">
                                                    <i style="font-size: 18px; color:#73c000; cursor:pointer; z-index:100000;" class="mdi mdi-plus-box" @click="checkedSytem(itemx)"></i>
                                                </div>
                                            </el-col>
                                        <ul class="ul-tree-wrapper" v-for="itemy in itemx.child" :key="itemy.id">
                                                <el-col :span="12">
                                                    <div class="grid-content bg-purple capitalize">{{itemy.name}}</div>
                                                </el-col>
                                                <el-col :span="12">
                                                    <div class="grid-content bg-purple-light" v-if="itemy.level != '4'">
                                                        <i style="font-size: 18px; color:#73c000; cursor:pointer;" class="mdi mdi-plus-box" @click="checkedSytem(itemy)"></i>
                                                    </div>
                                                </el-col>
                                        </ul>
                                        </div>

                                    </template>
                                </ul>
                            </el-row>
                        </ul>
                    </template>
                    </el-table-column>
                    <el-table-column label="Menu" prop="name">
                        <template slot-scope="scope">
                            <p class="capitalize">{{scope.row.name}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="Access" prop="checkbox">
                        <template slot-scope="scope">
                            <i style="font-size: 18px; color:#73c000; cursor:pointer;" class="mdi mdi-plus-box" @click="checkedSytem(scope.row)"></i>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="8">
                <!-- style="position:fixed; width:24%;" -->
                <div>
                    <table style="width:100%" v-if="getInfo">
                        <tr class="bg-blue header-row">
                            <th class="text-left" colspan="3">General Information</th>
                        </tr>
                        <tr class="text-coral">
                            <td>Name</td>
                            <td class="text-right">
                                <input type="text" readonly v-model="getInfo.comName" class="input-tax" />
                            </td>
                        </tr>
                        <tr class="bg-grey-2 text-coral">
                            <td>NPWP</td>
                            <td class="text-right">
                                <input type="text" class="input-tax" readonly v-model="getInfo.comNpwp" />
                            </td>
                        </tr>
                        <tr class="bg-grey-2 text-coral">
                            <td>Level 1</td>
                            <td class="text-right"><input type="text" class="input-tax" :disabled="editable" v-model="getInfo.generalLevel1" /></td>
                        </tr>
                        <tr class="bg-grey-2 text-coral">
                            <td>Level 2</td>
                            <td class="text-right"><input type="text" class="input-tax" :disabled="editable" v-model="getInfo.generalLevel2" /></td>
                        </tr>
                        <tr class="bg-grey-2 text-coral">
                            <td>Level 3</td>
                            <td class="text-right"><input type="text" class="input-tax" :disabled="editable" v-model="getInfo.generalLevel3" /></td>
                        </tr>
                    </table>
                    <div style="margin: 30px 0px;">
                        <el-button type="success" round @click="saveGeneralInfo()">Save</el-button>
                    </div>
                    <template v-if="isOpen">
                        <table style="width:100%">
                            <tr class="bg-blue header-row">
                                <th class="text-left" colspan="3">General Information</th>
                            </tr>
                            <tr class="text-coral">
                                <td>Name</td>
                                <td class="text-right">
                                    {{dept.name}}
                                </td>
                            </tr>
                            <tr class="bg-grey-2 text-coral">
                                <td>NPWP</td>
                                <td class="text-right">
                                    <el-select v-model="dept.npwp" filterable placeholder="NPWP" @change="changeNpwp($event)">
                                        <el-option
                                            v-for="itemin in listNpwp"
                                            :key="itemin.id"
                                            :label="itemin.npwp"
                                            :value="itemin.id">
                                        </el-option>
                                    </el-select>
                                </td>
                            </tr>
                            <tr class="bg-grey-2 text-coral">
                                <td>Level 1</td>
                                <td class="text-right">
                                    <p class="capitalize">{{dept.generalLevel1}}</p>
                                </td>
                            </tr>
                            <tr class="bg-grey-2 text-coral">
                                <td>Level 2</td>
                                <td class="text-right">
                                    <p class="capitalize">{{dept.generalLevel2}}</p>
                                </td>
                            </tr>
                            <tr class="bg-grey-2 text-coral">
                                <td>Level 3</td>
                                <td class="text-right">
                                    <p class="capitalize">{{dept.generalLevel3}}</p>
                                </td>
                            </tr>
                            <tr class="bg-grey-2 text-coral">
                                <td>Level 4</td>
                                <td class="text-right">
                                    <p class="capitalize">{{dept.generalLevel4}}</p>
                                </td>
                            </tr>
                        </table>
                        <div style="margin: 30px 0px;">
                            <el-button type="success" round @click="postGenerateInfo()">Save</el-button>
                        </div>
                    </template>
                </div>
            </el-col>
        </el-row>
    </div>
</div>
</template>

<script>

import {
    mapGetters,
    mapActions
} from "vuex";
import * as getter from "../../../store/getters-types";
import * as action from "../../../store/action-types";
import * as mutation from '../../../store/mutation-types';

import Swal from "sweetalert2";

export default {
    name: "ListCompanyHolding",
    data() {
        return {
            level: {
                name: "",
                code: ""
            },
            dialogVisible: false,
            isOpen: false,
            selectedCom: [],
            listNpwp: [],
            checkIdSystem: [],
            expandTable: true,
            editable: false,
            payload: {
                page: 1,
            },
            dept: {
               name: "",
               generalLevel1: "",
               generalLevel2: "",
               generalLevel3: "",
               generalLevel4: "",
               objData: null
            }
        };
    },
    computed: {
        ...mapGetters({
            getInfo: getter.GET_GENERAL_INFO,
            listEntity: getter.GET_ENTITY_LIST,
        })
    },

    methods: {
        saveCompany() {
            if(this.level.code.trim() == '' || this.level.name.trim() == '') {
                this.$notify({
                    title: 'Error',
                    message: 'Please complete the field',
                    type: 'error'
                });
                return;
            }
            let masterPayroll = localStorage.getItem("master_payroll");
            masterPayroll = JSON.parse(masterPayroll);
            const payload = {
                deptParentId: null,
                entitiesId: masterPayroll.id,
                depLevel: "1",
                depCode: this.level.code,
                depName: this.level.name,
                depOrder: 1
            }
            this.$store.dispatch(action.POST_DEPARTEMENT, payload).then(res=> {
                if(res.status == 200) {
                    Swal("Succes!", "General Information Departement has been updated", "success");
                    this.$router.replace({ path: "/departement" });
                    this.dialogVisible = false;
                }
            });
        },
        checkedSytem(data) {
            this.isOpen = true;
            this.$notify({
                title: 'Success',
                message: 'Selected departement',
                type: 'success'
            });
            this.dept.objData = data;
            this.dept.generalLevel1 = "";
            this.dept.generalLevel2 = "";
            this.dept.generalLevel3 = "";
            this.dept.generalLevel4 = "";
            if(data.level == 1) {
                this.dept.generalLevel1 = data.name;
            } else if(data.level == 2) {
                this.dept.generalLevel2 = data.name;
            } else if(data.level == 3) {
                this.dept.generalLevel3 = data.name;
            } else if(data.level == 4) {
                this.dept.generalLevel4 = data.name;
            }
        },
        saveGeneralInfo() {
            const payload = {
                comId: this.getInfo.comId,
                comName: this.getInfo.comName,
                comNpwp: this.getInfo.comNpwp,
                generalLevel1: this.getInfo.generalLevel1,
                generalLevel2: this.getInfo.generalLevel2,
                generalLevel3: this.getInfo.generalLevel3,
            }
            this.$store.dispatch(action.SAVE_GENERAL_INFORMATION, payload);
        },
        postGenerateInfo() {
            const payload = {
                deptParentId: this.dept.objData.depParentId,
                entitiesId: this.dept.objData.entityId,
                depLevel: this.dept.objData.level,
                depCode: this.selectedCom.company.code,
                depName: this.dept.objData.name,
                depOrder: 1
            }
            this.$store.dispatch(action.POST_DEPARTEMENT, payload);
        },
        changeNpwp(e) {
            let selected = this.listNpwp.filter(item => item.id == e);
            this.selectedCom = selected[0];
            this.dept.name = this.selectedCom.name;
        }
    },
    mounted() {
        this.$store.dispatch(action.GENERAL_INFORMATION);
        this.$store.dispatch(action.ENTITY_LIST);
        this.$store.dispatch(action.ENTITY_COMPANY).then(res=> {
        if(res.status == 200) {
            this.listNpwp = res.data.data;
        }
      });
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
    margin-bottom: 20px;

    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 5px;
}

.el-select {
    width: 100%;
}

a {
    border-style: dotted;
    border-radius: 15px;
    padding: 10px;
    height: 150px;
}

td {
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;
}
.bg-blue {
  background: #043060;
}
.header-row {
  color: white;
}
.header-row > th {
  padding: 5px 10px;
}
.text-coral {
  color: #181818;
}
.input-tax {
  border: none;
  background: transparent;
  display: inline-block;
  font-size: 16px;
  text-align: right;
}
.mini-input {
  width: 30px;
}
.input-tax:focus {
  outline: none;
}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

// .bold {
//     font-weight: bold;
// }
// .tree-wrapper {
//     padding-left: 13px;
// }
.capitalize {
    text-transform: capitalize;
}
.ul-tree-wrapper {
    padding-left: 26px;
}
</style>
