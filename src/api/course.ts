import { IStudentItemWithCourseId } from "@app/typings/student";
import { ICourseItem, ICourseListItem, IHomeworkItem } from "@typings/course"
import { ExtendedRequest } from "@utils/request/axiosMiddleware"
import request from "@app/utils/request/axios";
import { AxiosPromise } from "axios";


export function getAllCourses(): AxiosPromise<ICourseListItem> {
    return request.get(`${process.env.VITE_APP_API_PREFIX}/courses`);
}
export function createCourse(course: ICourseItem): AxiosPromise<any> {
    return request.post(`${process.env.VITE_APP_API_PREFIX}/courses`, { ...course }, { json: true } as ExtendedRequest);
}
export function updateCourse(course: ICourseItem, course_id: string): AxiosPromise<ICourseItem> {
    return request.post(`${process.env.VITE_APP_API_PREFIX}/courses/${course_id}`, { ...course }, { json: true } as ExtendedRequest);
}
export function deleteCourse(course_id: string): AxiosPromise<any> {
    return request.delete(`${process.env.VITE_APP_API_PREFIX}/courses/${course_id}`);
}

export function addCourseForStudent(course_id: string, student_id: string): AxiosPromise<IStudentItemWithCourseId> {
    return request.post(`${process.env.VITE_APP_API_PREFIX}/student/${student_id}/courses/${course_id}`);
}
export function deleteCourseForStudent(course_id: string, student_id: string): AxiosPromise<IStudentItemWithCourseId> {
    return request.delete(`${process.env.VITE_APP_API_PREFIX}/student/${student_id}/courses/${course_id}`);
}


export function addHomework(course_id: string, homework: IHomeworkItem): AxiosPromise<ICourseItem> {
    return request.post(`${process.env.VITE_APP_API_PREFIX}/courses/${course_id}/homework`, { ...homework }, { json: true } as ExtendedRequest);
}
export function uploadHomework(student_id: string, homework_id: string, fileInstance: File) {
    let param = new FormData();
    param.append('file', fileInstance);
    return request.post(`${process.env.VITE_APP_API_PREFIX}/student/${student_id}/homework/${homework_id}`, param, { timeout: 6000, formData: true } as ExtendedRequest);
}
export function downloadHomework(student_id: string, homework_id: string): AxiosPromise<any> {
    return request.get(`${process.env.VITE_APP_API_PREFIX}/student/${student_id}/homework/${homework_id}`, { timeout: 6000, })
}
export function checkHomeworkFinished(student_id: string, homework_id: string): AxiosPromise<boolean> {
    return request.get(`${process.env.VITE_APP_API_PREFIX}/student/${student_id}/homework/${homework_id}/finished`)
}

export function uploadFile(course_id: string, file_name: string, fileInstance: File): AxiosPromise<string> {
    let param = new FormData();
    param.append('file', fileInstance);
    return request.post(`${process.env.VITE_APP_API_PREFIX}/course/${course_id}/file/${file_name}`, param, { formData: true, timeout: 6000, } as ExtendedRequest);
}
export function downloadFile(course_id: string, file_uuid: string): AxiosPromise<File> {
    return request.get(`${process.env.VITE_APP_API_PREFIX}/course/${course_id}/file/${file_uuid}`, { download: true, timeout: 6000, } as ExtendedRequest);
}