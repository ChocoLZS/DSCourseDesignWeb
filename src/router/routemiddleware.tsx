import { FC, Suspense, useEffect } from "react";
import { RouteProps, useLocation } from "react-router";
import { Navigate } from 'react-router-dom'
import NotFound from "@app/components/notFound"
import { userInfoFormatTime, useUserStore } from "@app/store/User";
import SuspendFallbackLoading from "@app/components/fallback-loading";
import Login from "@app/pages/Login"
import { getStudentInfo } from "@app/api/student";
import { UserRole } from "@typings/user"
import { useCourseStore } from "@app/store/course/CourseStore";
import { useLogStore } from "@app/store/LogStore";

export interface RouteWrapperProps extends RouteProps {
    auth?: boolean;
    title?: string;
    admin?: boolean;
}

const PublicRoute = (props: RouteWrapperProps) => {
    return props.element;
}

//@ts-ignore
const PrivateRoute: FC<RouteWrapperProps> = (props) => {
    const location = useLocation();
    const { pathname } = location;
    const [userRole, id, userInfo, setUser] = useUserStore(i => [i.userRole, i.id, i.userInfo, i.setUser]);
    const [setCourse] = useCourseStore(i => [i.setCourses]);
    useEffect(() => {
        const load = async () => {
            if (id) {
                let { data } = await getStudentInfo(id as string);
                useLogStore.getState().putCustomizeLogs(`${data.name} 登陆了系统`)
                setUser({ id: id, role: userRole as UserRole, info: userInfoFormatTime(data) })
                setCourse(data.courses);
            }
        }
        if (userInfo === null)
            load();
    }, []);
    if (props.admin && userRole !== 'administrator')
        return (<div>not found</div>)
    return userRole !== null
        ? (
            pathname === '/'
                ? (<Navigate replace to="/course/navi" />)
                : (props.element)
        )
        : (
            <Navigate replace to="/login" state={{ to: pathname }} />
        )
}

export const RouteComponentWrapper: FC<RouteWrapperProps> = ({ title, auth, admin, ...props }) => {
    const WhichRoute = auth ? PrivateRoute : PublicRoute;
    document.title = title ? title : "DSCourses";
    //@ts-ignore
    return props.element ? <WhichRoute {...props} admin={admin} /> : <NotFound />;
}

export const RouteWithoutLayoutComponentWrapper: FC<RouteWrapperProps> = ({ title, auth, ...props }) => {
    document.title = title ? title : "DSCourses";
    return <Suspense fallback={<SuspendFallbackLoading message="正在加载" />}>{props.element}</Suspense>
}