import { FC, useEffect, useState } from "react";
import { Calendar, Card, Col, Row, List, Input, Button, InputGroup, Select, DatePicker } from "@douyinfe/semi-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { getWeekDaysRange, getCurrentWeek, useTimeStore, getDateTimestamp } from "@app/store/TimeStore";
import CalendarSearchBar from '@components/CalendarSearchBar'
import { EventObject } from "@douyinfe/semi-ui/lib/es/calendar";
import { filterExamByKeyword, filterOutDatedExam, generateEvents } from "./config";
import { IExamItem } from "@app/typings/exam";
import { mergeSort } from "@app/utils/sort&search/exam";
import './index.scss'
import { useLoading } from "@app/hooks/useLoading";
import { IconSearch } from "@douyinfe/semi-icons";
import Empty from "@app/components/empty";
import { useCourseStore } from "@app/store/course/CourseStore";
import { getStudentInfo } from "@app/api/student";
import { useUserStore } from "@app/store/User";
import { useLogStore } from "@app/store/LogStore";

const { Meta } = Card;

const index: FC = () => {
    const { loading } = useLoading();
    const [getTime, getDay] = useTimeStore(i => [i.getTime, i.getDay])
    const [currentPage, setCurrentPage] = useState(getCurrentWeek(getTime()));
    const [events, setEvents] = useState([] as Array<EventObject>);
    const [examList, setExamList] = useState([] as Array<IExamItem>);
    const [originExamList, setOriginExamList] = useState([] as Array<IExamItem>);
    const [searchType, setSearchType] = useState(0);
    const [searchValue, setSearchValue] = useState();
    const [searchLoading, setSearchLoading] = useState(false);
    let timerId: null | NodeJS.Timeout = null;
    useEffect(() => {
        const load = async () => {
            let { data } = await getStudentInfo(useUserStore.getState().id);
            let arr = [];
            for (let course of data.courses) {
                for (let exam of course.exams) {
                    let obj = {
                        name: exam.name,
                        id: exam.id,
                        courseId: course.id,
                        date: parseInt(exam.date) * 1000,
                        time: exam.time,
                        location: exam.location

                    } as IExamItem
                    arr.push(obj);
                }
            }
            // let filteredData = filterOutDatedExam(mergeSort(arr), getDay());
            setOriginExamList(arr)
            setExamList(arr);
            setEvents(generateEvents(arr));
        };
        load();
    }, [])
    const onSearchValueChange = (type: number, value: any) => {
        setSearchValue(
            type == 1 ? getDateTimestamp(value) : value
        )
    }
    const onSearch = () => {
        function search(): NodeJS.Timeout {
            return setTimeout(() => {
                if (searchValue)
                    setExamList(filterExamByKeyword(originExamList, searchValue, searchType));
                else
                    setExamList(originExamList)
                timerId = null;
                setSearchLoading(false);
            }, 500)
        }
        setSearchLoading(true);
        if (timerId) {
            clearTimeout(timerId);
            timerId = search();
        } else
            timerId = search();
        useLogStore.getState().putLogs(`搜索了考试信息 搜索内容为 ${searchValue}`);
    }
    return (
        <div>
            <Card loading={loading || searchLoading} className="exam-list-card" shadows="hover" style={{ marginBottom: '12px' }}
                title={
                    <Meta
                        title={"考试列表"}
                        description={
                            <>
                                {"最近考试信息"}

                            </>}
                        avatar={<FontAwesomeIcon icon={solid("list-ol")} />}
                    >
                    </Meta>
                }
                headerExtraContent={
                    <InputGroup>
                        <Select defaultValue={searchType} onFocus={() => { useTimeStore.getState().timePause() }} onChange={(v) => setSearchType(v as number)}>
                            <Select.Option value={0}>名称</Select.Option>
                            <Select.Option value={1}>时间</Select.Option>
                            <Select.Option value={2}>地点</Select.Option>
                        </Select>
                        {searchType === 1
                            ? <DatePicker onFocus={() => { useTimeStore.getState().timePause() }} prefix={<IconSearch />} showClear onChange={(v) => onSearchValueChange(searchType, v)} />
                            : <Input onFocus={() => { useTimeStore.getState().timePause() }} prefix={<IconSearch />} showClear onEnterPress={onSearch} onChange={(v) => onSearchValueChange(searchType, v)} />}
                        <Button type="tertiary" onClick={onSearch}>搜索</Button>
                    </InputGroup>}
            >
                {examList.length === 0
                    ? <Empty description="没有符合该信息的考试" />
                    : (
                        <List>
                            {examList.map(item => (
                                <List.Item key={item.id}
                                    main={
                                        <div>
                                            <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}>{item.name}</span>
                                            <div style={{ color: 'var(--semi-color-text-2)', margin: '4px 0' }}>
                                                <div>{"第" + getCurrentWeek(item.date) + "周"}</div>
                                                <div>{new Date(item.date).toString()}</div>
                                                <div>{`持续${item.time}分钟`}</div>
                                                <div>{`地点:${item.location}`}</div>
                                            </div>
                                        </div>
                                    }
                                />

                            ))}
                        </List>

                    )}
            </Card>
            <Card shadows="hover" style={{ marginBottom: '12px' }}>
                <CalendarSearchBar setPage={setCurrentPage} />
            </Card>
            <Card shadows="hover" loading={loading} style={{ overflow: "hidden", cursor: "default" }}>
                <Calendar
                    markWeekend
                    showCurrTime={false}
                    mode="range"
                    range={getWeekDaysRange(currentPage)}
                    events={events}
                    height={720}
                >
                </Calendar>
            </Card>
        </div>
    )
}

export default index;