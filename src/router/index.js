import { createRouter, createWebHistory } from "vue-router";
import store from '../stores';
import TopMenu from "../layouts/TopMenu/TopMenu.vue";
import SideMenu from "../layouts/SideMenu/SideMenu.vue";
import Login from "../pages/auth/Login.vue";
import Register from "../pages/auth/Register.vue";
import Dashboard from "../pages/Dashboard.vue";
import DashboardAdmin from "../pages/DashboardAdmin.vue";
import Permissions from "../pages/roles_permissions/Permissions.vue";
import Permissions_groups from "../pages/roles_permissions/Permissions_groups.vue";
import Roles from "../pages/roles_permissions/Roles.vue";
import ErrorPage from "../pages/ErrorPage.vue";
import AccessDenied from "../pages/AccessDenied.vue";
import Users from "../pages/master/Users.vue";
import Departements from "../pages/master/Departements.vue";
import Forgot from "../pages/Forgot.vue";
import Change_password from "../pages/Change_password.vue";
import ListDetailCRM from "../pages/ListDetailCRM.vue";
import ListLeadsHapus from "../pages/ListLeadsHapus.vue";
import CrmSetting from "../pages/CrmSetting.vue";
import crm from "../pages/Crm.vue";
import studio from "../pages/Studio.vue";
import user from "../pages/Users.vue";
import kelas from "../pages/Class.vue";
import packages from "../pages/Packages.vue";
import teacher from "../pages/Teachers.vue";
import member from "../pages/Members.vue";
// import contract from "../pages/Contract.vue";
import schedule from "../pages/Schedule.vue";
import Program from "../pages/Program.vue";
import Studio_CheckIn from "../pages/Studio_CheckIn.vue";
import Studio_CheckInPT from "../pages/Studio_CheckInPT.vue";
import Studio_CheckInAdmin from "../pages/Studio_CheckInAdmin.vue";
import Studio_CheckInAdminPT from "../pages/Studio_CheckInAdminPT.vue";
import Cuti from "../pages/Cuti.vue";
import dashboardTeacher from "../pages/DashboardTeacher.vue";
import dashboardMember from "../pages/DashboardMember.vue";
import report from "../pages/Report.vue";
import Product from "../pages/Product.vue";
import Transactions from "../pages/Transactions.vue";
import Sales from "../pages/Sales.vue";
import dashboardCafe from "../pages/DashboardCafe.vue";
import newguest from "../pages/Newguest.vue";
import pembayaran from "../pages/Pembayaran.vue";
import Kat_pembayaran from "../pages/Kat_pembayaran.vue";
import Team from "../pages/Team.vue";
import SwitchSales from "../pages/SwitchSales.vue";
import Target from "../pages/Target.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
    meta: {
      authPage: true
    }
  },  

  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      authPage: true
    }
  },  
  {
    path: "/aa",
    name: "side-menu-page-1",
    component: Dashboard,
  },
  {
    path: "/forgot",
    name: "forgot",
    component: Forgot,
    meta: {
      authPage: true
    }
  },
  {
    path: "/error-page",
    name: "error-page",
    component: ErrorPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/:pathMatch(.*)*",
    component: ErrorPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/403",
    name: "403",
    component: AccessDenied,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/dashboard",
    component: SideMenu,
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/report",
        name: "Report",
        component: report,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/crm",
        name: "crm",
        component: crm,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/dashboardAdmin",
        name: "dashboardAdmin",
        component: DashboardAdmin,
        meta: {
          requiresAuth: true
        }
      },
    
      {
        path: "/change_password",
        name: "change_password",
        component: Change_password,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/permissions_groups",
        name: "Permissions_groups",
        component: Permissions_groups,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/permissions",
        name: "Permissions",
        component: Permissions, 
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/roles",
        name: "Roles",
        component: Roles, 
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/users",
        name: "Users",
        component: Users, 
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/departements",
        name: "Departements",
        component: Departements, 
        meta: {
          requiresAuth: true
        }
      },

      //CRM
      {
        path: "/ListDetailCRM",
        name: "ListDetailCRM",
        component: ListDetailCRM, 
        meta: {
          requiresAuth: true
        },
      },

      {
        path: "/ListLeadsHapus",
        name: "ListLeadsHapus",
        component: ListLeadsHapus, 
        meta: {
          requiresAuth: true
        },
      },

      {
        path: "/CrmSetting",
        name: "CrmSetting",
        component: CrmSetting, 
        meta: {
          requiresAuth: true
        },
      },

      {
        path: "/studio",
        name: "studio",
        component: studio, 
        meta: {
          requiresAuth: true
        },
      },

      {
        path: "/class",
        name: "class",
        component: kelas, 
        meta: {
          requiresAuth: true
        },
      },

      {
        path: "/packages",
        name: "packages",
        component: packages, 
        meta: {
          requiresAuth: true
        },
      },

      {
        path: "/user",
        name: "user",
        component: user, 
        meta: {
          requiresAuth: true
        },
      },

      {
        path: "/teacher",
        name: "teacher",
        component: teacher, 
        meta: {
          requiresAuth: true
        },
      },

      {
        path: "/member",
        name: "member",
        component: member, 
        meta: {
          requiresAuth: true
        },
      },

      {
        path: "/schedule",
        name: "schedule",
        component: schedule, 
        meta: {
          requiresAuth: true
        },
      },

      {
        path: "/newguest",
        name: "newguest",
        component: newguest, 
        meta: {
          requiresAuth: true
        },
      },

      {
        path: "/Target",
        name: "Target",
        component: Target, 
        meta: {
          requiresAuth: true
        },
      },

      {
        path: "/pembayaran",
        name: "Pembayaran",
        component: pembayaran, 
        meta: {
          requiresAuth: true
        },
      },

      {
        path: "/Team",
        name: "Team",
        component: Team, 
        meta: {
          requiresAuth: true
        },
      },

      {
        path: "/SwitchSales",
        name: "SwitchSales",
        component: SwitchSales, 
        meta: {
          requiresAuth: true
        },
      },
      
      {
        path: "/program",
        name: "program",
        component: Program, 
        meta: {
          requiresAuth: true
        },
      },

      {
        path: "/Studio_CheckInAdmin",
        name: "Studio_CheckInAdmin",
        component: Studio_CheckInAdmin, 
        meta: {
          requiresAuth: true
        },
      },

      {
        path: "/Studio_CheckInAdminPT",
        name: "Studio_CheckInAdminPT",
        component: Studio_CheckInAdminPT, 
        meta: {
          requiresAuth: true
        },
      },

      {
        path: "/cuti",
        name: "cuti",
        component: Cuti, 
        meta: {
          requiresAuth: true
        },
      },

      {
        path: "/Studio_CheckIn",
        name: "Studio_CheckIn",
        component: Studio_CheckIn, 
        meta: {
          requiresAuth: true
        },
      },

      {
        path: "/Studio_CheckInPT",
        name: "Studio_CheckInPT",
        component: Studio_CheckInPT, 
        meta: {
          requiresAuth: true
        },
      },

      {
        path: "/product",
        name: "product",
        component: Product, 
        meta: {
          requiresAuth: true
        },
      },

      {
        path: "/transactions",
        name: "transactions",
        component: Transactions, 
        meta: {
          requiresAuth: true
        },
      },

      {
        path: "/kat_pembayaran",
        name: "kat_pembayaran",
        component: Kat_pembayaran, 
        meta: {
          requiresAuth: true
        },
      },

      {
        path: "/dashboardcafe",
        name: "dashboardcafe",
        component: dashboardCafe, 
        meta: {
          requiresAuth: true
        },
      },

      
      {
        path: "/sales",
        name: "sales",
        component: Sales, 
        meta: {
          requiresAuth: true
        },
      },
    ],
  },

  {
    path: "/dashboard",
    component: TopMenu,
    children: [
      {
        path: "/dashboardTeacher",
        name: "Dashboard_Teacher",
        component: dashboardTeacher,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/dashboardMember",
        name: "Dashboard_Member",
        component: dashboardMember,
        meta: {
          requiresAuth: true
        }
      },
  
    ]
  }
  
  
];

const router = createRouter({
  history: createWebHistory('/'),
  base:'/',
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  let token = store.getters['auth/isLoggedIn']
  //console.log(token)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next({
        path: '/',
      })
    } else {
      next()
    }
  }else if (to.matched.some(record => record.meta.authPage)) {
    if (token) {
      next({
        path: '/dashboard',
      })
    } else {
      next()
    }
  }
})

export default router;
