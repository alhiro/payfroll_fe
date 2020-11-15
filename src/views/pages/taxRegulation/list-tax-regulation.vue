<template>
<div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <el-row :gutter="10">
            <el-col :span="6">
                <el-button @click="Create()" style="width: 100%; background: #04b3bf; border: 0px;"><b style="color: #ffffff">Create</b></el-button>
            </el-col>
            <!-- <el-col :offset="14" :span="4">
                 <el-select v-model="status" filterable placeholder="Select Role">
                            <el-option v-for="item in userRoles" :key="item.id" :label="item.roleTitle" :value="item.id"></el-option>
                    </el-select>
            </el-col> -->
        </el-row>
        <el-row :gutter="10">
            <el-col :span="24">
                <el-table :default-sort="{prop: 'id', order: 'ascending'}" :data="listData" style="width: 100%" @row-click="selectRow">
                    <el-table-column align="center" type="index" :index="paginate.fromP" label="No" width="80"></el-table-column>
                    <el-table-column align="left" prop="govMax" label="Lower Limit"></el-table-column>
                    <el-table-column align="left" prop="govMin" label="Upper Limit"></el-table-column>
                    <el-table-column align="left" prop="ostPct" label="% from Reguler Income"></el-table-column>
                    <el-table-column align="left" prop="osAmt" label="For a month (in IDR)"></el-table-column>
<!--                    <el-table-column align="center" width="150" label="Operations">-->
<!--                        <template slot-scope="scope">-->
<!--                            <el-button size="mini" type="success" @click="Edit(scope.row)"><i style="font-size: 18px" class="mdi mdi-pencil"></i></el-button>-->
<!--                            <el-button size="mini" type="danger" @click="Delete(scope.row)"><i style="font-size: 18px" class="mdi mdi-delete"></i></el-button>-->
<!--                        </template>-->
<!--                    </el-table-column>-->
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
    name: "ListDriver",
    data() {
        return {
            affixEnabled: true,
            indexT: 1,
            payload: {
                page: 1,
            },
        };
    },
    components: {
        Affix
    },
    computed: {
        ...mapGetters({
            listData: getter.GET_LIST_TAX_REGULATION,
            paginate: getter.GET_PAGINATE_TAX_REGULATION,
            total: getter.GET_TAX_REGULATION_TOTAL,
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
        }
    },

    methods: {
        handlePageChange(page) {
            this.payload.page = page;
            this.$store.dispatch(action.LIST_CONSULTANT, {
                page: page,
            });
        },
        Create() {
            this.$store.commit(mutation.BUTTON_STATUS, false)
            this.$router.push('/new-tax-regulation');
        },

        filterStatus(idrole) {
            this.idrole = idrole;
            this.$store.dispatch(action.LIST_CONSULTANT, {
                page: 1,
                idrole: this.idrole
            });
        },

        Edit(e) {
            this.$store.commit(mutation.SET_TAX_REGULATION_DETAIL, e);
            this.$router.replace('/edit-tax-regulation/'+ e.id)
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
                if (result.value) {
                    this.$store.dispatch(action.DELETE_TAX_REGULATION, e.id);
                }
            });
        },
        selectRow(e){
            console.log('mantap gan', e)
            this.$store.commit(mutation.SET_TAX_REGULATION_DETAIL, e);
            this.$router.replace('/tax-regulation-detail/'+ e.id)
        }
    },
    async mounted() {
        await this.$store.dispatch(action.LIST_TAX_REGULATION, this.payload);
        await this.$store.dispatch(action.DATA_ERROR, '');
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
}
</style>
