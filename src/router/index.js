import Vue from 'vue'
import Router from 'vue-router'
import * as action from '../store/action-types'
import * as mutation from '../store/mutation-types'

//apps
// import Dashboard from '../views/apps/Dashboard.vue'
import Calendar from '../views/apps/Calendar.vue'
import Contacts from '../views/apps/Contacts.vue'
import Gallery from '../views/apps/Gallery.vue'
import Timeline from '../views/apps/Timeline.vue'

//pages
import Login from '../views/pages/authentication/Login.vue'
import Register from '../views/pages/authentication/Register.vue'
import ForgotPassword from '../views/pages/authentication/ForgotPassword.vue'
import ForgotPasswordPage from '../views/pages/authentication/ForgotPasswordPage.vue'
import ResetPassword from '../views/pages/authentication/ResetPassword'
import ChangePassword from '../views/pages/authentication/ChangePassword'
import CreatePassword from '../views/pages/authentication/CreatePassword'
import ChangeEmail from '../views/pages/authentication/ChangeEmail'
import MasterPayroll from '../views/pages/authentication/MasterPayroll'

import NotFound from '../views/pages/NotFound.vue'
import Invoice from '../views/pages/Invoice.vue'
import Helper from './helper'

//ui
import Themes from '../views/ui/Themes.vue'
import Icons from '../views/ui/Icons/Icons.vue'
import MdIcons from '../views/ui/Icons/MdIcons.vue'
import FlagIcons from '../views/ui/Icons/FlagIcons.vue'
import MultiLanguage from '../views/ui/MultiLanguage.vue'
import HelperClasses from '../views/ui/HelperClasses.vue'
import Typography from '../views/ui/Typography.vue'
import layout from './layout'
import editors from './editors'
import charts from './charts'
import maps from './maps'
import tables from './tables'
import element from './element'

import layouts from '../layout'
import store from '../store'
import user from './user';
import profile from './profile'
import dashboard from './dashboard'
import menu from './menu';
import roles from './roles';
import consultant from './consultant';
import company from './company';
import entity from './entity';
import grade from './grade';
import level from './level';
import department from './department';
import team from './team';
import payrollItem from './payroll-item';
import ema from './ema'
import bank from './bank'
import companySetting from './company-setting'
import currencyRate from './currency-rate'
import currencyKurs from './currency-kurs'
import taxRegulation from "./taxRegulation";
import holiday from './holiday';
import mastertax from './mastertax'
import userKlikpayroll from './userKlikpayroll';
import userHolding from './userHolding';
import currency from './currency'
import holding from './holding'

Vue.use(Router)


