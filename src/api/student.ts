import { IStudentItemWithICourseItem } from "@app/typings/student"
import request from "@app/utils/request/axios";
import { AxiosPromise } from "axios";

export function getStudentInfo(student_id: string): AxiosPromise<IStudentItemWithICourseItem> {
    // return request.get(`${process.env.VITE_APP_API_PREFIX}/student/${student_id}`);
    return request.get(`${process.env.VITE_APP_API_PREFIX}/student/${student_id}`);
}