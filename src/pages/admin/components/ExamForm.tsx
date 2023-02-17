import React, { FC, useEffect, useState } from "react";
import { Form, Button } from "@douyinfe/semi-ui"
import { IExamItem } from "@app/typings/exam";
import { formatTimestampUnsigne32, getDvalueTimestamp, useTimeStore } from "@app/store/TimeStore";
import { getAllCourses } from "@app/api/course";
import { ICourseItem } from "@app/typings/course";
import { addExam } from "@app/api/exam";
import { useLoading } from "@app/hooks/useLoading";
import { useLogStore } from "@app/store/LogStore";

import { v4 as uuidv4 } from "uuid";

interface ExamFormProps {
    exam?: IExamItem;
    update?: boolean;
    conncectExamList?: (list: Array<IExamItem>) => void;
}
const index: FC<ExamFormProps> = (props) => {
    const [getTime] = useTimeStore(i => [i.getTime]);
    const [courseOption, setCourseOption] = useState([]);
    const [courseList, setCourseList] = useState([] as Array<ICourseItem>);
    const { loading } = useLoading();
    const onSubmit = (v: any) => {
        const load = async () => {
            let course = courseList.find(item => item.id == v.course);
            let exams = {}
            let uuid = props.update ? props.exam?.id : uuidv4();
            for (let exam of course?.exams) {
                if (uuid != exam.id)
                    exams[exam.id] = {
                        ...exam
                    }
            }
            exams[uuid] = {
                location: v.location,
                date: (formatTimestampUnsigne32(v.start_time)).toString(),
                time: (v.duration).toString(),
                name: v.name
            }
            course["exams"] = exams;
            let homeworkItem = {}
            for (let homework of course?.homework) {
                homeworkItem[homework.id] = {
                    content: homework.content,
                    ddl: homework.ddl,
                    title: homework.title
                }
            }
            course["homework"] = homeworkItem;
            let fileobj = {}
            for (let item of course?.file) {
                fileobj[item.id] = item.name;
            }
            course["file"] = fileobj;
            await addExam(v.course, course as ICourseItem);
            let { data } = await getAllCourses();
            let arr = []
            for (let course of data.courses) {
                for (let exam of course.exams) {
                    exam["date"] = parseInt(exam.date) * 1000;
                    exam["courseId"] = course.id;
                    exam["name"] = exam.name;
                    exam["id"] = exam.id;
                    arr.push(exam);
                }
            }
            useLogStore.getState().putLogs(props.update ? `更新了考试 考试名称为${v.name}` : `添加了考试 考试名称为${v.name}`);
            props.conncectExamList(arr);

        }
        load();

    }
    const generateCouseList = () => {
        const load = async () => {
            let { data } = await getAllCourses();
            setCourseList(data.courses);
            let i = 0;
            let arr = []
            for (let course of data.courses) {
                let obj = {
                    value: course.id,
                    label: course.name,
                    index: i,
                }
                arr.push(obj);
                i++;
            }
            setCourseOption(arr);
        }
        load();
    }
    useEffect(() => {
        generateCouseList();
    }, [])
    return (
        <Form labelPosition="left" onSubmit={onSubmit}>
            {({ formState, formApi }) => (
                <>
                    <Form.Select field="course" label="考试课程" placeholder="请选择考试" optionList={courseOption}
                        initValue={props.exam?.courseId}
                        rules={[{ required: true, message: '请选择课程' }]}
                    ></Form.Select>
                    <Form.Input field="name" initValue={props.exam?.name} rules={[{ required: true, message: '请填写名称' }]} label="考试名称"></Form.Input>
                    <Form.Input field="location" initValue={props.exam?.location} rules={[{ required: true, message: '请填写地点' }]} label="考试地点" />
                    <Form.Section>
                        <Form.DatePicker
                            field="start_time" type="dateTime" initValue={props.exam?.date ? new Date(props.exam?.date) : new Date(getTime())} label={{ text: '开始时间', required: true }}
                            rules={[{ required: true, message: '请填写时间' }]}
                        />
                        <div style={{ display: 'flex' }}>
                            <Form.Input field='duration' style={{ width: 176 }} initValue={props.exam?.time}
                                addonAfter='分钟' label={{ text: '考试时长', required: true }}
                                rules={[{ required: true, message: '请填写时长' }]} />
                        </div>
                    </Form.Section>
                    {props.update
                        ? <Button htmlType="submit" block loading={loading}>更新考试</Button>
                        : <Button htmlType="submit" loading={loading} block>添加考试</Button>
                    }
                </>
            )}
        </Form>
    )
}

export default index;