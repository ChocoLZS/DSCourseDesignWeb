import { Popover, Button, Modal } from "@douyinfe/semi-ui";
import { IconBell } from "@douyinfe/semi-icons";
import React, { FC, useEffect, useState } from "react";
import { courseStartTime, studyWeekBaseday, useTimeStore, getCurrentWeekday, getCurrentWeekdayToString, inc } from "@app/store/TimeStore";
import { AlarmWithId, alarmNotificationType } from "@app/typings/activity";
import { useUserStore } from "@app/store/User";
import { useLogStore } from "@app/store/LogStore";
import { useInterval } from "@app/hooks/useInterval";
import { ICourseItem } from "@app/typings/course";
import { IExamItem } from "@app/typings/exam";
import { generateAlarmList } from "@pages/activity/config"
import { subscribeWithSelector } from "zustand/middleware";
import create from 'zustand';

var isAlert = false;

interface timeSlot {
    hours: Array<Map<string, AlarmWithId>>,
    hoursPointer: number,
    weekdays: Array<Map<string, AlarmWithId>>,
    weekdaysPointer: number,
}

interface AlarmState {
    timeSlot: timeSlot,
    activedClock: Array<AlarmWithId>,//clock id
    clockAdd: (item: AlarmWithId, type: alarmNotificationType) => void;
    clockRemove: (item: AlarmWithId, type: alarmNotificationType) => void;
    sprayNextWeekClock: (nextWeekdaysPointer: number) => void;
    setActiveClock: (nextHoursPointer: number) => void;
    clockCheckLogic: () => void;
}

const timestamp = Date.parse(new Date().toString().replace(/(?<=:)[0-9]+/g, "00"));

export const useAlarmStore = create<AlarmState>(subscribeWithSelector(
    (set, get) => ({
        timeSlot: {
            hours: Array.from(new Array(24), () => new Map<string, AlarmWithId>()),
            hoursPointer: new Date(timestamp).getHours(),
            weekdays: Array.from(new Array(7 + 1), () => new Map<string, AlarmWithId>()),
            weekdaysPointer: getCurrentWeekday(timestamp)
        } as timeSlot,
        activedClock: [] as Array<AlarmWithId>,
        clockRemove: (item, type) => {
            const { timeSlot } = get();
            if (type === alarmNotificationType.DAILY) {
                if (timeSlot.hours[new Date(item.cron).getHours()].has(item.id)) {
                    timeSlot.hours[new Date(item.cron).getHours()].delete(item.id);
                }
            } else {
                if (timeSlot.weekdays[getCurrentWeekday(item.cron)].has(item.id)) {
                    timeSlot.weekdays[getCurrentWeekday(item.cron)].delete(item.id);
                    if (timeSlot.hours[new Date(item.cron).getHours()].has(item.id)) {
                        timeSlot.hours[new Date(item.cron).getHours()].delete(item.id);
                    }
                }
            }
            set({ timeSlot: timeSlot });
        },
        clockAdd: (item, type) => {
            const { timeSlot } = get();
            if (type === alarmNotificationType.DAILY
                || getCurrentWeekday(useTimeStore.getState().getTime()) === getCurrentWeekday(item.cron)) {
                if (!timeSlot.hours[new Date(item.cron).getHours()].has(item.id))
                    timeSlot.hours[new Date(item.cron).getHours()].set(item.id, item)
            }
            if (type !== alarmNotificationType.DAILY) {
                if (!timeSlot.weekdays[getCurrentWeekday(item.cron)].has(item.id)) {
                    timeSlot.weekdays[getCurrentWeekday(item.cron)].set(item.id, item);
                }

            }
            set({ timeSlot: timeSlot });
        },
        sprayNextWeekClock: (nextWeekdaysPointer) => {
            const { timeSlot } = get();
            let weekdaysCopy: Array<AlarmWithId> = JSON.parse(JSON.stringify(timeSlot.weekdays[nextWeekdaysPointer]));
            if (weekdaysCopy.length) {
                for (let [ind, item] of weekdaysCopy.entries()) {
                    timeSlot.hours[new Date(item.cron).getHours()].set(item.id, item);
                }
            }
        },
        setActiveClock: (nextHoursPointer) => {
            const { timeSlot } = get();
            let activedArr = [] as Array<AlarmWithId>;
            if (timeSlot.hours[nextHoursPointer].size) {
                timeSlot.hours[nextHoursPointer].forEach((value, ind) => {
                    activedArr.push(value);
                    if (value.type === alarmNotificationType.ONLY_ONCE) {
                        get().clockRemove(value, alarmNotificationType.ONLY_ONCE);
                    }
                })
                timeSlot.hours[nextHoursPointer].forEach((item, key, map) => {
                    if (item.type !== alarmNotificationType.DAILY)
                        map.delete(key);
                })
            }
            if (activedArr.length) {
                set({ activedClock: activedArr });
            }

        },
        clockCheckLogic: () => {
            const { timeSlot, setActiveClock, sprayNextWeekClock } = get();
            let nextHoursPointer = inc(timeSlot.hoursPointer, 24)
            let nextWeekdaysPointer;
            if (nextHoursPointer) {
                nextWeekdaysPointer = timeSlot.weekdaysPointer;
            } else {
                nextWeekdaysPointer = (inc(timeSlot.weekdaysPointer, 7) + 6) % 7 + 1;
                sprayNextWeekClock(nextWeekdaysPointer);
            }
            setActiveClock(nextHoursPointer);
            set({
                timeSlot: {
                    ...timeSlot,
                    hoursPointer: nextHoursPointer,
                    weekdaysPointer: nextWeekdaysPointer
                }
            })
        }
    })
))

