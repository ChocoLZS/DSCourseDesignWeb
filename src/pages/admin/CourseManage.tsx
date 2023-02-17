import { deleteCourse, deleteCourseForStudent, getAllCourses } from "@app/api/course";
import { useLoading } from "@app/hooks/useLoading";
import { getCurrentWeekdayToString } from "@app/store/TimeStore";
import { COURSE_KEY, ICourseItem, ICourseListItem } from "@app/typings/course";
import { mergeSort } from "@app/utils/sort&search/courses";
import { IconDelete, IconMore, IconPlus, IconWrench } from "@douyinfe/semi-icons";
import { Col, Row, Card, Typography, Select, Input, Button, InputGroup, List, Modal, ButtonGroup, Notification } from "@douyinfe/semi-ui";

import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect, useState } from "react";
import CourseForm from './components/CourseForm'
import HomeworkForm from './components/HomeworkForm'

import PopCard from "@components/coursePopCard"
import { useCourseStore } from "@app/store/course/CourseStore";
import { useUserStore } from "@app/store/User";
import { KMP } from "@app/utils/KMP";

const { Meta } = Card;
const { Text } = Typography;
const CourseManage: FC = () => {
    const [displayCourseList, setDisplayCourseList] = useState([] as Array<ICourseItem>);
    const [originData, setOriginData] = useState([] as Array<ICourseItem>);
    const { loading } = useLoading();
    const [keyword, setKeyword] = useState("");
    useEffect(() => {
        const load = async () => {
            let { data } = await getAllCourses();
            updateCourseList(data.courses)
        }
        load();
    }, [])
    const onSearch = () => {
        const load = async () => {
            if (keyword === "") {
                let { data } = await getAllCourses();
                updateCourseList(data.courses);
            } else {
                setDisplayCourseList(JSON.parse(JSON.stringify(originData)).filter((item: ICourseItem) => KMP(item.name, keyword)))
            }
        }
        load();
    }
    const updateCourseList = (list: Array<ICourseItem>) => {
        setOriginData(list);
        setDisplayCourseList(mergeSort(list, COURSE_KEY.NAME));
        useCourseStore.getState().setCourses(
            list.filter(item => item.students.includes(useUserStore.getState().id))
        );
    }
    const onDeleteCourse = (id: string, course: ICourseItem) => {
        Modal.warning({
            title: "确认删除该课程吗?",
            onOk: () => {
                const load = async () => {
                    await deleteCourse(id);
                    for (let student of course.students) {
                        await deleteCourseForStudent(id, student);
                    }
                    let { data } = await getAllCourses();
                    updateCourseList(data.courses)
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
                                <Text icon={<FontAwesomeIcon icon={solid('square-plus')} />} size="normal" strong style={{ marginLeft: '12px' }}>添加课程</Text>
                            )}
                        >
                        </Meta>
                    }
                >
                    <CourseForm conncectCourseList={updateCourseList} />
                </Card>
            </Col>
            <Col span={14}>
                <Card
                    shadows="hover"
                    className="admin-list-search-card"
                    loading={loading}
                    title={
                        <Meta
                            title={"课程列表"}
                            avatar={<FontAwesomeIcon icon={solid("list-ol")} />}
                        >
                        </Meta>
                    }
                    headerExtraContent={
                        <InputGroup>
                            <Select placeholder="排序类型" onChange={(v) => { setDisplayCourseList(mergeSort(JSON.parse(JSON.stringify(displayCourseList)), v as number)) }}>
                                <Select.Option value={COURSE_KEY.ID}>课程id</Select.Option>
                                <Select.Option value={COURSE_KEY.NAME}>课程名称</Select.Option>
                                <Select.Option value={COURSE_KEY.LOCATION}>课程地点</Select.Option>
                                <Select.Option value={COURSE_KEY.NOTE}>课程详情</Select.Option>
                            </Select>
                            <Input onEnterPress={onSearch} onChange={(v) => setKeyword(v)} placeholder={"课程名称(留空搜索全部)"}></Input>
                            <Button theme="borderless" onClick={onSearch}>搜索</Button>
                        </InputGroup>
                    }
                >
                    <List
                        dataSource={displayCourseList}
                        renderItem={
                            (item, ind) => (
                                <List.Item
                                    main={
                                        <div>
                                            <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 800 }}>{item.name}</span>
                                            <div style={{ color: 'var(--semi-color-text-2)', margin: '4px 0' }}>
                                                {item.time.map((time, index) => (
                                                    <div key={index}>
                                                        <span>{time.start}-{time.end},</span>
                                                        <span>{getCurrentWeekdayToString(time.dow)}</span>
                                                    </div>
                                                ))}
                                                <div>{item.location}</div>
                                                <div>{`任课教师:${item.teacher}`}</div>
                                            </div>
                                        </div>
                                    }
                                    extra={
                                        <ButtonGroup>
                                            <Button icon={<IconPlus />}
                                                onClick={(e) => {
                                                    e.stopPropagation(); Modal.info({
                                                        style: { width: '540px' },
                                                        title: item.name,
                                                        content: <HomeworkForm course={item} conncectCourseList={updateCourseList} />,
                                                        icon: null,
                                                        footer: null
                                                    })
                                                }}
                                            >

                                            </Button>
                                            <Button icon={<IconWrench />}
                                                onClick={(e) => {
                                                    e.stopPropagation(); Modal.info({
                                                        style: { width: '540px' },
                                                        content: <CourseForm course={item} conncectCourseList={updateCourseList} update />,
                                                        icon: null,
                                                        footer: null
                                                    })
                                                }}
                                            />
                                            <Button icon={<IconMore />}
                                                onClick={(e) => { e.stopPropagation(); Modal.info({ content: <PopCard course={item} />, icon: null }) }}
                                            />
                                            <Button
                                                icon={<IconDelete />} type="danger"
                                                onClick={() => { onDeleteCourse(item.id, item) }}
                                            ></Button>
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
export default CourseManage;