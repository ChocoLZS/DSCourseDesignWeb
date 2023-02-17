import { OptionProps } from "@douyinfe/semi-ui/lib/es/select"

export const _DISTANCE_ = 29 * 1000
export const _TIME_ = 60 * 60

export const BusSchedule = {
    "shahe": ["9:50", "11:40", "13:00", "15:45", "17:10", "18:25", "21:10"],
    "bupt": ["6:50", "8:30", "12:00", "13:30", "14:20", "16:50"],
    "bus": ["6:30", "7:30", "8:30", "9:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30", "20:30"],
}

export const shaheMapping = {
    0: {
        'id': 0, 'name': '国脉西路+东西路1', 'x': '896.5', 'y': '99.6',
        'neighbor': [1, 19]
    },
    1: {
        'id': 1, 'name': '国脉西路+E区门+运动场北门', 'x': '896.5', 'y': '222.54',
        'neighbor': [0, 2]
    },
    2: {
        'id': 2, 'name': '国脉西路+东西路2', 'x': '896.5', 'y': '441.57',
        'neighbor': [1, 3, 8]
    },
    3: {
        'id': 3, 'name': '运动场', 'x': '896.5', 'y': '672.23',
        'neighbor': [2, 4, 9]
    },
    4: {
        'id': 4, 'name': '国脉西路+鸿雁路', 'x': '898.38', 'y': '930.79',
        'neighbor': [3, 5, 10, 78]
    },
    5: {
        'id': 5, 'name': '国脉西路+小路3', 'x': '898.38', 'y': '1459.56',
        'neighbor': [4, 13]
    },
    6: {
        'id': 6, 'name': '小路5', 'x': '951.78', 'y': '1598.4',
        'neighbor': [7, 13, 16]
    },
    7: {
        'id': 7, 'name': '小路7', 'x': '949.75', 'y': '1807.76',
        'neighbor': [6, 17]
    },
    8: {
        'id': 8, 'name': '东西路2+B区门', 'x': '1059.83', 'y': '443.48',
        'neighbor': [2, 22]
    },
    9: {
        'id': 9, 'name': 'A区门', 'x': '990.89', 'y': '670.41',
        'neighbor': [3]
    },
    10: {
        'id': 10, 'name': '信息楼S1北门+鸿雁路', 'x': '1022.45', 'y': '932.9',
        'neighbor': [4, 11, 24]
    },
    11: {
        'id': 11, 'name': '信息楼S1北门', 'x': '1033.41', 'y': '1123.05',
        'neighbor': [10]
    },
    12: {
        'id': 12, 'name': '小路2', 'x': '1033.41', 'y': '1257.36',
        'neighbor': [13, 14]
    },
    13: {
        'id': 13, 'name': '小路3', 'x': '1035.01', 'y': '1467.53',
        'neighbor': [6, 12, 15]
    },
    14: {
        'id': 14, 'name': '小路1', 'x': '1130.77', 'y': '1186.02',
        'neighbor': [12, 25]
    },
    15: {
        'id': 15, 'name': '小路4', 'x': '1124.82', 'y': '1467.53',
        'neighbor': [13, 26]
    },
    16: {
        'id': 16, 'name': '小路6', 'x': '1129.08', 'y': '1603.85',
        'neighbor': [6, 38]
    },
    17: {
        'id': 17, 'name': '小路8', 'x': '1129.08', 'y': '1807.76',
        'neighbor': [7, 29]
    },
    18: {
        'id': 18, 'name': 'S6区西门', 'x': '1135.77', 'y': '1951.98',
        'neighbor': [29]
    },
    19: {
        'id': 19, 'name': '东西路1+D2区', 'x': '1211.45', 'y': '99.6',
        'neighbor': [0, 20, 31]
    },
    20: {
        'id': 20, 'name': 'D2区门', 'x': '1207.88', 'y': '169.91',
        'neighbor': [19, 21]
    },
    21: {
        'id': 21, 'name': 'D2区拐角', 'x': '1218.83', 'y': '327.06',
        'neighbor': [20, 32]
    },
    22: {
        'id': 22, 'name': '东西路2+C区门', 'x': '1243.1', 'y': '441.57',
        'neighbor': [8, 33]
    },
    23: {
        'id': 23, 'name': 'D1区南门', 'x': '1211.45', 'y': '739.71',
        'neighbor': [24]
    },
    24: {
        'id': 24, 'name': '鸿雁路+D1区南门', 'x': '1213.09', 'y': '932.9',
        'neighbor': [10, 23, 34]
    },
    25: {
        'id': 25, 'name': 'S2区门', 'x': '1218.98', 'y': '1178.08',
        'neighbor': [14, 35]
    },
    26: {
        'id': 26, 'name': 'S3区门', 'x': '1213.98', 'y': '1390.81',
        'neighbor': [15, 36]
    },
    27: {
        'id': 27, 'name': 'S4区门', 'x': '1301.4', 'y': '1536.99',
        'neighbor': [37]
    },
    28: {
        'id': 28, 'name': 'S5区门', 'x': '1268.97', 'y': '1860.41',
        'neighbor': [29]
    },
    29: {
        'id': 29, 'name': 'S5区门+S6区门', 'x': '1236.02', 'y': '1914.79',
        'neighbor': [17, 18, 28, 30, 39]
    },
    30: {
        'id': 30, 'name': 'S6区南门', 'x': '1263.77', 'y': '2041.62',
        'neighbor': [29]
    },
    31: {
        'id': 31, 'name': '南北路2+东西路1', 'x': '1363.16', 'y': '95.07',
        'neighbor': [19, 32, 42]
    },
    32: {
        'id': 32, 'name': '南北路2+D2区', 'x': '1363.16', 'y': '316.11',
        'neighbor': [31, 33]
    },
    33: {
        'id': 33, 'name': '南北路2+东西路2', 'x': '1363.16', 'y': '443.48',
        'neighbor': [22, 32, 34, 40, 41, 43]
    },
    34: {
        'id': 34, 'name': '南北路2+鸿雁路', 'x': '1363.16', 'y': '930.79',
        'neighbor': [24, 33, 35, 45]
    },
    35: {
        'id': 35, 'name': '南北路2+S2区门', 'x': '1363.16', 'y': '1181.09',
        'neighbor': [25, 34, 36]
    },
    36: {
        'id': 36, 'name': '南北路2+S3区门', 'x': '1363.16', 'y': '1401.77',
        'neighbor': [26, 35, 37]
    },
    37: {
        'id': 37, 'name': '南北路2+东西路4', 'x': '1363.16', 'y': '1525.46',
        'neighbor': [27, 36, 38, 54]
    },
    38: {
        'id': 38, 'name': '南北路2+东西路5', 'x': '1363.16', 'y': '1794.39',
        'neighbor': [16, 37, 39, 55]
    },
    39: {
        'id': 39, 'name': '南北路2+S5区门+S6区门', 'x': '1363.16', 'y': '1914.79',
        'neighbor': [29, 38]
    },
    40: {
        'id': 40, 'name': '教工食堂', 'x': '1554.67', 'y': '411.38',
        'neighbor': [33, 41, 43]
    },
    41: {
        'id': 41, 'name': '学生食堂', 'x': '1554.67', 'y': '463.93',
        'neighbor': [33, 40, 43]
    },
    42: {
        'id': 42, 'name': '南北路3+东西路1', 'x': '1743.71', 'y': '116.97',
        'neighbor': [31, 43, 46]
    },
    43: {
        'id': 43, 'name': '南北路3+东西路2', 'x': '1745.49', 'y': '443.48',
        'neighbor': [33, 40, 41, 42, 44, 45, 47, 48, 50]
    },
    44: {
        'id': 44, 'name': '超市+运营商+邮局', 'x': '1795.43', 'y': '651.65',
        'neighbor': [43, 45]
    },
    45: {
        'id': 45, 'name': '鸿雁路+南北路3', 'x': '1743.71', 'y': '925.1',
        'neighbor': [34, 43, 44, 51]
    },
    46: {
        'id': 46, 'name': '医务室', 'x': '1912.2', 'y': '106.02',
        'neighbor': [42, 49]
    },
    47: {
        'id': 47, 'name': '综合办公楼', 'x': '1923.16', 'y': '404.51',
        'neighbor': [43, 48, 50]
    },
    48: {
        'id': 48, 'name': '学生活动中心', 'x': '1933.29', 'y': '458.17',
        'neighbor': [43, 47, 50]
    },
    49: {
        'id': 49, 'name': '国脉路+东西路1', 'x': '2157.56', 'y': '118.02',
        'neighbor': [46, 50, 68]
    },
    50: {
        'id': 50, 'name': '国脉路+东西路2+图书馆小路', 'x': '2157.56', 'y': '443.48',
        'neighbor': [43, 47, 48, 49, 57, 51]
    },
    51: {
        'id': 51, 'name': '国脉路+鸿雁路', 'x': '2157.56', 'y': '930.79',
        'neighbor': [45, 50, 52, 62]
    },
    52: {
        'id': 52, 'name': '国脉路+教学综合实验楼-N西门', 'x': '2157.56', 'y': '1090.17',
        'neighbor': [51, 53, 58]
    },
    53: {
        'id': 53, 'name': '国脉路+教学综合实验楼-S西门', 'x': '2155.42', 'y': '1384.27',
        'neighbor': [52, 54, 59]
    },
    54: {
        'id': 54, 'name': '国脉路+东西路4', 'x': '2158.21', 'y': '1523.24',
        'neighbor': [37, 53, 55, 73]
    },
    55: {
        'id': 55, 'name': '国脉路+东西路5', 'x': '2155.42', 'y': '1794.39',
        'neighbor': [38, 54, 56, 74]
    },
    56: {
        'id': 56, 'name': '南门', 'x': '2158.21', 'y': '2248.21',
        'neighbor': [55]
    },
    57: {
        'id': 57, 'name': '图书馆西门', 'x': '2217.04', 'y': '498.48',
        'neighbor': [50, 65]
    },
    58: {
        'id': 58, 'name': '教学综合实验楼-N西门', 'x': '2278.13', 'y': '1090.17',
        'neighbor': [52]
    },
    59: {
        'id': 59, 'name': '教学综合实验楼-S西门', 'x': '2289.08', 'y': '1384.27',
        'neighbor': [53]
    },
    60: {
        'id': 60, 'name': '咖啡厅', 'x': '2650.5', 'y': '764.97',
        'neighbor': [61, 65]
    },
    61: {
        'id': 61, 'name': '图书馆南门', 'x': '2567.45', 'y': '833.13',
        'neighbor': [60, 62]
    },
    62: {
        'id': 62, 'name': '鸿雁路+教学综合实验楼-N北门', 'x': '2536.44', 'y': '943.85',
        'neighbor': [51, 61, 63, 70]
    },
    63: {
        'id': 63, 'name': '教学综合实验楼-N北门', 'x': '2556.5', 'y': '1007.8',
        'neighbor': [62]
    },
    64: {
        'id': 64, 'name': '东配楼', 'x': '2816.66', 'y': '362.61',
        'neighbor': [65]
    },
    65: {
        'id': 65, 'name': '图书馆小路+东配楼', 'x': '2805.71', 'y': '443.48',
        'neighbor': [57, 60, 64, 69]
    },
    66: {
        'id': 66, 'name': '综合教学实验楼-N东门', 'x': '2804.84', 'y': '1166.59',
        'neighbor': [71]
    },
    67: {
        'id': 67, 'name': '教学综合实验楼-S东门', 'x': '2815.8', 'y': '1373.32',
        'neighbor': [72]
    },
    68: {
        'id': 68, 'name': '南北路5+东西路1', 'x': '2938.56', 'y': '118.02',
        'neighbor': [49, 69]
    },
    69: {
        'id': 69, 'name': '南北路5+图书馆小路', 'x': '2938.56', 'y': '443.48',
        'neighbor': [65, 68, 70]
    },
    70: {
        'id': 70, 'name': '南北路5+鸿雁路', 'x': '2938.56', 'y': '932.9',
        'neighbor': [62, 69, 71]
    },
    71: {
        'id': 71, 'name': '南北路5+教学综合实验楼-N东门+教室楼西门', 'x': '2938.56', 'y': '1079.21',
        'neighbor': [66, 70, 72, 75]
    },
    72: {
        'id': 72, 'name': '南北路5+教学综合实验楼-S东门', 'x': '2938.56', 'y': '1378.77',
        'neighbor': [67, 71, 73]
    },
    73: {
        'id': 73, 'name': '南北路5+东西路4+实验楼S2S3西门', 'x': '2938.56', 'y': '1525.46',
        'neighbor': [54, 72, 74, 76]
    },
    74: {
        'id': 74, 'name': '南北路5+东西路5', 'x': '2938.56', 'y': '1794.39',
        'neighbor': [55, 73]
    },
    75: {
        'id': 75, 'name': '教室楼S1西门', 'x': '3053.49', 'y': '1090.17',
        'neighbor': [71]
    },
    76: {
        'id': 76, 'name': '实验楼S2S3西门', 'x': '3070.9', 'y': '1522.69',
        'neighbor': [73]
    },
    77: {
        'id': 77, 'name': '快递站', 'x': '217.55', 'y': '756.66',
        'neighbor': [78]
    },
    78: {
        'id': 78, 'name': '鸿雁路+快递站', 'x': '217.55', 'y': '932.9',
        'neighbor': [4, 77, 79]
    },
    79: {
        'id': 79, 'name': '西门', 'x': '35.02', 'y': '932.9',
        'neighbor': [78]
    }
}

