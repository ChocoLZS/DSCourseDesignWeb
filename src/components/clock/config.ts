import create from "zustand";

interface clockProps {
    second?: string,
    minute?: string,
    hour?: string,
}

interface clockState {
    s?: string,
    m?: string,
    h?: string,
    setClock: (obj: clockProps) => void,
}

const useClockStore = create<clockState>((set, get) => ({
    s: '',
    m: '',
    h: '',
    setClock: (obj) => {
        set({ s: obj.second, m: obj.minute, h: obj.hour });
    }
}))

export function formatTime(timestamp: number, format: string): clockProps {
    const dateobj = new Date(timestamp);
    const [h, m, s] = dateobj.toTimeString().split(/[\:\ ]/g).slice(0, 3);
    return {
        second: s,
        minute: m,
        hour: h,
    }
}

export default useClockStore;