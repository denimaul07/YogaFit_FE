import { Router, RouteLocationNormalizedLoaded } from "vue-router";
import { Menu } from "../../stores/side-menu";
import { slideUp, slideDown } from "../../utils/helper";

interface Route extends RouteLocationNormalizedLoaded {
  forceActiveMenu?: string;
}

export interface FormattedMenu extends Menu {
  active?: boolean;
  activeDropdown?: boolean;
  subMenu?: FormattedMenu[];
}

// Setup side menu
const findActiveMenu = (subMenu: Menu[], route: Route): boolean => {
  let match = false;
  subMenu.forEach((item) => {
    if (
      ((route.forceActiveMenu !== undefined &&
        item.pageName === route.forceActiveMenu) ||
        (route.forceActiveMenu === undefined &&
          item.pageName === route.name)) &&
      !item.ignore
    ) {
      match = true;
    } else if (!match && item.subMenu) {
      match = findActiveMenu(item.subMenu, route);
    }
  });
  return match;
};

const nestedMenu = (menu: Array<Menu | "devider">, route: Route) => {
  const formattedMenu: Array<FormattedMenu | "devider"> = [];
  menu.forEach((item) => {
    if (typeof item !== "string") {
      const menuItem: FormattedMenu = {
        icon: item.icon,
        title: item.title,
        pageName: item.pageName,
        pageParams: item.pageParams,
        subMenu: item.subMenu,
        ignore: item.ignore,
        roles : item.roles
      };
      menuItem.active =
        ((route.forceActiveMenu !== undefined &&
          menuItem.pageName === route.forceActiveMenu) ||
          (route.forceActiveMenu === undefined &&
            menuItem.pageName === route.name) ||
          (menuItem.subMenu && findActiveMenu(menuItem.subMenu, route))) &&
        !menuItem.ignore;

      if (menuItem.subMenu) {
        menuItem.activeDropdown = findActiveMenu(menuItem.subMenu, route);

        // Nested menu
        const subMenu: Array<FormattedMenu> = [];
        nestedMenu(menuItem.subMenu, route).map(
          (menu) => typeof menu !== "string" && subMenu.push(menu)
        );
        menuItem.subMenu = subMenu;
      }

      formattedMenu.push(menuItem);
    } else {
      formattedMenu.push(item);
    }
  });

  return formattedMenu;
};

const linkTo = (menu: FormattedMenu, router: Router) => {
  console.log(menu);
  
  if (menu.subMenu) {
    menu.activeDropdown = !menu.activeDropdown;
  } else {
    if (menu.pageName !== undefined) {
      if (menu.pageParams) {
        router.push({
          name: menu.pageName,
          params: menu.pageParams,
        });
      } else {
        router.push({
          name: menu.pageName,
        });
      }
    }
  }
};

const enter = (el: HTMLElement) => {
  slideDown(el, 300);
};

const leave = (el: HTMLElement) => {
  slideUp(el, 300);
};

export { nestedMenu, linkTo, enter, leave };
