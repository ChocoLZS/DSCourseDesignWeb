import { FC, useEffect, useState, useMemo } from "react";
import { Table } from "@douyinfe/semi-ui";
import { classScheduleColumns, dataSource as _dataSource, weekdayToString, DayOfWeekColumnData, ClassScheduleColumn } from "./config";
import "./index.scss"
import { useCourseStore } from "@app/store/course/CourseStore";
const index: FC = () => {
    const [courses] = useCourseStore(state => [state.courses]);
    const [dataSource, setDataSource] = useState(_dataSource);
    const pagenation = useMemo(() => { return { pageSize: 14 } }, []);
    const scroll = useMemo(() => ({ x: 600, y: 1200 }), []);
    useEffect(() => {
        let __dataSource: Array<ClassScheduleColumn> = JSON.parse(JSON.stringify(_dataSource));
        for (let course of courses) {
            if (course.time.length) {
                for (let t of course.time) {
                    let weekday = weekdayToString(t.dow);
                    let row: ClassScheduleColumn = __dataSource[t.start - 1];
                    for (let index = t.start; index < t.end; index++)
                        Reflect.get(__dataSource[index], weekday).shouldRender = false;
                    let obj: DayOfWeekColumnData = Reflect.get(row, weekday);
                    obj.course = {
                        ...course
                    }
                    obj.start = t.start;
                    obj.end = t.end;
                }
            }
            if (__dataSource) setDataSource(__dataSource);
        }
    }, [courses])
    return (
        <Table
            className="course-class-schedule-list"
            columns={classScheduleColumns}
            dataSource={dataSource}
            pagination={pagenation}
            bordered
            scroll={scroll}
        >
        </Table>
    );
}
export default index;