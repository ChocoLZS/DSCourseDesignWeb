import { IStudentItemWithICourseItem } from "./student";

export type UserRole = 'student' | 'administrator'

export interface IUser {
    id: string,
    info: IStudentItemWithICourseItem | null,
    role: UserRole
}