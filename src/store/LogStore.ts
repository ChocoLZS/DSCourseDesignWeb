//[time] name did what
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@app/utils/storage';
import create from 'zustand';
import { useTimeStore } from './TimeStore';
import { useUserStore } from './User';

const MAX_LOGS = 100;

interface LogState {
    logs: Array<string>,
    putLogs: (act: string, ...args: any[]) => void;
    putCustomizeLogs: (notes: string, ...args: any[]) => void;
    removeLogs: () => void;
}

export const useLogStore = create<LogState>((set, get) => ({
    logs: JSON.parse(getLocalStorage(`${useUserStore.getState().id}_logs`)) as Array<string> || [],
    putLogs: (act: string, ...args: any[]) => {
        const { logs } = get();
        if (logs.length >= 100) {
            logs.shift();
        }
        logs.push(getPrefix() + ' ' + act + ' ' + args + '\n')
        set({ logs: logs })
        setLocalStorage(`${useUserStore.getState().id}_logs`, JSON.stringify(logs))
    },
    putCustomizeLogs: (notes: string, ...args: any[]) => {
        const { logs } = get();
        if (logs.length >= 100) {
            logs.shift();
        }
        logs.push(getTimePrefix() + notes + ' ' + args + '\n');
        set({ logs: logs })
        setLocalStorage(`${useUserStore.getState().id}_logs`, JSON.stringify(logs))
    },
    removeLogs: () => {
        set({ logs: [] });
        removeLocalStorage(`${useUserStore.getState().id}_logs`)
    }
}))

function getPrefix(): string {
    //@ts-ignore
    let name = useUserStore.getState().userInfo.name ? useUserStore.getState().userInfo.name : "管理员"
    return getTimePrefix() + name;
}

function getTimePrefix(): string {
    let timestamp = useTimeStore.getState().timestamp;
    let date = new Date(timestamp);
    const [h, m, s] = date.toTimeString().split(/[\:\ ]/g).slice(0, 3);
    let prefix = '[' + date.toLocaleDateString() + ' ' + h + ':00' + '] '
    return prefix;
}