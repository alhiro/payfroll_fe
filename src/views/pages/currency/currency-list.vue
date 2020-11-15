<template>
  <div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-button @click="addRow()" style="width: 100%; background: #04b3bf; border: 0px;"><b style="color: #ffffff">Create</b></el-button>
        </el-col>
        <el-col :offset="14" :lg="4">
          <el-input placeholder="Search" v-model="param" @change="filterText()"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :lg="24">
          <el-table @sort-change="sortHandle" :default-sort = "{prop: 'id', order: 'descending'}" :data="dataList" style="width: 100%">
            <el-table-column type="index" :index="paginate.fromP" label="No" align="center" width="50"></el-table-column>
            <el-table-column prop="curCode" align="center" sortable="custom" label="Currency Code" width="230">
              <template slot-scope="scope">
                <div v-if="scope.row.id === 0">
                  <el-input maxlength="5" show-word-limit :class="`curCode_${scope.row.id} ${errorElement.includes(`curCode_${scope.row.id}`) ? 'is-error' : ''}`" v-model="scope.row.curCode" @blur="onTyping(`curCode_${scope.row.id}`, scope.row.curCode)" @input="onTyping(`curCode_${scope.row.id}`, scope.row.curCode)" size="small"></el-input>
                  <el-tooltip v-if="errorElement.includes(`curCode_${scope.row.id}`)"
                    :content="contentCurCode" placement="top" effect="light">
                    <span class="error-icon code">
                      <i class="mdi mdi-alert-circle-outline"></i>
                    </span>
                  </el-tooltip>
                </div>
                <div v-else>
                  {{scope.row.curCode}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="curDesc" align="center" sortable="custom" label="Description">
              <template slot-scope="scope">
                <div v-if="indexEditing.includes(scope.row.id) || scope.row.id === 0">
                  <el-input maxlength="20" show-word-limit :class="`curDesc_${scope.row.id} ${errorElement.includes(`curDesc_${scope.row.id}`) ? 'is-error' : ''}`" v-model="scope.row.curDesc" @blur="onTyping(`curDesc_${scope.row.id}`, scope.row.curDesc)" @input="onTyping(`curDesc_${scope.row.id}`, scope.row.curDesc)" size="small"></el-input>
                  <el-tooltip v-if="errorElement.includes(`curDesc_${scope.row.id}`)"
                    :content="contentCurDesc" placement="top" effect="light">
                    <span class="error-icon desc">
                      <i class="mdi mdi-alert-circle-outline"></i>
                    </span>
                  </el-tooltip>
                </div>
                <div v-else>
                  {{scope.row.curDesc}}
                </div>
              </template>
            </el-table-column>
             <el-table-column align="center" width="200"
              label="Operations">
              <template slot-scope="scope">
                <el-button v-if="indexEditing.includes(scope.row.id) || scope.row.id === 0"
                  size="mini"
                  type="primary"
                  title="Save"
                  @click="saveRow(scope.row)">
                    <i style="font-size: 18px" class="mdi mdi-content-save"></i>
                </el-button>
                <el-button v-if="indexEditing.includes(scope.row.id) || scope.row.id === 0"
                  size="mini"
                  type="warning"
                  title="Cancel Editing"
                  @click="cancelEditing(scope.row)">
                    <i style="font-size: 18px" class="mdi mdi-window-close"></i>
                </el-button>
                <el-button v-if="indexEditing.includes(scope.row.id) === false && scope.row.id !== 0"
                  size="mini"
                  type="success"
                  title="Edit"
                  @click="editRow(scope.row)">
                    <i style="font-size: 18px" class="mdi mdi-pencil"></i>
                </el-button>
                <el-button v-if="indexEditing.includes(scope.row.id) === false && scope.row.id !== 0"
                  size="mini"
                  type="danger"
                  title="Delete"
                  @click="deleteData(scope.row)">
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
import $ from 'jquery'

export default {
  name: "CurrencyList",
  data() {
    return {
      currentPage     : 1,
      indexT          : 1,
      size            : 10,
      sort            : "desc",
      sortBy          : "id",
      param           : "",
      addCount        :0,
      indexEditing    : [],
      dataBeforeEdit  : [],
      dataBeforeAdd   : 0,
      errorElement    : [],
      contentCurCode  : "",
      contentCurDesc  : "",
    } 
  },
  components: {
    Affix
  },
  computed: {
    ...mapGetters({
      listData      : getter.GET_CURRENCY_LIST,
      paginate      : getter.GET_PAGINATE_CURRENCY,
      totalCurrency : getter.GET_CURRENCY_TOTAL,
    }),
    dataList: {
      get: function () {
        if (this.listData != null && this.dataBeforeAdd === this.listData.length) {
          this.addCount = 0
          this.errorElement = []
        }
        return this.listData
      },
      set: function (dataListNew) {
        return dataListNew
      }
    },
    paginator() {
      return this.paginate
    },
    indexTam() {
      return this.indexT
    },
    forTotal() {
      if (this.listData) {
        return this.totalCurrency
      }
    },
  },
  mounted() {
    this.$store.dispatch(action.CURRENCY_DATA_LIST, {
      page: this.currentPage,
      sort:this.sort,
      sortBy:this.sortBy,
      param:this.param,
      size: this.size,
    }) 
  },
  methods: {
    loopValidate(rowData) {
      const app = this
      let isError = 0
      $.each(rowData, function(key, value) {
        if (key !== "id") {
          app.validateInput(`${key}_${rowData.id}`, value)
          if (app.errorElement.includes(`${key}_${rowData.id}`) === true) {
            ++isError
          }
        }
      })

      return isError
    },
    async saveRow(rowData) {
      let isError = await this.loopValidate(rowData)
      if (isError === 0) {
        if (rowData.id === 0) {
          // create currency
          rowData.curCode = rowData.curCode.toUpperCase()
          this.currentPage = 1
          this.$store.dispatch(action.CREATE_CURRENCY, {
            dataForCreate:rowData,
            page: this.currentPage,
            sort: this.sort,
            sortBy: this.sortBy,
            param: this.param,
            size: this.size
          })
        } else {
          // update currency
          let posId = this.indexEditing.indexOf(rowData.id)
          if (posId !== -1) {
            this.indexEditing.splice(posId, 1)
          }
          let pos = this.dataBeforeEdit.map(function(e) { return e.id; }).indexOf(rowData.id)
          if (pos !== -1) {
            this.dataBeforeEdit.splice(pos, 1)
          }

          this.$store.dispatch(action.UPDATE_CURRENCY, {
            dataForUpdate:rowData,
            page: this.currentPage,
            sort:this.sort,
            sortBy:this.sortBy,
            param:this.param,
            size: this.size
          })
        }
      }
    },
    cancelEditing(rowData) {
      if (rowData.id === 0) {
        this.dataList.shift()
      } else {
        let posId = this.indexEditing.indexOf(rowData.id)
        if (posId !== -1) {
          this.indexEditing.splice(posId, 1)
        }
        let pos = this.dataBeforeEdit.map(function(e) { return e.id; }).indexOf(rowData.id)
        if (pos !== -1) {
          rowData.curDesc = this.dataBeforeEdit[pos].curDesc
          this.dataBeforeEdit.splice(pos, 1)
        }
      }

      let posErrorCurCode = this.errorElement.indexOf(`curCode_${rowData.id}`)
      if (posErrorCurCode !== -1) {
        this.errorElement.splice(posErrorCurCode, 1)
      }
      let posErrorCurDesc = this.errorElement.indexOf(`curDesc_${rowData.id}`)
      if (posErrorCurDesc !== -1) {
        this.errorElement.splice(posErrorCurDesc, 1)
      }
    },
    editRow(rowData) {
      if (this.indexEditing.includes(rowData.id) === false) {
        this.indexEditing.push(rowData.id)
      }
      this.dataBeforeEdit.push(Object.assign({}, rowData))
    },
    validateInput(className, value, countError){
      if (
          value.toString().trim() === "" ||
          (className.indexOf("curCode") !== -1 && /^[a-zA-Z]+$/.test(value.trim()) === false) ||
          (className.indexOf("curCode") !== -1 && value.trim().length > 5) ||
          (className.indexOf("curDesc") !== -1 && value.trim().length > 20)
        ) {
        if (this.errorElement.includes(className) === false) {
          this.errorElement.push(className)
        }

        // set error message
        if (value.toString().trim() === "") {
          this.contentCurCode = "Currency code harus diisi"
          this.contentCurDesc = "Description harus diisi"
        }
        if (className.indexOf("curCode") !== -1 && /^[a-zA-Z]+$/.test(value.trim()) === false && value.toString().trim() !== "")
          this.contentCurCode = "Currency code hanya boleh huruf"
        if (className.indexOf("curCode") !== -1 && value.trim().length > 5)
          this.contentCurCode = "Currency code maksimal 5 karakter"
        if (className.indexOf("curDesc") !== -1 && value.trim().length > 20)
          this.contentCurDesc = "Description maksimal 20 karakter"
      } else {
        let pos = this.errorElement.indexOf(className)
        if (pos !== -1) {
          this.errorElement.splice(pos, 1)
        }
      }
    },
    onTyping(className, value) {
      this.validateInput(className, value)
    },
    addRow:function(){
      if (this.addCount === 0) {
        this.dataBeforeAdd = this.dataList.length
        let newRow  = {
          id: 0,
          curCode:"",
          curDesc: "",
        };
        this.dataList.unshift(newRow)
        ++ this.addCount;
      }
    },
    handlePageChange(page) {
      this.currentPage = page 
      this.$store.dispatch(action.CURRENCY_DATA_LIST, { 
        page: page,
        sort:this.sort,
        sortBy:this.sortBy,
        param:this.param,
        size: this.size
      })
    },
    sortHandle(column) {
      this.sort = column.order === "ascending" ? "asc" : "desc"
      this.sortBy = column.prop
      this.$store.dispatch(action.CURRENCY_DATA_LIST, { 
        page: this.currentPage,
        sort:this.sort,
        sortBy:this.sortBy,
        param:this.param,
        size: this.size}
      )
    },
    filterText(){
      this.addCount = 0
      this.$store.dispatch(action.CURRENCY_DATA_LIST, { 
        page: this.currentPage,
        sort:this.sort,
        sortBy:this.sortBy,
        param:this.param,
        size: this.size
      })
    },
    deleteData(rowData) {
      Swal.fire({
        title: "Konfirmasi",
        text: `Anda yakin akan manghapus currency ${rowData.curCode}?`,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal"
      }).then(result => {
        if (result.value) {
          this.$store.dispatch(action.DELETE_CURRENCY, {
            id: rowData.id,
            page: this.currentPage,
            sort:this.sort,
            sortBy:this.sortBy,
            param:this.param,
            size: this.size
          })
        }
      })
    },
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

<style lang="scss">

.el-input.el-input--small.is-error .el-input__inner {
  border-color: #ec205f;
}

.error-icon {
  color: #ec205f;
  margin-top: 5px;
  font-size: 16px;
  position: absolute;
  cursor: pointer;
}

.error-icon.code {
  margin-left: -45px;
}

.error-icon.desc {
  margin-left: -52px;
}

.el-tooltip__popper.is-light {
    color: #ec205f;
}

</style>
