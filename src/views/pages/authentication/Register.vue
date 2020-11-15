<template>
<vue-scroll class="register-page align-vertical">
    <div class="form-wrapper align-vertical-middle">
        <div class="form-box card-base card-shadow--extraLarge">
            <img class="image-logo" src="@/assets/images/klikpayroll.svg" alt="logo" />
            <h1>Register Holding</h1>
            <el-form ref="form" :rules="rules" :model="form" :disabled="disableForm">
                <el-row :gutter="20">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span><b>Information</b></span>
                    </div>
                    <el-col :span="12">
                      <el-form-item label="Holding Name" prop="holdingName">
                        <el-input type="text" @input="checkAllFieldFill('holdingName')" placeholder="Input Holding Name" v-model="form.holdingName" minlength="5" maxlength="40" show-word-limit></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="Holding NPWP" prop="holdingNpwp">
                        <el-input v-mask="npwpMask" @input="checkAllFieldFill('holdingNpwp')" placeholder="Input Holding NPWP" v-model="form.holdingNpwp" minlength="20" maxlength="20"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-button @click="check()" :loading="loadingButtonCheck" style="width: 100%; margin-top: 40px;" type="warning">Check Availability</el-button>
                      <span v-if="errorMsg === 1" class="npwp-unavailable">{{getError.data !== null && getError.data !== undefined ? getError.data.holdingNpwp : ''}}<br>{{getError.data !== null && getError.data !== undefined ? getError.data.holdingName : ''}}</span>
                      <span v-if="errorMsg === 4" class="npwp-unavailable">{{getError.message}} </span>
                      <span v-if="errorMsg === 3" class="npwp-unavailable">Holding name dan npwp harus diisi </span>
                      <span v-if="errorMsg === 2" class="npwp-available">Holding name dan npwp tersedia</span>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item class="bottom-item" label="Holding Type" prop="holdingType">
                        <el-select @change="checkAllFieldFill('holdingType')" v-model="form.holdingType" filterable placeholder="Input Holding Type">
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
                        <el-input @input="checkAllFieldFill('email')" placeholder="Input Holding Email" v-model="form.email" minlength="5" maxlength="30" show-word-limit></el-input>
                      </el-form-item>
                    </el-col>
                  </el-card>
                </el-row>
                <el-row :gutter="20">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span><b>Address</b></span>
                    </div>
                    <el-col :span="12">
                      <el-form-item label="Holding Address" prop="holdingAddress">
                        <el-input @input="checkAllFieldFill('holdingAddress')" placeholder="Input Holding Address" v-model="form.holdingAddress" minlength="10" maxlength="250" show-word-limit></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="City" prop="city">
                        <el-select @change="checkAllFieldFill('city')" v-model="form.city" filterable placeholder="Input City">
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
                      <el-form-item class="bottom-item" label="ZIP Code" prop="zip">
                        <el-input @input="checkAllFieldFill('zip')" placeholder="Input ZIP Code" v-model="form.zip" v-on:keypress.native="isNumber" minlength="5" maxlength="10" show-word-limit></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="FAX Number" prop="fax">
                        <el-input @input="checkAllFieldFill('fax')" placeholder="Input Fax Number" v-model="form.fax" v-on:keypress.native="isNumber" minlength="8" maxlength="16" show-word-limit>
                          <template slot="prepend">+62</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-card>
                </el-row>
                <el-row :gutter="20">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span><b>Holding PIC</b></span>
                      <el-button class="el-icon-plus" title="Add PIC" type="success" size="mini" @click="addButton" circle style="float:right; margin-left:10px"></el-button>
                    </div>
                    <div v-for="(domain, index) in form.holdingPic" :key="domain.key">
                      <el-row :gutter="20">
                      <el-card class="box-card">
                        <div slot="header" class="clearfix">
                          <span><b>PIC {{index + 1}}</b></span>
                          <el-button class="el-icon-minus" type="danger" title="Remove" size="mini" @click.prevent="removeDomain(domain)" circle style="float:right; margin-right:10px;"></el-button>
                        </div>
                        <el-col :span="12">
                            <div class="grid-content">
                                <el-form-item :prop="`holdingPic.${index}.picName`"
                                  :rules="[
                                    { required: true, message: 'PIC name harus diisi', trigger: 'blur' },
                                    { min: 5, message: 'PIC minimal 5 Karakter', trigger: 'blur' },
                                    { max: 40, message: 'PIC maximal 40 Karakter', trigger: 'blur' }
                                  ]">
                                  <el-input @input="checkAllFieldFill(`holdingPic.${index}.picName`)" placeholder="PIC Name" v-model="domain.picName" class="leb_same" minlength="5" maxlength="40" show-word-limit></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content">
                                <el-form-item :prop="`holdingPic.${index}.picEmail`"
                                :rules="[
                                  { required: true, message: 'PIC email harus diisi', trigger: 'blur'}, 
                                  { type: 'email', message: 'Format email salah', trigger: ['blur', 'change']},
                                  { min: 5, message: 'PIC email minimal 5 Karakter', trigger: 'blur' },
                                  { max: 30, message: 'PIC email maksimal 30 Karakter', trigger: 'blur' }
                                ]">
                                  <el-input @input="checkAllFieldFill(`holdingPic.${index}.picEmail`)" placeholder="PIC Email" v-model="domain.picEmail" class="leb_same" minlength="5" maxlength="30" show-word-limit></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content">
                                <el-form-item class="bottom-item" :prop="`holdingPic.${index}.picPhoneNumber`" 
                                :rules="[{ validator: validateNumber, trigger: 'blur' }]">
                                  <el-input @input="checkAllFieldFill(`holdingPic.${index}.picPhoneNumber`)" placeholder="PIC Phone Number" v-model="domain.picPhoneNumber" class="leb_same" v-on:keypress.native="isNumber" minlength="8" maxlength="16" show-word-limit>
                                    <template slot="prepend">+62</template>
                                  </el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content">
                                <el-form-item :prop="`holdingPic.${index}.picPosition`" 
                                :rules="[
                                  { required: true, message: 'PIC position harus diisi', trigger: 'blur'},
                                  { min: 2, message: 'PIC position minimal 2 karakter', trigger: 'blur' },
                                  { max: 30, message: 'PIC position maksimal 30 karakter', trigger: 'blur' }
                                ]">
                                  <el-input @input="checkAllFieldFill(`holdingPic.${index}.picPosition`)" placeholder="PIC Position" v-model="domain.picPosition" class="leb_same" minlength="2" maxlength="30" show-word-limit></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                      </el-card>
                      </el-row>
                    </div>
                  </el-card>
                </el-row>
                <el-row :gutter="20">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span><b>Company Admin</b></span>
                    </div>
                    <el-col :span="12">
                      <el-form-item label="Admin Name" prop="fullName">
                        <el-input @input="checkAllFieldFill('fullName')" placeholder="Input Full Name" v-model="form.fullName" minlength="5" maxlength="40" show-word-limit></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="Admin Username" prop="userName">
                        <el-input @input="checkAllFieldFill('userName')" placeholder="Input Username" v-model="form.userName" v-on:keypress.native="noSpecialChar" minlength="5" maxlength="15" show-word-limit></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item class="bottom-item" label="Admin Email" prop="adminEmail">
                        <el-input @input="checkAllFieldFill('adminEmail')" placeholder="Input Email" v-model="form.adminEmail" minlength="5" maxlength="30" show-word-limit></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="Admin Phone Number" prop="adminPhone">
                        <el-input @input="checkAllFieldFill('adminPhone')" placeholder="Input Phone Number" v-on:keypress.native="isNumber" v-model="form.adminPhone" minlength="8" maxlength="16" show-word-limit>
                          <template slot="prepend">+62</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-card>
                </el-row>
            </el-form>
            <el-row>
                <el-col :offset="17" :span="3">
                    <el-button style="width: 100%" :loading="loadingButtonRegister" :disabled="disabledRegister" @click="onSubmit('form')" type="success">Register</el-button>
                </el-col>
                <el-col :offset="1" :span="3">
                    <el-button style="width: 100%" :disabled="disableCancel" @click="cancel()" type="succes">Cancel</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</vue-scroll>
