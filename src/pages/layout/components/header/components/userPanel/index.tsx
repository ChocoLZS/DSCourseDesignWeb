import { FC, useState, forwardRef, useEffect } from "react"
import { Avatar, Button, Card, Dropdown, Typography } from "@douyinfe/semi-ui";
import { useUserStore } from "@app/store/User";
import './index.scss'
import { IconExit } from "@douyinfe/semi-icons";
import { useLogStore } from "@app/store/LogStore";

const { Meta } = Card;
const { Title, Text } = Typography
export const UserPanel: FC = () => {
    const [userRole, userInfo, removeUser] = useUserStore(i => [i.userRole, i.userInfo, i.removeUser])
    // const [showPop, setShowPop] = useState(false);
    const UserAvatar = forwardRef((props, ref) => {
        return (
            <Avatar {...props} ref={ref} color="orange" size="small" >
                {userRole === 'student' ? userInfo?.name : 'A'}
            </Avatar>
        )
    })
    const PopContent: FC = () => {
        return (
            <Button block>clickme</Button>
            // <Card title={
            //     (
            //         <Meta title={userRole} avatar={<UserAvatar />}>
            //         </Meta>
            //     )
            // }
            //     className="user-panel-popover"
            // >

            // </Card>
        )
    }
    return (
        <Dropdown trigger="click" position="bottomRight"
            style={{ width: '205px' }}
            render={(
                <Dropdown.Menu>
                    <Dropdown.Title style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <UserAvatar />
                        <span style={{ marginLeft: '12px' }}>
                            <Title heading={6}>{userRole}</Title>
                            <Text type="quaternary">{"hello"}</Text>
                        </span>
                    </Dropdown.Title>
                    <Dropdown.Divider></Dropdown.Divider>
                    <Dropdown.Item icon={<IconExit />} onClick={() => { useLogStore.getState().putCustomizeLogs(`${userInfo?.name} 退出了系统`); removeUser() }}>
                        {"登出"}
                    </Dropdown.Item>
                </Dropdown.Menu>
            )}
        >
            <UserAvatar style={{ cursor: 'pointer' }} />
        </Dropdown>
    )
}

export default UserPanel;
