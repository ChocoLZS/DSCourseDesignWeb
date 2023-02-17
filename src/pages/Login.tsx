import { getStudentInfo } from "@app/api/student";
import { useLoading } from "@app/hooks/useLoading";
import { useCourseStore } from "@app/store/course/CourseStore";
import { useLogStore } from "@app/store/LogStore";
import { userInfoFormatTime, useUserStore } from "@app/store/User";
import { UserRole } from "@app/typings/user";
import { Button, Card, Input } from "@douyinfe/semi-ui";
import { ValidateStatus } from "@douyinfe/semi-ui/lib/es/input";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import './Login.scss'

interface loginProps {
    to?: string;
}

const index: FC = () => {
    const [userRole, setUser] = useUserStore(i => [i.userRole, i.setUser]);
    const [setCourse] = useCourseStore(i => [i.setCourses]);
    const [id, setId] = useState("2077111222");
    const { loading } = useLoading();
    const [validateStatus, setValidateStatus] = useState('default' as ValidateStatus);

    const navigate = useNavigate();
    const { state } = useLocation();
    const loadUser = async (role: UserRole) => {
        if (role === 'student') {
            if (!id.match(/^[1-9][0-9]*$/g)) {
                setValidateStatus('error');
                return;
            }
        }
        let { data } = await getStudentInfo(role === 'administrator' ? '1' : id);
        if (role === 'student')
            setValidateStatus('default');
        setUser({ role: role, id: role === 'administrator' ? '1' : id, info: userInfoFormatTime(data) });
        setCourse(data.courses);
        useLogStore.getState().putCustomizeLogs(`${data.name} 登陆了系统`);
        navigate(state && state.to ? state.to : "/home");
    }
    const valueOnChange = (v: string) => {
        setId(v);
        if (!v.match(/^[1-9][0-9]*$/g)) {
            setValidateStatus('error');
        } else {
            setValidateStatus('default');
        }
    }
    useEffect(() => {
        if (userRole)
            navigate("/home")
    }, []);
    return (
        <div className="login-page">
            <Card shadows="always">
                <Input validateStatus={validateStatus} value={id} onChange={(v) => valueOnChange(v)} placeholder={"学号"} style={{ marginBottom: '12px' }} suffix={
                    <Button icon={<FontAwesomeIcon icon={solid('graduation-cap')} />} loading={loading} onClick={() => loadUser('student')} >学生登陆</Button>
                }></Input>
                <Button icon={<FontAwesomeIcon icon={solid('user-gear')} />} loading={loading} onClick={() => { loadUser('administrator') }} block>管理员登陆</Button>
            </Card>
        </div>
    )
}

export default index;