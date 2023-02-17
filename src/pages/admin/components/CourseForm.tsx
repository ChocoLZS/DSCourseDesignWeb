import React, { FC } from "react";
import { IconPlusCircle, IconMinusCircle } from "@douyinfe/semi-icons";
import { Form, ArrayField, Button, Select, useFormState, TextArea, Notification } from "@douyinfe/semi-ui"
import { optionList, weekOptionList } from "../config";
import { ICourseItem } from "@app/typings/course";
import { useLoading } from "@app/hooks/useLoading";
import { addCourseForStudent, createCourse, deleteCourseForStudent, getAllCourses, updateCourse } from "@app/api/course";
import { useLogStore } from "@app/store/LogStore";
interface CourseFormProps {
    course?: ICourseItem;
    update?: boolean;
    schedule?: boolean;
    updatedCourse?: (course: ICourseItem) => void;
    conncectCourseList: (list: Array<ICourseItem>) => void;
}

const shaheStudyingMapping = [
    { value: '运动场', label: '运动场', otherKey: 3 },
    { value: '教学综合实验楼-N', label: '教学综合实验楼-N', otherKey: 58 },
    { value: '教学综合实验楼-S', label: '教学综合实验楼-S', otherKey: 59 },
    { value: '教室楼S1', label: '教室楼S1', otherKey: 75 },
    { value: '实验楼S2', label: '实验楼S2', otherKey: 76 },
    { value: '实验楼S3', label: '实验楼S3', otherKey: 76 },
]
const buptStudyingMapping = [
    { value: '教四楼', label: '教四楼', otherKey: 12 },
    { value: '教三楼', label: '教三楼', otherKey: 16 },
    { value: '教二楼', label: '教二楼', otherKey: 41 },
    { value: '教一楼', label: '教一楼', otherKey: 37 },
    { value: '主楼', label: '主楼', otherKey: 39 },
]

const studentList = [
    { value: '1', label: '1' },
    { value: '2077111222', label: '2077111222' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' }
]

const treeData = [
    {
        label: '沙河校区',
        value: '沙河校区',
        children: shaheStudyingMapping
    },
    {
        label: '西土城校区',
        value: '西土城校区',
        children: buptStudyingMapping
    }
]

const index: FC<CourseFormProps> = (props) => {
    const { loading } = useLoading();
    const onSubmit = async (v: any) => {
        let obj = {
            location: v.location[0] + "," + v.location[1] + "," + (v.detailed_loc ? v.detailed_loc : ""),
            name: v.name,
            note: v.note ? v.note : "",
            time: v.time,
            teacher: v.teacher,
            students: v.students ? v.students : [],
            exams: {},
            homework: {},
            file: {}
        }
        if (props.update) {
            let fileobj = {}
            for (let item of props.course?.file) {
                fileobj[item.id] = item.name;
            }
            obj["file"] = fileobj;
            let examobj = {}
            for (let item of props.course?.exams) {
                examobj[item.id] = {
                    ...item
                }
            }
            obj["exams"] = examobj;
            let homeworkobj = {}
            for (let item of props.course?.homework) {
                homeworkobj[item.id] = {
                    content: item.content,
                    ddl: item.ddl,
                    title: item.title
                }
            }
            obj["homework"] = homeworkobj;
            let res = await getAllCourses();
            let icourse = res.data.courses.find(item => item.id == props.course?.id);
            for (let student of icourse.students) {
                await deleteCourseForStudent(props.course?.id, student);
            }
            for (let student of v.students) {
                await addCourseForStudent(props.course?.id, student);
            }
            await updateCourse(obj, props.course?.id);
            let { data } = await getAllCourses();
            props.conncectCourseList(data.courses);
            useLogStore.getState().putLogs(`修改了课程`
                , `课程名为${obj.name}`);
            Notification.success({ content: "修改成功" })
            if (props.schedule) window.location.reload();
        } else {
            let res = await createCourse(obj as ICourseItem);
            useLogStore.getState().putLogs(`添加了课程`
                , `课程名为${obj.name}`);
            Notification.success({ content: "添加成功" })
            if (v.students)
                for (let student of v.students) {
                    await addCourseForStudent(res.data.course_id as string, student);
                }
            let { data } = await getAllCourses();
            props.conncectCourseList(data.courses);

        }

    }
    return (
        <Form labelPosition="left" onSubmit={onSubmit} >
            {({ formState, formApi }) => (
                <>
                    <Form.Input field="name" initValue={props.course?.name}
                        rules={[{ required: true, message: '请填写名称' }]} label="课程名称"></Form.Input>
                    <ArrayField field="time"
                        initValue={props.course?.time ? props.course.time : [{ start: 1, end: 1, dow: 1 }]
                        }
                    >
                        {({ add, arrayFields, addWithInitValue }) => (
                            <React.Fragment>
                                <Button onClick={() => addWithInitValue({ start: 1, end: 1, dow: 1 })} icon={<IconPlusCircle />} theme='light'>新增时间段</Button>
                                {
                                    arrayFields.map(({ field, key, remove }, index) => (
                                        <div key={key} style={{ display: 'flex' }}>
                                            <Form.Select style={{ marginRight: '12px' }} field={`${field}[start]`} label={"开始"} optionList={optionList(1)} onChange={(v) => { v > formState.values.time[index].end ? formApi.setValue(`${field}.end`, v) : '' }}></Form.Select>
                                            <Form.Select style={{ marginRight: '12px' }} field={`${field}[end]`} label={"结束"} optionList={optionList(formState.values.time[index].start)} />
                                            <Form.Select field={`${field}[dow]`} label={"星期"} optionList={weekOptionList()} />
                                            <Button type='danger' theme='borderless' icon={<IconMinusCircle />} onClick={remove} style={{ margin: 12 }}></Button>
                                        </div>
                                    ))
                                }
                            </React.Fragment>
                        )}
                    </ArrayField>
                    <Form.Select field="students" label="上课学生" optionList={studentList} initValue={props.course?.students} multiple>
                    </Form.Select>
                    <Form.Input field="teacher" label="任课教师" initValue={props.course?.teacher} rules={[{ required: true, message: '请填写任课教师' }]}></Form.Input>
                    <Form.Cascader separator="," field="location" initValue={props.course?.location.split(",").slice(0, 2)} label="上课地点" treeData={treeData} rules={[{ required: true, message: '请填写上课地点' }]}>
                    </Form.Cascader>
                    <Form.TextArea field="note" initValue={props.course?.note} label="课程详情" />
                    {props.update
                        ? <Button loading={loading} htmlType="submit" block>更新课程</Button>
                        : <Button htmlType="submit" block>添加课程</Button>
                    }
                </>
            )}
        </Form>
    )
}

export default index;