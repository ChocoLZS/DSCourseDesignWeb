import React, { FC } from "react";
import { Form, ButtonGroup, Button, Modal } from "@douyinfe/semi-ui";
import { IconDelete } from "@douyinfe/semi-icons";
import { weekSelect } from "./config";
import { courseEndTime, courseStartTime, formatTimestampUnsigne32, getCurrentWeekday, studyWeekBaseday, useTimeStore } from "@app/store/TimeStore";
import { activityType, Alarm, alarmNotificationType, IActivityItem } from "@app/typings/activity";
import { createPersonalActivities } from "@app/api/activity";
import { userInfoFormatTime, useUserStore } from "@app/store/User";
import { useLogStore } from "@app/store/LogStore";
import { getStudentInfo } from "@app/api/student";
import { IExamItem } from "@app/typings/exam";
import { ICourseItem } from "@app/typings/course";

interface AddProps {
    connectActivityList: (list: Array<IActivityItem>) => void
    connectLoading?: (loading: boolean) => void
}

const { Select, Input, TextArea, Section, RadioGroup, Radio, TimePicker, DatePicker } = Form;
const { Option } = Select;
const index: FC<AddProps> = (props) => {
    const [getTime] = useTimeStore(i => [i.getTime]);
    const combineCorrectTime = (weekday: number, date: Date): number => {
        let bias = 0;
        if (weekday) {
            let dateWeekday = (date.getDay() + 6) % 7 + 1;
            bias = (weekday + 7 - dateWeekday) % 7;
        }
        return date.getTime() + bias * 24 * 60 * 60 * 1000;
    }
    const onSubmit = (v: any) => {
        const load = async () => {
            let res = await getStudentInfo(useUserStore.getState().id);
            let { status, conflictItem, startTime, endTime } = checkConficts(res.data, v.timeRange);
            let keepgoing = true;
            if (status) {
                if (Object.prototype.hasOwnProperty.call(conflictItem, "file")) {

                } else if (Object.prototype.hasOwnProperty.call(conflictItem, "date")) {

                } else if (Object.prototype.hasOwnProperty.call(conflictItem, "alarm")) {

                }
                Modal.warning({
                    content: (
                        <div>
                            <div>{`冲突活动名为: ${conflictItem?.name || conflictItem?.id}`}</div>
                            <div>{`冲突时间段为${new Date(startTime as number * 1000).toLocaleString()}-${new Date(endTime as number * 1000).toLocaleString()}`}</div>
                            <div>{`你设置的时间段为${new Date(v.timeRange[0]).toLocaleString()}-${new Date(v.timeRange[1]).toLocaleString()}`}</div>
                        </div>
                    ),
                    title: "看起来发生了时间冲突",
                    onCancel: () => { keepgoing = false },
                    onOk: () => {
                        const add = async () => {
                            let activity = {
                                id: "",
                                name: v.name,
                                content: v.detail ? v.detail : "",
                                type: v.type,
                                start_time: formatTimestampUnsigne32(new Date(v.timeRange[0]).getTime()),
                                end_time: formatTimestampUnsigne32(new Date(v.timeRange[1]).getTime()),
                            } as IActivityItem;
                            if (v.alarmType != -1) {
                                let alarm = {
                                    content: v.alarmDetail ? v.alarmDetail : "",
                                    cron: formatTimestampUnsigne32(combineCorrectTime(v.alarmWeekday, v.alarmTime)),
                                    type: v.alarmType
                                } as Alarm
                                activity.alarm = alarm;
                            }
                            //@ts-ignore
                            let { data } = await createPersonalActivities(useUserStore.getState().id, activity);
                            let arr = [] as Array<IActivityItem>;
                            for (let _id in data.activities) {
                                let obj = {
                                    ...data.activities[_id],
                                    alarm: data.activities[_id].alarm ? {
                                        ...data.activities[_id].alarm,
                                        cron: data.activities[_id].alarm.cron * 1000,
                                    } : null,
                                    start_time: data.activities[_id].start_time * 1000,
                                    end_time: data.activities[_id].end_time * 1000,
                                    id: _id
                                } as IActivityItem
                                arr.push(obj);
                            }
                            useLogStore.getState().putLogs(`添加了个人活动 但是活动发生了冲突`
                                , `冲突活动名为: ${conflictItem?.name || conflictItem?.id}`);
                            useUserStore.getState().updateActivity(arr);
                            props.connectActivityList(arr);
                        }
                        add();
                    },
                    okText: "继续添加",
                    cancelText: "取消"
                })
            } else {
                let activity = {
                    id: "",
                    name: v.name,
                    content: v.detail ? v.detail : "",
                    type: v.type,
                    start_time: formatTimestampUnsigne32(new Date(v.timeRange[0]).getTime()),
                    end_time: formatTimestampUnsigne32(new Date(v.timeRange[1]).getTime()),
                } as IActivityItem;
                if (v.alarmType != -1) {
                    let alarm = {
                        content: v.alarmDetail ? v.alarmDetail : "",
                        cron: formatTimestampUnsigne32(combineCorrectTime(v.alarmWeekday, v.alarmTime)),
                        type: v.alarmType
                    } as Alarm
                    activity.alarm = alarm;
                }
                //@ts-ignore
                let { data } = await createPersonalActivities(useUserStore.getState().id, activity);
                let arr = [] as Array<IActivityItem>;
                for (let _id in data.activities) {
                    let obj = {
                        ...data.activities[_id],
                        alarm: data.activities[_id].alarm ? {
                            ...data.activities[_id].alarm,
                            cron: data.activities[_id].alarm.cron * 1000,
                        } : null,
                        start_time: data.activities[_id].start_time * 1000,
                        end_time: data.activities[_id].end_time * 1000,
                        id: _id
                    } as IActivityItem
                    arr.push(obj);
                }
                useLogStore.getState().putLogs("添加了个人活动");
                useUserStore.getState().updateActivity(arr);
                props.connectActivityList(arr);
            }
        }

        load();
    }
    //冲突检测
    //获取活动和课程及考试信息
    //
    const checkConficts = (userInfo: any, timeRange: any) => {
        let activities = userInfo.activities;
        let courses = userInfo.courses;
        let time_arr = [];
        let time_range_start = new Date(timeRange[0]).getTime() / 1000;
        let time_range_end = new Date(timeRange[1]).getTime() / 1000;
        for (let item of activities as Array<IActivityItem>) {
            time_arr.push({ start: item.start_time, end: item.end_time, item: item })
        }
        for (let course of courses as Array<ICourseItem>) {
            for (let exam of course.exams as Array<IExamItem>) {
                time_arr.push({ start: parseInt(exam.date as string), end: parseInt(exam.date as string) + parseInt(exam.time as string) * 60, item: exam })
            }
            for (let time of course.time) {
                let baseDay = studyWeekBaseday[time.dow - 1];
                let course_start_time = courseStartTime[time.start - 1];
                let course_end_time = courseEndTime[time.end - 1];
                let start_time = new Date(baseDay + '-' + course_start_time).getTime() / 1000;
                let end_time = new Date(baseDay + '-' + course_end_time).getTime() / 1000;
                for (let i = 1; i <= 20; i++) {
                    time_arr.push({ start: start_time, end: end_time, item: course });
                    start_time += 60 * 60 * 24 * 7;
                    end_time += 60 * 60 * 24 * 7;
                }
            }
        }
        time_arr.sort((a, b) => a.start - b.start);
        for (let i of time_arr) {
            if (time_range_start >= i.start && time_range_start <= i.end
                || time_range_end <= i.end && time_range_end >= i.start
                || time_range_start <= i.start && time_range_end >= i.end) {
                return {
                    status: true,
                    conflictItem: i.item,
                    conflictMesg: "",
                    startTime: i.start,
                    endTime: i.end
                }
            }
        }

        return {
            status: false,
        };
    }
    return (
        <Form
            labelPosition='left'
            labelAlign='right'
            onSubmit={(v) => onSubmit(v)}
        >
            {(formState) => (
                <React.Fragment>
                    <Input field="name" label={{ text: "活动名称", required: true }} rules={[{ required: true, message: '请填写名称' }]} />
                    <DatePicker field="timeRange" type="dateTimeRange" label="活动时间" rules={[{ required: true, message: '请选择时间' }]}></DatePicker>
                    <TextArea field="detail" label="活动详情" initValue={""} />
                    <Select initValue={activityType.personal} field="type" label="活动类型" >
                        <Option value={activityType.personal}>个人</Option>
                        <Option value={activityType.group}>集体</Option>
                    </Select>
                    <Section text="闹钟设置">
                        <RadioGroup field="alarmType" noLabel initValue={-1}>
                            <Radio value={-1}>无</Radio>
                            <Radio value={alarmNotificationType.DAILY}>每天</Radio>
                            <Radio value={alarmNotificationType.ONCE_A_WEEK}>每周</Radio>
                            <Radio value={alarmNotificationType.ONLY_ONCE}>单次</Radio>
                        </RadioGroup>
                        {formState.values.alarmType == -1
                            ? <></>
                            :
                            <React.Fragment>
                                <TimePicker field="alarmTime" noLabel initValue={new Date(getTime())} minuteStep={60} secondStep={60} />
                                {formState.values.alarmType != alarmNotificationType.DAILY &&
                                    (<Select field="alarmWeekday" noLabel initValue={getCurrentWeekday(getTime())} optionList={weekSelect} />)}
                                <TextArea field="alarmDetail" label="活动提醒" />
                            </React.Fragment>
                        }
                    </Section>
                    <ButtonGroup >
                        <Button htmlType="reset" icon={<IconDelete />}></Button>
                        <Button htmlType="submit" >添加活动</Button>
                    </ButtonGroup>
                </React.Fragment>
            )}
        </Form>
    )
}
export default index;