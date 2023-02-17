import { Tabs, TabPane, Tag } from "@douyinfe/semi-ui";
import { FC, useCallback, useEffect, useState } from "react";
import menuList from "@app/pages/layout/components/sider/config"
import { findMenuByPath } from "@app/pages/layout/components/common"
import { useNavTagStore } from "@app/store/common/TagStore";
import { useLocation, useNavigate } from "react-router";

const index: FC = () => {
    const [tags, activedTagId, collapsible, addTag, removeTag, setActiveTag] =
        useNavTagStore((i) => [i.navheadertags, i.navheaderactivedTagId, i.navheadercollapsible, i.navheaderaddTag,
        i.navheaderremoveTag, i.navheadersetActiveTag]);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const tabCloseHandler = (id: string) => {
        const tagItem = tags.filter(e => e.id === id);
        removeTag(tagItem[0]);
    }
    const tabChangeHandler = (id: string) => {
        const tagItem = tags.find(e => e.id === id);
        if (tagItem) {
            setActiveTag(tagItem.id);
            navigate(tagItem.path);
        }
    }
    useEffect(() => {
        const menu = findMenuByPath(menuList, pathname);
        if (menu) {
            addTag({
                id: menu.itemKey,
                path: pathname,
                text: menu.text,
                closable: true,
            })
        }
    }, [pathname])
    useEffect(() => {
        if (tags && activedTagId) {
            const tag = tags.filter(e => e.id === activedTagId);
            navigate(tag[0].path);
        }
    }, [tags, activedTagId])
    return (
        <Tabs
            type="card"
            activeKey={activedTagId}
            collapsible={collapsible}
            onTabClose={tabCloseHandler}
            onChange={tabChangeHandler}
        >
            {tags && tags.map(obj =>
                (<TabPane closable={obj.closable} tab={obj.text} itemKey={obj.id} key={obj.id}></TabPane >)
            )}
        </Tabs >
    )
}

export default index;