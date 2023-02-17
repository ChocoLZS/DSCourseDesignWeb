import { useEffect, FC, forwardRef, } from "react";
import useClockStore, { formatTime } from "./config";
import { getCurrentWeek, getCurrentWeekday, getCurrentWeekdayToString, useTimeStore } from "@app/store/TimeStore";
import { useInterval } from "@app/hooks/useInterval";
import './index.scss'

import ClockOperationPanel from "./components/panel"
import { Tooltip, Typography } from "@douyinfe/semi-ui";

const { Title } = Typography;
const index: FC = () => {
    const [delay, timeAdd, currentWeek] = useTimeStore(state => [state.delay, state.timeAdd, state.currentWeek])
    useInterval(() => {
        timeAdd()
    }, delay);
    const [timestamp] = useTimeStore(state => [state.timestamp]);
    const [ss, mm, hh, setClock] = useClockStore(state => [
        state.s, state.m, state.h, state.setClock
    ])
    useEffect(() => {
        const time = formatTime(timestamp, "");
        setClock(time);
    }, [timestamp])
    const ClockDisplay = forwardRef((props, ref) => (
        //@ts-ignore
        <div {...props} ref={ref}>
            <span>{hh}</span>
            <span>:</span>
            <span>{mm}</span>
            <span>:</span>
            <span>{ss}</span>
            <Title heading={5} style={{ color: 'var( --semi-color-text-2)' }} >{getCurrentWeekdayToString(getCurrentWeekday(timestamp))}</Title>
        </div>
    ));
    return (
        <div className="clock">
            <Tooltip content={new Date(timestamp).toLocaleString()} position="right">
                <ClockDisplay />
            </Tooltip>
            <ClockOperationPanel />
        </div>
    );
}
export default index;