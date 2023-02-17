import { alarmNotificationType, AlarmWithId } from '@app/typings/activity';
import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
const systemTimeStep = 1000 * 60 * 60;
const timestamp = Date.parse(new Date().toString().replace(/(?<=:)[0-9]+/g, "00"));
const studyWeekStart = Date.parse(new Date('2022-2-28').toString());
const dayStep = 24 * 3600 * 1000;
const weekStep = 7 * dayStep;
export const studyWeekStartString = '2022-2-28'

export const SPEED_LEVEL = {
    NORMAL_SPEED: 10000,
    SPEED_2X: 5000,
    SPEED_5X: 2000,
    SPEED_10X: 1000,
}


interface TimeState {
    timestamp: number,
    delay: number | null,
    isPaused: boolean,
    currentSpeed: number,
    currentWeek: number,
    timeAdd: () => void;
    timePause: () => void;
    timeStart: () => void;
    timeAccelerater: (speed: number) => void;
    getTime: () => number;
    getDay: () => number;
}

export const useTimeStore = create<TimeState>(subscribeWithSelector(
    (set, get) => ({
        timestamp: timestamp,
        delay: SPEED_LEVEL.NORMAL_SPEED,
        currentSpeed: SPEED_LEVEL.NORMAL_SPEED,
        currentWeek: getCurrentWeek(timestamp),
        isPaused: false,
        timeAdd: () => {
            const { timestamp, currentWeek } = get();
            let w = getCurrentWeek(timestamp)
            if (w !== currentWeek) {
                set({ currentWeek: w });
            }
            set({
                timestamp: timestamp + systemTimeStep,
            });
        },
        timePause: () => set({ delay: null, isPaused: true }),
        timeStart: () => {
            const { currentSpeed } = get();
            set({ delay: currentSpeed, isPaused: false });
        },
        timeAccelerater: (speed: number) =>
            set({ delay: speed, currentSpeed: speed, isPaused: false }),
        getTime: () => get().timestamp,
        getDay: () => {
            const { timestamp } = get();
            return getDateTimestamp(timestamp);
        }
    })
))


export function getWeekDaysRange(week: number): [Date, Date] {
    return [new Date(studyWeekStart + (week - 1) * weekStep),
    new Date(studyWeekStart + week * weekStep)];
}

export function getCurrentWeek(currentTime: number | string): number {
    return Math.ceil((Date.parse(new Date(currentTime).toString()) - studyWeekStart) / weekStep);
}

export function getCurrentWeekday(currentTime: string | number): number {
    return (new Date(currentTime).getDay() + 6) % 7 + 1;
}

export function getCurrentWeekdayToString(weekday: number): string | null {
    switch (weekday) {
        case 1:
            return "周一"
        case 2:
            return "周二"
        case 3:
            return "周三"
        case 4:
            return "周四"
        case 5:
            return "周五"
        case 6:
            return "周六"
        case 7:
            return "周日"
        default:
            return null
    }
}
export const courseStartTime = ["8:00", "8:50", "9:50", "10:40", "11:30", "13:00", "13:50", "14:45", "15:35", "16:35", "17:25", "18:30", "19:20", "20:10"]
export const courseEndTime = ["8:45", "9:35", "10:35", "11:25", "12:15", "13:45", "14:35", "15:30", "16:20", "17:20", "18:10", "19:15", "20:05", "20:55"]
export const studyWeekBaseday = ['2022-2-28', '2022-3-1', '2022-3-2', '2022-3-3', '2022-3-4', '2022-3-5', '2022-3-6']


export function getDateTimestamp(time: number | string): number {
    let date = new Date(time);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

export function getDvalueTimestamp(end: number, start: number): number {
    return end - start;
}

export function between(start: number, middle: number, end: number): boolean {
    return (start <= middle && middle <= end) || (start <= middle && end < start)
}

export function inc(t: number, step: number): number {
    return (t + 1) % step;
}

export function formatTimestampUnsigne32(timestamp: number) {
    return Math.floor(timestamp / 1000);
}
export function formatUngined32Timestamp(timestamp: number) {
    return timestamp * 1000;
}

