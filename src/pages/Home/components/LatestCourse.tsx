import { useCourseStore } from "@app/store/course/CourseStore";
import { getCurrentWeekday, useTimeStore } from "@app/store/TimeStore";
import { useUserStore } from "@app/store/User";
import { ICourseItem } from "@app/typings/course";
import courses from "@mock/courses";
import { FC, useEffect, useState } from "react";
import _ from 'lodash'

function getCurrentCourseTime(timestamp: number): number {
    let hour = new Date(timestamp).getHours();
    if (hour >= 8 && hour <= 20)
        return hour - 7;
    else return 0;
}
const index: FC = () => {
    const [timestamp] = useTimeStore(i => [i.timestamp]);
    const [courses, coursesTable, setCoursesTable] = useCourseStore(i => [i.courses, i.coursesTable, i.setCoursesTable])
    const [latestCourse, setLatestCourse] = useState({} as ICourseItem);
    useEffect(() => {
        let current = getCurrentCourseTime(timestamp);
        let dow = getCurrentWeekday(timestamp);
        if (current) {
            for (let i = current; i <= 14; i++) {
                if (coursesTable[dow][i]) {
                    let id = coursesTable[dow][i];
                    //@ts-ignore
                    setLatestCourse(courses.find(i => i.id === id));
                    return;
                }
            }
        }
    }, [coursesTable])
    return (
        <>
            {latestCourse
                ? <div>
                    <div>
                        当前第{getCurrentCourseTime(timestamp)}节课
                    </div>
                    <div>最近课程为</div>
                    <div>{latestCourse.name}</div>
                </div>
                : <div>今天没有课程了</div>
            }
        </>
    )
}

export default index;