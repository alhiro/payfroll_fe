<template>
<div class="page-table scrollable only-y" id="affix-container">
    <transition name="fade">
			<div class="splash-screen" v-if="splashScreen">
				<div class="wrap">
					<img src="/klikwhite.svg" style="width: 200px; margin-bottom: -110px;" class="logo" alt="logo">
					<img src="/infinity.svg" alt="loading-image">
				</div>
			</div>
    </transition>
    <div class="card-base card-shadow--medium bg-white">
        <el-row :gutter="10">
            <el-col :span="6">
                <h3>Role: {{this.selectedRoles.roleTitle}}</h3>
                <el-button @click="save()" style="width: 100%; background: #04b3bf; border: 0px;"><b style="color: #ffffff">Save</b></el-button>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :lg="24">
                <el-table
                    :data="this.rolesAll"
                    :default-expand-all="expandTable"
                    style="width: 100%">
                    <el-table-column type="expand">
                    <template slot-scope="props">
                        <ul>
                            <el-row v-for="(item,id) in props.row.children" :key="id">
                            <!-- <li class="list-staging" v-for="(item,id) in props.row.children" :key="id"> -->
                                <li>
                                    <el-col :span="12">
                                        <div class="grid-content bg-purple">{{item.menuHintEn}}</div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="grid-content bg-purple-light tree-wrapper">
                                            <el-checkbox v-model="checkIdSystem[item.id]" :value="item.id" @change="checkedSytem($event, item, props.row)"></el-checkbox>
                                        </div>
                                    </el-col>
                                </li>
                                <ul class="ul-tree-wrapper">
                                    <el-row v-for="itemx in item.children" :key="itemx.id">
                                        <li class="list-staging" >
                                            <el-col :span="12">
                                                <div class="grid-content bg-purple">{{itemx.menuHintEn}}</div>
                                            </el-col>
                                            <el-col :span="12">
                                                <div class="grid-content bg-purple-light">
                                                    <el-checkbox v-model="checkIdSystem[itemx.id]" :value="itemx.id" @change="checkedSytem($event, itemx, props.row)"></el-checkbox>
                                                </div>
                                            </el-col>
                                        </li>
                                    </el-row>

                                </ul>
                            <!-- </li> -->
                            </el-row>
                        </ul>
                    </template>
                    </el-table-column>
                    <el-table-column label="Menu" prop="menuHintEn">
                        <template slot-scope="scope">
                            <p>{{scope.row.menuHintEn}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="Access" prop="checkbox">
                        <template slot-scope="scope">
                            <el-checkbox v-model="checkIdSystem[scope.row.id]" :value="scope.row.id" @change="checkedSytem($event, scope.row)"></el-checkbox>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <div align="right">
            <!-- <el-pagination background layout="prev, pager, next" @current-change="handlePageChange" :total="forTotal"></el-pagination> -->
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
            splashScreen: true,
            expandTable: true,
            checkIdSystem:[],
            currentPage: 1,
            affixEnabled: true,
            indexT: 1,
            status: 99,
        };
    },
    components: {
        Affix
    },
    computed: {
        ...mapGetters({
            selectedRoles : getter.SELECTED_ROLES,
            rolesAll : getter.ALL_MENU_TOP,
            // paginate: getter.GET_PAGINATE_ROLES,
            // totalUser: getter.GET_ROLES_TOTAL,
        }),
        // paginator() {
        //     return this.paginate;
        // },
        // indexTam() {
        //     return this.indexT;
        // },
        // forTotal() {
        //     if (this.listData) {
        //         return this.totalUser;
        //     }
        // },
    },

    mounted() {
        if(this.selectedRoles.length == 0) {
            this.$router.replace('/role-management');
            return;
        }
        this.$store.dispatch(action.FETCH_SELECTED_ROLE, {
            id: this.selectedRoles.id
        }).then(res => {
            if(res.status == 200) {
                let whereChecked = res.data.data
                whereChecked.forEach(el => {
                    this.$set(this.checkIdSystem, el.id, true)
                });
               this.splashScreen = false;
            }
        }).catch(err=> {
            this.splashScreen = false;
        });
    },

    methods: {
        oke(data) {
            console.log(data)
        },
        save() {
            let menus = [];
            this.checkIdSystem.forEach((el, index) => {
                let obj = {
                    menuId : index,
                    readWrite: el ? 1: 0
                }
                menus.push(obj)
            });
            const schemaBody = {
                roleId : this.selectedRoles.id,
                menus
            }
            this.$store.dispatch(action.POST_ROLE_MENU, schemaBody).then(res=> {
                if(res.status == 200) {
                    this.$notify({
                        title: 'Success',
                        message: "Role has been successfully set",
                        type: 'success'
                    });
                    this.$router.replace('/role-management');
                }
            }).catch(err=> {
                console.log(err)
            });
        },
        checkedSytem(e, item, collectItem = []) {
            console.log()
            if(collectItem) {
                this.checkIdSystem[collectItem.id] = true;
            }
            item.children.forEach(el => {
                    el.children.forEach(el2 => {
                        this.checkIdSystem[el2.id] = e;
                    });
                this.checkIdSystem[el.id] = e;
            });
        },
        searchMainParent(id) {
            this.rolesAll.forEach(el => {
                // let findThat = el.children.find(findx => findx.id == id);
                // if(el.id == id) {
                //     return el;
                // } else {
                //     let findThat = el.children.find(find => find.id == id);
                //     if(findThat) {
                //         return findThat;
                //     }
                // }
            })
        }
        // handlePageChange(page) {
        //     this.currentPage = page;
        //     this.$store.dispatch(action.LIST_ROLES, {
        //         page: page,
        //         status: this.status
        //     });
        // },
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

.list-staging {
    margin: 10px 0px;
}
.bold {
    font-weight: bold;
}
.tree-wrapper {
    padding-left: 13px;
}
.ul-tree-wrapper {
    padding-left: 26px;
}
</style>
