import { Breadcrumb } from "@douyinfe/semi-ui";
import { FC, useEffect, useState } from "react";
import menuList from "@app/pages/layout/components/sider/config"
import { findBreadcrumbByPath } from "@app/pages/layout/components/common"
import { useLocation } from "react-router";

interface breadcrumbListItem {
    text: string,
    path: string | undefined,
    key: string,
}

const index: FC = () => {
    const { pathname } = useLocation();
    const [breadcrumbList, setBreadcrumbList] = useState([] as Array<breadcrumbListItem>);
    useEffect(() => {
        const menus = findBreadcrumbByPath(menuList, pathname);
        if (menus && menus.length !== 0) {
            const lists = Array<breadcrumbListItem>();
            for (const menu of menus) {
                const item = {
                    text: menu.text,
                    path: menu.path,
                    key: menu.itemKey,
                } as breadcrumbListItem;
                lists.push(item);
            }
            setBreadcrumbList(lists);
        }
    }, [pathname])
    return (
        <Breadcrumb
            maxItemCount={3}
            autoCollapse={true}
        >
            {breadcrumbList.map(obj => (<Breadcrumb.Item key={obj.key}>{obj.text}</Breadcrumb.Item>))}
        </Breadcrumb>
    )
}

export default index;