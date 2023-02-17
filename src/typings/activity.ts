export enum alarmNotificationType {
    DAILY = 0,
    ONCE_A_WEEK,
    ONLY_ONCE
}
export enum activityType {
    group,
    personal
}
export interface Alarm {
    content?: string,
    cron: number,
    type: alarmNotificationType | alarmNotificationType.DAILY | number
}
export interface AlarmWithId extends Alarm {
    id: string,
}
export interface IActivityItem {
    id: string,
    name: string,
    content: string,
    alarm: Alarm | null,
    type: activityType,
    start_time: number,
    end_time: number,
}