const router = new Router({
    mode: 'history',
    routes: [
        ...roles,
        ...user,
        ...profile,
        ...Helper,
        ...dashboard,
        ...menu,
        ...consultant,
        ...company,
        ...entity,
        ...grade,
        ...level,
        ...department,
        ...team,
        ...payrollItem,
        ...ema,
        ...bank,
        ...companySetting,
        ...currencyRate,
        ...currencyKurs,
        ...taxRegulation,
        ...holiday,
        ...mastertax,
        ...userKlikpayroll,
        ...userHolding,
        ...currency,
        ...holding,
        // {
        // 	path: '/',
        // 	alias: '/dashboard',
        // 	name: 'dashboard',
        // 	component: Dashboard,
        // 	meta: {
        // 		auth: true,
        // 		layout: layouts.navLeft,
        // 		searchable: false,
        // 		tags: ['app']
        // 	},
        // },
        {
            path: '/master-payroll',
            name: 'master-payroll',
            component: MasterPayroll,
            meta: {
                auth: true,
                layout: layouts.contenOnly,
                searchable: false,
                tags: ['app']
            }
        },
        {
            path: '/calendar',
            name: 'calendar',
            component: Calendar,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: false,
                tags: ['app']
            }
        },
        {
            path: '/contacts',
            name: 'contacts',
            component: Contacts,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: false,
                tags: ['users', 'address', 'book', 'app']
            }
        },
        {
            path: '/gallery',
            name: 'gallery',
            component: Gallery,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: false,
                tags: ['photo', 'app']
            }
        },
        {
            path: '/timeline',
            name: 'timeline',
            component: Timeline,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: false,
                tags: ['app']
            }
        },
        {
            path: '/themes',
            name: 'themes',
            component: Themes,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: false,
                tags: ['ui']
            }
        },
        {
            path: '/icons',
            name: 'icons',
            component: Icons,
            meta: {
                auth: true,
                layout: layouts.navLeft
            },
            children: [{
                    path: 'md-icons',
                    name: 'md-icons',
                    component: MdIcons,
                    meta: {
                        auth: true,
                        layout: layouts.navLeft,
                        searchable: false,
                        title: 'Material Design Icons',
                        tags: ['material design']
                    }
                },
                {
                    path: 'flag-icons',
                    name: 'flag-icons',
                    component: FlagIcons,
                    meta: {
                        auth: true,
                        layout: layouts.navLeft,
                        searchable: false,
                        title: 'Flag Icons',
                        tags: ['list', 'ui']
                    }
                }
            ]
        },
        {
            path: '/multi-language',
            name: 'multi-language',
            component: MultiLanguage,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: false,
                tags: ['ui', 'translate']
            }
        },
        {
            path: '/helper-classes',
            name: 'helper-classes',
            component: HelperClasses,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: false,
                title: 'Helper Classes',
                tags: ['ui']
            }
        },
        {
            path: '/typography',
            name: 'typography',
            component: Typography,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: false,
                title: 'Typography',
                tags: ['ui']
            }
        },
        layout,
        editors,
        charts,
        maps,
        tables,
        element,

        {
            path: '/invoice',
            name: 'invoice',
            component: Invoice,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: false,
                tags: ['pages']
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                layout: layouts.contenOnly
            }
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            beforeEnter(to, from, next) {
                store.commit('setSplashScreen', true)
                store.dispatch(action.LIST_REGENCIES).then(res=> {
                    if(res.status == 200) {
                        store.commit(mutation.SET_REGENCIES, res.data.data)
                        store.dispatch(action.LIST_HOLDING_TYPE, 9).then(res=> {
                            if(res.status == 200) {
                                store.commit(mutation.SET_HOLDING_TYPE, res.data.data)
                                store.commit('setSplashScreen', false);
                                next();
                            }
                        }).catch(err=> {
                            store.commit('setSplashScreen', false)
                        });
                    }
                }).catch(err=> {
                    store.commit('setSplashScreen', false)
                })
            },
            meta: {
                layout: layouts.contenOnly
            }
        },
        {
            path: '/forgot-password',
            name: 'forgot-password',
            component: ForgotPassword,
            meta: {
                layout: layouts.contenOnly
            }
        },
        {
            path: '/change-password',
            name: 'change-password',
            component: ChangePassword,
            meta: {
                layout: layouts.contenOnly
            }
        },
        {
            path: '/forgot-password-page',
            name: 'forgot-password-page',
            component: ForgotPasswordPage,
            meta: {
                layout: layouts.contenOnly
            }
        },
        {
            path: '/reset-password/:token',
            name: 'reset-password',
            component: ResetPassword,
            meta: {
                layout: layouts.contenOnly
            }
        },
        {
            path: '/create-password/:token',
            name: 'confirm-password',
            component: CreatePassword,
            meta: {
                layout: layouts.contenOnly
            }
        },
        {
            path: '/activation-email/:token',
            name: 'activation-email',
            component: ChangeEmail,
            meta: {
                layout: layouts.contenOnly
            }
        },
        {
            path: '/logout',
            beforeEnter(to, from, next) {
                auth.logout()
                next({ path: '/login' })
            }
        },
        {
            path: '*',
            name: 'not-found',
            component: NotFound,
            meta: {
                layout: layouts.contenOnly
            }
        }
    ]
})


const l = {
    contenOnly() {
        store.commit('setLayout', layouts.contenOnly)
    },
    navLeft() {
        store.commit('setLayout', layouts.navLeft)
    },
    navRight() {
        store.commit('setLayout', layouts.navRight)
    },
    navTop() {
        store.commit('setLayout', layouts.navTop)
    },
    navBottom() {
        store.commit('setLayout', layouts.navBottom)
    },
    set(layout) {
        store.commit('setLayout', layout)
    }
}

//insert here login logic
const auth = {
    loggedIn() {
        return store.getters.isLogged
    },
    logout() {
        store.dispatch(action.LOGOUT);
        store.commit('setLogout')
    }
}

router.beforeEach((to, from, next) => {
    let authrequired = false
    let tokenize = localStorage.getItem('token');
    if (to && to.meta && to.meta.auth)
        authrequired = true

    if (authrequired) {
        if (auth.loggedIn()) {
            if (to.name === 'login') {
                window.location.href = '/'
                return false
            } else {
                next()
            }
        } else {
            if (to.name !== 'login' && !tokenize) {
                localStorage.clear()
                window.location.href = '/login'
                return false
            }
            next()
        }
    } else {
        if (auth.loggedIn() && to.name === 'login') {
            window.location.href = '/'
            return false
        } else {
            next()
        }
    }

    if (to && to.meta && to.meta.layout) {
        l.set(to.meta.layout)
    }
})

router.afterEach((to, from) => {
    setTimeout(() => {
        store.commit('setSplashScreen', false)
    }, 500)
})

export default router
