import { ICourseItem } from "@app/typings/course";
import { ColumnProps, RenderReturnObject } from "@douyinfe/semi-ui/lib/es/table";
import { BaseSyntheticEvent } from "react";
import Card from "./components/courseCard"

const COURSE_DURATION = 45;
const COURSES_OF_DAY = 14;
export const WEEK = {
    MONDAY: { text: "一", value: 1 },
    TUESDAY: { text: "二", value: 2 },
    WEDNESDAY: { text: "三", value: 3 },
    THURSDAY: { text: "四", value: 4 },
    FRIDAY: { text: "五", value: 5 },
    SATURDAY: { text: "六", value: 6 },
    SUNDAY: { text: "日", value: 7 },
}

export interface ExtendedColumnProps extends ColumnProps {
}
/**
 * Row data for column of time
 */
export interface TimeColumnData {
    startTime: string,
    endTime: string,
}
/**
 * Row data for column of day
 */
export interface DayOfWeekColumnData {
    start: number,
    end: number,
    shouldRender: boolean,
    course: ICourseItem
}
export interface TimeColumn {
    time: TimeColumnData,
}
export interface DayOfWeekColumn {
    MONDAY: DayOfWeekColumnData,
    TUESDAY: DayOfWeekColumnData,
    WEDNESDAY: DayOfWeekColumnData,
    THURSDAY: DayOfWeekColumnData,
    FRIDAY: DayOfWeekColumnData,
    SATURDAY: DayOfWeekColumnData,
    SUNDAY: DayOfWeekColumnData,
}
export interface ClassScheduleColumn extends TimeColumn, DayOfWeekColumn {
}

const TimeColumn = {
    title: "时间",
    width: 72.25,
    fixed: true,
    dataIndex: 'time',
    render: (text: TimeColumnData, record, index) => {
        const renderObject = {} as RenderReturnObject
        const children = (
            <div className="table-row-cell-time">
                <div>{index + 1}</div>
                <div>{text.startTime}</div>
                <div>{text.endTime}</div>
            </div>)
        renderObject.children = children;
        return renderObject;
    }

} as ExtendedColumnProps;

function columnsGenerator(): ExtendedColumnProps[] {
    const result = [TimeColumn] as ExtendedColumnProps[];
    for (const day in WEEK) {
        let obj = {
            //@ts-ignore
            title: WEEK[day].text,
            width: "12.5%",
            dataIndex: day,
            render: (text: DayOfWeekColumnData, record, index) => {
                let renderObject = {} as RenderReturnObject;
                if (text.shouldRender) {
                    if (text.start) {
                        renderObject = {
                            props: { rowSpan: (Math.abs(text.end - text.start) + 1) },
                            children: (<Card course={text.course}></Card>),
                        }
                    } else {
                    }
                } else {
                    renderObject = {
                        children: {},
                        props: { rowSpan: 0 }
                    };
                }
                return renderObject;
            }


        } as ExtendedColumnProps
        result.push(obj);
    }
    return result;
}
function dataSourceGenerator(): Array<ClassScheduleColumn> {
    const calculateTime = ([h, m]: Array<number>, breakTime: number): Array<number> => {
        let [hour, minute] = [h, m];
        let result = minute + COURSE_DURATION + breakTime;
        hour += Math.floor(result / 60);
        minute = result % 60;
        return [hour, minute]
    }
    const timeToString = ([h, m]: Array<number>): string => {
        const _toString = (i: number) => {
            return Math.floor(i / 10) === 0 ? '0' + i : i.toString();
        }
        return _toString(h) + ':' + _toString(m);
    }
    const initDayOfWeek = (): DayOfWeekColumn => {
        function newRowInDayOfWeek(): DayOfWeekColumnData {
            return {
                start: 0, end: 0, shouldRender: true, course: {}
            } as DayOfWeekColumnData
        }
        return {
            MONDAY: newRowInDayOfWeek(),
            TUESDAY: newRowInDayOfWeek(),
            WEDNESDAY: newRowInDayOfWeek(),
            THURSDAY: newRowInDayOfWeek(),
            FRIDAY: newRowInDayOfWeek(),
            SATURDAY: newRowInDayOfWeek(),
            SUNDAY: newRowInDayOfWeek(),
        }
    };
    let data = [] as Array<ClassScheduleColumn>
    let startTime = [8, 0];
    let endTime = [8, 45];
    for (let i = 1; i <= COURSES_OF_DAY; i++) {
        let obj = {
            time: {
                startTime: timeToString(startTime),
                endTime: timeToString(endTime),
            } as TimeColumnData,
        } as ClassScheduleColumn;
        Object.assign(obj, initDayOfWeek());
        data.push(obj);
        let breakTime = 5;
        switch (i) {
            case 2:
            case 9:
                breakTime = 15;
                break;
            case 5:
                breakTime = 45;
                break;
            case 7:
                breakTime = 10;
                break;
            case 11:
                breakTime = 20;
                break;
            default:
                breakTime = 5;
        }
        startTime = calculateTime(startTime, breakTime);
        endTime = calculateTime(endTime, breakTime);
    }
    return data;
}
export function weekdayToString(day: number) {
    switch (day) {
        case 1: return "MONDAY";
        case 2: return "TUESDAY";
        case 3: return "WEDNESDAY";
        case 4: return "THURSDAY";
        case 5: return "FRIDAY";
        case 6: return "SATURDAY";
        case 7: return "SUNDAY";
        default:
            return "";
    }
}
export const classScheduleColumns: ExtendedColumnProps[] = columnsGenerator();
export const dataSource: Array<ClassScheduleColumn> = dataSourceGenerator();