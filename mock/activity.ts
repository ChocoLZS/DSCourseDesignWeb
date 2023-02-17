import { MockMethod } from 'vite-plugin-mock'
import { activityType, alarmNotificationType, IActivityItem } from '@typings/activity'
const ActivitiesData: Array<IActivityItem> = [
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
]

export default [
    {
        url: '/mock/activity',
        method: 'get',
        timeout: 500,
        response: () => {
            return ActivitiesData;
        }
    },
    {
        url: '/mock/activity/clock',
        method: 'get',
        timeout: 500,
        response: () => {
            return
        }
    }
] as MockMethod[]