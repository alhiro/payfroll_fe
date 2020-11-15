<template>
    <div class="page-table scrollable only-y" id="affix-container">
        <div class="card-base card-shadow--medium bg-white">
            <el-row :gutter="20">
<!--                <el-col :lg="8" :xl="3">-->
<!--                    <div class="thumbnail">-->
<!--                        <img class="potrait" :src="profilepicture" @error="imgAlt">-->
<!--                    </div>-->
<!--                </el-col>-->
                <el-col :lg="24" :xl="24">
                    <el-row>
                        <el-col span="14">
<!--                    <div class="flex center demo-box">-->
<!--                        <div class="right-box box grow">-->
                            <dl>
                                <dt>Maximum Occupational Support</dt>
                                <dd>from regular income  : {{ content.ostPct }}%</dd>
                                <dd>For a month (in IDR) : {{ content.osAmt }}</dd>
                            </dl>
                            <dl>
                                <dt>Tarif </dt>
                                <el-row>
                                    <el-col span="7">
                                        <dd>Tax Rate </dd>
                                        <dd>Rate 1  : {{ content.r1pct }}%</dd>
                                        <dd>Rate 2 : {{ content.r2pct }}%</dd>
                                        <dd>Rate 3 : {{ content.r3pct }}%</dd>
                                        <dd>Rate 4 : {{ content.r4pct }}%</dd>
                                        <dd>Rate 5 : {{ content.r5pct }}%</dd>
                                    </el-col>
                                    <el-col span="17">
                                            <dd>Taxable Income Limit</dd>
                                            <dd>up to</dd>
                                        <el-row>
                                            <el-col span="8">
                                                <dd>0</dd>
                                                <dd>{{ content.r2amt }} </dd>
                                                <dd>{{ content.r4amt }} </dd>
                                                <dd>more than </dd>
                                            </el-col>
                                            <el-col span="14">
                                                <dd>to {{ content.r1amt }}</dd>
                                                <dd>to {{ content.r3amt }}</dd>
                                                <dd>to {{ content.r5amt }}</dd>
                                                <dd>{{ content.r5amt }}</dd>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                </el-row>
                            </dl>
                            <dl>
                                <dt>Severance Tax</dt>
                                <el-row>
                                    <el-col span="7">
                                        <dd>Tax Rate </dd>
                                        <dd>Rate 1  : {{ content.sev1pct }}%</dd>
                                        <dd>Rate 2 : {{ content.sev2pct }}%</dd>
                                        <dd>Rate 3 : {{ content.sev3pct }}%</dd>
                                        <dd>Rate 4 : {{ content.sev4pct }}%</dd>
                                        <dd>Rate 5 : {{ content.sev5pct }}%</dd>
                                    </el-col>
                                    <el-col span="17">
                                        <dd>Taxable Income Limit</dd>
                                        <dd>up to</dd>
                                        <el-row>
                                            <el-col span="8">
                                                <dd>0</dd>
                                                <dd>{{ content.sev2amt }} </dd>
                                                <dd>{{ content.sev4amt }} </dd>
                                                <dd>more than </dd>
                                            </el-col>
                                            <el-col span="14">
                                                <dd>to {{ content.sev1amt }}</dd>
                                                <dd>to {{ content.sev3amt }}</dd>
                                                <dd>to {{ content.sev5amt }}</dd>
                                                <dd>{{ content.sev5amt }}</dd>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                </el-row>
                            </dl>
                        </el-col>
<!--                        </div>-->
<!--                        <div class="left-box box grow">-->
                        <el-col span="8">
                            <dl>
                                <dt>Tax by Government</dt>
                                <dd>lower limit  : {{ content.govMin}}%</dd>
                                <dd>upper limit : {{ content.govMax }}</dd>
                            </dl>

                            <dl>
                                <dt>Non-taxable Income</dt>
                                <dd>S/0 Single 0 Dependent   : {{ content.govMin}}</dd>
                                <dd>S/1 Single 1 Dependent   : {{ content.govMax }}</dd>
                                <dd>S/2 Single 2 Dependent   : {{ content.govMin}}</dd>
                                <dd>S/3 Single 3 Dependent   : {{ content.govMax }}</dd>
                                <dd>M/0 Married 0 Dependent  : {{ content.govMin}}</dd>
                                <dd>M/1 Married 1 Dependent  : {{ content.govMax }}</dd>
                                <dd>M/2 Married 2 Dependent  : {{ content.govMin}}</dd>
                                <dd>M/3 Married 3 Dependent  : {{ content.govMax }}</dd>
                            </dl>
                            <dl>
                                <el-checkbox disabled>
                                    <dt>Use Net on Gross Method</dt>
                                </el-checkbox>
                            </dl>
                        </el-col>
                    </el-row>
<!--                        </div>-->
<!--                    </div>-->
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div class="grid-content">
                        <el-button @click="editButton" type="primary" style="padding-left: 40px; padding-right: 40px"> Edit </el-button>
                        <el-button :loading="button" style="margin-left: 70px" type="success" @click="updatePTKP"> Update New PTKP </el-button>
                        <el-button :loading="button" style="margin-left: 70px" type="warning" @click="resetTax"> Reset Tax </el-button>
                        <el-button @click="Delete" style="margin-left: 70px" type="danger"> Delete </el-button>
                        <el-button @click="backButton" style="margin-left: 70px"> Cancel</el-button>
                    </div>
                </el-col>
<!--                <div >-->
<!--                    <el-col :offset="7" :lg="3">-->

<!--                    </el-col>-->
<!--                </div>-->
            </el-row>
        </div>
    </div>
</template>

<script>
    import router from '../../../router'
    import {
        mapGetters
    } from 'vuex'
    import * as getter from '../../../store/getters-types'
    import * as action from '../../../store/action-types'
    import * as mutation from '../../../store/mutation-types'
    import Swal from 'sweetalert2'

    export default {
        data() {
            return {
                payload: {
                    reason_suspend: "",
                    users_id: null,
                    iddispatcher: "",
                },
                alt: require("@/assets/images/avatar-2.jpg")
            };
        },
        computed: {
            ...mapGetters({
                content: getter.GET_TAX_REGULATION_DETAIL,
                button: getter.GET_BUTTON,
            }),
            profilepicture() {
                if (this.dispatcher.profile_picture == null) {
                    return this.alt
                } else {
                    return this.dispatcher.profile_picture
                }
            }
        },
        // created() {
        //     this.payload.iddispatcher = this.dispatcher.dispatcher_profile.iddispatcher
        // },
        methods: {
            updatePTKP(){
                this.$store.dispatch(action.LIST_PTKPS_MASTER);
            },
            Delete() {
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
                        this.$store.dispatch(action.DELETE_TAX_REGULATION, this.content.id);
                    }
                });
            },
            async editButton() {
                this.$store.commit(mutation.SET_TAX_REGULATION_DETAIL, this.content);
                this.$router.replace('/edit-tax-regulation/'+ this.content.id)
            },
            backButton() {
                router.replace('/list-tax-regulation')
            },
            resetTax(){
                this.$store.dispatch(action.DETAIL_TAX_REGULATION_MASTER)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .card-base {
        padding: 20px;
    }

    .el-row {
        padding: 0px 10px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .el-col {
        border-radius: 5px;
    }

    .thumbnail {
        position: relative;
        width: 220px;
        height: 250px;
        overflow: hidden;
    }

    .thumbnail img {
        position: absolute;
        left: 50%;
        top: 50%;
        height: 100%;
        width: auto;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }

    .thumbnail img.portrait {
        width: 100%;
        height: auto;
    }
</style>
