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
                <el-table :default-sort="{prop: 'id', order: 'ascending'}" :data="listData" style="width: 100%">
                    <el-table-column align="center" type="index" :index="paginate.fromP" label="No" width="80"></el-table-column>
                    <el-table-column align="left" prop="lev_name" label="Level Name"></el-table-column>
                    <el-table-column align="left" prop="lev_code" label="Level Code"></el-table-column>
                    <el-table-column align="left" prop="lev_order" label="Level Order"></el-table-column>
                    <el-table-column align="center" width="250" label="Operations">
                        <template slot-scope="scope">
                            <!-- <el-button size="mini" type="primary" @click="Detail(scope.row)"><i style="font-size: 18px" class="mdi mdi-eye"></i></el-button> -->
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
            status: null,
            select: [{
                    name: "All Roles",
                    idrole: 0,
                },
                {
                    name: "Admin",
                    idrole: 2,
                },
                {
                    name: "Employee",
                    idrole: 3,
                },
            ],
        };
    },
    components: {
        Affix
    },
    computed: {
        ...mapGetters({
            userRoles: getter.GET_USER_ROLES,
            listData: getter.GET_LIST_LEVEL,
            paginate: getter.GET_PAGINATE_LEVEL,
            total: getter.GET_LEVEL_TOTAL
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
            this.payload.page = page;
            this.$store.dispatch(action.LIST_LEVEL, {
                page: page,
            });
        },
        Create() {
            this.$store.dispatch(action.SELECT_COMPANY)
            this.$store.commit(mutation.BUTTON_STATUS, false)
            this.$router.push({
                name: "New Level"
            });
        },

        filterStatus(idrole) {
            this.idrole = idrole;
            this.$store.dispatch(action.LIST_LEVEL, {
                page: 1,
                // idrole: this.idrole
            });
        },

        Edit(e) {
            this.$store.dispatch(action.SELECT_COMPANY)
            this.$store.dispatch(action.DETAIL_LEVEL, e.level_id);
        },
        Detail(e) {
            this.$store.dispatch(action.LEVEL_DETAIL, e.level_id);
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
                    this.$store.dispatch(action.DELETE_LEVEL, e.level_id);
                }
            });
        }
    },
    async mounted() {
        await this.$store.dispatch(action.LIST_LEVEL, this.payload);

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
