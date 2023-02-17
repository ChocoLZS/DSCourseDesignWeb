import { IExamItem } from "./exam";

export enum COURSE_KEY {
    ID = 1,
    NOTE,
    NAME,
    LOCATION,
}

export interface ICourseDurationItem {
    dow: number,
    end: number,
    start: number,
}
export interface ICourseItemWrap<T> {
    course: T
}
export interface ICourseWithoutTimeItem {
    exams: Array<IExamItem>,
    homework: Array<IHomeworkItem>,
    id: string,
    location: string,
    name: string,
    note: string,
    teacher: string,
    students: [],
    file: Array<IFileItem>,
}

export interface ICourseItem extends ICourseWithoutTimeItem {
    time: Array<ICourseDurationItem>,
}

export interface ICourseListItem {
    courses: Array<ICourseItem>
}

export interface IHomeworkItem {
    title: string,
    id: string,
    ddl: number,
    content?: string
}

export interface IFileItem {
    id: string,
    name: string
}