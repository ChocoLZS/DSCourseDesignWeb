import { useCourseStore } from '@app/store/course/CourseStore'
import { Button, Form, Typography, Collapse, Modal, Skeleton, Switch } from '@douyinfe/semi-ui'
import { FC, useEffect, useState } from 'react'
import { COURSE_KEY, ICourseListItem } from '@app/typings/course'
import { mergeSort } from '@app/utils/sort&search/courses'
import Empty from "@app/components/empty"
import PopCard from "@app/components/coursePopCard"
import { useLogStore } from '@app/store/LogStore'
import { KMP } from '@app/utils/KMP'
interface IFormValues {
    CourseName?: string,
    SortType?: number,
}

const index: FC = () => {
    const [courses] = useCourseStore(state => [state.courses])
    const [loading, setLoading] = useState(false);
    const [items, setCourses] = useState({} as ICourseListItem);
    const [sortedItems, setSortedItems] = useState({} as ICourseListItem);
    const [formValue, setFormValue] = useState({} as IFormValues);
    const [timer, setTimer] = useState({} as NodeJS.Timeout | null);
    const selectList = [
        { value: COURSE_KEY.ID, lable: "课程id" },
        { value: COURSE_KEY.NAME, lable: "课程名称" },
        { value: COURSE_KEY.LOCATION, lable: "课程地点" },
        { value: COURSE_KEY.NOTE, lable: "课程详情" },
    ]
    const inputValueChange = (value: string) => {
        setLoading(true);
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }
        setTimer(setTimeout(() => {
            search(value);
            setLoading(false)
        }, 1000))
    }
    const search = (name: string | undefined) => {
        if (name === undefined || name === "") {
            setCourses(JSON.parse(JSON.stringify({ courses: courses })));
            useLogStore.getState().putLogs("查询了课程")
        }
        else {
            setCourses({ courses: courses.filter(item => KMP(item.name, name)) })
            useLogStore.getState().putLogs(
                `查询了课程,`
                , `查询词为: ${name}`)
        }
    }
    const sort = (key: number | undefined) => {
        if (key !== undefined && Object.keys(items).length)
            setSortedItems({ courses: mergeSort(JSON.parse(JSON.stringify(items.courses)), key) })
        else
            setSortedItems({ courses: JSON.parse(JSON.stringify(items.courses)) })
    }
    useEffect(() => {
        if (Object.keys(items).length)
            sort(formValue.SortType)
    }, [items])
    // useEffect(() => {
    //     setCourses(JSON.parse(JSON.stringify(data)));
    // }, [])
    const SuffixGroup: FC = () => {
        return (
            <>
                <Button onClick={() => search(formValue.CourseName)}>查询</Button>
            </>
        )
    }
    return (
        <>
            <Form onValueChange={values => setFormValue(values)}
                labelPosition='inset'
            >
                <Form.Input
                    width={"50%"}
                    field='CourseName'
                    label='课程名称'
                    placeholder='留空默认搜索全部课程'
                    suffix={<SuffixGroup />}
                    onEnterPress={() => search(formValue.CourseName)}
                    onChange={(value) => inputValueChange(value)}
                />
                {Object.keys(sortedItems).length !== 0 &&
                    (<Form.Select field="SortType" label="排序类型" style={{ width: "180px" }} placeholder="默认排序"
                        onSelect={(key) => sort(key as number)}
                    >
                        {selectList.map(item => (
                            <Form.Select.Option key={item.value} value={item.value}
                            >{item.lable}</Form.Select.Option>
                        ))}
                    </Form.Select>)}
            </Form>
            <Skeleton loading={loading}
                active
                placeholder={(
                    <>
                        {[0, 1, 2, 3, 4, 5].map((item) =>
                        (
                            <div key={item} >
                                <Skeleton.Title style={{ marginBottom: 10 }} ></Skeleton.Title>
                                <Skeleton.Paragraph style={{ marginBottom: 10 }} rows={2} ></Skeleton.Paragraph>
                            </div>
                        )
                        )}
                    </>
                )
                }
            >
                {Object.keys(sortedItems).length && sortedItems.courses.length ? (<Collapse accordion style={{ height: 300, overflowY: "auto", margin: "12px 0" }}>
                    {sortedItems.courses.map(item => (
                        <Collapse.Panel key={item.id} itemKey={item.id} header={item.name}
                            extra={(<Button size='small' theme='solid' type='tertiary'
                                onClick={(e) => { e.stopPropagation(); Modal.info({ 'content': <PopCard course={item} />, icon: null }) }}>更多</Button>)}>
                            <p>{item.location}</p>
                            <p>{item.note}</p>
                        </Collapse.Panel>
                    ))}
                </Collapse>) : (<Empty />)
                }
            </Skeleton >
        </>

    )
}
export default index