import Vue from "vue";
import Vuex from "vuex";

import home from "./modules/home/index";
import login from "./modules/users/login";
import error from "./modules/error/index";
import forgotPassword from "./modules/users/create-password";
import user from "./modules/user/index";
import profile from "./modules/profile";
import helper from "./modules/helper";
import dashboard from "./modules/dashboard";
import menu from "./modules/menu";
import roles from "./modules/roles";
import consultant from "./modules/consultant";
import company from "./modules/company";
import entity from "./modules/entity";
import grade from "./modules/grade";
import level from "./modules/level";
import department from "./modules/department";
import team from "./modules/team";
import ema from "./modules/ema";
import bank from "./modules/bank";
import payrollItem from './modules/payrollItem';
import companySetting from './modules/companySetting';
import currencyRate from './modules/currencyRate';
import currencyKurs from './modules/currencyKurs';
import lov from './modules/lov';
import taxRegulation from './modules/taxRegulation';
import assigned from './modules/assigned';
import holiday from './modules/holiday';
import taxRegulationMaster from './modules/taxRegulationMaster'
import mastertax from './modules/mastertax'
import masterPtkps from './modules/ptkpsMaster'
import userKlikpayroll from "./modules/userKlikpayroll/index";
import userHolding from "./modules/userHolding/index";
import currency from "./modules/currency/index";
import country from "./modules/country/index";
import holding from "./modules/holding";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    home,
    login,
    error,
    forgotPassword,
    user,
    profile,
    helper,
    dashboard,
    menu,
    roles,
    consultant,
    company,
    entity,
    grade,
    level,
    department,
    team,
    ema,
    bank,
    payrollItem,
    companySetting,
    currencyRate,
    currencyKurs,
    lov,
    taxRegulation,
    assigned,
    holiday,
    taxRegulationMaster,
    mastertax,
    masterPtkps,
    userKlikpayroll,
    userHolding,
    currency,
    country,
    holding
  },
});
