<template>
	<vue-scroll class="forgot-password-page align-vertical" style="background: #0079BA;">
		<div class="form-wrapper align-vertical-middle">
			<div class="form-box card-base card-shadow--extraLarge" v-if="!getStatusEmail">
				<img class="image-logo" src="@/assets/images/payroll5.png" alt="logo"/>
				
				<float-label class="styled" >
					<input 
							type="email"
							name="email" 
							placeholder="E-mail/Username"
							@keyup.enter="sendLink"
              @blur="validateField"
              @input="validateField"
              @focus="onFocus"
							v-model="email">
							<span class="error-msg">{{errorMsg}}</span>
              <span v-if="getError !== '' && getError !== null" class="error-msg">{{getError.response.data.message}}</span>
				</float-label>

				<div class="flex text-center center pt-20 pb-10">			
					<el-button plain size="small" @click="sendLink" class="send-btn tada animated" >
						SEND RESET LINK
					</el-button>
				</div>
			</div>

			<div class="form-box card-base card-shadow--extraLarge" v-else>
				<img class="image-logo" src="@/assets/images/payroll5.png" alt="logo"/>
				<center class="send-msg">Silahkan cek email anda</center>
			</div>
		</div>
	</vue-scroll>
</template>

<script>
import { mapGetters } from "vuex";
import * as mutation from '../../../store/mutation-types'
import * as getter from '../../../store/getters-types'
import * as action from '../../../store/action-types'

export default {
	name: 'ForgotPassword',
	data() {
		return {
			email: '',
			errorMsg: '',
			isEdit: false,
		}
	},
	computed: {
		...mapGetters({
			getStatusEmail : getter.GET_STATUS_EMAIL ,
			getError	: getter.GET_ERROR
		})
	},
	methods: {
		sendLink() {
      if (this.email.trim() !== "") {
        this.$store.dispatch(action.SEND_EMAIL, {
          email: this.email
        })
      } else {
        this.errorMsg = "Email/username harus diisi"
      }
    },
    validateField() {
      if (this.isEdit === true) {
        this.$store.dispatch(action.DATA_ERROR, null)
        if (this.email.trim() === "") {
          this.errorMsg = "Email/username harus diisi"
        } else {
          this.errorMsg = ""
        }
      }

      // remove emoji
      this.email = this.email.replace(this.$emojiRegex, '')
    },
    onFocus() {
      this.isEdit = true
    },
	},
  created() {
    this.$store.dispatch(action.DATA_ERROR, null)
    this.$store.commit(mutation.SET_STATUS_EMAIL, null)
  }
}
</script>

<style lang="scss">
@import '../../../assets/scss/_variables';

.forgot-password-page {
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
			width: 80px;
			margin: 0px auto;
			margin-bottom: 50px;
			display: block;
		}

		.send-btn {
			width: 160px;
		}

    .error-msg {
      color: #ec205f;
      font-size: 12px;
    }

    .send-msg {
      font-size: 20px;
      font-weight: bold;
    }
	}
}

@media (max-width: 768px) {
	.layout-container .container .view.forgot-password-page {
		margin-left: -5px;
		margin-right: -5px;
		max-width: calc(100% + 10px);
	}
}
</style>