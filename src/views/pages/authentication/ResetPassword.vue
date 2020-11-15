<template>
	<vue-scroll class="login-page align-vertical">
		<div class="form-wrapper align-vertical-middle">
			<el-row :gutter="10" style="margin-bottom: 20px;">
				<el-col :offset="7" :span="8">
        <div class="form-box card-base card-shadow--extraLarge" style="margin-top: 250px" v-if="isLinkExpired === 1">
          <img class="image-logo" src="@/assets/images/payroll5.png" alt="logo" style="margin-bottom: 50px; margin-top: 25px;" />
          <float-label class="styled">
            <input 
              :type="fieldPassType"
              name="password"
              ref="password"
              minlength="8"
              maxlength="15"
              v-model="password"
              :disabled="disableCreate"
              @blur="onBlurPass"
              @input="onChangePass"
              @focus="onFocusPass"
              @keyup.enter="reset"
              placeholder="New Password">
              <el-popover
                placement="right"
                title="Password"
                width="300"
                trigger="hover">
                <div>
                  Panjang minimal password adalah 8 karakter<br/>
                  dan maksimal 15 karakter, serta password<br/>
                  adalah kombinasi huruf dan angka <br/><br/>
                  (e.g. p4ssword)
                </div>
                <span slot="reference" class="icon-help-password">
                  <i class="mdi mdi-help-circle-outline"/>
                </span>
              </el-popover>
              <span @click="changeFieldType" class="icon-eye-password">
                <i class="mdi mdi-eye-outline"/>
              </span>
              <span v-for="(msg, key) in errorPassMsg" :key="key" class="error-msg">
                <span v-if="errorPassMsg[key] !== ''">
                  <i class="mdi mdi-close-circle-outline" /> {{ errorPassMsg[key] }} <br>
                </span>
              </span>							
          </float-label>
          <float-label class="styled">
            <input 
              :type="fieldPassConfirmType"
              ref="password_confirmation"
              name="password_confirmation"
              :disabled="disableCreate"
              v-model="confirmPassword"
              @input="onChangePassConfirm"
              @keyup.enter="reset"
              minlength="8"
              maxlength="15"
              placeholder="Confirm Password">
              <span @click="changeConfirmFieldType" class="icon-eye-confirm-password">
                <i class="mdi mdi-eye-outline"/>
              </span>
              <span class="error-msg">
                <span v-if="confirmPasswordMsg !== ''">
                  <i class="mdi mdi-close-circle-outline" /> {{ confirmPasswordMsg }} <br>
                </span>
              </span>
          </float-label>
          <div class="flex text-center center pt-30 pb-10">			
            <el-button plain size="small" @click="reset" :disabled="disableCreate" :loading="loadingCreate" class="login-btn tada animated">
              <b style="color: white">CREATE</b>
            </el-button>
          </div>
        </div>
        <div class="form-box card-base card-shadow--extraLarge" style="margin-top: 250px; text-align:center;" v-else-if="isLinkExpired === 2">
          <img class="image-logo" src="@/assets/images/payroll5.png" alt="logo"/>
          <div class="expired-msg"> {{errorMessage}} </div>
          <div class="flex text-center center pt-30 pb-10">			
            <el-button plain size="small" @click="backToLogin" class="login-btn tada animated">
              <b style="color: white">LOGIN PAGE</b>
            </el-button>
          </div>
        </div>
        <div class="form-box card-base card-shadow--extraLarge" style="margin-top: 250px; text-align:center;" v-else>
          <img class="image-logo" src="@/assets/images/payroll5.png" alt="logo"/>
        </div>
				</el-col>
			</el-row>
		</div>
	</vue-scroll>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import localAxios from '../../../services/http/client'
import formMixin from '../../../mixins/form.js'
import { required, sameAs, minLength, alphaNum } from 'vuelidate/lib/validators'
import * as getter from '../../../store/getters-types'
import * as action from '../../../store/action-types'
import * as mutation from '../../../store/mutation-types'

