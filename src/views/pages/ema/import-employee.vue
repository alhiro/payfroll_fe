<template>
<div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <el-tabs type="border-card">
            <!-- <el-tab-pane label="Download">
                    <el-button @click="downloadButton">
                        Download
                    </el-button>
                </el-tab-pane> -->
            <el-tab-pane label="Upload">
                <el-row :gutter="20" style="margin-bottom: 10px;">
                    <el-col :span="12">
                        <el-select v-model="form.comId" filterable placeholder="Select">
                            <el-option v-for="item in selectCom" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row :gutter="20">

                    <el-col :span="2">
                        <el-button @click="onPickFile">Browse</el-button>
                        <input type="file" style="display: none" ref="fileInput" accept="application/vnd.sealed-xls" @change="handleFileChange">
                    </el-col>
                    <el-col :span="14">
                        <el-input disabled placeholder="Browse file" v-model="form.browse" disable></el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :offset="20" :span="8">
                        <el-button :loading="button" @click="onSubmit" style="margin-top: 20px" type="success">SUBMIT
                        </el-button>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </div>
</div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from "vuex";
import * as getter from "../../../store/getters-types";
import * as action from "../../../store/action-types";
import * as mutation from "../../../store/mutation-types";
export default {
    data() {
        return {
            form: {
                file: '',
                browse: '',
                comId: null,
            }
        };
    },
    methods: {
        async downloadButton() {
            let data = await this.$store.dispatch(action.DOWNLOAD_BULK_EMPLOYEE)
            let firstD = data.slice(1)
            let secondD = firstD.slice(0, firstD.length - 1)
            window.open(secondD)
        },
        onPickFile() {
            this.$refs.fileInput.click();
               console.log(this.selectCom, 'this is company')
        },
        handleFileChange(event) {
            this.form.file = event.target.files[0];
            this.form.browse = event.target.files[0].name;
        },
        onSubmit() {
            this.$store.commit(mutation.BUTTON_STATUS, true)
            this.$store.dispatch(action.UPLOAD_BULK_EMPLOYEE, this.form);
        }
    },
    computed: {
        ...mapGetters({
            button: getter.GET_BUTTON,
            selectCom: getter.GET_DROPDOWN_COMPANY,
        })
    },
      async mounted() {
        await this.$store.dispatch(action.SELECT_COMPANY);

    }
};
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
</style>
