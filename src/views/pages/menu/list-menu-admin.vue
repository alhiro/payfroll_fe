<template>
<div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <el-row :gutter="10">
            <el-col :span="6">
               <el-button @click="Create()" style="width: 100%; background: #04b3bf; border: 0px;"><b style="color: #ffffff">Create</b></el-button>
            </el-col>
            <el-col :offset="10" :span="4" style="text-align:right;">
                 <el-dropdown size="small" @command="handleCommand">
                    <el-button type="primary" style="padding: 6px 25px;">
                        {{plcDropdown}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="All">All</el-dropdown-item>
                        <el-dropdown-item command="Active">Active</el-dropdown-item>
                        <el-dropdown-item command="Inactive">Inactive</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            <el-col :span="4">
                <el-autocomplete
                    v-model="payload.search"
                    size="mini"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="Type to search"
                    >
                </el-autocomplete>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="24">
                <el-table :data="listData" @sort-change="sortChange" style="width: 100%">
                    <el-table-column align="center" type="index" :index="paginate.fromP" label="No" width="50"></el-table-column>
                    <el-table-column align="left" prop="menu_hint_id" sortable label="Menu Name ID"></el-table-column>
                      <el-table-column align="left" prop="menu_hint_en" sortable label="Menu Name EN"></el-table-column>
                      <el-table-column align="left" prop="menu_label_id" sortable label="Menu Label ID"></el-table-column>
                      <el-table-column align="left" prop="menu_label_en" sortable label="Menu Label EN"></el-table-column>
                      <el-table-column align="left" prop="menu_type_str" sortable label="Type" width="80"></el-table-column>
                      <el-table-column align="left" prop="menu_is_active_str" label="Status" width="90">
                        <template slot-scope="scope">
                            <el-tag :type="scope.row.menu_is_active === 1 ? 'success' : 'danger'" disable-transitions>{{scope.row.menu_is_active_str}}</el-tag>
                        </template>
                      </el-table-column>
                    <el-table-column align="center" width="250"
                        label="Operations">
                        <template slot-scope="scope">
                            <el-button type="primary" size="medium" @click="changeStatus(scope.row)">Change</el-button>
                            <el-button
                            size="mini"
                            type="success"
                            @click="Edit(scope.row)"><i style="font-size: 18px" class="mdi mdi-pencil"></i></el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="Delete(scope.row)"><i style="font-size: 18px" class="mdi mdi-delete"></i></el-button>
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
            plcDropdown: "All",
            timeout:  null,
            affixEnabled: true,
            indexT: 1,
            payload: {
                page: 1,
                search: "",
                filter: "",
                order: "asc",
                sortBy: "id"
            },
            status: null,
            select: [
                {
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
            listData: getter.GET_LIST_MENU,
            paginate: getter.GET_PAGINATE_MENU,
            total: getter.GET_MENU_TOTAL
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
        sortChange(e){
            if(!e.prop) return;
            let stringify = e.prop.split('_').join(' ');
            let camilize = this.camelizeString(stringify);

            this.payload.sortBy = camilize;
            this.payload.order = e.order == "ascending" ? "asc" : "desc";
            this.$store.dispatch(action.LIST_MENU, this.payload);
        },
        camelizeString(str) {
            return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
                return index === 0 ? word.toLowerCase() : word.toUpperCase();
            }).replace(/\s+/g, '');
        },
        handleCommand(command) {
            this.plcDropdown = command;
            if(command == "All") {
                this.payload.filter = ""
            } else {
            this.payload.filter = command  == 'Active' ? 1 : 0 ;
            }
            this.$store.dispatch(action.LIST_MENU, this.payload);
        },
        handlePageChange(page) {
            this.payload.page = page;
            this.$store.dispatch(action.LIST_MENU,
                this.payload
            );
        },
        Create() {
            this.$store.commit(mutation.BUTTON_STATUS, false)
            this.$router.push({
                name: "NewMenu"
            });
        },
        changeStatus(data) {
            Swal.fire({
                title: "Are you sure?",
                text: data.menu_is_active ? "You will In-activate this menu" :  "You will activate this menu",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: data.menu_is_active ? "Yes, in-activate" : "Yes, activate"
            }).then(result => {
                if (result.value) {
                    this.$store.dispatch(action.ACTIVATE_MENU, {menu_id :data.menu_id, active: data.menu_is_active});
                }
            });
        },
        filterStatus(idrole) {
            this.idrole = idrole;
            this.$store.dispatch(action.LIST_MENU, {
                page: 1,
                idrole: this.idrole
            });
        },

        Edit(e) {
            this.$store.dispatch(action.DETAIL_MENU, e.menu_id);
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
                    this.$store.dispatch(action.DELETE_MENU, e.menu_id);
                }
            });
        },
        querySearchAsync(queryString, cb) {
            clearTimeout(this.timeout);
            if(this.payload.search.trim().length >= 4) {
                    this.timeout = setTimeout(() => {
                    cb([]);
                    this.payload.page = 1;
                    this.$store.dispatch(action.LIST_MENU, this.payload);
                }, 500);
            } else if(this.payload.search.trim() == '') {
                this.timeout = setTimeout(() => {
                    cb([]);
                    this.payload.page = 1;
                    this.$store.dispatch(action.LIST_MENU, this.payload);
                }, 500);
            }
            cb([]);
      }
    },
    async mounted() {
        await this.$store.dispatch(action.LIST_MENU, this.payload);
        await this.$store.dispatch(action.USER_ROLES);
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
