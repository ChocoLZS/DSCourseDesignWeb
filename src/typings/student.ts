import { IActivityItem } from "./activity";
import { ICourseItem } from "./course";

interface IStudentItem {
    activities: Array<IActivityItem>,
    name: string,
}

export interface IStudentItemWithICourseItem extends IStudentItem {
    courses: Array<ICourseItem>,
}

export interface IStudentItemWithCourseId {
    courses: Array<string>,
}