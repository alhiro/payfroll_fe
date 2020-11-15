<template>
<vue-scroll class="login-page align-vertical">
    <div class="form-wrapper align-vertical-middle">
        <el-row :gutter="10" style="margin-bottom: 20px;">
            <!-- <el-col :span="7">
                <div class="card-base" style="background-color:rgba(0, 0, 0, 0.4); margin-left: 20px; margin-top: 600px;">
                    <div style="margin-left: 20px; color: #ffffff;">
                        <h2>Lorem ipsum</h2>
                        <p>
                            dolor sit amet consectetur adipisicing elit. Veniam,<br>
                            ab? Est placeat alias molestiae deleniti modi quidem<br>
                            iure dolorem, temporibus ratione minus, assumenda<br>
                            aut cumque quo cupiditate inventore ullam veritatis!
                        </p>
                    </div>
                </div>
            </el-col> -->
            <el-col :offset="15" :span="7"
                        style="-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;-o-user-select:none;" 
                        unselectable="on"
                        onselectstart="return false;">
                <div class="form-box card-base card-shadow--extraLarge" style="margin-top: 250px">
                    <img class="image-logo" src="@/assets/images/payroll5.png" alt="logo" style="margin-bottom: 50px; margin-top: 25px;" />
                    <center>
                        <p style="color: red"><span v-show="errorBUtt">{{ errorMessage.message }}</span></p>
                    </center>
                    <center>
                        <float-label class="styled">
                            <input type="username" v-model="form.username" @keyup.enter="login" maxlength="50" placeholder="Username \ Email">
                        </float-label>
                        <float-label class="styled">
                            <input type="password" v-model="form.password" @keyup.enter="login" maxlength="50" placeholder="Password">
                        </float-label>
                    </center>
                    <div class="flex">
                        <div class="box grow text-center">
                            <el-row style="margin-top: 5px">
                                <el-col :span="5">
                                    <router-link onmousedown="return false" to="/register" @click="clearCheck"><b>Register</b></router-link>
                                </el-col>
                                <el-col :offset="9" :span="10">
                                    <router-link onmousedown="return false" to="/forgot-password"><b>Forgot Password?</b></router-link>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <el-row style="margin-top: 15px">
                        <el-col :span="24">
                            <el-button plain size="small" style="width: 100%" @click="login" :loading="button" class="login-btn tada animated">
                                <b style="color: #ffffff; font-size: 14px;">Login</b>
                            </el-button>
                        </el-col>
                        <el-col :span="24">
                            <el-button plain size="small" style="width: 100%; margin-top: 6px; margin-bottom: 15px;" :loading="button" class="demo-btn tada animated">
                                <b style="color: #ffffff; font-size: 14px;">Try Demo</b>
                            </el-button>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </div>
</vue-scroll>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex'
// import router from '../../../router'
import * as mutation from '../../../store/mutation-types'
import * as action from '../../../store/action-types.js'
import * as getter from '../../../store/getters-types'

export default {
    name: 'Login',
    data() {
        return {
            buttonError: null,
            buttonErrors: null,
            form: {
                username: '',
                password: '',
            }
        }
    },
    computed: {
        ...mapGetters({
            getError: getter.GET_ERROR,
            button: getter.GET_BUTTON,
            errorMessage: getter.GET_ERROR_MESSAGE
        }),
        isLogged() {
            return this.$store.getters.isLogged
        },
        errorButto() {
            if (this.getError) {
                if (this.errorMessage.code == 4000) {
                    return true
                } else {
                    return false
                }
            }
        },
        errorBUtt() {
            if (this.getError) {
                if (this.errorMessage.code != 4000) {
                    return true
                } else {
                    return false
                }
            }
        }
    },
    methods: {
        login() {
            const formData = {
                username: this.form.username,
                password: this.form.password,
            };
            this.$store.commit(mutation.SET_ERROR, null)
            this.$store.commit(mutation.BUTTON_STATUS, true)
            this.$store.dispatch(action.LOGIN, formData)
        },
        clearCheck(){
            this.$store.dispatch(action.DATA_ERROR, '');
        }
    },
    created() {
        this.$store.commit(mutation.SET_ERROR, null)
        this.$store.dispatch(action.DATA_ERROR, '');
    }
}
</script>

<style lang="scss">
@import '../../../assets/scss/_variables';

.grip {
    font-size: 36px
}

.login-page {
    background: #04b3bf;
    margin-left: -30px;
    margin-right: -30px;

    .form-wrapper {
        width: 100%;
    }

    .form-box {
        width: 100%;
        max-width: 320px;
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

        .login-btn {
            background: #0079ba;
        }

        .demo-btn {
            background: #128A1B;
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