export const shaheStudyingMapping = [
    { value: 3, label: '运动场', otherKey: 3 },
    { value: 58, label: '教学综合实验楼-N', otherKey: 58 },
    { value: 59, label: '教学综合实验楼-S', otherKey: 59 },
    { value: 75, label: '教室楼S1', otherKey: 75 },
    { value: 76, label: '实验楼S2', otherKey: 76 },
    { value: 76, label: '实验楼S3', otherKey: 76 },
]


export const shaheNormalMapping = [
    { key: '0-1', value: 1, label: 'E区门/运动场北门' },
    { key: '0-3', value: 3, label: '运动场' },
    { key: '0-20', value: 20, label: 'D2区门' },
    { key: '0-23', value: 23, label: 'D1区南门' },
    { key: '0-22', value: 22, label: 'C区门' },
    { key: '0-8', value: 8, label: 'B区门' },
    { key: '0-9', value: 9, label: 'A区门' },
    { key: '0-11', value: 11, label: '信息楼S1北门' },
    { key: '0-25', value: 25, label: 'S2区门' },
    { key: '0-26', value: 26, label: 'S3区门' },
    { key: '0-27', value: 27, label: 'S4区门' },
    { key: '0-28', value: 28, label: 'S5区门' },
    { key: '0-30', value: 30, label: 'S6区南门' },
    { key: '0-18', value: 18, label: 'S6区西门' },
    { key: '0-44', value: 44, label: '超市/邮局/运营商' },
    { key: '0-40', value: 40, label: '教工食堂' },
    { key: '0-41', value: 41, label: '学生食堂' },
    { key: '0-46', value: 46, label: '医务室' },
    { key: '0-47', value: 47, label: '综合办公楼' },
    { key: '0-48', value: 48, label: '学生活动中心' },
    { key: '0-56', value: 56, label: '南门' },
    { key: '0-57', value: 57, label: '图书馆西门' },
    { key: '0-58', value: 58, label: '综合教学实验楼-N' },
    { key: '0-59', value: 59, label: '综合教学实验楼-S' },
    { key: '0-60', value: 60, label: '咖啡厅' },
    { key: '0-61', value: 61, label: '图书馆南门' },
    { key: '0-64', value: 64, label: '东配楼' },
    { key: '0-75', value: 75, label: '教室楼S1西门' },
    { key: '0-76', value: 76, label: '实验楼S2/S3' },
    { key: '0-77', value: 77, label: '快递站' },
    { key: '0-79', value: 79, label: '西门' },
]

