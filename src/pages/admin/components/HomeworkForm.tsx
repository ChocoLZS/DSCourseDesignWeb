import React, { FC, useEffect, useState } from "react";
import { Form, Button, Notification } from "@douyinfe/semi-ui"
import { formatTimestampUnsigne32, getDvalueTimestamp, useTimeStore } from "@app/store/TimeStore";
import { addHomework, getAllCourses } from "@app/api/course";
import { ICourseItem, IHomeworkItem } from "@app/typings/course";
import { useLoading } from "@app/hooks/useLoading";
import { useLogStore } from "@app/store/LogStore";
import { useUserStore } from "@app/store/User";
import { useCourseStore } from "@app/store/course/CourseStore";
import { getStudentInfo } from "@app/api/student";
interface FormProps {
    course: ICourseItem;
    update?: boolean;
}
const index: FC<FormProps> = (props) => {
    const { loading } = useLoading();
    const onSubmit = (v: any) => {
        const load = async () => {
            let obj = {
                title: v.title,
                content: v.content,
                ddl: formatTimestampUnsigne32(new Date(v.ddl).getTime()),
            } as IHomeworkItem
            let { data } = await addHomework(props.course.id, obj);
            let res = await getStudentInfo(useUserStore.getState().id as string);
            useCourseStore.getState().setCourses(res.data.courses);
            Notification.success({ content: "添加成功" });
            useLogStore.getState().putLogs(`添加了作业`
                , ` 作业标题是${obj.title}`);


        }
        load();

    }
    useEffect(() => {

    }, [])
    return (
        <Form labelPosition="left" onSubmit={onSubmit}>
            {({ formState, formApi }) => (
                <>
                    <Form.Input field="title" rules={[{ required: true, message: '请填写标题' }]} label="作业标题"></Form.Input>
                    <Form.TextArea field="content" rules={[{ required: true, message: '请填写作业内容' }]} label="作业内容" />
                    <Form.DatePicker
                        field="ddl" type="dateTime" initValue={new Date(useTimeStore.getState().getTime())} label={{ text: '截止时间', required: true }}
                        rules={[{ required: true, message: '请填写时间' }]}
                    />
                    <Button loading={loading} htmlType="submit" block>添加作业</Button>
                </>
            )}
        </Form>
    )
}

export default index;