import { Button, ButtonGroup, Form } from "@douyinfe/semi-ui";
import { FC, useEffect, useState } from "react";
import { activityType, IActivityItem } from "@typings/activity";
import { IconDelete } from "@douyinfe/semi-icons";
import { useUserStore } from "@app/store/User";
import './index.scss'
import _ from "lodash"
import { useLogStore } from "@app/store/LogStore";
import { KMP } from "@app/utils/KMP";
import store from "@app/store/common/Global";
interface SearchProps {
    connectActivityList: (list: Array<IActivityItem>) => void
    connectLoading?: (loading: boolean) => void
}
interface FormValues {
    name: undefined | string,
    content: undefined | string,
    type: undefined | Array<activityType>
}

const { Select, Checkbox, CheckboxGroup, Input } = Form
const { Option } = Select

const index: FC<SearchProps> = (props) => {
    const [userInfo] = useUserStore(i => [i.userInfo]);
    const searchFilteredActivity = async (v) => {
        // props.connectLoading(true);
        let val = JSON.parse(JSON.stringify(v));
        let data = _.cloneDeep(userInfo?.activities);

        if (val.name) data = data?.filter(i => KMP(i.name, val.name));
        if (val.content) data = data?.filter(i => KMP(i.content, val.content));
        if (val.type && val.type.length == 1) data = data?.filter(i => i.type == val.type[0])
        props.connectActivityList(data);
        useLogStore.getState().putLogs(`搜索了课外活动`
            , `搜索内容为`
            , `活动名称:${val.name ? val.name : ""}`
            , `活动详情:${val.content ? val.content : ""}`
            , `活动类型:${val.type ? translateType(val.type) : ""}`)
    }
    const translateType = (types: []) => {
        let arr = []
        for (let type of types) {
            if (type == activityType.personal)
                arr.push("个人活动")
            if (type == activityType.group)
                arr.push("集体活动")
        }
        return arr;
    }
    return (
        <Form
            labelPosition='left'
            labelAlign='right'
            onSubmit={(v: Record<string, FormValues>) => searchFilteredActivity(v)} allowEmpty>
            <Input field="name" label="活动名称"></Input>
            <Input field="content" label="活动详情"></Input>
            <CheckboxGroup field="type" label="活动类型" direction="horizontal" >
                <Checkbox value={activityType.personal}>个人活动</Checkbox>
                <Checkbox value={activityType.group}>集体活动</Checkbox>
            </CheckboxGroup>
            <ButtonGroup >
                <Button htmlType="reset" icon={<IconDelete />}></Button>
                <Button htmlType="submit" >确认搜索</Button>
            </ButtonGroup>
        </Form>
    )
}

export default index;