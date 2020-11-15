<template>
  <div class="page-table scrollable only-y" id="affix-container">
    <el-dialog title="Detail Holding" :visible.sync="dialogFormVisible" width="70%">
        <el-form ref="form" :model="form">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="Holding Name" prop="holdingName">
                        <el-input :disabled="true" placeholder="Input Holding Name" v-model="form.holdingName"></el-input>

                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Holding NPWP" prop="holdingNpwp">
                        <el-input :disabled="true" placeholder="Input Holding NPWP" v-model="form.holdingNpwp"></el-input>

                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Holding Type" prop="holdingType">
                        <el-input :disabled="true" placeholder="Input Holding Type" v-model="form.holdingType"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Holding Email" prop="email">
                        <el-input :disabled="true" placeholder="Input Holding Email" v-model="form.email"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24" style="margin-top: 10px;">
                    <span><b>Address</b></span>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Holding Address" prop="holdingAddress">
                        <el-input :disabled="true" placeholder="Input Holding Address" v-model="form.holdingAddress"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="City" prop="city">
                        <el-input :disabled="true" placeholder="Input Holding City" v-model="form.city"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="ZIP Code" prop="zip">
                        <el-input :disabled="true" placeholder="Input ZIP Code" v-model="form.zip" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="FAX Number" prop="fax">
                        <el-input :disabled="true" placeholder="Input Fax Number" v-model="form.fax" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-col>
                        <span><b>Holding PIC</b></span>
                    </el-col>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <div v-for="(domain, index) in form.holdingPic" :key="domain.key">
                    <el-col :span="11">
                        <div class="grid-content">
                            <el-form-item :prop="'holdingPic.' + index + '.picName'">
                                <el-input :disabled="true" placeholder="PIC Name" v-model="domain.picName" class="leb_same"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="11">
                        <div class="grid-content">
                            <el-form-item :prop="'holdingPic.' + index + '.picEmail'">
                                <el-input type="email" :disabled="true" placeholder="PIC Email" v-model="domain.picEmail" class="leb_same"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="11">
                        <div class="grid-content">
                            <el-form-item :prop="'holdingPic.' + index + '.picPhoneNumber'">
                                <el-input :disabled="true" placeholder="PIC Phone Number" v-model="domain.picPhoneNumber" class="leb_same" v-on:keypress.native="isNumber"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="11">
                        <div class="grid-content">
                            <el-form-item :prop="'holdingPic.' + index + '.picPosition'">
                                <el-input :disabled="true" placeholder="PIC Position" v-model="domain.picPosition" class="leb_same"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="1">
                        <div class="grid-content">
                          
                        </div>
                    </el-col>
                </div>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-col>
                        <span><b>Company Admin</b></span>
                    </el-col>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="Admin Name" prop="fullName">
                        <el-input :disabled="true" placeholder="Input Full Name" v-model="form.fullName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Admin Username" prop="userName">
                        <el-input :disabled="true" placeholder="Input Username" v-model="form.userName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Admin Email" prop="adminEmail">
                        <el-input :disabled="true" placeholder="Input Email" type="email" v-model="form.adminEmail"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Admin Phone Number" prop="adminPhone">
                        <el-input :disabled="true" placeholder="Input Phone Number" v-on:keypress.native="isNumber" v-model="form.adminPhone"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Close</el-button>
        </span>
    </el-dialog>
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
          <el-input placeholder="Type to search" v-model="param" @change="filterText()"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :lg="24">
          <el-table  @sort-change="sortHandle" :default-sort = "{prop: 'id', order: 'ascending'}" :data="listData" style="width: 100%">
            <el-table-column type="index" :index="paginate.fromP" label="No" align="center" width="50"></el-table-column>
            <el-table-column prop="code" align="center" sortable="custom" label="Holding ID"></el-table-column>
            <el-table-column prop="name" align="center" sortable="custom" label="Holding Name" width="200"></el-table-column>
            <el-table-column prop="npwp" align="center" sortable="custom" label="NPWP" width="200"></el-table-column>
            <el-table-column prop="address" align="center" sortable="custom" label="Location" width="200"></el-table-column>
             <el-table-column
             align="center"
              prop="isActive"
              label="Status"
              width="100">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.isActive === 0 ? 'primary' : 'success'"
                  disable-transitions>{{scope.row.isActive === 0 ? 'Inactive' : 'Active&nbsp;&nbsp;'}}</el-tag>
              </template>
            </el-table-column>
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
                <el-button size="mini" type="primary" @click="Detail(scope.row)"><i style="font-size: 18px" class="mdi mdi-eye"></i></el-button>
                <el-button
                  size="mini"
                  type="success"
                  title="Manage"
                  @click="Edit(scope.row)">
                    <i style="font-size: 18px" class="mdi mdi-pencil"></i>
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
  name: "ListUserKlikpayroll",
  data() {
    return {
      dialogFormVisible:false,
      form: {
            holdingName: '',
            holdingNpwp : '',
            holdingType : '',
            email : '',
            holdingAddress : '',
            city : '',
            zip : '',
            id : '',
            fax : '',
            holdingPic : [],
            adminId : '',
            fullName : '',
            userName : '',
            adminEmail : '',
            adminPhone : '',
            holdingPic: [{
                key: 0,
                picName: null,
                picPosition: null,
                picEmail: null,
                picPhoneNumber: null
            }],
      },
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
      listData  : getter.GET_LIST_HOLDING,
      paginate  : getter.GET_PAGINATE_HOLDING,
      totalHolding : getter.GET_TOTAL_HOLDING,
      content: getter.GET_CONSULTANT_DETAIL,
    }),
    paginator() {
      return this.paginate 
    },
    indexTam() {
      return this.indexT 
    },
    forTotal() {
      if (this.listData) {
        return this.totalHolding 
      }
    },
  },
  mounted() {
    this.$store.dispatch(action.LIST_HOLDING, {
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
      this.$store.dispatch(action.LIST_HOLDING, { 
        page: page,
        sort:this.sort,
        sortBy:this.sortBy,
        param:this.param,
        status: this.status
      }) 
    },
    sortHandle(column) {
      this.sort = column.order ? column.order : 'descending'
      this.sort = this.sort == 'descending' ? 'desc' : 'asc'
      this.sortBy = column.prop ? column.prop : 'id'
      if(this.sortBy == 'name')
        this.sortBy = 'holdingName';
      else if(this.sortBy == 'npwp')
        this.sortBy = 'holdingNpwp';
      else if(this.sortBy == 'address')
        this.sortBy = 'holdingAddress';
      else if(this.sortBy == 'code')
        this.sortBy = 'holdingCode';
      
      this.$store.dispatch(action.LIST_HOLDING, { 
        page: this.currentPage,
        sort:this.sort,
        sortBy:this.sortBy,
        param:this.param,
        status: this.status}
      ) 
    },
    filterActive(status){
      this.currentPage = 1;
      this.status = status
      this.$store.dispatch(action.LIST_HOLDING, { 
        page: this.currentPage,
        sort:this.sort,
        sortBy:this.sortBy,
        param:this.param,
        status: status
      }) 
    },
    filterText(){
      this.currentPage = 1;
      this.$store.dispatch(action.LIST_HOLDING, { 
        page: this.currentPage,
        sort:this.sort,
        sortBy:this.sortBy,
        param:this.param,
        status: this.status
      }) 
    },
    Create() {
      this.$router.push({
        name: "NewHolding"
      }) 
    },
    Edit(rowData) {
      rowData.gotoEdit = true;
      this.$store.dispatch(action.DETAIL_CONSULTANT, rowData) 
    },
    async Detail(e) {
        e.gotoEdit = false;
        await this.$store.dispatch(action.DETAIL_CONSULTANT, e) 
        this.form.holdingName = this.content.holding_name,
        this.form.holdingNpwp = this.content.holding_npwp,
        this.form.email = this.content.holding_email,
        this.form.holdingAddress = this.content.holding_address,
        this.form.city = this.content.holding_city,
        this.form.zip = this.content.holding_zip,
        this.form.id = this.content.holding_id,
        this.form.fax = this.content.holding_fax,
        this.form.holdingPic = [],
        this.form.adminId = this.content.company_admin.id,
        this.form.fullName = this.content.company_admin.fullname,
        this.form.userName = this.content.company_admin.username,
        this.form.adminEmail = this.content.company_admin.email,
        this.form.adminPhone = this.content.company_admin.phone_number;
        for (let i = 0; i < this.content.holding_pic.length; i++) {
            this.form.holdingPic.push({
                key: this.content.holding_pic[i].id,
                id: this.content.holding_pic[i].id,
                picName: this.content.holding_pic[i].pic_name,
                picPosition: this.content.holding_pic[i].pic_position,
                picEmail: this.content.holding_pic[i].pic_email,
                picPhoneNumber: this.content.holding_pic[i].pic_phone_number
            });
        }
        if(this.content.holding_type == 'HL')
          this.form.holdingType = 'Holding';
        else
          this.form.holdingType = 'Tax Consultant';
        // this.form.holdingName = e.name,
        // this.form.holdingNpwp = e.npwp,
        // this.form.holdingType = e.type,
        // this.form.email = e.email,
        // this.form.holdingAddress = e.address,
        // this.form.city = e.city,
        // this.form.zip = e.zip,
        // this.form.id = e.id,
        // this.form.fax = e.fax,
        // this.form.holdingPic = [];
        // this.form.adminId = e.company_admin.id,
        // this.form.fullName = e.company_admin.fullname,
        // this.form.userName = e.company_admin.username,
        // this.form.adminEmail = e.company_admin.email,
        // this.form.adminPhone = e.company_admin.phone_number;
        // for (let i = 0; i < e.pic.length; i++) {
        //     this.form.holdingPic.push({
        //         key: e.pic[i].id,
        //         id: e.pic[i].id,
        //         picName: e.pic[i].pic_name,
        //         picPosition: e.pic[i].pic_position,
        //         picEmail: e.pic[i].pic_email,
        //         picPhoneNumber: e.pic[i].pic_phone_number
        //     });
        // }
        this.dialogFormVisible = true;
    },
    Activate(rowData) {
      let activateText = rowData.isActive === 1 ? 'deactivate' : 'activate'
      let active = rowData.isActive === 1 ? 0 : 1
      Swal.fire({
        title: `Are you sure to ${activateText} Holding ${rowData.code} ${rowData.name}?`,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `Yes, ${activateText} it!`
      }).then(result => {
        if (result.value) {
          this.$store.dispatch(action.ACTIVATE_HOLDING, {
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