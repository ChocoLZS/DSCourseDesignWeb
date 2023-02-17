import { FC, Suspense, useEffect } from "react"
import { Layout } from "@douyinfe/semi-ui";
import { Navigate, Outlet } from "react-router";
import Sider from "./components/sider";
import Header from "./components/header";
import Footer from "./components/footer"
import "./index.scss"
import SuspendFallbackLoading from "@app/components/fallback-loading";
const { Content } = Layout
const Index: FC = () => {
    return (
        <Layout className="layout-page">
            <Sider />
            <Layout>
                <Header />
                <Content className="layout-content">
                    <Suspense fallback={<SuspendFallbackLoading message="正在加载中" />}>
                        <Outlet />
                    </Suspense>
                </Content>
                <Footer />
            </Layout>
        </Layout>
    )
}
export default Index;
