<template>
<div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <el-row :gutter="10">
            <el-col :span="6">
                <el-button @click="Back()" style="width:  100%" type="default">Back</el-button>
            </el-col>
            <!-- <el-col :offset="14 " :lg="4">
          <el-select v-model="status" @change="filterChange($event)" filterable placeholder="Select Status">
            <el-option v-for="item in select" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-col> -->
        </el-row>
        <h1>
            Available Users</h1>
        <el-row :gutter="10">
            <el-col :lg="24">
                <el-table :data="listData" style="width: 100%">
                    <el-table-column type="index" :index="paginate.fromP" label="No" align="center" width="50"></el-table-column>
                    <el-table-column prop="username" align="center" label="Username"></el-table-column>
                      <el-table-column prop="mobile" align="center" label="Mobile" width="200"></el-table-column>
                    <el-table-column prop="mobile" align="center" label="Mobile" width="200"></el-table-column>
                    <el-table-column align="center" prop="email" label="Email"></el-table-column>
                    <el-table-column align="center" width="150" label="Operations">
                        <template slot-scope="scope">
                            <el-button size="mini" type="success" @click="Assign(scope.row)"><i style="font-size: 18px" class="mdi mdi-plus"></i></el-button>
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
import Affix from "@/components/Affix";
import {
    mapGetters
} from "vuex";
import * as getter from "../../../store/getters-types";
import * as action from "../../../store/action-types";
import Swal from "sweetalert2";

export default {
    name: "LisUser",
    data() {
        return {
            currentPage: 1,
            input: "",
            affixEnabled: true,
            indexT: 1,
            status: 1,
        };
    },
    components: {
        Affix
    },
    computed: {
        ...mapGetters({
            listData: getter.GET_LIST_USER,
            paginate: getter.GET_PAGINATE_USER,
            totalUser: getter.GET_USER_TOTAL,
            content: getter.GET_COMPANY_DETAIL,
        }),
        paginator() {
            return this.paginate;
        },
        indexTam() {
            return this.indexT;
        },
        forTotal() {
            if (this.listData) {
                return this.totalUser;
            }
        },
    },

    mounted() {
        this.$store.dispatch(action.LIST_DATA_USER, {
            page: this.currentPage,
            status: 1,
        });
    },

    methods: {
        handlePageChange(page) {
            this.currentPage = page;
            this.$store.dispatch(action.LIST_DATA_USER, {
                page: page,
                status: this.status
            });
        },
        Back() {
            this.$router.replace({
                path: '/detail-company/' + this.content.id,
            });
        },
        Assign(e) {
            Swal.fire({
                title: "Are you sure?",
                text: "Do you want to assign this user",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, assign it!"
            }).then(result => {
                if (result.value) {
                    this.$store.dispatch(action.ASSIGN_USER, {
                        companyId: this.content.id,
                        userId: e.id
                    });
                }
            });
        }

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
    padding: 0 10px;
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

.thumbnail {
    position: relative;
    overflow: hidden;
    width: 300px;
    height: 300px;
}

.thumbnail img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: auto;
    height: 100%;
    transform: translate(-50%, -50%);

    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
}

.thumbnail img.portrait {
    width: 100%;
    height: auto;
}

a {
    height: 150px;
    padding: 10px;
    border-style: dotted;
    border-radius: 15px;
}

td {
    padding: 10px;
}
</style>
