import { TabPane, Tabs } from '@douyinfe/semi-ui';
import { PlainTab } from '@douyinfe/semi-ui/lib/es/tabs';
import { FC, useState } from 'react'
import CourseManage from './CourseManage';
import ExamManage from './ExamManage';
import "./index.scss"
const index: FC = () => {
    const [key, setKey] = useState('1');
    const tabList = [
        { tab: "课程管理", itemKey: '1', element: <CourseManage /> },
        { tab: "考试管理", itemKey: '2', element: <ExamManage /> },
    ]
    return (
        <>
            <Tabs>
                {tabList.map((item, index) =>
                (
                    <TabPane tab={item.tab} key={item.itemKey} itemKey={item.itemKey}>
                        {item.element}
                    </TabPane>
                )
                )}
            </Tabs>
        </>
    )
}

export default index;