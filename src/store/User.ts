import create from 'zustand';
import { IUser, UserRole } from "@typings/user"
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@app/utils/storage';
import { IStudentItemWithICourseItem } from '@app/typings/student';
import { IActivityItem } from '@app/typings/activity';
import _ from 'lodash';
interface UserStore {
    userRole: UserRole | null;
    id: string | null;
    userInfo: IStudentItemWithICourseItem | null;
    setUser: (u: IUser) => void;
    removeUser: () => void;
    updateActivity: (activities: Array<IActivityItem>) => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
    userRole: getLocalStorage("UserRole") as (UserRole | null),
    id: getLocalStorage("UserId") as (string | null),
    userInfo: null,
    setUser: (info: IUser) => {
        set({ userRole: info.role, id: info.id, userInfo: info.info })
        setLocalStorage("UserRole", info.role);
        setLocalStorage("UserId", info.id);
    },
    removeUser: () => {
        removeLocalStorage("UserId");
        removeLocalStorage("UserRole");
        set({ userRole: null, id: null, userInfo: null })
    },
    updateActivity: (activitiesList) => {
        const { userInfo } = get();
        //@ts-ignore
        set({
            userInfo: {
                ...userInfo,
                activities: activitiesList
            }
        })

    }
}))

export function userInfoFormatTime(raw: IStudentItemWithICourseItem): IStudentItemWithICourseItem {
    for (let item of raw.activities) {
        item.start_time = item.start_time * 1000;
        item.end_time = item.end_time * 1000;
        if (item.alarm)
            item.alarm.cron = item.alarm?.cron * 1000;
    }
    return raw;
}

