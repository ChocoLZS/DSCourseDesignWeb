import request from "@app/utils/request/axios";
import { AxiosPromise } from "axios";
import { IActivityItem } from "@typings/activity"
import { IStudentItemWithCourseId, IStudentItemWithICourseItem } from "@app/typings/student";
import { ExtendedRequest } from "@app/utils/request/axiosMiddleware";

export function createPersonalActivities(student_id: string, activity: IActivityItem): AxiosPromise<IStudentItemWithICourseItem> {
    return request.post(`${process.env.VITE_APP_API_PREFIX}/student/${student_id}/activity`, { ...activity }, { json: true } as ExtendedRequest);
}

export function deletePersonalActivities(student_id: string, activity_id: string): AxiosPromise<any> {
    return request.delete(`${process.env.VITE_APP_API_PREFIX}/student/${student_id}/activity/${activity_id}`);
}
