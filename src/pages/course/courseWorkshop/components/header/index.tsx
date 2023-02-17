import { FC } from "react";
import { Card, Layout, Typography, Descriptions } from "@douyinfe/semi-ui"
import { ICourseItem } from "@app/typings/course";
const { Header } = Layout;
const { Title } = Typography;
const index: FC<ICourseItem> = (course) => {
    const descriptionsData = [
        //     {
        //     key: '近期考试', value: '无'
        // }, 
        { key: '上课地点', value: course.location }]
    return (
        <Header>
            <Card shadows='hover'>
                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                    <div>
                        <Title heading={2}>{course.name}</Title>
                        <p>{course.location}</p>
                    </div>
                    <Descriptions data={descriptionsData} row ></Descriptions>
                </div>
            </Card>
        </Header>
    )
}
export default index;