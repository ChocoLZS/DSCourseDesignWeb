import { IExamItem } from "@app/typings/exam";
import { examBinarySearch } from "@app/utils/sort&search/exam";
import { EventObject } from "@douyinfe/semi-ui/lib/es/calendar";
import { getDateTimestamp } from "@app/store/TimeStore";
import { KMP } from "@app/utils/KMP";

const ExamEventStyle = {
    borderRadius: '3px',
    boxSizing: 'border-box',
    border: 'rgba(var(--semi-purple-6), 1) 1px solid',
    padding: '10px',
    backgroundColor: 'rgba(var(--semi-purple-1), 1)',
    height: '100%',
    overflow: 'hidden',
}

export function generateEvents(data: Array<IExamItem>): Array<EventObject> {
    let events = [] as Array<EventObject>
    for (let item of data) {
        let obj = {
            key: item.courseId + item.name,
            start: new Date(item.date),
            end: new Date(item.date as number + parseInt(item.time) * 60 * 1000),
            //@ts-ignore
            children: <div style={ExamEventStyle}>{item.name}{item.location}</div>
        } as EventObject
        events.push(obj);
    }
    return events;
}

export function filterOutDatedExam(data: Array<IExamItem>, time: number): Array<IExamItem> {
    let index = examBinarySearch(data, time);
    for (; index >= 0; index--)
        if (getDateTimestamp(data[index].date) < time)
            break;
    if (index != -1)
        return data.slice(index + 1, data.length);
    return data;
}

export function filterExamByKeyword(data: Array<IExamItem>, value: any, type: number): Array<IExamItem> {
    switch (type) {
        case 0:
            return data.filter(item => KMP(item.name, value));
        case 1:
            return data.filter(item => getDateTimestamp(item.date) === value);
        case 2:
            return data.filter(item => KMP(item.location, value));
    }
    return []

}