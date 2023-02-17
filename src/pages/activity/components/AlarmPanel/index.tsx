import React, { FC, useEffect, useState, forwardRef } from "react";
import { Button, List, Modal, Switch, Tooltip, Typography } from "@douyinfe/semi-ui"
import { alarmNotificationType, AlarmWithId } from "@app/typings/activity";
import { getCurrentWeekdayToString, useTimeStore } from "@app/store/TimeStore";
import { IconDelete, IconMore } from "@douyinfe/semi-icons";
import './index.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useLogStore } from "@app/store/LogStore";
interface alarmPanelProps {
    alarmList: Array<AlarmWithId>
}
interface alarmDetailedItem {
    id: string,
    /** Time format hh:mm */
    realtime: string | number,
    hour: string,
    minute: string,
    weekday: string,
    content?: string,
    enable: boolean,
    type: alarmNotificationType
}
function destructuringAlarmTime(time: number) {
    return Math.floor(time / 10).toString() + time % 10;
}
function destructuringAlarmItem(time: string | number) {
    let date = new Date(time)
    return {
        hour: destructuringAlarmTime(date.getHours()),
        minute: destructuringAlarmTime(date.getMinutes()),
        weekday: getCurrentWeekdayToString((date.getDay() + 6) % 7 + 1)
    }
}
const { Title, Text } = Typography;

const index: FC<alarmPanelProps> = (props) => {
    const [alarmList, setAlarmList] = useState([] as Array<alarmDetailedItem>);
    const onChange = (index: number) => {
        let items = [...alarmList];
        let item = { ...items[index] };
        item.enable = !item.enable;
        items[index] = item;
        setAlarmList(items);
        useLogStore.getState().putLogs(`${item.enable ? "开启" : "关闭"}了闹钟`
            , `闹钟时间为${items[index].hour}:${items[index].minute}`
            , `类型为${items[index].type == alarmNotificationType.DAILY ? "每天" : items[index].type == alarmNotificationType.ONCE_A_WEEK ? "每周" : "单次"}`);
    }
    useEffect(() => {
        let lists = [] as Array<alarmDetailedItem>
        for (let item of props.alarmList) {
            let { hour, minute, weekday } = destructuringAlarmItem(item.cron)
            let obj = {
                id: item.id,
                realtime: item.cron,
                hour: hour,
                minute: minute,
                weekday: weekday,
                content: item.content,
                enable: true,
                type: item.type
            } as alarmDetailedItem
            lists.push(obj);
        }
        setAlarmList(lists)
    }, [props.alarmList])
    useEffect(() => {
        return () => {
            setAlarmList([])
        }
    }, [])
    const TooltipWrap = forwardRef((props, ref) => (
        //@ts-ignore
        <span {...props} ref={ref}>
            {props.children}
        </span>
    ))
    const showMore = (item: alarmDetailedItem) => {
        let lists = [
            { title: "闹钟日期", content: new Date(item.realtime).toLocaleString(), icon: <FontAwesomeIcon style={{ fontSize: 48, width: 48 }} icon={solid('calendar-days')} /> },
            { title: "星期几", content: item.weekday, icon: <FontAwesomeIcon style={{ fontSize: 48, width: 48 }} icon={solid('calendar-week')} /> },
            { title: "时间", content: item.hour + ":" + item.minute, icon: <FontAwesomeIcon style={{ fontSize: 48, width: 48 }} icon={solid('hourglass-empty')} /> },
            { title: "类型", content: item.type == alarmNotificationType.DAILY ? "每天" : item.type == alarmNotificationType.ONCE_A_WEEK ? "每周" : "单次", icon: <FontAwesomeIcon style={{ fontSize: 48, width: 48 }} icon={solid('repeat')} /> },
            { title: "提示信息", content: item.content, icon: <FontAwesomeIcon style={{ fontSize: 48, width: 48 }} icon={solid('info')} /> }
        ]
        Modal.info({
            content: (
                <>
                    <Title heading={3} style={{ textAlign: 'center', marginBottom: '6px' }}>闹钟详情</Title>
                    <List
                        dataSource={lists}
                        renderItem={
                            item => (
                                <List.Item
                                    header={item.icon}
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
    const deleteAlarm = (item: alarmDetailedItem, index: number) => {
        Modal.warning({
            title: "确认要删除该闹钟吗?"
        })
    }
    return (
        <List className="activity-alarm-list">
            {alarmList.map((item, index) => (
                <List.Item
                    key={item.id}
                    className="activity-alarm-list-item"
                    header={(
                        <Tooltip content={new Date(item.realtime).toLocaleString()}>
                            <TooltipWrap>
                                <Title heading={1} >
                                    {item.hour + ":" + item.minute}
                                </Title>
                            </TooltipWrap>
                        </Tooltip>
                    )}
                    main={(
                        <>
                            <div>{item.weekday}</div>
                            <Text
                                ellipsis={
                                    {
                                        showTooltip: {
                                            opts: { content: item.content }
                                        }
                                    }
                                }
                                style={{ width: 32 }}
                            >
                                {item.content == undefined
                                    ? <Text type="quaternary">------</Text>
                                    : item.content}
                            </Text>
                        </>
                    )}
                    extra={(
                        <React.Fragment>
                            <Switch checked={item.enable}
                                onChange={(v) => {
                                    v ? useTimeStore.getState().clockAdd(props.alarmList[index], item.type)
                                        : useTimeStore.getState().clockRemove(props.alarmList[index], item.type);
                                    onChange(index)
                                }}
                            ></Switch>
                            <Button onClick={() => showMore(item)} icon={<IconMore style={{ color: 'var(--semi-color-text-0)' }} />} theme="borderless"></Button>
                            {/* <Button onClick={() => deleteAlarm(item, index)} type="danger" icon={<IconDelete style={{ color: 'var(--semi-color-text-0)' }} />} theme="borderless"></Button> */}
                        </React.Fragment>
                    )}
                />
            ))}
        </List>
    )
}
export default index;