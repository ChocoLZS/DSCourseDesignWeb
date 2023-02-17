export enum ExamKeyType {
    NAME,
    TIME,
    LOC
}

export interface IExamItem {
    id: string,
    name: string,
    location: string,
    courseId: string,
    date: string | number,
    time: string | number,
}