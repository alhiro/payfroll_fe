<template>
    <div class="container">
        <center>
        <h1>User Informations</h1>
        </center>
        <el-row :gutter="20" justify="center">
            <el-col :lg="24">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-card shadow="always" class="card-drive">
                            <el-row class="bts" :gutter="10" >
                                <el-col :span='8'>
                                    <i class="mdi mdi-account red-icon"></i>
                                </el-col>
                                <el-col :span="12" class="driver">
                                    <span class="driver-man"><center>Total Active<br>User</center><br> </span>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col class="text-center">
                                    <span class="num" :style="{marginLeft: marginL +'px'}">{{active}}</span>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-col>
                    <el-col :span="12">
                        <el-card shadow="always" class="card-drive">
                            <el-row class="bts" :gutter="10">
                                <el-col :span="8">
                                     <i class="mdi mdi-account-off red-icon"></i>
                                </el-col>
                                <el-col :span="12" class="driver">
                                    <span class="driver-man"><center>Total Inactive<br> User </center></span>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col class="text-center">
                                    <span class="num">{{inactive}}</span>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-col>
                    <!-- <el-col :span="8">
                        <el-card shadow="always" class="card-drive">
                            <el-row class="bts" :gutter="10">
                                <el-col :span="8">
                                     <i class="mdi mdi-account-plus red-icon"></i>
                                </el-col>
                                <el-col :span="12" class="driver">
                                    <span class="driver-man"><center>Total All<br> User</center></span>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col class="text-center">
                                    <span class="num">{{all}}</span>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-col> -->
                </el-row>
            </el-col>
        </el-row>
        <el-row :gutter="20" justify="center">
            <el-col :span="24" >
                <h4>GRAPH</h4>
                <div class="card-base card-shadow--medium p-30 mt-25 bg-white border-line-hight">
                    <el-row :gutter="10">
                        <el-col :span="2">
                            <div class="rectangle"> </div>
                        </el-col>
                        <el-col :span="1">
                            <!-- <span>order</span> -->
                        </el-col>
                        <el-col :span="2" :offset="2">
                            <div class="rectangle2"> </div>
                        </el-col>
                        <el-col :span="1">
                            <!-- <span>task</span> -->
                        </el-col>
                    </el-row>
<!--                    <vue-chartist type="Line"></vue-chartist>-->
                </div>
                <!-- <center><i style="font-size: 14px; margin-top: 30px">Shows completed task and order for the last 7 days</i></center> -->
            </el-col>
    </el-row>
    </div>
</template>

