import { defineStore } from "pinia";
import { Icon } from "../base-components/Lucide/Lucide.vue";
import { ref } from "vue"
import moment from 'moment'

const month_filter = ref(moment().format(""));
const year_filter = ref(moment().format("YYYY"));
export interface Menu {
  icon: Icon;
  title: string;
  pageName?: string;
  pageParams?:any;
  roles?: any;
  subMenu?: Menu[];
  ignore?: boolean;
}


export interface SideMenuState {
  menu: Array<Menu | "devider">;
}

export const useSideMenuStore = defineStore("sideMenu", {
  state: (): SideMenuState => ({
    menu: [
      {
        icon: "Monitor",
        pageName: "Dashboard",
        title: "CRM Leads",
        roles : ["superAdmin","salesLeader","salesManager","salesConsultant","teacher","admin"],
        subMenu: [
          {
            icon: "Home",
            pageName: "Dashboard",
            title: "Dashboard CRM Leads",
            roles : ["superAdmin","salesLeader","salesManager","salesConsultant","teacher","admin"]
          },
          {
            icon: "List",
            pageName: "ListDetailCRM",
            title: "Detail CRM Leads",
            roles : ["superAdmin","salesLeader","salesManager","salesConsultant","teacher","admin"],
          },
          {
            icon: "List",
            pageName: "ListLeadsHapus",
            title: "Leads Hapus",
            roles : ["superAdmin","salesLeader","salesManager","salesConsultant","admin"]
          },
        ],
      },

      {
        icon: "BookOpen",
        pageName: "schedule",
        title: "Booking & Schedule Class",
        roles : ["superAdmin","salesLeader","salesManager","salesConsultant","teacher","admin"],
        subMenu: [
          {
            icon: "Calendar",
            pageName: "schedule",
            title: "Schedule Class",
            roles : ["superAdmin","salesLeader","salesManager","salesConsultant","teacher","admin"],
          },
    
          {
            icon: "Check",
            pageName: "Studio_CheckIn",
            title: "Class Booking & Check-In",
            roles : ["superAdmin","salesLeader","salesManager","salesConsultant","teacher","admin"],
          },
    
          {
            icon: "Check",
            pageName: "Studio_CheckInAdminPT",
            title: "Personal Trainer Booking & Check-In",
            roles : ["superAdmin","salesLeader","salesManager","salesConsultant","teacher","admin"],
          },

        ]
      },

  
      {
        icon: "Home",
        pageName: "Studio_CheckIn",
        title: "Dashboard",
        roles : ["studio"],
        subMenu: [
          {
            icon: "Check",
            pageName: "Studio_CheckIn",
            title: "Class Booking & Check-In",
            roles : ["studio"],
          },

          {
            icon: "Check",
            pageName: "Studio_CheckInPT",
            title: "Personal Trainer Booking & Check-In",
            roles : ["studio"],
          }
        ],
      },

      {
        icon: "TrendingUp",
        pageName: "Target",
        title: "Target",
        roles : ["superAdmin","salesLeader","salesManager","admin"],
      },

      {
        icon: "CreditCard",
        pageName: "Pembayaran",
        title: "Pembayaran",
        roles : ["superAdmin","salesLeader","salesManager","salesConsultant","admin"],
      },

      {
        icon: "Users",
        pageName: "Team",
        title: "Switch Member",
        roles : ["salesLeader"],
      },

      {
        icon: "Repeat",
        pageName: "SwitchSales",
        title: "Switch Sales",
        roles : ["salesManager"],
      },

      {
        icon: "ShoppingCart",
        pageName: "Cafetaria",
        title: "Cafetaria",
        roles : ["superAdmin","salesLeader","salesManager","salesConsultant","admin"],
        subMenu: [
          // {
          //   icon: "Home",
          //   pageName: "dashboardcafe",
          //   title: "Dashboard Cafetarian",
          //   roles : ["superAdmin","salesLeader","salesManager","salesConsultant","admin"],
          // },
          {
            icon: "CreditCard",
            pageName: "sales",
            title: "Sales",
            roles : ["superAdmin","salesLeader","salesManager","salesConsultant","admin"],
          },
          {
            icon: "Box",
            pageName: "product",
            title: "Product",
            roles : ["superAdmin","salesLeader","salesManager","salesConsultant","admin"],
          },
          {
            icon: "FileText",
            pageName: "transactions",
            title: "Transactions",
            roles : ["superAdmin","salesLeader","salesManager","salesConsultant","admin"],
          },
        ],
      },




      {
        icon: "Users",
        pageName: "member",
        title: "Members",
        roles : ["superAdmin","salesLeader","salesManager","salesConsultant","teacher","admin"],
        subMenu: [
          {
            icon: "UserPlus",
            pageName: "newguest",
            title: "New Prospect",
            roles : ["superAdmin","salesLeader","salesManager","admin"],
          },
          {
            icon: "UserCheck",
            pageName: "member",
            title: "Contract Members",
            roles : ["superAdmin","salesLeader","salesManager","salesConsultant","teacher","admin"],
          },
          {
            icon: "UserX",
            pageName: "cuti",
            title: "Request Cuti",
            roles : ["superAdmin","salesLeader","salesManager","admin"],
          }
        ],
      },

      {
        icon: "File",
        pageName: "Report",
        title: "Report & Analytics",
        roles : ["superAdmin","admin"],
      },
      
      
      {
        icon: "Layers",
        pageName: "CrmSetting",
        title: "Master Data",
        roles : ["superAdmin","admin"],
        subMenu: [
          {
            icon: "List",
            pageName: "CrmSetting",
            title: "Crm Settings",
            roles : ["superAdmin","admin"],
          },
          {
            icon: "List",
            pageName: "class",
            title: "Class",
            roles : ["superAdmin","admin"],
          },
          {
            icon: "List",
            pageName: "packages",
            title: "Packages",
            roles : ["superAdmin","admin"],
          },
          {
            icon: "List",
            pageName: "studio",
            title: "Studio",
            roles : ["superAdmin","admin"],
          },
          {
            icon: "List",
            pageName: "program",
            title: "Program",
            roles : ["superAdmin","admin"],
          },
          {
            icon: "List",
            pageName: "kat_pembayaran",
            title: "Kategori Pembayaran",
            roles : ["superAdmin","admin"],
          },
          {
            icon: "List",
            pageName: "teacher",
            title: "Teacher",
            roles : ["superAdmin","admin"],
          },
          {
            icon: "List",
            pageName: "user",
            title: "Users",
            roles : ["superAdmin","admin"],
          }
        ],
      },
    ],
  }),
});
