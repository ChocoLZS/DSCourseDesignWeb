import { IActivityItem, activityType, Alarm, AlarmWithId } from "@app/typings/activity";
import { EventObject } from "@douyinfe/semi-ui/lib/es/calendar";
const personalEventStyle = {
    borderRadius: '3px',
    boxSizing: 'border-box',
    border: 'var(--semi-color-primary) 1px solid',
    padding: '10px',
    backgroundColor: 'var(--semi-color-primary-light-default)',
    height: '100%',
    overflow: 'hidden',
}
const teamEventStyle = {
    borderRadius: '3px',
    boxSizing: 'border-box',
    border: 'rgba(var(--semi-orange-5), 1) 1px solid',
    padding: '10px',
    backgroundColor: 'rgba(var(--semi-orange-1), 1)',
    height: '100%',
    overflow: 'hidden',
}
const EventStyle = (type: activityType) => type === activityType.personal ? personalEventStyle : teamEventStyle;

export function generateEvents(data: Array<IActivityItem>): Array<EventObject> {
    let events = [] as Array<EventObject>
    for (let item of data) {
        let obj = {
            key: item.id,
            start: new Date(item.start_time),
            end: new Date(item.end_time),
            //@ts-ignore
            children: <div style={EventStyle(item.type)}>{item.name}{item.content}</div>
        } as EventObject
        events.push(obj);
    }
    return events;
}

export function generateAlarmList(data: Array<IActivityItem>): Array<AlarmWithId> {
    let lists = [] as Array<AlarmWithId>
    for (let item of data) {
        if (item.alarm) {
            let obj = {
                ...item.alarm,
                id: item.id,
            } as AlarmWithId
            lists.push(obj);
        }
    }
    //sort
    return lists;
}