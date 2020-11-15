import ListUser from "../views/pages/taxRegulation/list-tax-regulation.vue";
import NewUser from "../views/pages/taxRegulation/new-tax-regulation.vue";
import DetailReg from '../views/pages/taxRegulation/detail-tax-regulation';
import TaxCompany from '../views/pages/taxRegulation/tax-company';

import layouts from "../layout";

export default [
  {
    path: "/list-tax-regulation",
    name: "List Tax Regulation",
    component: ListUser,
    meta: {
      auth: true,
      layout: layouts.navLeft,
      searchable: false,
      title: "List Tax Regulation",
      tags: ["User"],
    },
  },
  {
    path: "/new-tax-regulation",
    name: "New Tax Regulation",
    component: NewUser,
    meta: {
      auth: true,
      layout: layouts.navLeft,
      searchable: false,
      title: "New Tax Regulation",
      tags: ["User"],
    },
  },
  {
    path: "/edit-tax-regulation/:id",
    name: "Edit Tax Regulation",
    component: NewUser,
    meta: {
      auth: true,
      layout: layouts.navLeft,
      searchable: false,
      title: "Edit Tax Regulation",
      tags: ["User"],
    },
  },
  {
    path: "/reset-tax-regulation",
    name: "Reset Tax Regulation",
    component: NewUser,
    meta: {
      auth: true,
      layout: layouts.navLeft,
      searchable: false,
      title: "Reset Tax Regulation",
      tags: ["User"],
    },
  },  {
    path: "/update-ptkp-taxreg",
    name: "Update Ptkp Tax Regulation",
    component: NewUser,
    meta: {
      auth: true,
      layout: layouts.navLeft,
      searchable: false,
      title: "Update Ptkp Tax Regulation",
      tags: ["User"],
    },
  },
  {
    path: "/tax-regulation-detail/:id",
    name: "Tax Regulation Detail",
    component: DetailReg,
    meta: {
      auth: true,
      layout: layouts.navLeft,
      searchable: false,
      title: "Tax Regulation Detail",
      tags: ["User"],
    },
  },
  {
    path: "/setting-tax-company",
    name: "Tax Company Setting",
    component: TaxCompany,
    meta: {
      auth: true,
      layout: layouts.navLeft,
      searchable: false,
      title: "Tax Company Setting",
      tags: ["Tax"],
    },
  }
];
