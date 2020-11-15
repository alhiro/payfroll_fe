<template>
<div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <el-form ref="form" :rules="rules" :model="form">
            <h2>Edit Holding</h2>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="Holding Name" prop="holdingName">
                        <el-input readonly placeholder="Input Holding Name" v-model="form.holdingName"></el-input>

                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Holding NPWP" prop="holdingNpwp">
                        <el-input readonly placeholder="Input Holding NPWP" v-model="form.holdingNpwp"></el-input>

                    </el-form-item>
                </el-col>
                <!-- <el-col :span="6" hide>
                    <el-button @click="Check()" style="width: 100%; margin-top: 38px;" type="warning">Check Availability</el-button>
                    <center>
                        <i v-if="errorButton === 1" style="color: red">{{getError.data.holdingNpwp}}<br>{{getError.data.holdingName}}</i>
                        <i v-if="errorButton === 3" style="color: red">{{getError.message}} </i>
                        <i v-if="errorButton === 2" style="color: green">Holding Name and NPWP are available</i>
                    </center>
                </el-col> -->
                <el-col :span="12">
                    <el-form-item label="Holding Type" prop="holdingType">
                        <el-select v-model="form.holdingType" filterable placeholder="Input Holding Type">
                            <el-option
                            v-for="item in listHolding"
                            :key="item.key"
                            :label="item.valueEn"
                            :value="item.key">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Holding Email" prop="email">
                        <el-input placeholder="Input Holding Email" v-model="form.email"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24" style="margin-top: 10px;">
                    <span><b>Address</b></span>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Holding Address" prop="holdingAddress">
                        <el-input placeholder="Input Holding Address" v-model="form.holdingAddress"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="City" prop="city">
                        <el-select v-model="form.city" filterable placeholder="Input City">
                            <el-option
                            v-for="item in listRegencies"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="ZIP Code" prop="zip">
                        <el-input placeholder="Input ZIP Code" v-model="form.zip" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="FAX Number" prop="fax">
                        <el-input placeholder="Input Fax Number" v-model="form.fax" v-on:keypress.native="isNumber"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-col>
                        <span><b>Holding PIC</b></span>
                        <el-button class="el-icon-plus" type="success" size="mini" @click="addButton" circle style="margin-left: 10px"></el-button>
                    </el-col>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <div v-for="(domain, index) in form.holdingPic" :key="domain.key">
                    <el-col :span="11">
                        <div class="grid-content">
                            <el-form-item :prop="'holdingPic.' + index + '.picName'" :rules="[
                {required: true, message: 'PIC Name can not be empty', trigger: 'blur' },
                { min: 3, message: 'Name must be at least 3 characters long.' },
                { max: 45, message: 'Name must not be greater than 45 characters long.'}
                ]">
                                <el-input placeholder="PIC Name" v-model="domain.picName" class="leb_same"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="11">
                        <div class="grid-content">
                            <el-form-item :prop="'holdingPic.' + index + '.picEmail'" :rules="[
                { required: true, message: 'PIC Email can not be empty', trigger: 'blur'},  {
                    type: 'email',
                    message: 'Please Input Valid Email',
                    trigger: ['blur', 'change']
                }]">
                                <el-input type="email" placeholder="PIC Email" v-model="domain.picEmail" class="leb_same"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="11">
                        <div class="grid-content">
                            <el-form-item :prop="'holdingPic.' + index + '.picPhoneNumber'" :rules="[
                { required: true, message: 'PIC Phone Number can not be empty', trigger: 'blur'}, 
                { min: 10, message: 'Phone must be at least 10 digits.' },
                { max: 45, message: 'Phone must not be greater than 45 digits.' }]">
                                <el-input placeholder="PIC Phone Number" v-model="domain.picPhoneNumber" class="leb_same" v-on:keypress.native="isNumber"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="11">
                        <div class="grid-content">
                            <el-form-item :prop="'holdingPic.' + index + '.picPosition'" :rules="[
                { required: true, message: 'PIC Position can not be empty', trigger: 'blur'}]">
                                <el-input placeholder="PIC Position" v-model="domain.picPosition" class="leb_same"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="1">
                        <div class="grid-content">
                            <el-button class="el-icon-minus" type="danger" size="mini" @click.prevent="removeDomain(domain)" circle style="margin-top: 13px"></el-button>
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
                        <el-input placeholder="Input Full Name" v-model="form.fullName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Admin Username" prop="userName">
                        <el-input placeholder="Input Username" v-model="form.userName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Admin Email" prop="adminEmail">
                        <el-input placeholder="Input Email" type="email" v-model="form.adminEmail"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Admin Phone Number" prop="adminPhone">
                        <el-input placeholder="Input Phone Number" v-on:keypress.native="isNumber" v-model="form.adminPhone"></el-input>
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
import * as mutation from '../../../store/mutation-types'
import * as getter from "../../../store/getters-types" 
import * as action from "../../../store/action-types" 
export default {
  name: "NewUserKlikpayroll",
  data() {
    return {
      holdingType: [],
      regencies: [],
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
            deletedPic : [],
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
      rules: {
          holdingName: [{
              required: true,
              message: "Holding Name is required!",
              trigger: "blur"
          }],
          holdingType: [{
              required: true,
              message: "Holding Type is required!",
              trigger: "blur"
          }],
          holdingNpwp: [{
              required: true,
              message: "Holding NPWP is required!",
              trigger: "blur"
          }],
          holdingAddress: [{
              required: true,
              message: "Holding Address is required!",
              trigger: "blur"
          }],
          city: [{
              required: true,
              message: "City is required!",
              trigger: "blur"
          }],
          zip: [{
              required: true,
              message: "ZIP Code is required!",
              trigger: "blur"
          }],
          fax: [{
              required: true,
              message: "FAX Number is required!",
              trigger: "blur"
          }],
          email: [{
                  required: true,
                  message: "Email is required!",
                  trigger: "blur",

              },
              {
                  type: "email",
                  message: "Please Input Valid Email",
                  trigger: ["blur", "change"]
              }
          ],
          fullName: [{
              required: true,
              message: "Full Name is required!",
              trigger: "blur"
          }],
          userName: [{
              required: true,
              message: "Username is required!",
              trigger: "blur"
          }],
          adminEmail: [{
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
          adminPhone: [{
              required: true,
              message: "Phone Number is required!",
              trigger: "blur"
          }],
      },
    } 
  },
  methods: {
    onSubmit(formName) {
        this.$refs[formName].validate(valid => {
            if (valid) {
                this.$store.commit(mutation.BUTTON_STATUS, true)
                this.$store.dispatch(action.UPDATE_CONSULTANT, this.form);
            } else {
                return false;
            }
        });
    },
    addButton() {
        this.form.holdingPic.push({
            key: Date.now(),
            id:0,
            picName: null,
            picPosition: null,
            picEmail: null,
            picPhoneNumber: null
        });
    },
    removeDomain(item) {
        let index = this.form.holdingPic.indexOf(item);
        if (this.form.holdingPic[index].id != 0){
            this.form.deletedPic.push({
                id:this.form.holdingPic[index].id
            });
        }
        if (index !== -1) {
            this.form.holdingPic.splice(index, 1);
        }
    },
    Cancel() {
      this.$router.replace('/list-holding')
    },
    Check() {
        this.$store.commit(mutation.BUTTON_STATUS, true)
        this.$store.dispatch(action.CHECK_CONSULTANT, this.form);
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
        getError: getter.GET_ERROR,
        errorMessage: getter.GET_ERROR_MESSAGE,
        button: getter.GET_BUTTON,
        listRegencies: getter.GET_LIST_REGENCIES,
        listHolding: getter.GET_HOLDING_TYPE,
        content: getter.GET_CONSULTANT_DETAIL,
    }),
    errorButton() {
        if(!this.getError) return;
        if (this.getError.code === '409') {
            return 1
        } else if (this.getError.code === '200') {
            return 2
        } else {
            return 3
        }
    },
  },
    created() {
        this.form.holdingName = this.content.holding_name,
        this.form.holdingNpwp = this.content.holding_npwp,
        this.form.holdingType = this.content.holding_type,
        this.form.email = this.content.holding_email,
        this.form.holdingAddress = this.content.holding_address,
        this.form.city = this.content.holding_city,
        this.form.zip = this.content.holding_zip,
        this.form.id = this.content.holding_id,
        this.form.fax = this.content.holding_fax,
        this.form.holdingPic = [],
        this.form.deletedPic = [],
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
    },
  async mounted() {
    await this.$store.dispatch(action.LIST_REGENCIES);
    await this.$store.dispatch(action.LIST_HOLDING_TYPE,9);
    await this.$store.commit(mutation.SET_ERROR, null)
    await this.$store.dispatch(action.DATA_ERROR, '');
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
  margin: 0 160px 0 10px;
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
