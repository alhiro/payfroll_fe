<template>
  <div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-button @click="Create()" style="width: 100%; background: #04b3bf; border: 0px;"><b style="color: #ffffff">Create</b></el-button>
        </el-col>
        <el-col :offset="10" :lg="4">
          <el-select v-model="status" @change="filterActive($event)" filterable placeholder="Select Status">
            <el-option v-for="item in select" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6" :lg="4">
          <el-input placeholder="Search" v-model="param" @change="filterText()"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :lg="24">
          <el-table  @sort-change="sortHandle" :default-sort = "{prop: 'id', order: 'ascending'}" :data="listData" style="width: 100%">
            <el-table-column type="index" :index="paginate.fromP" label="No" align="center" width="50"></el-table-column>
            <el-table-column prop="username" align="center" sortable="custom" label="Username"></el-table-column>
            <el-table-column prop="mobile" align="center" sortable="custom" label="Mobile" width="200"></el-table-column>
             <el-table-column
             align="center"
              prop="isActive"
              sortable="custom"
              label="Status"
              width="100">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.isActive === 0 ? 'primary' : 'success'"
                  disable-transitions>{{scope.row.isActive === 0 ? 'Inactive' : 'Active&nbsp;&nbsp;'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="role.roleTitle" align="center" sortable="custom" label="Role" width="200"></el-table-column>
            <el-table-column align="center" prop="email" sortable="custom" label="Email"></el-table-column>
             <el-table-column align="center" width="200"
              label="Operations">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  :type="scope.row.isActive === 1 ? 'danger' : 'success'"
                  :title="scope.row.isActive === 1 ? 'Deactivate' : 'Activate'"
                  @click="Activate(scope.row)">
                    <i style="font-size: 18px" :class="scope.row.isActive === 1 ? 'mdi mdi-close-box-outline' : 'mdi mdi-checkbox-marked-outline'"></i>
                </el-button>
                <el-button
                  size="mini"
                  type="success"
                  title="Edit"
                  @click="Edit(scope.row)">
                    <i style="font-size: 18px" class="mdi mdi-pencil"></i>
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  title="Delete"
                  @click="Delete(scope.row)">
                    <i style="font-size: 18px" class="mdi mdi-delete"></i>
                </el-button>
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
import Affix from "@/components/Affix" 
import { mapGetters } from "vuex" 
import * as getter from "../../../store/getters-types" 
import * as action from "../../../store/action-types" 
import Swal from "sweetalert2" 

export default {
  name: "ListUserHolding",
  data() {
    return {
      currentPage   : 1,
      indexT        : 1,
      select: [
        {
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
      status        : 99,
      sort          : "descending",
      sortBy        : "id",
      param         : ""
    } 
  },
  components: {
    Affix
  },
  computed: {
    ...mapGetters({
      listData  : getter.GET_LIST_USER_HOLDING,
      paginate  : getter.GET_PAGINATE_USER_HOLDING,
      totalUser : getter.GET_USER_TOTAL_HOLDING,
    }),
    paginator() {
      return this.paginate 
    },
    indexTam() {
      return this.indexT 
    },
    forTotal() {
      if (this.listData) {
        return this.totalUser 
      }
    },
  },
  mounted() {
    this.$store.dispatch(action.LIST_DATA_USER_HOLDING, {
      page: this.currentPage,
      sort:this.sort,
      sortBy:this.sortBy,
      param:this.param,
      status: this.status,
    }) 
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page 
      this.$store.dispatch(action.LIST_DATA_USER_HOLDING, { 
        page: page,
        sort:this.sort,
        sortBy:this.sortBy,
        param:this.param,
        status: this.status
      }) 
    },
    sortHandle(column) {
      this.sort = column.order
      this.sortBy = column.prop
      this.$store.dispatch(action.LIST_DATA_USER_HOLDING, { 
        page: this.currentPage,
        sort:this.sort,
        sortBy:this.sortBy,
        param:this.param,
        status: this.status}
      ) 
    },
    filterActive(status){
      this.status = status
      this.$store.dispatch(action.LIST_DATA_USER_HOLDING, { 
        page: this.currentPage,
        sort:this.sort,
        sortBy:this.sortBy,
        param:this.param,
        status: status
      }) 
    },
    filterText(){
      this.$store.dispatch(action.LIST_DATA_USER_HOLDING, { 
        page: this.currentPage,
        sort:this.sort,
        sortBy:this.sortBy,
        param:this.param,
        status: this.status
      }) 
    },
    Create() {
      this.$router.push({
        name: "NewUserHolding"
      }) 
    },
    Edit(rowData) {
      this.$store.dispatch(action.EDIT_USER_HOLDING, rowData.id) 
    },
    Delete(rowData) {
      Swal.fire({
        title: `Are you sure to delete user ${rowData.username}?`,
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$store.dispatch(action.DELETE_USER_HOLDING, {
            id: rowData.id,
            page: this.currentPage,
            sort:this.sort,
            sortBy:this.sortBy,
            param:this.param,
            status: this.status
          })
        }
      })
    },
    Activate(rowData) {
      let activateText = rowData.isActive === 1 ? 'deactivate' : 'activate'
      let active = rowData.isActive === 1 ? 0 : 1
      Swal.fire({
        title: `Are you sure to ${activateText} user ${rowData.username}?`,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `Yes, ${activateText} it!`
      }).then(result => {
        if (result.value) {
          this.$store.dispatch(action.ACTIVATE_USER_HOLDING, {
            id: rowData.id,
            page: this.currentPage,
            active: active,
            sort:this.sort,
            sortBy:this.sortBy,
            param:this.param,
            status: this.status
          })
        }
      })
    }
  }
} 
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/_variables";

.card-base {
  padding: 20px;
}

.el-row {
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