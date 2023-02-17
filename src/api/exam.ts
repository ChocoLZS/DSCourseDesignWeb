import { ICourseItem } from "@app/typings/course";
import { IExamItem } from "@app/typings/exam"
import request from "@app/utils/request/axios";
import { ExtendedRequest } from "@app/utils/request/axiosMiddleware";
import { AxiosPromise } from "axios";

export function addExam(course_id: string, course: ICourseItem): AxiosPromise<ICourseItem> {
    return request.post(`${process.env.VITE_APP_API_PREFIX}/courses/${course_id}`, { ...course }, { json: true } as ExtendedRequest);
}