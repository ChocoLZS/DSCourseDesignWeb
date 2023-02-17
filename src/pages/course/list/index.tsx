import { FC, useState } from "react";
import ClassSchedule from "./components/classSchedule"
import SideSheetContent from "./components/sideSheetContent"
import { Button, Form, SideSheet, Typography } from "@douyinfe/semi-ui";
import { useTimeStore } from "@app/store/TimeStore";

const index: FC = () => {
    const [visible, setVisible] = useState(false);
    const SearchBar: FC = () => {
        return (
            <Form
                layout="horizontal"
                style={{ "marginBottom": "24px" }}
            >
                {/* <Form.DatePicker field={"DateSelect"} noLabel={true}></Form.DatePicker> */}
                <Button onClick={() => { useTimeStore.getState().timePause(); setVisible(!visible) }}>课程查询</Button>
            </Form >
        )
    }
    return (
        <>
            <SearchBar />
            <ClassSchedule />
            <SideSheet
                visible={visible}
                onCancel={() => setVisible(!visible)}
                title={<Typography.Title heading={4}>课程查询</Typography.Title>}
                headerStyle={{ borderBottom: '1px solid var(--semi-color-border)' }}
            >
                <SideSheetContent />
            </SideSheet>
        </>
    );
}

export default index;