</template>

<script>
import router from "../../../router"
import moment from "moment"
import Affix from "@/components/Affix"
import swal from 'sweetalert2'
import {
    mapGetters,
    mapActions
} from "vuex";
import * as getter from "../../../store/getters-types"
import * as action from "../../../store/action-types"
import * as mutation from '../../../store/mutation-types'
export default {
    name: "NewLocation",
    data() {
      return {
        npwpMask: "99.999.999.9-999.000",
        npwpAndNameValid:false,
        disabledRegister:true,
        disableForm:false,
        disableCancel:false,
        loadingButtonCheck: false,
        loadingButtonRegister: false,
        errorMsg: null,
        holdingType: [],
        regencies: [],
        form: {
          holdingName: "",
          holdingType: "",
          holdingNpwp: "",
          holdingAddress: "",
          city: "",
          zip: "",
          fax: "",
          email: "",
          fullName: "",
          userName: "",
          userName: "",
          adminEmail: "",
          adminPhone: "",
          holdingPic: [{
            key: 0,
            picName: "",
            picPosition: "",
            picEmail: "",
            picPhoneNumber: ""
          }],
        },
        rules: {
          holdingName: [{
              required: true,
              message: "Holding name harus diisi",
              trigger: "blur"
            },
            {
              min: 5,
              message: "Holding name kurang dari minimal 5 karakter",
              trigger: "blur" 
            },
            {
              max: 40,
              message: "Holding name lebih dari maksimal 40 karakter",
              trigger: "blur" 
            }
          ],
          holdingType: [{
            required: true,
            message: "Holding type harus dipilih",
            trigger: "blur"
          }],
          holdingNpwp: [{
              required: true,
              message: "NPWP harus diisi",
              trigger: "blur"
            },
            {
              min: 12,
              message: "NPWP kurang dari 15 digit",
              trigger: "blur" 
            },
            {
              max: 12,
              message: "NPWP lebih dari 15 digit",
              trigger: "blur" 
            }
          ],
          holdingAddress: [{
              required: true,
              message: "Address harus diisi",
              trigger: "blur"
            },
            {
              min: 10,
              message: "Minimal address 10 karakter",
              trigger: "blur" 
            },
            {
              max: 250,
              message: "Maksimal address 250 karakter",
              trigger: "blur" 
            }
          ],
          city: [{
            required: true,
            message: "City harus dipilih",
            trigger: "blur"
          }],
          zip: [{ validator: this.validateNumber, trigger: "blur" }],
          fax: [{ validator: this.validateNumber, trigger: "blur" }],
          email: [{
              required: true,
              message: "Email harus diisi",
              trigger: "blur",
            },
            {
              type: "email",
              message: "Format email salah",
              trigger: ["blur", "change"]
            },
            {
              min: 5,
              message: "Minimal email 5 karakter",
              trigger: "blur" 
            },
            {
              max: 30,
              message: "Maksimal email 30 karakter",
              trigger: "blur" 
            }
          ],
          fullName: [{
              required: true,
              message: "Admin name harus diisi",
              trigger: "blur"
            },
            {
              min: 5,
              message: "Admin name minimal 5 karakter",
              trigger: "blur" 
            },
            {
              max: 40,
              message: "Admin name maksimal 40 karakter",
              trigger: "blur" 
            }
          ],
          userName: [{ validator: this.validateAdminUsername, trigger: "blur" }],
          adminEmail: [{
              required: true,
              message: "Email harus diisi",
              trigger: "blur",
            },
            {
              type: "email",
              message: "Format email salah",
              trigger: ["blur", "change"]
            },
            {
              min: 5,
              message: "Minimal email 5 karakter",
              trigger: "blur" 
            },
            {
              max: 30,
              message: "Maksimal email 30 karakter",
              trigger: "blur" 
            }
          ],
          adminPhone: [{ validator: this.validateNumber, trigger: "blur" }],
        },
      };
    },
    methods: {
      checkAllFieldFill(keyForm) {
        if (keyForm === "holdingName" || keyForm === "holdingNpwp"){
          this.npwpAndNameValid = false
          this.errorMsg = 0
        }

        // replace all emoji
        if (this.form[keyForm] !== undefined) {
          this.form[keyForm] = this.form[keyForm].replace(this.$emojiRegex, '')
        } else {
          let stringSplit = keyForm.split(".")
          this.form.holdingPic[stringSplit[1]][stringSplit[2]] = this.form.holdingPic[stringSplit[1]][stringSplit[2]].replace(this.$emojiRegex, '')
        }
        
        // check form parent
        for (const key in this.form) {
          if (this.form[key] === "") {
            this.disabledRegister = true
            return
          }
        }

        // check holding pic
        for (const key in this.form.holdingPic) {
          for (const keyChild in this.form.holdingPic[key]) {
            if (this.form.holdingPic[key][keyChild] === "") {
              this.disabledRegister = true
              return
            }
          }
        }

        this.disabledRegister = false
      },
      onSubmit(formName) {
        this.$refs[formName].validate(async valid => {
          if (valid) {
            if (this.npwpAndNameValid === false) {
              swal("Holding name dan NPWP harus tersedia, silahkan cek kembali", "", "error");
              return false
            }

            let formPost = Object.assign({}, this.form)
            formPost.fax = this.subPhoneNum(formPost.fax)
            formPost.adminPhone = this.subPhoneNum(formPost.adminPhone)
            formPost.holdingNpwp = `${formPost.holdingNpwp}000`

            let holdingPic = []
            formPost.holdingPic.forEach((value, key) => {
              holdingPic.push(Object.assign({}, value))
              holdingPic[key].picPhoneNumber = parseInt(this.subPhoneNum(value.picPhoneNumber.toString()))
            })
            formPost.holdingPic = holdingPic

            this.loadingButtonRegister = true
            this.disableForm = true
            this.disableCancel = true
            await this.$store.dispatch(action.REGISTER_CONSULTANT, formPost)
            this.loadingButtonRegister = false
            this.disabledRegister = true
            if (this.getError !== null) {
              this.disabledRegister = false
              this.disableCancel = false
              this.disableForm = false
            }
          } else {
            return false;
          }
        });
      },
      addButton() {
        this.disabledRegister = true
        this.form.holdingPic.push({
          key: Date.now(),
          name: "",
          picEmail: "",
          picName: "",
          picPhoneNumber: "",
          picPosition: ""
        });
      },
      removeDomain(item) {
        let index = this.form.holdingPic.indexOf(item);
        if (index !== -1) {
          this.form.holdingPic.splice(index, 1);
          // check holding pic
          for (const key in this.form.holdingPic) {
            for (const keyChild in this.form.holdingPic[key]) {
              if (this.form.holdingPic[key][keyChild] === "") {
                this.disabledRegister = true
                return
              }
            }
          }
          this.disabledRegister = false
        }
      },
      cancel() {
        this.$router.replace({
          path: "/login"
        });
      },
      async check() {
        this.loadingButtonCheck = true
        let formPost = Object.assign({}, this.form)
        formPost.holdingNpwp = `${formPost.holdingNpwp}000`
        await this.$store.dispatch(action.CHECK_REGISTER, formPost)

        if (this.getError.code === '409') {
          this.errorMsg = 1
        } else if (this.getError.code === '200') {
          this.errorMsg = 2
          this.npwpAndNameValid = true
        } else if (this.getError.code === '400') {
          this.errorMsg = 3
        } else {
          this.errorMsg = 4
        }

        this.loadingButtonCheck = false
      },
      isNumber(evt) {
        evt = evt ? evt : window.event;
        var charCode = evt.which ? evt.which : evt.keyCode;
        if (charCode > 33 && (charCode < 43 || charCode > 57)) {
            evt.preventDefault()
        } else {
            return true;
        }
      },
      noSpecialChar(evt) {
        evt = evt ? evt : window.event;
        var charCode = evt.which ? evt.which : evt.keyCode;
        if (( charCode >= 65 && charCode <= 90 ) || ( charCode >= 97 && charCode <= 122 )  || ( charCode >= 48 && charCode <= 57 ) || charCode==8) {
            return true;
        } else {
            evt.preventDefault()
        }
      },
      validateAdminUsername(rule, value, callback) {
        let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/

        if (value === '' || value === undefined) {
          callback(new Error('Admin username harus diisi'))
        } else if (format.test(value)) {
          callback(new Error('Admin username hanya huruf dan angka'))
        } else if (value.length < 5) {
          callback(new Error('Admin username minimal 5 karakter'))
        } else if (value.length > 15) {
          callback(new Error('Admin username maksimal 15 karakter'))
        } else {
          callback();
        }
      },
      validateNumber(rule, value, callback) {
        let format = /^[0-9]*$/
        let msg = ""
        let min = 8
        let max = 16

        if (rule.field === "fax") {
          msg = "Fax number"
        } else if (rule.field === "adminPhone") {
          msg = "Admin phone number"
        } else if (rule.field.indexOf("picPhoneNumber") !== -1) {
          msg = "PIC phone number"
        } else if (rule.field === "zip") {
          msg = "Zip code"
          min = 5
          max = 10
        }

        if (value === '' || value === undefined) {
          callback(new Error(`${msg} harus diisi`))
        } else if (format.test(value) === false) {
          callback(new Error(`${msg} hanya angka`))
        } else if (value.length < min) {
          callback(new Error(`${msg} minimal ${min} angka`))
        } else if (value.length > max) {
          callback(new Error(`${msg} maksimal ${max} angka`))
        } else {
          callback();
        }
      },
      subPhoneNum(phoneNumber) {
        if (phoneNumber.charAt(0) === "0") {
          phoneNumber = `62${phoneNumber.substring(1, phoneNumber.length)}`
        } else if (phoneNumber.charAt(0) !== "6" && phoneNumber.charAt(0) !== "2") {
          phoneNumber = `62${phoneNumber}`
        }
        
        return phoneNumber
      },
    },
    computed: {
      ...mapGetters({
        getError: getter.GET_ERROR,
        button: getter.GET_BUTTON,
        errorMessage: getter.GET_ERROR_MESSAGE,
        listRegencies: getter.GET_LIST_REGENCIES,
        listHolding: getter.GET_HOLDING_TYPE
      }),
    },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/_variables";


.register-page {
  background: rgb(0, 121, 186);
  ;
  margin-left: -30px;
  margin-right: -30px;

  .form-wrapper {
    width: 100%;
  }

  .form-box {
    width: 100%;
    max-width: 1600px;
    padding: 30px;
    box-sizing: border-box;
    margin: 20px auto;

    a {
      font-size: 14px;
      color: $text-color-accent;
      text-decoration: none;
      font-weight: 500;
    }

    .image-logo {
      width: 300px;
      margin: 0px auto;
      margin-bottom: -100px;
      margin-top: -70px;
      display: block;
    }

    .signin-btn {
      width: 160px;
    }

    .login-box {
      font-size: 14px;
    }
  }
}

@media (max-width: 768px) {
  .layout-container .container .view.register-page {
    margin-left: -5px;
    margin-right: -5px;
    max-width: calc(100% + 10px);
  }
}

.npwp-available {
  font-size: 12px;
  color: green;
}

.npwp-unavailable {
  font-size: 12px;
  color: #ec205f;
}

.bottom-item {
  margin-bottom: 40px;
}
  
.card-base {
  padding: 20px;
}

.el-row {
  padding: 0px 10px;
  margin-bottom: 10px;

  &:last-child {
      margin-bottom: 20px;
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

.page-quill {
  .card-base {
    box-sizing: border-box;

    .quill-editor {
        .ql-toolbar.ql-snow {
            border: none;
            background: lighten($background-color, 2%);
            border-bottom: 1px solid $background-color;
        }

        .ql-container.ql-snow {
            border: none;
        }
    }

    &.t-bubble {
        overflow: inherit;
    }
  }
}

@media (max-width: 768px) {
  .page-quill {
    .card-base {
      &.t-bubble {
          padding: 40px 20px;
      }
    }
  }
}
</style>
