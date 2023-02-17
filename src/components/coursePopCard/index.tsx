import { FC } from "react";
import { ICourseDurationItem, ICourseItem, ICourseItemWrap } from "@app/typings/course";
import { List, Button, Modal } from "@douyinfe/semi-ui";
import { IconEditStroked, IconMapPin, IconAscend, IconClock, IconUser } from "@douyinfe/semi-icons";
import { getCurrentWeekdayToString } from "@app/store/TimeStore";
import { useUserStore } from "@app/store/User";
import CourseForm from '@pages/admin/components/CourseForm'


interface Props extends ICourseItemWrap<ICourseItem> {
    schedule?: boolean
}

const index: FC<Props> = (props) => {
    const TimeContent = (time: Array<ICourseDurationItem>) =>
    (
        <>
            {time.map((i, index) => (
                <span key={index} style={{ marginRight: '6px' }}>
                    <span>{i.start}-{i.end},</span>
                    <span>{getCurrentWeekdayToString(i.dow)}</span>
                </span>
            ))}
        </>
    )
    const data = [
        {
            title: "课程名称",
            content: props.course.name,
            icon: < IconEditStroked style={{ fontSize: 36 }} />
        }, {
            title: "任课教师",
            content: props.course.teacher,
            icon: <IconUser style={{ fontSize: 36 }} />
        },
        {
            title: "上课时间",
            content: TimeContent(props.course.time),
            icon: <IconClock style={{ fontSize: 36 }} />
        },
        {
            title: "上课地点",
            content: props.course.location,
            icon: <IconMapPin style={{ fontSize: 36 }} />
        }, {
            title: "详细信息",
            content: props.course.note,
            icon: <IconAscend style={{ fontSize: 36 }} />
        }
    ]
    return (
        <>
            <h3 style={{ textAlign: 'center', fontSize: 24, margin: 40 }}>{"课程信息"}</h3>
            <List
                dataSource={data}
                renderItem={
                    item => (<List.Item
                        header={item.icon}
                        main={
                            <div>
                                <h6 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{item.title}</h6>
                                <p style={{ marginTop: 4, color: 'var(--semi-color-text-1)' }}>{item.content}</p>
                            </div>
                        }
                    />)
                }>

            </List>
            {useUserStore.getState().userRole == 'administrator' && props.schedule
                ? <Button block onClick={(e) => {
                    e.stopPropagation(); Modal.info({
                        style: { width: '540px' },
                        content: <CourseForm course={props.course} conncectCourseList={console.log} update schedule={props.schedule} />,
                        icon: null,
                        footer: null
                    })
                }}>修改</Button>
                : <></>}
        </>
    )
}
export default index;