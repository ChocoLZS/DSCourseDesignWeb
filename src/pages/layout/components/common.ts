import { SiderMenuItem } from "./sider/config";

export function findMenuByPath(menus: SiderMenuItem[], path: string): SiderMenuItem | undefined {
    for (const menu of menus) {
        if (menu.path === path) return menu;
        if (menu.items) {
            const result = findMenuByPath(menu.items, path);
            if (result) return result;
        };
    }
}

export function findBreadcrumbByPath(menus: SiderMenuItem[], path: string): SiderMenuItem[] | undefined {
    const menu = [];
    for (const menu of menus) {
        if (menu.path === path) return [menu];
        if (menu.items) {
            const result = findMenuByPath(menu.items, path);
            if (result) return [menu].concat(result);
        };
    }
}