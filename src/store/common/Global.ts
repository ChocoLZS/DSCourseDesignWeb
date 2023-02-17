import { getLocalStorage } from "@app/utils/storage";
import create from 'zustand'

export interface GlobalState {
    loading: boolean,
    fakeLoading: boolean,
    fakeLoadingTrigger: () => void;
    toogleLoading: (i: boolean) => void
}

const store = create<GlobalState>((set, get) => ({
    loading: false,
    fakeLoading: false,
    fakeLoadingTrigger: () => {
        new Promise((res) => {
            set({ fakeLoading: true })
            setTimeout(res, 500);
        }).finally(() => { set({ fakeLoading: false }) });
    },
    toogleLoading: (i = false) => set({ loading: i }),
}))

const { getState, setState, subscribe, destroy } = store;

export { getState, setState, subscribe, destroy };

export default store;