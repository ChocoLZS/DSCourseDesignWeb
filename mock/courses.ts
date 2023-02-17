import { MockMethod } from 'vite-plugin-mock'
const coursesData = [
    {
        "id": "f75a65df-e9ae-4bf0-b837-55e139a3246a",
        "name": "计算机网络",
        "location": "沙河校区,教学实验综合楼,N401",
        "note": "QQ群：111222333",
        "time": [
            {
                "dow": 2,
                "start": 3,
                "end": 5
            },
            {
                "dow": 4,
                "start": 3,
                "end": 5
            }
        ],
        "exams": {}
    },
    {
        "id": "d99bb1a4-1931-4ab7-a632-01548c4ae540",
        "name": "Rust程序设计",
        "location": "沙河校区,教学实验综合楼,N404",
        "note": "QQ群：123456",
        "time": [
            {
                "dow": 1,
                "start": 1,
                "end": 2
            }
        ],
        "exams": {}
    },
    {
        "id": "d99bb1a4-1931-6666-a632-01548c4ae540",
        "name": "Zust程序设计",
        "location": "沙河校区,教学实验综合楼,N404",
        "note": "QQ群：123456",
        "time": [
            {
                "dow": 3,
                "start": 1,
                "end": 2
            }
        ],
        "exams": {}
    },
    {
        "id": "199bb1a4-1931-6666-a632-01548c4ae540",
        "name": "Aust程序设计",
        "location": "沙河校区,教学实验综合楼,N404",
        "note": "QQ群：123456",
        "time": [
            {
                "dow": 2,
                "start": 1,
                "end": 2
            }
        ],
        "exams": {}
    },
    {
        "id": "129bb1a4-1931-6666-a632-01548c4ae540",
        "name": "Bust程序设计",
        "location": "沙河校区,教学实验综合楼,N404",
        "note": "QQ群：123456",
        "time": [
            {
                "dow": 4,
                "start": 1,
                "end": 2
            }
        ],
        "exams": {}
    },
    {
        "id": "12cbb1a4-1931-6666-a632-01548c4ae540",
        "name": "Cust程序设计",
        "location": "沙河校区,教学实验综合楼,N404",
        "note": "QQ群：123456",
        "time": [
            {
                "dow": 5,
                "start": 1,
                "end": 2
            }
        ],
        "exams": {}
    },
    {
        "id": "12cbb174-1931-6666-a632-01548c4ae540",
        "name": "aust程序设计",
        "location": "沙河校区,教学实验综合楼,N404",
        "note": "QQ群：123456",
        "time": [
            {
                "dow": 6,
                "start": 1,
                "end": 2
            }
        ],
        "exams": {}
    },
    {
        "id": "12cbbb74-1931-6666-a632-01548c4ae540",
        "name": "Fust程序设计",
        "location": "沙河校区,教学实验综合楼,N404",
        "note": "QQ群：123456",
        "time": [
            {
                "dow": 1,
                "start": 3,
                "end": 4
            }
        ],
        "exams": {}
    },
    {
        "id": "12cbbc74-1931-6666-a632-01548c4ae540",
        "name": "Eust程序设计",
        "location": "沙河校区,教学实验综合楼,N404",
        "note": "QQ群：123456",
        "time": [
            {
                "dow": 3,
                "start": 3,
                "end": 4
            }
        ],
        "exams": {}
    },
    {
        "id": "12cbbc74-1931-6666-a6c2-01548c4ae540",
        "name": "bust程序设计",
        "location": "沙河校区,教学实验综合楼,N404",
        "note": "QQ群：123456",
        "time": [
            {
                "dow": 5,
                "start": 3,
                "end": 4
            }
        ],
        "exams": {},

    }
]

export default [
    {
        url: '/mock/courses',
        method: 'get',
        timeout: 500,
        response: () => {
            return { courses: coursesData };
        }
    }
] as MockMethod[]