export const shahemap = [
    {
        "id": 0,
        "neighbors": [
            {
                "id": 1,
                "w": 10,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 19,
                "w": 30,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 1,
        "neighbors": [
            {
                "id": 0,
                "w": 10,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 2,
                "w": 30,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 2,
        "neighbors": [
            {
                "id": 1,
                "w": 30,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 3,
                "w": 30,
                "c": 0.1,
                'isBicycleEable': true
            },
            {
                "id": 8,
                "w": 14,
                "c": 0.1,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 3,
        "neighbors": [
            {
                "id": 2,
                "w": 30,
                "c": 0.1,
                'isBicycleEable': true
            },
            {
                "id": 4,
                "w": 30,
                "c": 0.2,
                'isBicycleEable': true
            },
            {
                "id": 9,
                "w": 10,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 4,
        "neighbors": [
            {
                "id": 3,
                "w": 30,
                "c": 0.2,
                'isBicycleEable': true
            },
            {
                "id": 5,
                "w": 60,
                "c": 0.2,
                'isBicycleEable': true
            },
            {
                "id": 10,
                "w": 10,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 78,
                "w": 200,
                "c": 0.1,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 5,
        "neighbors": [
            {
                "id": 4,
                "w": 60,
                "c": 0.2,
                'isBicycleEable': true
            },
            {
                "id": 13,
                "w": 12,
                "c": 0.3,
                'isBicycleEable': false
            }
        ]
    },
    {
        "id": 6,
        "neighbors": [
            {
                "id": 7,
                "w": 25,
                "c": 0.2,
                'isBicycleEable': false
            },
            {
                "id": 13,
                "w": 12,
                "c": 0,
                'isBicycleEable': false
            },
            {
                "id": 16,
                "w": 20,
                "c": 0,
                'isBicycleEable': false
            }
        ]
    },
    {
        "id": 7,
        "neighbors": [
            {
                "id": 6,
                "w": 25,
                "c": 0.2,
                'isBicycleEable': false
            },
            {
                "id": 17,
                "w": 20,
                "c": 0.7,
                'isBicycleEable': false
            }
        ]
    },
    {
        "id": 8,
        "neighbors": [
            {
                "id": 2,
                "w": 14,
                "c": 0.1,
                'isBicycleEable': true
            },
            {
                "id": 22,
                "w": 24,
                "c": 0.1,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 9,
        "neighbors": [
            {
                "id": 3,
                "w": 10,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 10,
        "neighbors": [
            {
                "id": 4,
                "w": 10,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 11,
                "w": 20,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 24,
                "w": 20,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 11,
        "neighbors": [
            {
                "id": 10,
                "w": 20,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 12,
        "neighbors": [
            {
                "id": 13,
                "w": 30,
                "c": 0.2,
                'isBicycleEable': false
            },
            {
                "id": 14,
                "w": 10,
                "c": 0,
                'isBicycleEable': false
            }
        ]
    },
    {
        "id": 13,
        "neighbors": [
            {
                "id": 5,
                "w": 12,
                "c": 0.3,
                'isBicycleEable': false
            },
            {
                "id": 6,
                "w": 12,
                "c": 0,
                'isBicycleEable': false
            },
            {
                "id": 12,
                "w": 30,
                "c": 0.2,
                'isBicycleEable': false
            },
            {
                "id": 15,
                "w": 10,
                "c": 0,
                'isBicycleEable': false
            }
        ]
    },
    {
        "id": 14,
        "neighbors": [
            {
                "id": 12,
                "w": 10,
                "c": 0,
                'isBicycleEable': false
            },
            {
                "id": 25,
                "w": 8,
                "c": 0,
                'isBicycleEable': false
            }
        ]
    },
    {
        "id": 15,
        "neighbors": [
            {
                "id": 13,
                "w": 10,
                "c": 0,
                'isBicycleEable': false
            },
            {
                "id": 26,
                "w": 10,
                "c": 0,
                'isBicycleEable': false
            }
        ]
    },
    {
        "id": 16,
        "neighbors": [
            {
                "id": 6,
                "w": 20,
                "c": 0,
                'isBicycleEable': false
            },
            {
                "id": 38,
                "w": 40,
                "c": 0,
                'isBicycleEable': false
            }
        ]
    },
    {
        "id": 17,
        "neighbors": [
            {
                "id": 7,
                "w": 20,
                "c": 0.7,
                'isBicycleEable': false
            },
            {
                "id": 29,
                "w": 15,
                "c": 0.3,
                'isBicycleEable': false
            }
        ]
    },
    {
        "id": 18,
        "neighbors": [
            {
                "id": 29,
                "w": 10,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 19,
        "neighbors": [
            {
                "id": 0,
                "w": 30,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 20,
                "w": 6,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 31,
                "w": 10,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 20,
        "neighbors": [
            {
                "id": 19,
                "w": 6,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 21,
                "w": 20,
                "c": 0.7,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 21,
        "neighbors": [
            {
                "id": 20,
                "w": 20,
                "c": 0.7,
                'isBicycleEable': true
            },
            {
                "id": 32,
                "w": 10,
                "c": 0.7,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 22,
        "neighbors": [
            {
                "id": 8,
                "w": 24,
                "c": 0.1,
                'isBicycleEable': true
            },
            {
                "id": 33,
                "w": 10,
                "c": 0.7,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 23,
        "neighbors": [
            {
                "id": 24,
                "w": 20,
                "c": 0.3,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 24,
        "neighbors": [
            {
                "id": 10,
                "w": 20,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 23,
                "w": 20,
                "c": 0.3,
                'isBicycleEable': true
            },
            {
                "id": 34,
                "w": 18,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 25,
        "neighbors": [
            {
                "id": 14,
                "w": 8,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 35,
                "w": 20,
                "c": 0.9,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 26,
        "neighbors": [
            {
                "id": 15,
                "w": 10,
                "c": 0,
                'isBicycleEable': false
            },
            {
                "id": 36,
                "w": 20,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 27,
        "neighbors": [
            {
                "id": 37,
                "w": 5,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 28,
        "neighbors": [
            {
                "id": 29,
                "w": 10,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 29,
        "neighbors": [
            {
                "id": 17,
                "w": 15,
                "c": 0.3,
                'isBicycleEable': false
            },
            {
                "id": 18,
                "w": 10,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 28,
                "w": 10,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 30,
                "w": 13,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 39,
                "w": 13,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 30,
        "neighbors": [
            {
                "id": 29,
                "w": 13,
                "c": 0,
                'isBicycleEable': false
            }
        ]
    },
    {
        "id": 31,
        "neighbors": [
            {
                "id": 19,
                "w": 10,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 32,
                "w": 30,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 42,
                "w": 45,
                "c": 0.3,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 32,
        "neighbors": [
            {
                "id": 21,
                "w": 10,
                "c": 0.7,
                'isBicycleEable': true
            },
            {
                "id": 31,
                "w": 30,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 33,
                "w": 10,
                "c": 0.9,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 33,
        "neighbors": [
            {
                "id": 22,
                "w": 10,
                "c": 0.7,
                'isBicycleEable': true
            },
            {
                "id": 32,
                "w": 10,
                "c": 0.9,
                'isBicycleEable': true
            },
            {
                "id": 34,
                "w": 60,
                "c": 0.3,
                'isBicycleEable': true
            },
            {
                "id": 40,
                "w": 30,
                "c": 0.4,
                'isBicycleEable': true
            },
            {
                "id": 41,
                "w": 30,
                "c": 0.4,
                'isBicycleEable': true
            },
            {
                "id": 43,
                "w": 45,
                "c": 0.3,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 34,
        "neighbors": [
            {
                "id": 24,
                "w": 18,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 33,
                "w": 60,
                "c": 0.3,
                'isBicycleEable': true
            },
            {
                "id": 35,
                "w": 30,
                "c": 0.3,
                'isBicycleEable': true
            },
            {
                "id": 45,
                "w": 45,
                "c": 0.3,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 35,
        "neighbors": [
            {
                "id": 25,
                "w": 20,
                "c": 0.9,
                'isBicycleEable': true
            },
            {
                "id": 34,
                "w": 30,
                "c": 0.3,
                'isBicycleEable': true
            },
            {
                "id": 36,
                "w": 30,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 36,
        "neighbors": [
            {
                "id": 26,
                "w": 20,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 35,
                "w": 30,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 37,
                "w": 10,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 37,
        "neighbors": [
            {
                "id": 27,
                "w": 5,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 36,
                "w": 10,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 38,
                "w": 40,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 54,
                "w": 90,
                "c": 0.9,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 38,
        "neighbors": [
            {
                "id": 16,
                "w": 40,
                "c": 0,
                'isBicycleEable': false
            },
            {
                "id": 37,
                "w": 40,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 39,
                "w": 13,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 55,
                "w": 90,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 39,
        "neighbors": [
            {
                "id": 29,
                "w": 13,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 38,
                "w": 13,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 40,
        "neighbors": [
            {
                "id": 33,
                "w": 30,
                "c": 0.4,
                'isBicycleEable': true
            },
            {
                "id": 41,
                "w": 5,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 43,
                "w": 20,
                "c": 0.4,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 41,
        "neighbors": [
            {
                "id": 33,
                "w": 30,
                "c": 0.4,
                'isBicycleEable': true
            },
            {
                "id": 40,
                "w": 5,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 43,
                "w": 20,
                "c": 0.4,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 42,
        "neighbors": [
            {
                "id": 31,
                "w": 45,
                "c": 0.3,
                'isBicycleEable': true
            },
            {
                "id": 43,
                "w": 40,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 46,
                "w": 20,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 43,
        "neighbors": [
            {
                "id": 33,
                "w": 45,
                "c": 0.3,
                'isBicycleEable': true
            },
            {
                "id": 40,
                "w": 20,
                "c": 0.4,
                'isBicycleEable': true
            },
            {
                "id": 41,
                "w": 20,
                "c": 0.4,
                'isBicycleEable': true
            },
            {
                "id": 42,
                "w": 40,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 44,
                "w": 30,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 45,
                "w": 60,
                "c": 0.3,
                'isBicycleEable': true
            },
            {
                "id": 47,
                "w": 30,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 48,
                "w": 30,
                "c": 0,
                'isBicycleEable': false
            },
            {
                "id": 50,
                "w": 45,
                "c": 0.3,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 44,
        "neighbors": [
            {
                "id": 43,
                "w": 30,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 45,
                "w": 30,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 45,
        "neighbors": [
            {
                "id": 34,
                "w": 45,
                "c": 0.3,
                'isBicycleEable': true
            },
            {
                "id": 43,
                "w": 60,
                "c": 0.3,
                'isBicycleEable': true
            },
            {
                "id": 44,
                "w": 30,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 51,
                "w": 45,
                "c": 0.4,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 46,
        "neighbors": [
            {
                "id": 42,
                "w": 20,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 49,
                "w": 25,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 47,
        "neighbors": [
            {
                "id": 43,
                "w": 30,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 48,
                "w": 5,
                "c": 0,
                'isBicycleEable': false
            },
            {
                "id": 50,
                "w": 30,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 48,
        "neighbors": [
            {
                "id": 43,
                "w": 30,
                "c": 0,
                'isBicycleEable': false
            },
            {
                "id": 47,
                "w": 5,
                "c": 0,
                'isBicycleEable': false
            },
            {
                "id": 50,
                "w": 30,
                "c": 0,
                'isBicycleEable': false
            }
        ]
    },
    {
        "id": 49,
        "neighbors": [
            {
                "id": 46,
                "w": 25,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 50,
                "w": 40,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 68,
                "w": 200,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 50,
        "neighbors": [
            {
                "id": 43,
                "w": 45,
                "c": 0.3,
                'isBicycleEable': true
            },
            {
                "id": 47,
                "w": 30,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 48,
                "w": 30,
                "c": 0,
                'isBicycleEable': false
            },
            {
                "id": 49,
                "w": 40,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 51,
                "w": 60,
                "c": 0.4,
                'isBicycleEable': true
            },
            {
                "id": 57,
                "w": 8,
                "c": 0.4,
                'isBicycleEable': true
            },

        ]
    },
    {
        "id": 51,
        "neighbors": [
            {
                "id": 45,
                "w": 45,
                "c": 0.4,
                'isBicycleEable': true
            },
            {
                "id": 50,
                "w": 60,
                "c": 0.4,
                'isBicycleEable': true
            },
            {
                "id": 52,
                "w": 30,
                "c": 0.6,
                'isBicycleEable': true
            },
            {
                "id": 62,
                "w": 100,
                "c": 0.8,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 52,
        "neighbors": [
            {
                "id": 51,
                "w": 30,
                "c": 0.6,
                'isBicycleEable': true
            },
            {
                "id": 53,
                "w": 70,
                "c": 0.8,
                'isBicycleEable': true
            },
            {
                "id": 58,
                "w": 10,
                "c": 0.6,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 53,
        "neighbors": [
            {
                "id": 52,
                "w": 70,
                "c": 0.8,
                'isBicycleEable': true
            },
            {
                "id": 54,
                "w": 15,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 59,
                "w": 10,
                "c": 0.6,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 54,
        "neighbors": [
            {
                "id": 37,
                "w": 90,
                "c": 0.9,
                'isBicycleEable': true
            },
            {
                "id": 53,
                "w": 15,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 55,
                "w": 40,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 73,
                "w": 200,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 55,
        "neighbors": [
            {
                "id": 38,
                "w": 90,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 54,
                "w": 40,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 56,
                "w": 180,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 74,
                "w": 200,
                "c": 0.9,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 56,
        "neighbors": [
            {
                "id": 55,
                "w": 180,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 57,
        "neighbors": [
            {
                "id": 50,
                "w": 8,
                "c": 0.4,
                'isBicycleEable': true
            },
            {
                "id": 65,
                "w": 200,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 58,
        "neighbors": [
            {
                "id": 52,
                "w": 10,
                "c": 0.6,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 59,
        "neighbors": [
            {
                "id": 53,
                "w": 10,
                "c": 0.6,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 60,
        "neighbors": [
            {
                "id": 61,
                "w": 12,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 65,
                "w": 80,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 61,
        "neighbors": [
            {
                "id": 60,
                "w": 10,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 62,
                "w": 12,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 62,
        "neighbors": [
            {
                "id": 51,
                "w": 100,
                "c": 0.8,
                'isBicycleEable': true
            },
            {
                "id": 61,
                "w": 10,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 63,
                "w": 5,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 70,
                "w": 100,
                "c": 0.8,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 63,
        "neighbors": [
            {
                "id": 62,
                "w": 5,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 64,
        "neighbors": [
            {
                "id": 65,
                "w": 8,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 65,
        "neighbors": [
            {
                "id": 57,
                "w": 200,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 60,
                "w": 80,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 64,
                "w": 8,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 69,
                "w": 12,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 66,
        "neighbors": [
            {
                "id": 71,
                "w": 12,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 67,
        "neighbors": [
            {
                "id": 72,
                "w": 10,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 68,
        "neighbors": [
            {
                "id": 49,
                "w": 200,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 69,
                "w": 60,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 69,
        "neighbors": [
            {
                "id": 65,
                "w": 12,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 68,
                "w": 60,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 70,
                "w": 60,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 70,
        "neighbors": [
            {
                "id": 62,
                "w": 100,
                "c": 0.8,
                'isBicycleEable': true
            },
            {
                "id": 69,
                "w": 60,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 71,
                "w": 12,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 71,
        "neighbors": [
            {
                "id": 66,
                "w": 12,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 70,
                "w": 12,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 72,
                "w": 40,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 75,
                "w": 10,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 72,
        "neighbors": [
            {
                "id": 67,
                "w": 10,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 71,
                "w": 40,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 73,
                "w": 12,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 73,
        "neighbors": [
            {
                "id": 54,
                "w": 200,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 72,
                "w": 12,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 74,
                "w": 40,
                "c": 0,
                'isBicycleEable': true
            },
            {
                "id": 76,
                "w": 10,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 74,
        "neighbors": [
            {
                "id": 55,
                "w": 200,
                "c": 0.9,
                'isBicycleEable': true
            },
            {
                "id": 73,
                "w": 40,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 75,
        "neighbors": [
            {
                "id": 71,
                "w": 10,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 76,
        "neighbors": [
            {
                "id": 73,
                "w": 10,
                "c": 0,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 77,
        "neighbors": [
            {
                "id": 78,
                "w": 15,
                "c": 0.6,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 78,
        "neighbors": [
            {
                "id": 4,
                "w": 200,
                "c": 0.1,
                'isBicycleEable': true
            },
            {
                "id": 77,
                "w": 15,
                "c": 0.6,
                'isBicycleEable': true
            },
            {
                "id": 79,
                "w": 15,
                "c": 0.3,
                'isBicycleEable': true
            }
        ]
    },
    {
        "id": 79,
        "neighbors": [
            {
                "id": 78,
                "w": 15,
                "c": 0.3,
                'isBicycleEable': true
            }
        ]
    }
]

export const buptMapping = {
    0: { 'id': 0, 'name': '西门', 'x': '27.88', 'y': '114.03', 'neighbor': [8] },
    1: {
        'id': 1, 'name': '鸿通楼', 'x': '34.58', 'y': '22.43',
        'neighbor': [2]
    },
    2: { 'id': 2, 'name': '鸿通楼+南北路1+东西路1', 'x': '48.64', 'y': '28.67', 'neighbor': [1, 3, 18] },
    3: {
        'id': 3, 'name': '南北路1+ 邮局 + 教四楼西门', 'x': '48.81', 'y': '52.92', 'neighbor': [2, 4, 5, 6]
    },
    4: { 'id': 4, 'name': '邮局', 'x': '41.94', 'y': '52.56', 'neighbor': [3] },
    5: { 'id': 5, 'name': '教四楼西门', 'x': '54.29', 'y': '55.8', 'neighbor': [3] },
    6: { 'id': 6, 'name': '南北路1 + 东西路2 + 移动营业厅', 'x': '49.15', 'y': '80.9', 'neighbor': [3, 7, 8, 13] },
    7: { 'id': 7, 'name': '移动营业厅', 'x': '42.46', 'y': '85.17', 'neighbor': [6] },
    8: {
        'id': 8, 'name': '南北路1+西门', 'x': '48.46', 'y': '113.9', 'neighbor': [0, 6, 9, 14]
    },
    9: { 'id': 9, 'name': '南北路1+东西路3+停车坪', 'x': '48.46', 'y': '134.66', 'neighbor': [8, 10, 15] },
    10: { 'id': 10, 'name': '南北路1+教三楼西门', 'x': '49.14', 'y': '157.72', 'neighbor': [9, 11] },
    11: { 'id': 11, 'name': '南北路1+东西路4+校车车库', 'x': '49.19', 'y': '181.9', 'neighbor': [10, 32] },
    12: { 'id': 12, 'name': '教四楼南门', 'x': '87.9', 'y': '66.66', 'neighbor': [13] },
    13: { 'id': 13, 'name': '东西路2+教四楼南门', 'x': '89.99', 'y': '81.74', 'neighbor': [6, 12, 14, 25] },
    14: { 'id': 14, 'name': '校训石', 'x': '90.38', 'y': '107.81', 'neighbor': [8, 13, 16, 17] },
    15: { 'id': 15, 'name': '东西路3+教三楼北门', 'x': '90.03', 'y': '133.71', 'neighbor': [9, 14, 16, 28] },
    16: { 'id': 16, 'name': '教三楼北门', 'x': '89.09', 'y': '139.91', 'neighbor': [15] },
    17: { 'id': 17, 'name': '主席像', 'x': '110.21', 'y': '108.88', 'neighbor': [14, 26] },
    18: { 'id': 18, 'name': '南北路2+东西路1', 'x': '133.88', 'y': '28.96', 'neighbor': [2, 19, 36] },
    19: { 'id': 19, 'name': '南北路2+财务处+后勤楼', 'x': '133.88', 'y': '42.23', 'neighbor': [18, 20, 21, 22] },
    20: { 'id': 20, 'name': '财务处', 'x': '142.45', 'y': '38.24', 'neighbor': [19, 21] },
    21: { 'id': 21, 'name': '后勤楼', 'x': '142.81', 'y': '44.44', 'neighbor': [19, 20] },
    22: { 'id': 22, 'name': '南北路2+教四楼东门+教一楼西门', 'x': '134.18', 'y': '59.36', 'neighbor': [19, 23, 24, 25] },
    23: {
        'id': 23, 'name': '教四楼东门', 'x': '126.43',
        'y': '56.24', 'neighbor': [22]
    },
    24: { 'id': 24, 'name': '教一楼西门', 'x': '143.48', 'y': '65.26', 'neighbor': [22] },
    25: { 'id': 25, 'name': '南北路2+东西路2', 'x': '134.11', 'y': '81.74', 'neighbor': [13, 22, 26, 37] },
    26: { 'id': 26, 'name': '南北路2+主席像+国旗', 'x': '133.85', 'y': '108.46', 'neighbor': [17, 25, 27, 28] },
    27: { 'id': 27, 'name': '国旗', 'x': '148.28', 'y': '108.62', 'neighbor': [26, 38] },
    28: { 'id': 28, 'name': '南北路2+东西路3', 'x': '134.36', 'y': '136.42', 'neighbor': [15, 26, 29, 40] },
    29: { 'id': 29, 'name': '南北路2+教三楼东门+教二楼西门', 'x': '134.43', 'y': '157.77', 'neighbor': [28, 30, 31, 32] },
    30: { 'id': 30, 'name': '教三楼东门', 'x': '124.91', 'y': '158.5', 'neighbor': [29] },
    31: { 'id': 31, 'name': '教二楼西门', 'x': '143.98', 'y': '158.91', 'neighbor': [29] },
    32: { 'id': 32, 'name': '南北路2 + 东西路4', 'x': '132.77', 'y': '182.7', 'neighbor': [11, 29, 33, 34, 49] },
    33: { 'id': 33, 'name': '中门邮局', 'x': '140.08', 'y': '190.8', 'neighbor': [32] },
    34: { 'id': 34, 'name': '南北路2 + 东西路5', 'x': '133.56', 'y': '203.02', 'neighbor': [32, 35] },
    35: { 'id': 35, 'name': '校医院', 'x': '112.42', 'y': '203.02', 'neighbor': [34] },
    36: { 'id': 36, 'name': '东西路1 + 行政办公楼', 'x': '183.37', 'y': '29.7', 'neighbor': [18, 42] },
    37: { 'id': 37, 'name': '东西路2 + 教一楼南门', 'x': '177.25', 'y': '78.45', 'neighbor': [25, 38, 45] },
    38: { 'id': 38, 'name': '音乐喷泉', 'x': '169.39', 'y': '109.13', 'neighbor': [27, 37, 39, 40] },
    39: { 'id': 39, 'name': '主楼', 'x': '184.57', 'y': '109.43', 'neighbor': [38] },
    40: { 'id': 40, 'name': '东西路3 + 教二楼北门', 'x': '177.12', 'y': '135.65', 'neighbor': [28, 38, 41, 47] },
    41: { 'id': 41, 'name': '教二楼北门', 'x': '178.02', 'y': '147.48', 'neighbor': [40] },
    42: { 'id': 42, 'name': '南北路3 + 东西路1', 'x': '220.34', 'y': '28.48', 'neighbor': [36, 43, 50] },
    43: { 'id': 43, 'name': '南北路3 + 教一楼东门', 'x': '220.26', 'y': '69.58', 'neighbor': [42, 44, 45] },
    44: { 'id': 44, 'name': '教一楼东门', 'x': '213.98', 'y': '68.76', 'neighbor': [43] },
    45: { 'id': 45, 'name': '南北路3 + 东西路2', 'x': '220.09', 'y': '81.74', 'neighbor': [37, 43, 52, 46] },
    46: { 'id': 46, 'name': '南北路3 + 科学会堂西门', 'x': '221.22', 'y': '111.16', 'neighbor': [45, 47] },
    47: { 'id': 47, 'name': '南北路3 + 东西路3', 'x': '218.65', 'y': '134.36', 'neighbor': [40, 46, 48, 53, 56] },
    48: {
        'id': 48, 'name': '南北路3 + 教二楼东门', 'x': '215.32', 'y': '159.76', 'neighbor': [47, 49]
    },
    49: { 'id': 49, 'name': '南北路3 + 东西路4', 'x': '214.96', 'y': '182.7', 'neighbor': [32, 48, 54, 55] },
    50: { 'id': 50, 'name': '南北路4 + 东西路1', 'x': '256.56', 'y': '28.88', 'neighbor': [42, 51] },
    51: { 'id': 51, 'name': '南北路4 + 东西路2', 'x': '256.21', 'y': '81.74', 'neighbor': [50, 52, 53] },
    52: { 'id': 52, 'name': '东西路2 + 科学会堂北门', 'x': '239.27', 'y': '81.74', 'neighbor': [45, 51] },
    53: { 'id': 53, 'name': '南北路4 + 东西路3', 'x': '256.41', 'y': '135.59', 'neighbor': [47, 51, 54, 56] },
    54: { 'id': 54, 'name': '南北路4 + 东西路4', 'x': '255.89', 'y': '182.85', 'neighbor': [49, 53, 55] },
    55: { 'id': 55, 'name': '东西路4 + 创新中心南门', 'x': '236.4', 'y': '178.15', 'neighbor': [49, 54] },
    56: { 'id': 56, 'name': '李白烈士雕像', 'x': '249.19', 'y': '128.53', 'neighbor': [47, 53] }
}

export const buptStudyingMapping = [
    { value: 12, label: '教四楼', otherKey: 12 },
    { value: 16, label: '教三楼', otherKey: 16 },
    { value: 41, label: '教二楼', otherKey: 41 },
    { value: 37, label: '教一楼', otherKey: 37 },
    { value: 39, label: '主楼', otherKey: 39 },
]

export const buptNormalMapping = [
    { key: "1-0", "value": 0, "label": "西门" },
    { key: "1-1", "value": 1, "label": "鸿通楼" },
    { key: "1-4", "value": 4, "label": "邮局" },
    { key: "1-5", "value": 5, "label": "教四楼西门" },
    { key: "1-7", "value": 7, "label": "移动营业厅" },
    { key: "1-9", "value": 9, "label": "停车坪" },
    { key: "1-10", "value": 10, "label": "教三楼西门" },
    { key: "1-11", "value": 11, "label": "校车车库" },
    { key: "1-12", "value": 12, "label": "教四楼南门" },
    { key: "1-14", "value": 14, "label": "校训石" },
    { key: "1-16", "value": 16, "label": "教三楼北门" },
    { key: "1-17", "value": 17, "label": "主席像" },
    { key: "1-20", "value": 20, "label": "财务处" },
    { key: "1-21", "value": 21, "label": "后勤楼" },
    { key: "1-23", "value": 23, "label": "教四楼东门" },
    { key: "1-24", "value": 24, "label": "教一楼西门" },
    { key: "1-27", "value": 27, "label": "国旗" },
    { key: "1-30", "value": 30, "label": "教三楼东门" },
    { key: "1-31", "value": 31, "label": "教二楼西门" },
    { key: "1-33", "value": 33, "label": "中门邮局" },
    { key: "1-35", "value": 35, "label": "校医院" },
    { key: "1-36", "value": 36, "label": "行政办公楼" },
    { key: "1-37", "value": 37, "label": "教一楼南门" },
    { key: "1-38", "value": 38, "label": "音乐喷泉" },
    { key: "1-39", "value": 39, "label": "主楼" },
    { key: "1-41", "value": 41, "label": "教二楼北门" },
    { key: "1-44", "value": 44, "label": "教一楼东门" },
    { key: "1-46", "value": 46, "label": "科学会堂西门" },
    { key: "1-48", "value": 48, "label": "教二楼东门" },
    { key: "1-52", "value": 52, "label": "科学会堂北门" },
    { key: "1-55", "value": 55, "label": "创新中心南门" },
    { key: "1-56", "value": 56, "label": "李白烈士雕像" }
]

export const buptmap = [
    {
        "id": 0,
        "neighbors": [
            {
                "id": 8,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 1,
        "neighbors": [
            {
                "id": 2,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 2,
        "neighbors": [
            {
                "id": 1,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 3,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 18,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 3,
        "neighbors": [
            {
                "id": 2,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 4,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 5,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 6,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 4,
        "neighbors": [
            {
                "id": 3,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 5,
        "neighbors": [
            {
                "id": 3,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 6,
        "neighbors": [
            {
                "id": 3,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 7,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 8,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 13,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 7,
        "neighbors": [
            {
                "id": 6,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 8,
        "neighbors": [
            {
                "id": 0,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 6,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 9,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 14,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 9,
        "neighbors": [
            {
                "id": 8,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 10,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 15,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 10,
        "neighbors": [
            {
                "id": 9,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 11,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 11,
        "neighbors": [
            {
                "id": 10,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 32,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 12,
        "neighbors": [
            {
                "id": 13,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 13,
        "neighbors": [
            {
                "id": 6,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 12,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 14,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 25,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 14,
        "neighbors": [
            {
                "id": 8,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 13,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 16,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 17,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 15,
        "neighbors": [
            {
                "id": 9,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 14,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 16,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 28,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 16,
        "neighbors": [
            {
                "id": 15,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 17,
        "neighbors": [
            {
                "id": 14,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 26,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 18,
        "neighbors": [
            {
                "id": 2,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 19,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 36,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 19,
        "neighbors": [
            {
                "id": 18,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 20,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 21,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 22,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 20,
        "neighbors": [
            {
                "id": 19,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 21,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 21,
        "neighbors": [
            {
                "id": 19,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 20,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 22,
        "neighbors": [
            {
                "id": 19,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 23,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 24,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 25,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 23,
        "neighbors": [
            {
                "id": 22,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 24,
        "neighbors": [
            {
                "id": 22,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 25,
        "neighbors": [
            {
                "id": 13,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 22,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 26,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 37,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 26,
        "neighbors": [
            {
                "id": 17,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 25,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 27,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 28,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 27,
        "neighbors": [
            {
                "id": 26,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 38,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 28,
        "neighbors": [
            {
                "id": 15,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 26,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 29,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 40,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 29,
        "neighbors": [
            {
                "id": 28,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 30,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 31,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 32,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 30,
        "neighbors": [
            {
                "id": 29,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 31,
        "neighbors": [
            {
                "id": 29,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 32,
        "neighbors": [
            {
                "id": 11,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 29,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 33,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 34,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 49,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 33,
        "neighbors": [
            {
                "id": 32,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 34,
        "neighbors": [
            {
                "id": 32,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 35,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 35,
        "neighbors": [
            {
                "id": 34,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 36,
        "neighbors": [
            {
                "id": 18,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 42,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 37,
        "neighbors": [
            {
                "id": 25,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 38,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 45,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 38,
        "neighbors": [
            {
                "id": 27,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 37,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 39,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 40,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 39,
        "neighbors": [
            {
                "id": 38,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 40,
        "neighbors": [
            {
                "id": 28,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 38,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 41,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 47,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 41,
        "neighbors": [
            {
                "id": 40,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 42,
        "neighbors": [
            {
                "id": 36,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 43,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 50,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 43,
        "neighbors": [
            {
                "id": 42,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 44,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 45,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 44,
        "neighbors": [
            {
                "id": 43,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 45,
        "neighbors": [
            {
                "id": 37,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 43,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 52,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 46,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 46,
        "neighbors": [
            {
                "id": 45,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 47,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 47,
        "neighbors": [
            {
                "id": 40,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 46,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 48,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 53,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 56,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 48,
        "neighbors": [
            {
                "id": 47,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 49,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 49,
        "neighbors": [
            {
                "id": 32,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 48,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 54,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 55,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 50,
        "neighbors": [
            {
                "id": 42,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 51,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 51,
        "neighbors": [
            {
                "id": 50,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 52,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 53,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 52,
        "neighbors": [
            {
                "id": 45,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 51,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 53,
        "neighbors": [
            {
                "id": 47,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 51,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 54,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 56,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 54,
        "neighbors": [
            {
                "id": 49,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 53,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 55,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 55,
        "neighbors": [
            {
                "id": 49,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 54,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    },
    {
        "id": 56,
        "neighbors": [
            {
                "id": 47,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            },
            {
                "id": 53,
                "w": 1,
                "c": 0,
                "isBicycleEable": true
            }
        ]
    }
]

export const treeData = [
    {
        label: '沙河校区',
        value: '沙河校区',
        children: shaheNormalMapping
    },
    {
        label: '西土城校区',
        value: '西土城校区',
        children: buptNormalMapping
    }
]

export const transferData = [
    {
        label: '沙河校区',
        value: '沙河校区',
        key: '沙河校区',

        children: shaheNormalMapping
    },
    {
        label: '西土城校区',
        value: '西土城校区',
        key: '西土城校区',
        children: buptNormalMapping
    }
]

