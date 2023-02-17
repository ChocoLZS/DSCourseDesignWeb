import { FC, useEffect, useState, Suspense, lazy } from "react";
import { useParams, useLocation, Outlet, useNavigate } from "react-router";
import { useCourseStore } from "@app/store/course/CourseStore"
import { COURSE_KEY, ICourseItem } from "@app/typings/course";
import { binarySearchByKey } from "@app/utils/sort&search/courses";
import { useNavTagStore } from "@app/store/common/TagStore";
import SuspendFallbackLoading from "@app/components/fallback-loading";
import { Layout, Tabs, TabPane, Button } from "@douyinfe/semi-ui";
import Header from "./components/header"
import { useUserStore } from "@app/store/User";
const { Content } = Layout
const MainPage = lazy(() => import('./components/main'));
const WorkPage = lazy(() => import('./components/work'));
const ExamPage = lazy(() => import('./components/exam'));
const index: FC = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { courseId } = useParams();
    const [course, setCourse] = useState({} as ICourseItem);
    const [activedTagId, addTag] = useNavTagStore((state) =>
        [state.navheaderactivedTagId, state.navheaderaddTag]);
    const location = useLocation();
    useEffect(() => {
        let courses = useUserStore.getState().userInfo?.courses;
        if (courses) {
            if (courses.length) {
                let i = binarySearchByKey(courses, courseId as string, COURSE_KEY.ID);
                if (i !== null) {
                    setCourse(i);
                    addTag(
                        {
                            id: i.id,
                            path: location.pathname,
                            text: i.name,
                            closable: true
                        }
                    )
                }
            }
        }

    }, [pathname])
    useEffect(() => {
        let courses = useUserStore.getState().userInfo?.courses;
        if (courses) {
            if (courses.length) {
                let i = binarySearchByKey(courses, courseId as string, COURSE_KEY.ID);
                if (i !== null) {
                    setCourse(i);
                    addTag(
                        {
                            id: i.id,
                            path: location.pathname,
                            text: i.name,
                            closable: true
                        }
                    )
                }
            }
        }

    }, [])
    const tabList = [
        {
            text: "主页",
            content: <MainPage id={courseId} course={course} />
        }, {
            text: "作业",
            content: <WorkPage id={courseId} name={course.name} homework={course.homework} />
        }
    ]
    const CourseDetail: FC = () => {
        return (
            <>
                <Layout>
                    <Header {...course} />
                    <Content>
                        <Tabs type="line">
                            {tabList.map((obj, idx) => (
                                <TabPane tab={obj.text} itemKey={idx.toString()} key={idx.toString()}>
                                    {obj.content}
                                </TabPane>
                            ))}
                        </Tabs>
                    </Content>
                </Layout>
            </>
        )
    }
    return (
        <Suspense fallback={<SuspendFallbackLoading message="正在加载中" />}>
            <CourseDetail />
        </Suspense>
    )
}
export default index;