<template>
  <div class="page-table scrollable only-y set-margin-top" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-button style="width: 100%; background: #04b3bf; border: 0px;"><b style="color: #ffffff">Master Payroll</b></el-button>
        </el-col>
        <el-col :offset="14 " :lg="4">
          <el-input
          v-model="search"
          size="mini"
          placeholder="Type to search"/>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :lg="24">
          <el-table :data="listData.filter(data => !search || data.companyName.toLowerCase().includes(search.toLowerCase()) || data.year.toLowerCase().includes(search.toLowerCase()) || data.monthStrEn.toLowerCase().includes(search.toLowerCase()) )" style="width: 100%">
            <el-table-column type="index" :index="paginate.fromP"  label="No" align="center" width="50"></el-table-column>
            <el-table-column prop="companyName" align="center" label="Company Name"></el-table-column>
            <el-table-column prop="monthStrEn" align="center" label="Bulan" width="200"></el-table-column>
            <el-table-column prop="year" align="center" label="Tahun" width="200"></el-table-column>
            <el-table-column align="center" width="150"
              label="Actions">
              <template slot-scope="scope">
                <el-button size="mini" type="success" @click="choosePayroll(scope.row)">Pilih</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div align="right">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handlePageChange"
          :total="forTotal"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as getter from "../../../store/getters-types";
import * as action from "../../../store/action-types";
import * as mutation from "../../../store/mutation-types";
import Swal from "sweetalert2";

export default {
  name: "LisUser",
  data() {
    return {
      currentPage   : 0,
      size          : 5,
      search        : "",
      sort          : "asc"

    };
  },
  computed: {
    ...mapGetters({
      listData    : getter.GET_LIST_MASTER_PAYROLL,
      paginate    : getter.GET_PAGINATE_USER,
      //totalUser : 10,
    }),
    // paginator() {
    //   return this.paginate;
    // },
    forTotal() {
      if (this.listData) {
        return 10;
      }
    },
  },

  mounted() {
    this.$store.dispatch(action.LIST_MASTER_PAYROLL, {
        page: this.currentPage,
        size: this.size,
        sort: this.sort
        //status: this.status,
    });
    // this.$store.dispatch(action.LIST_DATA_USER, {
    //   page: this.currentPage,
    //   status: this.status,
    // });
  },

  methods: {
    handlePageChange(page) {
      this.currentPage = page;
      this.$store.dispatch(action.LIST_DATA_USER, { 
        page: page,
        status: this.status}
        );
    },
    choosePayroll(data) {
      this.$store.dispatch(action.SET_PAYROLL, data);
      this.$router.replace("dashboard")
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

a {
  height: 150px;
  padding: 10px;
  border-style: dotted;
  border-radius: 15px;
}

td {
  padding: 10px;
}
.set-margin-top {
  margin-top:50px;
}
</style>