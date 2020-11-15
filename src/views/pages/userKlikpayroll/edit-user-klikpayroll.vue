<template>
<div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <el-form ref="form" :rules="rules" :model="form">
            <h2>Edit User</h2>
            <el-row :gutter="20">
                <el-col :lg="8">
                    <el-form-item label="Username" prop="username">
                        <el-input placeholder="Input Username" v-model="form.username"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="8">
                    <el-form-item label="Email" prop="email">
                        <el-input placeholder="Input Email" v-model="form.email"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="8">
                    <el-form-item label="Mobile" prop="mobile">
                        <el-input v-on:keypress.native="isNumber" placeholder="Input Mobile Number" v-model="form.mobile"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="8">
                    <el-form-item label="Employee Number" prop="employeeNo">
                        <el-input v-on:keypress.native="isNumber" placeholder="Input Employee Number" v-model="form.employeeNo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="8">
                    <el-form-item label="Role" prop="roleId">
                        <el-select v-model="form.roleId" filterable placeholder="Select Role">
                            <el-option v-for="item in userRoles" :key="item.id" :label="item.roleTitle" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :lg="8">
                    <el-form-item label="Country" prop="countryId">
                        <el-input v-on:keypress.native="isNumber" placeholder="Select Country" v-model="form.countryId"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-row>
            <el-col :offset="19" :lg="2">
                <el-button :loading="button" @click="onSubmit('form')" type="success">Submit</el-button>
            </el-col>
            <el-col :offset="1" :lg="2">
                <el-button @click="Cancel()" type="succes">Cancel</el-button>
            </el-col>
        </el-row>
    </div>
</div>
</template>

<script>
import router from "../../../router" 
import moment from "moment" 
import Affix from "@/components/Affix" 
import {
    mapGetters,
    mapActions
} from "vuex" 
import * as getter from "../../../store/getters-types" 
import * as action from "../../../store/action-types" 
import * as mutation from '../../../store/mutation-types' 
export default {
  name: "EditUserKlikpayroll",
  data() {
    return {
      form: {
        id: '',
        roleId: '',
        countryId: '',
        email: '',
        username: '',
        mobile: '',
        employeeNo: '',
      },
      rules: {
        username: [{
          required: true,
          message: "Username is required!",
          trigger: "blur"
        }],
        roleId: [{
          required: true,
          message: "Role is required!",
          trigger: "blur"
        }],
        email: [{
            required: true,
            message: "Email is required!",
            trigger: "blur"
          },
          {
            type: "email",
            message: "Please Input Valid Email",
            trigger: ["blur", "change"]
          }
        ],
        employeeNo: [{
          required: true,
          message: "Employee Number is required!",
          trigger: "blur"
        }],
        mobile: [{
          required: true,
          message: "Mobile Number is required!",
          trigger: "blur"
        }],
        countryId: [{
          required: true,
          message: "Country is required!",
          trigger: "blur"
        }],
      }
    } 
  },
  methods: {
    onSubmit(formName) {
      let obj = {
        id: this.form.id,
        roleId: this.form.roleId,
        countryId: this.form.countryId,
        email: this.form.email,
        username: this.form.username,
        mobile: this.form.mobile,
        employeeNo: this.form.employeeNo,
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.commit(mutation.BUTTON_STATUS, true)
          this.$store.dispatch(action.UPDATE_DATA_USER_KLIKPAYROLL, obj)
        } else {
          return false 
        }
      }) 
    },
    Cancel() {
      this.$router.replace({
        path: "/list-user-klikpayroll"
      }) 
    },
    isNumber(evt) {
      evt = evt ? evt : window.event 
      var charCode = evt.which ? evt.which : evt.keyCode 
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57)
      ) {
        evt.preventDefault() 
      } else {
        return true 
      }
    },
  },
  computed: {
    ...mapGetters({
      error: getter.GET_ERROR,
      button: getter.GET_BUTTON,
      userRoles: getter.GET_USER_ROLES_KLIKPAYROLL,
      user: getter.USER
    }),
  },
  mounted() {
    this.$store.dispatch(action.USER_ROLES_KLIKPAYROLL) 
  },
  created() {
    this.form.id = this.user.id
    if(this.user.role){
      this.form.roleId = this.user.role.id
    }
    
    this.form.countryId = this.user.countryId
    this.form.email = this.user.email
    this.form.username = this.user.username
    this.form.mobile = this.user.mobile
    this.form.employeeNo = this.user.employeeNo
  },
  mounted() {
    this.$store.dispatch(action.USER_ROLES_KLIKPAYROLL) 
  }
} 
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/_variables";

.card-base {
  padding: 20px;
}

.el-row {
  padding: 0px 10px;
  margin-bottom: 10px;

  &:last-child {
      margin-bottom: 0;
  }
}

.el-col {
  border-radius: 5px;
}

.el-radio {
  margin: 0 150px 0 10px;
}

.el-select {
  width: 100%;
}

.thumbnail {
  position: relative;
  width: 300px;
  height: 300px;
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

a {
  border-style: dotted;
  border-radius: 15px;
  padding: 10px;
  height: 150px;
}

td {
  padding: 10px;
}
</style>
