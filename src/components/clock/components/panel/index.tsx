import { FC, useState, forwardRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import { Tooltip } from "@douyinfe/semi-ui";
import { useTimeStore, SPEED_LEVEL } from "@app/store/TimeStore";
import './index.scss'
const index: FC = () => {
    const [isPaused, timeStart, timePause, timeAccelerater] = useTimeStore(state =>
        [state.isPaused, state.timeStart, state.timePause, state.timeAccelerater]);
    const WrapIcon = forwardRef((props, ref) => (
        //@ts-ignore
        <span {...props} ref={ref} style={{ fontSize: '16px', width: '16px' }}>
            {props.children}
        </span>
    ));
    const changeSpeed = (num: number) => {
        switch (num) {
            case SPEED_LEVEL.SPEED_5X:
                timeAccelerater(SPEED_LEVEL.SPEED_5X);
                break;
            case SPEED_LEVEL.SPEED_10X:
                timeAccelerater(SPEED_LEVEL.SPEED_10X);
                break;
            case SPEED_LEVEL.NORMAL_SPEED:
            default:
                timeAccelerater(SPEED_LEVEL.NORMAL_SPEED);
        }

    }
    return (
        <div id="clock-opration-panel" className="clock-operation-panel">
            {isPaused ?
                <Tooltip content={"开始"} position="bottom">
                    <WrapIcon>
                        <FontAwesomeIcon onClick={() => {
                            timeStart()
                        }} icon={solid('play')} />
                    </WrapIcon>
                </Tooltip>
                : <Tooltip content={"暂停"} position="bottom">
                    <WrapIcon>
                        <FontAwesomeIcon onClick={() => {
                            timePause()
                        }}
                            icon={solid('pause')} />
                    </WrapIcon>
                </Tooltip>
            }
            <Tooltip content={"常速"} position="bottom">
                <WrapIcon>
                    <FontAwesomeIcon onClick={() => changeSpeed(SPEED_LEVEL.NORMAL_SPEED)} icon={solid('forward-step')} />
                </WrapIcon>
            </Tooltip>
            <Tooltip content={"5倍速"} position="bottom">
                <WrapIcon>
                    <FontAwesomeIcon onClick={() => changeSpeed(SPEED_LEVEL.SPEED_5X)} icon={solid('forward')} />
                </WrapIcon>
            </Tooltip>
            <Tooltip content={"10倍速"} position="bottom">
                <WrapIcon>
                    <FontAwesomeIcon onClick={() => changeSpeed(SPEED_LEVEL.SPEED_10X)} icon={solid('forward-fast')} />
                </WrapIcon>
            </Tooltip>
        </div>
    )
}

export default index;