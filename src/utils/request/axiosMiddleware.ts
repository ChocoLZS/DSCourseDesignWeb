import { AxiosInstance, AxiosRequestConfig } from "axios";
//@ts-ignore
import ExtendableError from 'extendable-error-class'
import { getState } from '@app/store/common/Global';
import request from "./axios";
class HTTPError extends ExtendableError {
    message: string = "";
    status: number = 0;
    name: string = "HTTPError";
    constructor(err: any) {
        super(err.message)
        for (const i in err) {
            // @ts-ignore
            this[i] = err[i];
        }

    }
}

export interface ExtendedRequest extends AxiosRequestConfig {
    json?: boolean,
    formData?: boolean,
    download?: boolean
}

export function axiosInit(axios: AxiosInstance, showError: (content: string, title: string) => void, hideLoading: () => void) {
    const { toogleLoading } = getState();
    axios.interceptors.request.use((request: ExtendedRequest) => {
        if (request.json) {
            //@ts-ignore
            request.headers['Content-Type'] = 'application/json'
        }
        if (request.formData) {
            //@ts-ignore
            request.headers['Content-Type'] = 'multipart/form-data'
        }
        toogleLoading(true);
        return request;
    })
    axios.interceptors.response.use(
        (response) => {
            toogleLoading(false);
            return response;
        },
        function (error) {
            console.log(error)
            return onError(error)
        },
    )
    function onError(error: any): Promise<any> {
        hideLoading();
        const request = error.request as ExtendedRequest;
        const newErr = new HTTPError(error)
        const errPrefix = "发生了一个错误";
        if (error.status === 1) {
            showError('请求超时', errPrefix);
        } else if (!error.response) {
            showError('网络错误', errPrefix);
        } else
            showError(newErr.message, errPrefix);
        return Promise.reject(newErr);
    }
}