<script>
    import {
        mapGetters
    } from 'vuex';
    import * as getter from "../../../store/getters-types";
    import * as action from "../../../store/action-types";

    export default {
        data() {
            return {
                data: {},
                tabOrder: 'today',
                tabTask: 'today',
                marginL: 0,
                dash: {
                    order_today: '',
                    order_week: '',
                    order_month: '',
                    task_today: '',
                    task_week: '',
                    task_month: ''
                },
                options: {
                    segmentShowStroke: false
                },
                backgroundColor: [
                    '#1fc8db',
                    '#AB0000',
                    '#42afe3',
                    '#ed6c63',
                    '#97cd76'
                ],
                options1: {
                    fullWidth: true,
                    chartPadding: {
                        right: 40
                    }
                },
                rules: '',
                spanLine: 22,
                spanOrder: 12,
                spanDriver: 12,
                pieChartexample: ['Total Document', 'Total Expired Document']
            }
        },
        async mounted(){
            await this.$store.dispatch(action.LIST_ACTIVE_USER);
            await this.$store.dispatch(action.LIST_INACTIVE_USER);
            await this.$store.dispatch(action.LIST_ALL_USER);
        },
        async created() {
            //console.log(this.pieChart)
            // this.rules = await JSON.parse(localStorage.getItem('user')).idrole
            // if (this.rules === 2) {
            //     this.spanLine = 18
            // } else {
            //     this.spanOrder = 16;
            //     this.spanDriver = 8
            // }

            // // if ((this.dashboard.total_driver + '').length > 2) {
            //     this.marginL = -33
            // }
        },
        computed: {
            ...mapGetters({
                active: getter.GET_ACTIVE,
                inactive: getter.GET_INACTIVE,
                all: getter.GET_ALL_USER,
                // pieChart: getter.GET_DASHBOARD_PIE,
                // grafChart: getter.GET_DASHBOARD_GRAFIK
            }),
        //     pieData() {
        //         return {
        //             labels: this.pieChartexample,
        //             datasets: [{
        //                 data: this.pieChart.data,
        //                 backgroundColor: this.backgroundColor
        //             }]
        //         }
        //     },
        //     lineChart() {
        //         return {
        //             labels: this.grafChart.label,
        //             series: this.grafChart.data
        //         }
        //     }
        // },
        // methods: {
        //     totalOrder(v) {
        //         if (v === 'today') {
        //             this.dash.order_today = 1;
        //             this.dash.order_week = '';
        //             this.dash.order_month = '';
        //         }
        //         if (v === 'week') {
        //             this.dash.order_today = '';
        //             this.dash.order_week = 1;
        //             this.dash.order_month = ''
        //         }
        //         if (v === 'month') {
        //             this.dash.order_today = '';
        //             this.dash.order_week = '';
        //             this.dash.order_month = 1
        //         }
        //         this.$store.dispatch(action.LIST_DASHBOARD, this.dash);

        //     },
        //     totalTask(v) {
        //         if (v === 'today') {
        //             this.dash.task_today = 1;
        //             this.dash.task_week = '';
        //             this.dash.task_month = '';
        //         }
        //         if (v === 'week') {
        //             this.dash.task_today = '';
        //             this.dash.task_week = 1;
        //             this.dash.task_month = ''
        //         }
        //         if (v === 'month') {
        //             this.dash.task_today = '';
        //             this.dash.task_week = '';
        //             this.dash.task_month = 1
        //         }
        //         this.$store.dispatch(action.LIST_DASHBOARD, this.dash);
        //     }
        // },
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../../assets/scss/_variables';
    .container {
        font-family: Arial;
    }

    .drive-acount {
        height: 44px;
        margin-top: 10px;
    }

    .card-border {
        border-radius: 3%;
    }

    .canvas .chartjs {
        max-width: 80%;
    }

    .font-icon {
        font-size: 40px;
    }

    .line {
        border-right: 1px solid $line-color;
        padding-right: 60px;
    }

    .driver-man {
        font-size: 20px;
        font-weight: bold;
        color: #acb4b5;
    }

    .mdi-account:before {
        content: "\F004";
        font-size: 50px;
    }

    .driver {
        margin-top: 18px;
    }

    .num {
        font-size: 72px;
        font-family: Arial;
    }

    .legend-container {
        margin-top: 10px;
    }

    .legend-open {
        margin-left: 10px;
        padding-right: 10px;
        border-right: 1px solid;
    }

    .legend-completed {
        margin-left: 10px;
        padding-right: 10px;
    }

    .bts {
        border-bottom: 1px solid $line-color;
        padding-bottom: 12px;
    }

    .red-icon:before {
        color: #04b3bf;
        /* font-weight: bold; */
        font-size: 60px;
    }

    .col-legend {
        font-size: 10px;
    }

    .mt-task {
        margin-top: 10px;
    }

    .border-line-hight {
        height: 200px;
    }

    .margin-pie {
        margin-left: 20px;
    }

    .card-drive {
        width: 90%;
        height: 296px;
    }

    .border-line-hight[data-v-db4e8e96] {
        height: 300px;
    }

    @media only screen and (min-width: 1200px) {
        .border-line-hight[data-v-db4e8e96] {
            height: 161px;
        }
        .font-icon {
            font-size: 20px;
        }
        .num {
            font-size: 5.5625em;
            font-family: Arial;
        }
        .card-drive {
            width: 90%;
            height: 270px;
        }
        .line {
            padding-right: 37px;
        }
    }

    @media only screen and (min-width: 1900px) {
        .border-line-hight[data-v-db4e8e96] {
            height: 399px;
        }
    }

    @media only screen and (min-width: 1600px) {
        .border-line-hight[data-v-db4e8e96] {
            height: 330px;
        }
    }
    /*@media only screen and (min-width: 1920px) {*/
    /*.col-legend {*/
    /*font-size: 11px;*/
    /*}*/
    /*.num {*/
    /*font-size: 12.0625em;*/
    /*}*/
    /*.font-icon {*/
    /*font-size: 40px;*/
    /*}*/
    /*.border-line-hight {*/
    /*height: 358px;*/
    /*}*/
    /*.margin-pie {*/
    /*margin-left: 80px;*/
    /*}*/
    /*.card-drive {*/
    /*width: 90%;*/
    /*height: 380px;*/
    /*}*/
    /*.driver {*/
    /*margin-top: 30px;*/
    /*}*/
    /*.driver-man {*/
    /*font-size:35px;*/
    /*font-weight: bold;*/
    /*color: #acb4b5;*/
    /*}*/
    /*.mt-task {*/
    /*margin-top: 70px;*/
    /*}*/
    /*.mdi-account:before {*/
    /*content: "\F004";*/
    /*font-size: 80px;*/
    /*}*/
    /*}*/
</style>
