<template>
<div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <el-row>
            <el-col :span="4">
                <el-button @click="Cancel()" style="width:  100%" type="default">Back</el-button>

            </el-col>
            <el-col v-if="content.status === 0" :offset="13" :span="3">
                <el-button @click="Activate()" style="width:  100%" type="primary">Activate</el-button>
            </el-col>
            <el-col v-if="content.status === 1" :offset="13"  :span="3">
                <el-button @click="Suspend()" style="width:  100%" type="danger">Suspend</el-button>
            </el-col>
            <el-col :offset="1" :span="3">
                <el-button @click="Create()" style="width: 100%; background: #04b3bf; border: 0px;"><b style="color: #ffffff">List Users</b></el-button>
            </el-col>

            <el-col :span="24">
                <h1>Company Detail</h1>
                <el-row :gutter="20">
                    <el-col :offset="2" :span="7" style="margin-bottom: 30px;">
                        <b>Company Code</b>
                        <br>
                        {{ content.code}}
                    </el-col>
                    <el-col :span="7" style="margin-bottom: 30px">
                        <b>Company Name</b>
                        <br>
                        {{ content.name}}
                    </el-col>
                    <el-col :span="7" style="margin-bottom: 30px">
                        <b>Holding Name</b>
                        <br>
                        {{ content.holdingName}}
                    </el-col>
                    <el-col :offset="2" :span="7" style="margin-bottom: 30px">
                        <b>Company NPWP</b>
                        <br>
                        {{ content.npwp}}
                    </el-col>
                    <el-col :span="7" style="margin-bottom: 30px">
                        <b>Company Phone</b>
                        <br>
                        {{ content.phone}}
                    </el-col>
                    <el-col :span="7" style="margin-bottom: 30px">
                        <b>Company Email</b>
                        <br>
                        {{ content.email}}
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-row>
                        <el-col :offset="2" :span="7">
                            <h3>Address</h3>
                        </el-col>
                    </el-row>
                    <el-col :offset="2" :span="7" style="margin-bottom: 30px">
                        <b>Company Address</b>
                        <br>
                        {{ content.address}}
                    </el-col>
                    <el-col :span="7" style="margin-bottom: 30px">
                        <b>City</b>
                        <br>
                        {{ content.city}}
                    </el-col>
                    <el-col :span="7" style="margin-bottom: 30px">
                        <b>ZIP Code</b>
                        <br>
                        {{ content.zipCode}}
                    </el-col>
                    <el-col :offset="2" :span="7">
                        <b>Province</b>
                        <br>
                        {{ content.name}}
                    </el-col>
                    <el-col :span="7">
                        <b>Company Branch</b>
                        <br>
                        {{ content.branch}}
                    </el-col>
                </el-row>

            </el-col>
        </el-row>
        <el-row>
            <h1>
                Assigned Users
            </h1>
            <el-col :span="24">
                <el-row :gutter="10">
                    <el-col :span="24">
                        <el-table :data="listData" style="width: 100%; min-height: 100px;">
                            <el-table-column type="index" :index="paginate.fromP" label="No" align="center" width="50"></el-table-column>
                            <el-table-column prop="username" align="center" label="Username"></el-table-column>
                            <el-table-column prop="employeeNo" align="center" label="Employee Number"></el-table-column>
                            <el-table-column prop="mobile" align="center" label="Mobile" width="200"></el-table-column>
                            <el-table-column align="center" prop="email" label="Email"></el-table-column>
                            <el-table-column align="center" width="150" label="Operations">
                                <template slot-scope="scope">
                                    <el-button size="mini" type="danger" @click="Delete(scope.row)"><i style="font-size: 18px" class="mdi mdi-delete"></i></el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
                <el-row>

                    <el-col :offset="20" :span="4">
                        <el-pagination background layout="prev, pager, next" @current-change="handlePageChange" :total="forTotal"></el-pagination>
                    </el-col>
                </el-row>
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
import * as mutation from "../../../store/mutation-types";
import Swal from "sweetalert2";
export default {
    name: "DetailVendor",
    data() {
        return {
            currentPage: 1,
            input: "",
            affixEnabled: true,
            indexT: 1,
            select: [{
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
            status: 1,

        };
    },
    mounted() {
        this.$store.dispatch(action.LIST_DATA_USER, {
            page: this.currentPage,
            status: 1,
        });
    },
    methods: {
        Create() {
            this.$router.replace({
                path: '/detail-company/' + this.content.id + '/list-user',
            });
        },
        Cancel() {
            this.$router.replace({
                name: "List Company"
            });
        },
        handlePageChange(page) {
            this.currentPage = page;
            this.$store.dispatch(action.LIST_DATA_USER, {
                page: page,
                status: this.status
            });
        },
        Activate() {
            Swal.fire({
                title: "Are you sure?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, activate it!"
            }).then(result => {
                if (result.value) {
                    // this.$store.commit(mutation.BUTTON_STATUS, true)
                    this.$store.dispatch(action.ACTIVATE_COMPANY, this.content.id);
                }
            });
        },
        Suspend() {
            Swal.fire({
                title: "Are you sure?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, suspend it!"
            }).then(result => {
                if (result.value) {
                    // this.$store.commit(mutation.BUTTON_STATUS, true)
                    this.$store.dispatch(action.SUSPEND_COMPANY, this.content.id);
                }
            });
        },
        Delete(e) {
            Swal.fire({
                title: "Are you sure?",
                text: "Do you want to unassignee this user",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, unassign it!"
            }).then(result => {
                if (result.value) {
                    this.$store.dispatch(action.UNASSIGN_USER, {
                        companyId: this.content.id,
                        userId: e.id
                    })
                };
            });
        }
    },
    components: {
        Affix
    },
    computed: {
        ...mapGetters({
            content: getter.GET_COMPANY_DETAIL,
            button: getter.GET_BUTTON,
            listData: getter.GET_LIST_ASSIGNED,
            paginate: getter.GET_PAGINATE_ASSIGNED,
            total: getter.GET_ASSIGNED_TOTAL,
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

};
</script>

<style lang="scss" scoped>
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
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 5px;
}

.el-select {
    width: 100%;
}

// .el-date-picker {
//     width: 100px;
// }
</style>
