import { getAllCourses } from "@app/api/course";
import { useLoading } from "@app/hooks/useLoading";
import { getCurrentWeekdayToString, getDvalueTimestamp } from "@app/store/TimeStore";
import { IconMore, IconDelete, IconWrench } from "@douyinfe/semi-icons";
import { Col, Row, Card, Typography, Select, Input, Button, ButtonGroup, InputGroup, List, Modal } from "@douyinfe/semi-ui";

import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect, useState } from "react";
import ExamForm from './components/ExamForm'

import PopCard from "@components/coursePopCard"
import { ExamKeyType, IExamItem } from "@app/typings/exam";
import { mergeSort } from "@app/utils/sort&search/exam";
import { addExam } from "@app/api/exam";
import { ICourseItem } from "@app/typings/course";
import { useLogStore } from "@app/store/LogStore";
import { KMP } from "@app/utils/KMP";

const { Meta } = Card;
const { Text } = Typography;
const ExamManage: FC = () => {
    const [displayExamList, setDisplayExamList] = useState([] as Array<IExamItem>);
    const [originData, setOriginData] = useState([] as Array<IExamItem>);
    const { loading } = useLoading();
    const [keyword, setKeyword] = useState("");
    useEffect(() => {
        const load = async () => {
            let { data } = await getAllCourses();
            let arr = [];
            for (let course of data.courses) {
                for (let exam of course.exams) {
                    let obj = {
                        courseId: course.id,
                        name: exam.name,
                        id: exam.id,
                        location: exam.location,
                        time: exam.time,
                        date: parseInt(exam.date) * 1000
                    } as IExamItem
                    arr.push(obj);
                }
            }
            updateExamList(arr);
        }
        load();
        return () => {
            setDisplayExamList([]);
            setOriginData([]);
        }
    }, [])
    const onSearch = () => {
        const load = async () => {
            if (keyword === "") {
                let { data } = await getAllCourses();
                let arr = [];
                for (let course of data.courses) {
                    for (let exam of course.exams) {
                        let obj = {
                            courseId: course.id,
                            name: exam.name,
                            id: exam.id,
                            location: exam.location,
                            time: exam.time,
                            date: parseInt(exam.date) * 1000
                        } as IExamItem
                        arr.push(obj);
                    }
                }
                updateExamList(arr);
            } else {
                //@ts-ignore
                setDisplayExamList(JSON.parse(JSON.stringify(originData)).filter(item => KMP(item.name, keyword)))
            }
        }
        load();
    }
    const updateExamList = (arr: Array<IExamItem>) => {
        setOriginData(arr);
        setDisplayExamList(mergeSort(arr));
    }
    const onDeleteExam = (course_id: string, id: string) => {
        Modal.warning({
            title: "确认删除该考试吗?",
            onOk: () => {
                const load = async () => {
                    let { data } = await getAllCourses();
                    let course = data.courses.find(item => item.id == course_id);
                    let exams = {}
                    for (let exam of course?.exams) {
                        if (id != exam.id)
                            exams[exam.id] = {
                                ...exam
                            }
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
                    await addExam(course_id, course as ICourseItem);
                    useLogStore.getState().putLogs(`删除了考试`
                        , `考试名为${name}`);
                    let res = await getAllCourses();
                    let arr = [];
                    for (let course of res.data.courses) {
                        for (let exam of course.exams) {
                            let obj = {
                                courseId: course.id,
                                name: exam.name,
                                id: exam.id,
                                location: exam.location,
                                time: exam.time,
                                date: parseInt(exam.date) * 1000
                            } as IExamItem
                            arr.push(obj);
                        }
                    }
                    updateExamList(arr);
                }
                load();
            }
        })
    }
    return (
        <Row gutter={24}>
            <Col span={10}>
                <Card
                    shadows="hover"
                    title={
                        <Meta
                            title={(
                                <Text icon={<FontAwesomeIcon icon={solid('square-plus')} />} size="normal" strong style={{ marginLeft: '12px' }}>添加考试</Text>
                            )}
                        >
                        </Meta>
                    }
                >
                    <ExamForm conncectExamList={updateExamList} />
                </Card>
            </Col>
            <Col span={14}>
                <Card
                    shadows="hover"
                    className="admin-list-search-card"
                    loading={loading}
                    title={
                        <Meta
                            title={"考试列表"}
                            avatar={<FontAwesomeIcon icon={solid("list-ol")} />}
                        >
                        </Meta>
                    }
                    headerExtraContent={
                        <InputGroup>
                            <Input onEnterPress={onSearch} onChange={(v) => setKeyword(v)} placeholder={"考试名称"}></Input>
                            <Button theme="borderless" onClick={onSearch}>搜索</Button>
                        </InputGroup>
                    }
                >
                    <List
                        dataSource={displayExamList}
                        renderItem={
                            item => (
                                <List.Item
                                    main={
                                        <div>
                                            <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 800 }}>{item.name}</span>
                                            <div style={{ color: 'var(--semi-color-text-2)', margin: '4px 0' }}>
                                                <div>{new Date(item.date).toString()}</div>
                                                <div>{"持续时间:"}{item.time}{"分钟"}</div>
                                                <div>{item.location}</div>
                                            </div>
                                        </div>
                                    }
                                    extra={
                                        <ButtonGroup>
                                            <Button icon={<IconWrench />}
                                                onClick={(e) => {
                                                    e.stopPropagation(); Modal.info({
                                                        style: { width: '480px' },
                                                        content: <ExamForm exam={item} conncectExamList={updateExamList} update />, icon: null,
                                                        footer: null
                                                    })
                                                }}
                                            />
                                            <Button onClick={() => {
                                                onDeleteExam(item.courseId, item.id)
                                            }} icon={<IconDelete />} type="danger"></Button>
                                        </ButtonGroup>

                                    }
                                >
                                </List.Item>
                            )
                        }
                    />
                </Card>
            </Col>
        </Row>
    )
}
export default ExamManage;