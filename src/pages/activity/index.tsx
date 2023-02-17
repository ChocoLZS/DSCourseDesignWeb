import { FC, useEffect, useState } from "react";
import { Calendar, Card, Row, Col, List, Switch, Typography, Modal, Button } from "@douyinfe/semi-ui";
import { useTimeStore, getCurrentWeek, getWeekDaysRange } from "@app/store/TimeStore";
import { activityType, AlarmWithId, IActivityItem } from "@typings/activity";
import { EventObject } from "@douyinfe/semi-ui/lib/es/calendar";
import AddActivityForm from './components/AddActivityForm'
import ActivitySearchForm from './components/SearchActivity'
import CalendarSearchBar from '@components/CalendarSearchBar'
import AlarmPanel from './components/AlarmPanel'
import './index.scss'
import { useLoading } from "@app/hooks/useLoading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { generateEvents, generateAlarmList } from "./config";
import { IconAlarm, IconMore, IconDelete } from "@douyinfe/semi-icons";
import { useUserStore } from "@app/store/User";
import { deletePersonalActivities } from "@app/api/activity";
import { useLogStore } from "@app/store/LogStore";
import store from "@app/store/common/Global";

const { Meta } = Card;
const { Text, Title } = Typography;

const index: FC = () => {
    const [timestamp, currentWeek, getTime] = useTimeStore((i) => [i.timestamp, i.currentWeek, i.getTime]);
    const [userInfo] = useUserStore(i => [i.userInfo]);
    const [currentPage, setCurrentPage] = useState(getCurrentWeek(getTime()));
    const { loading: apiLoading } = useLoading();
    const [events, setEvents] = useState([] as Array<EventObject>)
    const [activityList, setActivityList] = useState([] as Array<IActivityItem>)
    const [alarmList, setAlarmList] = useState([] as Array<AlarmWithId>);
    const [isSearch, setIsSearch] = useState(false);
    const getActivityList = (data: Array<IActivityItem>) => {
        setActivityList(data);
    }
    useEffect(() => {
        if (userInfo?.activities !== undefined) {
            let data = userInfo?.activities;
            setActivityList(data);
            setAlarmList(generateAlarmList(data));
            setEvents(generateEvents(data));
        }
    }, [userInfo])

    const showMore = (item: IActivityItem) => {
        let lists = [
            { title: "活动名称", content: item.name },
            { title: "活动内容", content: item.content },
            {
                title: "活动时间",
                content: new Date(item.start_time).toLocaleString()
                    + "-" + new Date(item.end_time).toLocaleString()
            },
            { title: "类型", content: item.type == activityType.group ? "集体" : "个人" },
        ]
        Modal.info({
            content: (
                <>
                    <Title heading={3} style={{ textAlign: 'center', marginBottom: '6px' }}>活动详情</Title>
                    <List
                        dataSource={lists}
                        renderItem={
                            item => (
                                <List.Item
                                    main={
                                        <>
                                            <Title heading={5}>{item.title}</Title>
                                            <Text>{item.content}</Text>
                                        </>
                                    }
                                />
                            )
                        }
                    />
                </>
            ),
            icon: null
        })
    }

    const deleteActivity = (item: IActivityItem, id: string) => {
        Modal.warning({
            title: "确认删除该活动吗?",
            onOk: () => {
                const load = async () => {
                    let { data } = await deletePersonalActivities(useUserStore.getState().id as string, id);
                    let newActivityList = activityList.filter(item => item.id != id);
                    if (item.alarm) {
                        let alarmWithId = {
                            ...item.alarm,
                            id: id
                        } as AlarmWithId;
                        useTimeStore.getState().clockRemove(alarmWithId, item.alarm?.type);
                    }
                    useLogStore.getState().putLogs(`删除了活动`
                        , `活动名为:${item.name}`)
                    useUserStore.getState().updateActivity(newActivityList);
                    setActivityList(newActivityList);
                    setAlarmList(generateAlarmList(newActivityList));
                    setEvents(generateEvents(newActivityList));
                }
                load();
            }
        })
    }

    return (
        <>
            <div className="activity-control-panel">
                <Row gutter={20}>
                    <Col span={8}>
                        <Card shadows="hover"
                            style={{ cursor: 'default' }}
                            title={
                                <Meta
                                    style={{ width: '100%' }}
                                    title={
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                                            {!isSearch
                                                ? <span><Text strong>搜索</Text><Text>{" | "}</Text><Text type="quaternary" onClick={() => setIsSearch(!isSearch)} style={{ cursor: 'pointer' }}>添加</Text></span>
                                                : <span><Text type="quaternary" onClick={() => setIsSearch(!isSearch)} style={{ cursor: 'pointer' }}>搜索</Text><Text>{" | "}</Text><Text strong>添加</Text></span>}
                                            <Switch checked={isSearch} onChange={setIsSearch} />
                                        </div>
                                    }

                                />
                            }
                        >
                            {!isSearch
                                ? <ActivitySearchForm connectActivityList={getActivityList} />
                                : <AddActivityForm connectActivityList={getActivityList} />}
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card loading={apiLoading} shadows="hover" className="activity-show-list-card"
                            title={
                                <Meta
                                    title={"活动列表"}
                                    description={"课外活动信息"}
                                    avatar={<FontAwesomeIcon icon={solid("list-ol")} />}
                                >
                                </Meta>
                            }
                        >
                            <List>
                                {activityList.map(item => (
                                    <List.Item key={item.id}
                                        main={
                                            <div>
                                                <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}>{item.name}</span>
                                                <div style={{ color: 'var(--semi-color-text-2)', margin: '4px 0' }}>
                                                    {item.content}
                                                </div>
                                            </div>
                                        }
                                        extra={
                                            <>
                                                <Button onClick={() => showMore(item)} icon={<IconMore style={{ color: 'var(--semi-color-text-0)' }} />} theme="borderless"></Button>
                                                <Button onClick={() => deleteActivity(item, item.id)} type="danger" icon={<IconDelete style={{ color: 'var(--semi-color-text-0)' }} />} theme="borderless"></Button>
                                            </>
                                        }
                                    />

                                ))}
                            </List>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card shadows="hover" className="activity-show-list-card"
                            title={
                                <Meta
                                    title={"闹钟"}
                                    description={"活动提醒"}
                                    avatar={<IconAlarm />}
                                >
                                </Meta>
                            }
                        >
                            <AlarmPanel alarmList={alarmList} />
                        </Card>
                    </Col>
                </Row>
            </div>
            <Card shadows="hover" style={{ marginBottom: '12px' }}>
                <CalendarSearchBar setPage={(p) => setCurrentPage(p)} />
            </Card>
            <Card shadows="hover" loading={apiLoading} style={{ overflow: "hidden", cursor: "default" }}>
                <Calendar
                    markWeekend
                    showCurrTime={false}
                    mode="range"
                    range={getWeekDaysRange(currentPage)}
                    events={events}
                    height={900}
                >
                </Calendar>
            </Card>
        </>

    )
}
export default index;