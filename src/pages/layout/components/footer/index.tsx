import { Layout } from "@douyinfe/semi-ui"
import { FC } from "react";
import { IconWifi } from "@douyinfe/semi-icons";

const { Footer } = Layout;

const Index: FC = () => {
    return (
        <Footer
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '20px',
                color: 'var(--semi-color-text-2)',
                backgroundColor: 'rgba(var(--semi-grey-0), 1)',
            }}
        >
            <span
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <IconWifi size="large" style={{ marginRight: '8px' }} />
                <span>Auther info? </span>
            </span>
            <span>
                <span style={{ marginRight: '24px' }}><a href="https://github.com/KernelErr/DSCourseDesign">源码</a></span>
            </span>
        </Footer>
    )
}

export default Index;
