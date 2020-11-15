<template>
<div class="page-table scrollable only-y" id="affix-container">
    <el-dialog title="Detail Entity" :visible.sync="dialogFormVisible">
        <el-form>
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
                        <el-input placeholder="Input Entity Name" :disabled="true" v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Director's Name" prop="dirName">
                        <el-input placeholder="Input Director's Name" :disabled="true" v-model="form.dirName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Entity NPWP" prop="npwp">
                        <el-input placeholder="Input Entity NPWP" :disabled="true" v-model="form.npwp"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Director's NPWP" prop="dirNpwp">
                        <el-input placeholder="Input Director's NPWP" :disabled="true" v-model="form.dirNpwp"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Entity Phone" prop="phone">
                        <el-input placeholder="Input Entity phone" :disabled="true" v-model="form.phone" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="BPJS TK" prop="bpjstk">
                        <el-input placeholder="Input BPJS TK" :disabled="true" v-model="form.bpjstk"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Entity Email" prop="email">
                        <el-input placeholder="Input Entity Email" :disabled="true" v-model="form.email"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="BPJS KS" prop="bpjsks">
                        <el-input placeholder="Input BPJS KS" :disabled="true" v-model="form.bpjsks"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Fax Number" prop="fax">
                        <el-input placeholder="Input Fax Number" :disabled="true" v-model="form.fax" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="KLU" prop="klu">
                        <el-input placeholder="Input KLU" :disabled="true" v-model="form.klu"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="City" prop="city">
                        <el-input placeholder="Input City" :disabled="true" v-model="form.city"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Dtp Start" prop="dtp_start">
                        <el-date-picker type="date" placeholder="Pick a date" :disabled="true" v-model="form.dtp_start" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="ZIP Code" prop="zipcode">
                        <el-input placeholder="Input ZIP Code" :disabled="true" v-model="form.zipcode" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Keterangan" prop="note">
                        <el-input placeholder="Keterangan" :disabled="true" v-model="form.note" type="textarea"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Close</el-button>
        </span>
    </el-dialog>
    <div class="card-base card-shadow--medium bg-white">
        <el-row :gutter="10">
            <el-col :span="6">
                <el-button @click="Create()" style="width: 100%; background: #04b3bf; border: 0px;"><b style="color: #ffffff">Create</b></el-button>
            </el-col>
            <!-- <el-col  :lg="4">
            <el-select v-model="status" @change="filterActive($event)" filterable placeholder="Select Status">
                <el-option v-for="item in select" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
            </el-select>
            </el-col> -->
            <el-col :offset="14" :span="6" :lg="4">
            <el-input placeholder="Type to search" v-model="param" @change="filterText()"></el-input>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="24">
                <el-table  @sort-change="sortHandle" :default-sort = "{prop: 'id', order: 'ascending'}" :data="listData" style="width: 100%">
                    <el-table-column type="index" :index="paginate.fromP" label="No" align="center" width="50"></el-table-column>
                    <el-table-column align="left" prop="name" sortable="custom" label="Entity Name"></el-table-column>
                    <el-table-column align="left" prop="npwp" sortable="custom" label="NPWP"></el-table-column>
                    <el-table-column align="left" prop="remark" sortable="custom" label="Remark"></el-table-column>
                    <el-table-column align="center" width="250" label="Operations">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="Detail(scope.row)"><i style="font-size: 18px" class="mdi mdi-eye"></i></el-button>
                            <el-button size="mini" type="success" @click="Edit(scope.row)"><i style="font-size: 18px" class="mdi mdi-pencil"></i></el-button>
                            <el-button size="mini" type="danger" @click="Delete(scope.row)"><i style="font-size: 18px" class="mdi mdi-delete"></i></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <div align="right">
            <el-pagination background layout="prev, pager, next" @current-change="handlePageChange" :total="forTotal"></el-pagination>
        </div>
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

import Swal from "sweetalert2";

