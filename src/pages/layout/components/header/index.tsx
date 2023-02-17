import { Layout, Nav, Button, Avatar, AutoComplete } from "@douyinfe/semi-ui"
import { FC } from "react";
import Tag from "./components/tag"
import Breadcrumb from "./components/breadcrumb"
import "./index.scss"
import UserPanel from "./components/userPanel";
import Notification from "./components/notification";
const { Header } = Layout;


const Index: FC = () => {
    return (
        <Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
            <Nav
                mode="horizontal"
                header={<Breadcrumb />}
                footer={
                    <>
                        <Notification />
                        <UserPanel />
                    </>
                }
            ></Nav>
            <Tag />
        </Header>
    )
}

export default Index;