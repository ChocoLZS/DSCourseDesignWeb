import { IStudentItemWithICourseItem } from "@app/typings/student";
import { activityType, alarmNotificationType } from "@app/typings/activity";
import { MockMethod } from 'vite-plugin-mock'

const student_2077 =
{
    "activities": [
        {
            id: '1',
            name: '吃大餐',
            content: '在撤硕',
            type: activityType.personal,
            start_time: '2022-04-14T15:00:00',
            end_time: '2022-04-14T17:00:00',
            alarm: {
                cron: '2022-04-14T15:00:00',
                type: alarmNotificationType.DAILY
            }
        },
        {
            id: '2',
            name: '睡大觉',
            content: '在寝室',
            type: activityType.group,
            start_time: '2022-04-14T00:00:00',
            end_time: '2022-04-14T07:00:00',
            alarm: {
                cron: '2022-04-17T16:00:00',
                type: alarmNotificationType.ONCE_A_WEEK,
                content: "吃饭睡觉打豆豆买菜洗菜刷碗睡觉"
            }
        },
        {
            id: '3',
            name: '写代码',
            content: '233',
            type: activityType.group,
            start_time: '2022-04-15T08:00:00',
            end_time: '2022-04-15T09:00:00',
            alarm: {
                cron: '2022-05-07T17:00:00',
                type: alarmNotificationType.ONLY_ONCE,
                content: "吃饭睡觉打豆豆买菜洗菜刷碗睡觉"
            }
        },
        {
            id: '4',
            name: '写代码',
            content: '233',
            type: activityType.personal,
            start_time: '2022-04-21T08:00:00',
            end_time: '2022-04-21T09:00:00',
        },
        {
            id: '5',
            name: '上课',
            content: '233',
            type: activityType.personal,
            start_time: '2022-04-16T15:00:00',
            end_time: '2022-04-16T17:00:00',
        },
        {
            id: '6',
            name: '修电脑',
            content: '233',
            type: activityType.personal,
            start_time: '2022-04-20T08:00:00',
            end_time: '2022-04-20T09:00:00',
        },
        {
            id: '7',
            name: '开直播',
            content: '233',
            type: activityType.personal,
            start_time: '2022-04-19T08:00:00',
            end_time: '2022-04-19T09:00:00',
        },
    ],
    "courses": [
        {
            "exams": [],
            "homework": [
                {
                    "id": "304dd6cf-6c0f-409d-a022-b521a9378f42",
                    "content": "牛爷爷",
                    "ddl": 1651760043,
                    "title": "图图"
                },
                {
                    "id": "e3bf9094-c303-4d24-ba63-9298db3f2558",
                    "content": "333",
                    "ddl": 1651760043,
                    "title": "222"
                }
            ],
            "id": "e3bf9094-c303-4d24-ba63-9298db3f2558",
            "location": "沙河校区,教学综合实验楼-N,N401",
            "name": "ust",
            "note": "QQ群：111222333",
            "students": [
                "2077111222"
            ],
            "time": [
                {
                    "dow": 1,
                    "end": 10,
                    "start": 6
                }
            ]
        },
        {
            "id": "12cbbc74-1931-6666-a6c2-01548c4ae540",
            "name": "bust程序设计",
            "location": "沙河校区,教学综合实验楼-S,S404",
            "note": "QQ群：123456",
            "time": [
                {
                    "dow": 3,
                    "start": 6,
                    "end": 12
                }
            ],
            "exams": {},

        }
    ],
    "name": "李赛博"
}

const student_1 = {
    "activities": [
        {
            "alarm": {
                "cron": 1651760000,
                "type": 1,
                "content": "该吃饭了"
            },
            "content": "Rainbow Six",
            "id": "c5bab02a-8c56-4bb6-b939-f73f368fc5d8",
            "name": "打电动",
            "start_time": 1651760000,
            "end_time": 1651890000,
            "type": 0
        }
    ],
    "courses": [
        {
            "exams": [],
            "homework": [
                {
                    "id": "304dd6cf-6c0f-409d-a022-b521a9378f42",
                    "content": "牛爷爷",
                    "ddl": 1651760043,
                    "title": "图图"
                },
                {
                    "id": "e3bf9094-c303-4d24-ba63-9298db3f2558",
                    "content": "333",
                    "ddl": 1651760043,
                    "title": "222"
                }
            ],
            "location": "沙河校区,教学实验综合楼,N401",
            "name": "ust",
            "note": "QQ群：111222333",
            "students": [
                "2077111222"
            ],
            "time": [
                {
                    "dow": 1,
                    "end": 10,
                    "start": 6
                }
            ]
        }
    ],
    "name": "李赛博"
}

export default [
    {
        url: '/mock/student/2077111222',
        method: 'get',
        timeout: 500,
        response: () => {
            return {
                ...student_2077
            }
        }
    },
    {
        url: '/mock/student/1',
        method: 'get',
        timeout: 500,
        response: () => {
            return {
                ...student_1
            }
        }
    }
] as MockMethod[]