const index: FC = () => {
    const [userInfo] = useUserStore(i => [i.userInfo])
    const [activedClock] = useAlarmStore(i => [i.activedClock]);
    const [timestamp] = useTimeStore(i => [i.timestamp]);
    const alert = (args: any[]) => {
        let clocks = args as Array<AlarmWithId>

        useTimeStore.getState().timePause();
        Modal.info({
            content:
                (<div>
                    {"现在是"}{new Date(clocks[0].cron).getHours()}{":00"}
                    {clocks.map(item => (
                        <div key={item.id}>{item.content}</div>
                    ))}
                </div>),
            onOk: () => { useTimeStore.getState().timeStart(); isAlert = false },
            onCancel: () => { isAlert = false },
            okText: "继续计时",
            cancelText: "保持暂停",
            icon: < IconBell />,
        })
        let arr = [] as any[]
        clocks.forEach((item) => {
            arr.push(useUserStore.getState().userInfo?.activities.find(i => i.id == item.id)?.name);
        })

        useLogStore.getState().putCustomizeLogs(`响起了闹钟 属于活动: ${arr} `);

    }
    //@ts-ignore
    // const activedSubscribe = useAlarmStore.subscribe((state) => state.activedClock,
    //     alert
    // );
    const [delay] = useTimeStore(state => [state.delay])
    const checkNontification = (userInfo: any) => {
        let courses = userInfo.courses;
        let time_arr = [];
        for (let course of courses as Array<ICourseItem>) {
            for (let exam of course.exams as Array<IExamItem>) {
                time_arr.push({ start: parseInt(exam.date as string), item: exam, type: 'exam' })
            }
            for (let time of course.time) {
                let baseDay = studyWeekBaseday[time.dow - 1];
                let course_start_time = courseStartTime[time.start - 1];
                let start_time = new Date(baseDay + '-' + course_start_time).getTime() / 1000;
                for (let i = 1; i <= 20; i++) {
                    time_arr.push({ start: start_time, item: course, type: 'course' });
                    start_time += 60 * 60 * 24 * 7;
                }
            }
            for (let homework of course.homework) {
                time_arr.push({ start: homework.ddl, item: homework, type: 'homework' });
            }
        }
        time_arr.sort((a, b) => a.start - b.start);
        let currentTime = Math.floor(useTimeStore.getState().getTime() / 1000);
        let arr = [];
        for (let i of time_arr) {
            if ((i.start - currentTime) <= 60 * 60 * 24 && (i.start - currentTime) > 60 * 60 * 23) {
                arr.push({
                    item: i.item,
                    type: i.type
                })
            }
        }
        if (arr.length) {
            return {
                status: true,
                items: arr
            }
        }
        return {
            status: false,
        };
    }
    const notificationItem = (item: any, type: string) => {
        switch (type) {
            case 'exam':
                return (
                    <div>
                        <div>{`考试名为 ${item.name}`}</div>
                        <div>{`考试时间为 ${new Date(item.date * 1000).toLocaleString()}, 持续 ${item.time} 分钟`}</div>
                        <div>{`考试地点为 ${item.location}`}</div>
                    </div>
                );
            case 'course':
                return (
                    <div>
                        <div>{`课程名为 ${item.name}`}</div>
                        <div>{`任课教师为 ${item.teacher}`}</div>
                        <div>{`上课地点为${item.location}`}</div>
                    </div>
                );
            case 'homework':
                return (
                    <div>
                        <div>{`作业名为 ${item.title}`}</div>
                        <div>{`作业内容为 ${item.content}`}</div>
                        <div>{`截止日期为 ${new Date(item.ddl * 1000).toLocaleString()}`}</div>
                    </div>
                );
        }

    }
    useInterval(() => {
        if (delay != null) {
            let { status, items } = checkNontification(useUserStore.getState().userInfo);
            if (status) {
                useTimeStore.getState().timePause();
                Modal.info({
                    title: "提醒!还剩不到24小时",
                    content: items?.map((item, idx) => {
                        //@ts-ignore
                        useLogStore.getState().putCustomizeLogs("提醒!还剩不到24小时", ` ${item.item.title || item.item.name || item.item.id}`);
                        return (
                            <React.Fragment key={idx}>
                                <div>{`当前时间为:
                            ${new Date(useTimeStore.getState().getTime()).toLocaleString()}
                            ${getCurrentWeekdayToString(getCurrentWeekday(useTimeStore.getState().getTime()))}`}</div>
                                <div style={{ marginBottom: '12px' }} >{notificationItem(item.item, item.type)}</div>
                            </React.Fragment>

                        )
                    }),
                    okText: "继续计时",
                    onOk: () => { useTimeStore.getState().timeStart() },
                    cancelText: "保持暂停"
                })
            }
            useAlarmStore.getState().clockCheckLogic();
        }

    }, delay);
    useEffect(() => {
        if (activedClock.length) {
            alert(activedClock)
        }
    }, [activedClock])
    useEffect(() => {
        if (userInfo) {
            let alarmWithIdList = generateAlarmList(userInfo?.activities);
            for (let item of alarmWithIdList) {
                useAlarmStore.getState().clockAdd(item, item.type);
            }
        }
    }, [userInfo])
    return (
        <Popover trigger="click" content={<div>hi</div>}>
            <Button
                theme="borderless"
                icon={<IconBell size="large" />}
                style={{
                    color: 'var(--semi-color-text-2)',
                    marginRight: '12px',
                }}
            />
        </Popover>
    )
}

export default index;