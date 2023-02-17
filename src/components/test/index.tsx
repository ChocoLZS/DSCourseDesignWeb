import { dijkstra, dijkstraByTime, heapDijkstra, heapDijkstraByTime } from "../../utils/dijkstra";
import { useTimeStore } from "@app/store/TimeStore";
import { useUserStore } from "@app/store/User";
import { Button } from "@douyinfe/semi-ui";
import { FC } from "react";
import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware'
const index: FC = () => {
    const { timeAdd } = useTimeStore.getState();
    const onClick = () => {
        let { dist, path } = dijkstraByTime(shahemap, 0, 2);
        let { dist: _dist, path: _path } = heapDijkstraByTime(shahemap, 0, 2);
        console.log(dist.toString() == _dist.toString());
        console.log(path.toString() == _path.toString());
    }
    return (
        <div id="map">
            <Button onClick={() => onClick()}>输出</Button>
        </div>
    )
}

export default index;