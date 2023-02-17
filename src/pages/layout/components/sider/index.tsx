import menuList, { SiderMenuItem } from '@app/pages/layout/components/sider/config';
import { Layout, Nav } from '@douyinfe/semi-ui'
import { FC, useEffect, useMemo, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { findMenuByPath } from "@app/pages/layout/components/common"
import Clock from '@app/components/clock';
import { useUserStore } from "@app/store/User"

const { Sider } = Layout;

function renderIcon(icon: any) {
    if (!icon)
        return null;
    else
        return icon.render();
}

const Index: FC = () => {
    const [userRole] = useUserStore(i => [i.userRole]);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const siderList = useMemo(() => {
        return menuList.filter((e) =>
            ((e.admin && userRole === 'administrator') || !e.admin)
        ).map((e) => {
            return {
                ...e,
                text: e.text,
                icon: e?.icon ? renderIcon(e.icon) : null,
                //@ts-ignore
                items: e?.items ? e.items.map((o) => {
                    return {
                        ...o,
                        text: o.text,
                        icon: o?.icon ? renderIcon(o.icon) : null,
                    }
                }) : []
            }
        })
    }, [menuList])

    const onSelect = (data: any) => {
        setSelectedKeys([...data.selectedKeys])
        navigate(data.selectedItems[0].path as string)
    }

    const onOpenChange = (data: any) => {
        setOpenKeys([...data.openKeys])
    }
    // 更新，保证当前所选的keys存储在state里
    useEffect(() => {
        const keys: string[] = [];
        const menu = findMenuByPath(menuList, pathname);
        if (menu) keys.push(menu.itemKey);
        setSelectedKeys([keys.pop() as string])
        setOpenKeys(Array.from(new Set([...openKeys, ...keys])));
    }, [pathname])

    return (
        <Sider style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
            <Nav
                style={{ maxWidth: 220, height: '100%' }}
                openKeys={openKeys}
                selectedKeys={selectedKeys}
                items={siderList}
                onSelect={onSelect}
                onOpenChange={onOpenChange}
                header={{
                    text: '课程辅助系统',
                    children: <Clock />,
                    style: { flexDirection: 'column', paddingBottom: '24px', paddingTop: '24px' }
                }}
                footer={{
                    collapseButton: true,
                }}
            />
        </Sider>
    )
}


export default Index;