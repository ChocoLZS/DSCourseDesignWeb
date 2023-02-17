import { IExamItem } from '@app/typings/exam';
import { MockMethod } from 'vite-plugin-mock'
const examsData: Array<IExamItem> = [
    {
        "id": "f75a65df-e9ae-4bf0-b837-55e139a3246a",
        "name": "计算机网络",
        "location": "沙河校区,教学实验综合楼,N401",
        "time":
        {
            "start": '2022-06-29T08:00:00',
            "end": '2022-06-29T10:00:00'
        },
    },
    {
        "id": "d99bb1a4-1931-4ab7-a632-01548c4ae540",
        "name": "Rust程序设计",
        "location": "沙河校区,教学实验综合楼,N404",
        "time": {
            "start": '2022-06-30T08:00:00',
            "end": '2022-06-30T10:00:00'
        }
    },
    {
        "id": "d99bb1a4-1931-6666-a632-01548c4ae540",
        "name": "Zust程序设计",
        "location": "沙河校区,教学实验综合楼,N404",
        "time": {
            "start": '2022-05-21T14:30:00',
            "end": '2022-05-21T17:00:00'
        }

    },
    {
        "id": "199bb1a4-1931-6666-a632-01548c4ae540",
        "name": "语文",
        "location": "沙河校区,教学实验综合楼,N404",
        "time": {
            "start": '2022-06-05T09:30:00',
            "end": '2022-06-05T12:00:00'
        }
    },
    {
        "id": "12cbbc74-1931-6666-a6c2-01548c4ae540",
        "name": "语文",
        "location": "沙河校区,教学实验综合楼,N404",
        "time": {
            "start": '2022-04-22T09:30:00',
            "end": '2022-04-22T12:00:00'
        }
    },
    {
        "id": "12cbbc74-1931-6666-a632-01548c4ae540",
        "name": "语文",
        "location": "沙河校区,教学实验综合楼,N404",
        "time": {
            "start": '2022-04-21T09:30:00',
            "end": '2022-04-21T12:00:00'
        }
    },
]

export default [
    {
        url: '/mock/exam',
        method: 'get',
        timeout: 500,
        response: () => {
            return examsData;
        }
    }
] as MockMethod[]
