import { defineStore } from "pinia";
import { Icon } from "../base-components/Lucide/Lucide.vue";

export interface Menu {
  icon: Icon;
  title: string;
  roles?: any;
  pageName?: string;
  subMenu?: Menu[];
  ignore?: boolean;
}

export interface TopMenuState {
  menu: Array<Menu>;
}

export const useTopMenuStore = defineStore("topMenu", {
  state: (): TopMenuState => ({
    menu: [
      {
        icon: "Home",
        pageName: "Dashboard",
        title: "Dashboard",
        roles : ["superAdmin","salesLeader","salesManager","salesConsultant","teacher","admin"],
        subMenu: [
          {
            icon: "Monitor",
            pageName: "Dashboard",
            title: "CRM Leads",
            roles : ["superAdmin","salesLeader","salesManager","salesConsultant","teacher","admin"],
          },

          {
            icon: "Calendar",
            pageName: "schedule",
            title: "Schedule Class",
            roles : ["superAdmin","salesLeader","salesManager","salesConsultant","teacher","admin"],
          },

          {
            icon: "Check",
            pageName: "Studio_CheckInAdmin",
            title: "Class Booking & Check-In",
            roles : ["superAdmin","salesLeader","salesManager","salesConsultant","teacher","admin"],
          },

          {
            icon: "File",
            pageName: "Report",
            title: "Report & Analytics",
            roles : ["superAdmin","admin"],
          },
        ],
      },

      {
        icon: "Home",
        pageName: "Studio_CheckIn",
        title: "Dashboard",
        roles : ["studio"],
        subMenu: [
          {
            icon: "Monitor",
            pageName: "Studio_CheckIn",
            title: "Dashboard",
            roles : ["studio"],
          }
        ],
      },

      

      {
        icon: "Users",
        pageName: "member",
        title: "Members",
        roles : ["superAdmin","salesLeader","salesManager","salesConsultant","teacher","admin"],
        subMenu: [
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
