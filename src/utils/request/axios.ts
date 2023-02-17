import axios from "axios";
import { axiosInit } from "./axiosMiddleware";
import { Notification } from "@douyinfe/semi-ui";
import { getState } from '@app/store/common/Global';

const EtimeoutStep = 2000

export function showError(content: string, title: string) {
    Notification.error({
        content: content,
        duration: 3,
        title
    })
}
export function hideLoading() {
    getState().toogleLoading(false);
}
const request = axios.create({
    timeout: EtimeoutStep,
    baseURL: process.env.VITE_APP_BASE
})
axiosInit(request, showError, hideLoading);
export default request;