export default {
    name: "ListEntity",
    data() {
        return {
            dialogFormVisible:false,
            form : {

            },
            currentPage   : 1,
            indexT        : 1,
            select: [
                {
                    id: 0,
                    name: "Inactive"
                },
                {
                    id: 1,
                    name: "Active"
                },
                {
                id: 99,
                name: "All Status"
                }
            ],
            status        : 99,
            sort          : "descending",
            sortBy        : "id",
            param         : ""
        };
    },
    components: {
        Affix
    },
    computed: {
        ...mapGetters({
            listData: getter.GET_LIST_ENTITY,
            paginate: getter.GET_PAGINATE_ENTITY,
            total: getter.GET_ENTITY_TOTAL
        }),
        paginator() {
            return this.paginate;
        },
        indexTam() {
            return this.indexT;
        },
        forTotal() {
            if (this.listData) {
                return this.total;
            }
        },
    },

    methods: {
        handlePageChange(page) {
            this.currentPage = page 
            this.$store.dispatch(action.LIST_ENTITY, { 
                page: page,
                sort:this.sort,
                sortBy:this.sortBy,
                param:this.param,
                status: this.status
            }) 
        },
        sortHandle(column) {
            this.sort = column.order ? column.order : 'descending';
            this.sort = (this.sort == 'ascending') ? 'asc' : 'desc';
            this.sortBy = column.prop ? column.prop : 'id';
            this.$store.dispatch(action.LIST_ENTITY, { 
                page: this.currentPage,
                sort:this.sort,
                sortBy:this.sortBy,
                param:this.param,
                status: this.status}
            ) 
        },
        Create() {
            this.$router.push({
                name: "NewEntity"
            });
        },

        filterActive(status){
            this.status = status
            this.$store.dispatch(action.LIST_ENTITY, { 
                page: this.currentPage,
                sort:this.sort,
                sortBy:this.sortBy,
                param:this.param,
                status: status
            }) 
        },
        filterText(){
            this.$store.dispatch(action.LIST_ENTITY, { 
                page: this.currentPage,
                sort:this.sort,
                sortBy:this.sortBy,
                param:this.param,
                status: this.status
            }) 
        },

        Edit(e) {
            this.$store.commit(mutation.SET_ENTITY_DETAIL, {
                data: e,
            });
            // this.$store.dispatch(action.EDIT_ENTITY, e.id) 
            router.replace({
                path: "/edit-entity/" + e.id,
            });
        },
        Detail(e) {
            this.form.name = e.name;
            this.form.npwp = e.npwp;
            this.form.phone = e.phone;
            this.form.email = e.email;
            this.form.dirName = e.dirName;
            this.form.dirNpwp = e.dirNpwp;
            this.form.city = e.city;
            this.form.zipcode = e.zipCode;
            this.form.id = e.id;
            this.form.fax = e.faxNo;
            this.form.bpjstk = e.bpjsTkNpp;
            this.form.bpjsks = e.bpjsKesNpp;
            this.form.note = e.remark;
            this.form.klu = e.klu;
            if(e.bpjsDtpStart)
                this.form.dtp_start = moment(e.bpjsDtpStart, 'DD-MM-YYYY HH:ii:ss').format('YYYY-MM-DD');
            this.dialogFormVisible = true;
            // this.$store.dispatch(action.ENTITY_DETAIL, e.id);
        },
        Delete(e) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(result => {
                let payload = {
                        id: e.id,
                        page: this.currentPage,
                        sort:this.sort,
                        sortBy:this.sortBy,
                        param:this.param,
                        status: this.status
                    };
                if (result.value) {
                    this.$store.dispatch(action.DELETE_ENTITY,payload);
                }
            });
        }
    },
    // async mounted() {
    //     await this.$store.dispatch(action.LIST_ENTITY, this.payload);

    // }
    mounted() {
        this.$store.dispatch(action.LIST_ENTITY, {
            page: this.currentPage,
            sort:this.sort,
            sortBy:this.sortBy,
            param:this.param,
            status: this.status,
        }) 
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
}
</style>
