import { ReactNode } from "react";
import { IconHome, IconGridView, IconRadio, IconEdit, IconCustomize, IconArticle, IconWrench } from "@douyinfe/semi-icons";

export interface SiderMenuItem {
    itemKey: string,
    text: string,
    icon?: ReactNode,
    items?: SiderMenuItem[],
    path?: string,
    admin?: boolean,
    component?: React.ComponentType<any>
}

const SIDER_MENU_CONFIG: SiderMenuItem[] = [
    // {
    //     itemKey: "Home", text: "首页", icon: IconHome, path: "/home"
    // },
    {
        itemKey: 'courses-management', text: '课程管理', icon: IconGridView,
        items: [
            { itemKey: 'courses-list', text: '课程表', icon: IconRadio, path: "/course/list", },
            { itemKey: 'courses-material', text: '课程资料', icon: IconRadio, path: "/course/material", },
            { itemKey: 'courses-navigation', text: '课程导航', icon: IconRadio, path: "/course/navi", }
        ]
    },
    {
        itemKey: 'examination', text: '考试信息', icon: IconEdit, path: "/exam"
    },
    { itemKey: 'out-courses-management', text: '课外管理', icon: IconCustomize, path: "/activity" },
    { itemKey: 'admin', text: '管理员', icon: IconWrench, path: "/admin", admin: true },
    { itemKey: 'log', text: '日志', icon: IconArticle, path: "/log" },
    // { itemKey: 'setting', text: '设置', path: "/setting", admin: true },
    // { itemKey: 'test', text: '开发测试', icon: IconArticle, path: "/test" }
]

export default SIDER_MENU_CONFIG