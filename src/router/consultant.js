import ListUser from "../views/pages/consultant/list-consultant.vue";
import EditUser from "../views/pages/consultant/edit-consultant.vue";
import NewUser from "../views/pages/consultant/new-consultant.vue";

import layouts from "../layout";

export default [
  {
    path: "/list-consultant",
    name: "List Consultant",
    component: ListUser,
    meta: {
      auth: true,
      layout: layouts.navLeft,
      searchable: false,
      title: "List Consultant",
      tags: ["User"],
    },
  },
  {
    path: "/new-consultant",
    name: "New Consultant",
    component: NewUser,
    meta: {
      auth: true,
      layout: layouts.navLeft,
      searchable: false,
      title: "New Consultant",
      tags: ["User"],
    },
  },
  {
    path: "/edit-consultant/:id",
    name: "Edit Consultant",
    component: EditUser,
    meta: {
      auth: true,
      layout: layouts.navLeft,
      searchable: false,
      title: "Edit Consultant",
      tags: ["User"],
    },
  },
];
