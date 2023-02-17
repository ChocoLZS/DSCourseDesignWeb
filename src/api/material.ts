import { infoDataType } from "@mock/material"
import request from "@app/utils/request/axios";
import { AxiosPromise } from "axios";

export function getMaterial(): AxiosPromise<Array<infoDataType>> {
    return request.get(`${process.env.VITE_APP_API_PREFIX}/material`);
}