export default {
	name: 'change-password',
	mixins: [formMixin],
	data() {
		return {
      password: '',
      confirmPassword: '',
      token: '',
      isLinkExpired: 0,
      errorPassMsg: {
        required: "",
        min: "",
        max: "",
        contains: "",
      },
      isEdit:false,
      confirmPasswordMsg: "",
      errorMessage: "",
      loadingCreate: false,
      disableCreate: false,
      fieldPassType: "password",
      fieldPassConfirmType: "password",
		}
	},
	computed: {
		...mapGetters({
			getError: getter.GET_ERROR,
		}),
	},
	async mounted(){
    this.token = this.$route.params.token
    const loading = this.$loading({lock: true})
    await this.$store.dispatch(action.CHECK_TOKEN, this.token)
    if (this.getError.response.status === 400) {
      this.isLinkExpired = 2
      this.errorMessage = this.getError.response.data.message
    } else {
      this.isLinkExpired = 1
    }
    loading.close()
	},
	methods: {
    changeFieldType() {
      if (this.fieldPassType === "password") {
        this.fieldPassType = "text"
      } else {
        this.fieldPassType = "password"
      }

      if (this.password.trim() !== "")
        this.$refs.password.focus()
    },
    changeConfirmFieldType() {
      if (this.fieldPassConfirmType === "password") {
        this.fieldPassConfirmType = "text"
      } else {
        this.fieldPassConfirmType = "password"
      }

      if (this.confirmPassword.trim() !== "")
        this.$refs.password_confirmation.focus()
    },
    onBlurPass() {
      this.validatePassword()
    },
    onFocusPass() {
      this.isEdit = true
    },
    onChangePass() {
      if (this.isEdit === true) {
        this.validatePassword()
      }
    },
    onChangePassConfirm() {
      if (this.password !== this.confirmPassword) {
        this.confirmPasswordMsg = "Password tidak cocok"
      } else {
        this.confirmPasswordMsg = ""
      }

      // remove emoji
      this.confirmPassword = this.confirmPassword.replace(this.$emojiRegex, '')
    },
    validatePassword(){
      if (this.password.trim() === "") {
        this.errorPassMsg = {
          required: "Password harus diisi",
          min: "",
          max: "",
          contains: "",
        }
      } else {
        this.errorPassMsg.required = ""

        // validate min char
        if (this.password.trim().length < 8) {
          this.errorPassMsg.min = "Minimal password 8 karakter"
        } else {
          this.errorPassMsg.min = ""
        }

        // validate max char
        if (this.password.trim().length > 15) {
          this.errorPassMsg.max = "Maksimal password 15 karakter"
        } else {
          this.errorPassMsg.max = ""
        }

        // validate contains number
        if (/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(this.password) === false) {
          this.errorPassMsg.contains = "Password adalah kombinasi huruf dan angka"
        } else {
          this.errorPassMsg.contains = ""
        }
      }

      // remove emoji
      this.password = this.password.replace(this.$emojiRegex, '')
    },
    checkNoError() {
      this.onChangePassConfirm()
      if (
        this.confirmPasswordMsg !== "" ||
        this.errorPassMsg.required !== "" ||
        this.errorPassMsg.min !== "" ||
        this.errorPassMsg.max !== "" ||
        this.errorPassMsg.contains !== ""
      ) {
        return false
      }

      return true
    },
		async reset() {
      this.validatePassword()
      if (this.checkNoError()) {
        this.loadingCreate = true
        const formData = {
          password: this.password,
          token: this.token
        };
        await this.$store.dispatch(action.CHANGE_PASSWORD,formData)
        this.loadingCreate = false
        if (this.getError !== null) {
          this.disableCreate = false
        } else {
          this.disableCreate = true
        } 
      }
    },
    backToLogin() {
      this.$router.replace('/login')
    }
	}
}
</script>

<style lang="scss">
@import '../../../assets/scss/_variables';

.login-page {
	background: $text-color;
	margin-left: -30px;
	margin-right: -30px;

	.form-wrapper {
		width: 100%;
	}
	
	.form-box {
		width: 100%;
		max-width: 340px;
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
			width: 200px;
			margin: 0px auto;
			margin-bottom: 30px;
			display: block;
		}

		.input.invalid input {
			border: 1px solid red;
			background-color: #ffc9aa;
		}
		.input.invalid label {
			color: red;
		}

    .error-msg {
      color: #ec205f;
      font-size: 12px;
    }

    .expired-msg {
      font-size: 20px;
      font-weight: bold;
      margin-top: 50px;
    }

    .icon-help-password{
      font-size: 16px;
      right: 0px;
    }

    .icon-eye-confirm-password{
      font-size: 18px;
      right: 0px;
    }

    .icon-eye-password{
      font-size: 18px;
      right: 20px;
    }

    .icon-eye-password,
    .icon-help-password,
    .icon-eye-confirm-password{
      color: #ccc;
      cursor: pointer;
      position:absolute;

      :hover {
        color: #4a596a;
      }
    }
	}
}

@media (max-width: 768px) {
	.layout-container .container .view.login-page {
		margin-left: -5px;
		margin-right: -5px;
		max-width: calc(100% + 10px);
	}
}
</style>