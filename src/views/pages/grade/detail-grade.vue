<template>
<div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <h1>Entity Detail</h1>
        <el-row :gutter="20">
            <el-col :offset="2" :lg="7" style="margin-bottom: 30px">
                <b>Entity Name</b>
                <br>
                {{ content.name}}
            </el-col>
            <el-col :lg="7" style="margin-bottom: 30px">
                <b>Company Name</b>
                <br>
                {{ content.company.name}}
            </el-col>
            <el-col :lg="7" style="margin-bottom: 30px">
                <b>Entity NPWP</b>
                <br>
                {{ content.npwp}}
            </el-col>
            <el-col :offset="2" :lg="7" style="margin-bottom: 30px">
                <b>Entity Phone</b>
                <br>
                {{ content.phone}}
            </el-col>
             <el-col :lg="7" style="margin-bottom: 30px">
                <b>Fax Number</b>
                <br>
                {{ content.faxNo}}
            </el-col>
            <el-col :lg="7" style="margin-bottom: 30px">
                <b>Entity Email</b>
                <br>
                {{ content.email}}
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-row>
                <el-col :offset="2" :lg="7">
                    <h3>Director</h3>
                </el-col>
            </el-row>
            <el-col :offset="2" :lg="7" style="margin-bottom: 30px">
                <b>Director's Name</b>
                <br>
                {{ content.dirName}}
            </el-col>
            <el-col :lg="7" style="margin-bottom: 30px">
                <b>Director's NPWP</b>
                <br>
                {{ content.dirNpwp}}
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-row>
                <el-col :offset="2" :lg="7">
                    <h3>Address</h3>
                </el-col>
            </el-row>
            <el-col :offset="2" :lg="7" style="margin-bottom: 30px">
                <b>Entity Address</b>
                <br>
                {{ content.address}}
            </el-col>
            <el-col :lg="7" style="margin-bottom: 30px">
                <b>City</b>
                <br>
                {{ content.city}}
            </el-col>
            <el-col :lg="7" style="margin-bottom: 30px">
                <b>ZIP Code</b>
                <br>
                {{ content.zipCode}}
            </el-col>
            <el-col :offset="2" :lg="7">
                <b>Province</b>
                <br>
                {{ content.name}}
            </el-col>
            <el-col :lg="7">
                <b>Entity Branch</b>
                <br>
                {{ content.branch}}
            </el-col>
        </el-row>
        <el-row style="margin-top: 50px;">
            <!-- <el-col v-if="content.status === 0" :lg="3">
                <el-button @click="Activate()" style="width:  100%" type="primary">Activate</el-button>
            </el-col>
            <el-col v-if="content.status === 1" :lg="3">
                <el-button @click="Suspend()" style="width:  100%" type="danger">Suspend</el-button>
            </el-col> -->
            <el-col :offset="18" :lg="3">
                <el-button @click="Cancel()" style="width:  100%" type="default">Back</el-button>
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

        };
    },
    methods: {
        Cancel() {
            this.$router.replace({
                name: "List Entity"
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
    },
    computed: {
        ...mapGetters({
            content: getter.GET_ENTITY_DETAIL,
            button: getter.GET_BUTTON,
        })
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
