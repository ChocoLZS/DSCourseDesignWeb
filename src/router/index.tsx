import { FC, lazy } from "react";
import { useRoutes } from "react-router";
import { RouteObject } from "react-router"
import LayoutPage from "@app/pages/layout"
import { RouteComponentWrapper, RouteWithoutLayoutComponentWrapper } from "./routemiddleware";
import Login from "@app/pages/Login";

const Home = lazy(() => import('@app/pages/Home'))

const CourseList = lazy(() => import('@app/pages/course/list'));
const CourseInfo = lazy(() => import('@app/pages/course/material'));
const CourseWorkshop = lazy(() => import('@app/pages/course/courseWorkshop'));
const CourseNav = lazy(() => import('@app/pages/course/nav'));

const Exam = lazy(() => import('@app/pages/exam'));

const Activity = lazy(() => import('@pages/activity'));

const Test = lazy(() => import('@app/components/test'));

const Admin = lazy(() => import('@pages/admin'));

const Log = lazy(() => import('@pages/Log'));

export const routerList: RouteObject[] = [
    {
        path: "/", element: <RouteComponentWrapper element={<LayoutPage />} auth />,
        children: [
            { path: "home", element: <RouteComponentWrapper element={<Home />} auth />, },
            { path: "course/list", element: <RouteComponentWrapper element={<CourseList />} auth />, },
            { path: "course/material", element: <RouteComponentWrapper element={<CourseInfo />} auth />, },
            { path: "course/navi", element: <RouteComponentWrapper element={<CourseNav />} auth />, },
            {
                path: "course/:courseId", element: <RouteComponentWrapper element={<CourseWorkshop />} auth />,
                children: [
                    { path: "main", element: <RouteComponentWrapper auth />, },
                    { path: "work", element: <RouteComponentWrapper auth />, }
                ]
            },
            { path: "exam", element: <RouteComponentWrapper element={<Exam />} auth /> },
            { path: "admin", element: <RouteComponentWrapper element={<Admin />} auth admin /> },
            { path: "activity", element: <RouteComponentWrapper element={<Activity />} auth />, },
            { path: "log", element: <RouteComponentWrapper element={<Log />} auth />, },
            { path: "setting", element: <RouteComponentWrapper element={<div>setting page</div>} auth admin />, },
            { path: "test", element: <RouteComponentWrapper element={<Test />} auth />, },
        ],

    },
    {
        path: "/login", element: <RouteWithoutLayoutComponentWrapper element={<Login />} />,
    }
]

const RouterRender: FC = () => {
    return useRoutes(routerList);
}

export default RouterRender;