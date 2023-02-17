import { Card, CardGroup, Typography, Slider, List, Avatar } from "@douyinfe/semi-ui";
import { FC, useEffect, useState } from "react"
import { useLoading } from "@app/hooks/useLoading";
import { useCourseStore } from "@app/store/course/CourseStore"
import { useNavigate } from "react-router";
import { ICourseItem } from "@app/typings/course";

const { Meta } = Card;
const { Text } = Typography;
const index: FC = () => {
    const navigate = useNavigate();

    const { loading } = useLoading();
    const [courses] = useCourseStore(state => [state.courses]);
    const clickHandler = (item: ICourseItem) => {
        navigate('/course/' + item.id);
    }
    return (
        <div className="material-container">
            <Card title="课程列表"
                loading={loading}
                bordered={false}
            >
                <CardGroup type="grid">
                    {courses.map((item, index) => (
                        <Card
                            key={item.id}
                            shadows="hover"
                            headerLine={false}
                            title={<Meta title={item.name} />}
                            footer={
                                <div>
                                    {item.note}
                                </div>
                            }
                            headerExtraContent={<Text onClick={() => { clickHandler(item) }} link>详情</Text>}
                        >
                            {item.location}
                        </Card>
                    ))}
                </CardGroup>
            </Card>
        </div>
    )
}
export default index;