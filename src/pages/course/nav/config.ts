import { heapDijkstra, heapDijkstraByTime, calcTime } from "@app/utils/dijkstra";
import { Strategy } from "@app/utils/dijkstra";
import { shahemap, buptmap, shaheMapping, buptMapping } from "./data";
//获取同校区的道路信息
export const getPartPathinfo = (school_loc: string, start_loc: number, end_loc: number, speed: number, strategy: number): InnerPart => {
    let paths = school_loc == "沙河校区" ? shahemap : buptmap;
    let distPathinfo = heapDijkstra(paths, start_loc);
    let timePathInfo = heapDijkstraByTime(paths, start_loc, speed);
    let pathinfo = strategy === Strategy.distance ? distPathinfo : timePathInfo;
    let path: Array<number> = []
    let p = end_loc
    while (p !== start_loc) {
        path.push(p);
        p = pathinfo.path[p][0];
    }
    path.push(start_loc)
    path = path.reverse();
    let _time = 0;
    let _dist = 0;
    if (strategy === Strategy.time) {
        _time = pathinfo.dist[end_loc];
        for (let i = 1; i < path.length; i++) {
            let next = paths[path[i - 1]].neighbors.find(item => item.id === path[i]);
            //@ts-ignore
            _dist += next.w;
        }
    } else if (strategy === Strategy.distance) {
        _dist = pathinfo.dist[end_loc];
        for (let i = 1; i < path.length; i++) {
            let next = paths[path[i - 1]].neighbors.filter(item => item.id === path[i]);
            _time += calcTime(next[0].w, speed, next[0].c, next[0].isBicycleEable);
        }
    }
    return {
        start: school_loc,
        end: school_loc,
        isCross: false,
        part_path: path,
        part_time: _time,
        part_dist: _dist,
        pathinfo: pathinfo.path,
    }
}
//获取起始点与终点跨校区的道路信息
export const getPartCrossPathInfo = (
    startmap: any, start_school: string, start_loc: number, start_exit: number,
    endmap: any, end_school: string, end_entry: number, end_loc: number,
    speed: number, strategy: number
): CrossPart => {
    let start_pathinfo = strategy === Strategy.distance ? heapDijkstra(startmap, start_loc) : heapDijkstraByTime(startmap, start_loc, speed);
    let end_pathinfo = strategy === Strategy.distance ? heapDijkstra(endmap, end_entry) : heapDijkstraByTime(endmap, end_entry, speed);
    let start_path: Array<number> = []
    let p = start_exit
    while (p !== start_loc) {
        start_path.push(p);
        p = start_pathinfo.path[p][0];
    }
    start_path.push(start_loc)
    start_path = start_path.reverse();
    let end_path: Array<number> = []
    let k = end_loc
    while (k !== end_entry) {
        end_path.push(k);
        k = end_pathinfo.path[k][0];
    }
    end_path.push(end_entry)
    end_path = end_path.reverse();
    let _time = 0;
    let _dist = 0;
    let _start_time = 0;
    let _end_time = 0;
    let _start_dist = 0;
    let _end_dist = 0;
    if (strategy === Strategy.time) {
        _start_time += start_pathinfo.dist[start_exit];
        for (let i = 1; i < start_path.length; i++) {
            let next = startmap[start_path[i - 1]].neighbors.find(item => item.id === start_path[i]);
            //@ts-ignore
            _start_dist += next.w;
        }
        _end_time += end_pathinfo.dist[end_loc];
        for (let i = 1; i < end_path.length; i++) {
            let next = endmap[end_path[i - 1]].neighbors.find(item => item.id === end_path[i]);
            //@ts-ignore
            _end_dist += next.w;
        }
    } else if (strategy === Strategy.distance) {
        _start_dist += start_pathinfo.dist[start_exit];
        for (let i = 1; i < start_path.length; i++) {
            let next = startmap[start_path[i - 1]].neighbors.filter(item => item.id === start_path[i]);
            _start_time += calcTime(next[0].w, speed, next[0].c, next[0].isBicycleEable);
        }
        _end_dist += end_pathinfo.dist[end_loc];
        for (let i = 1; i < end_path.length; i++) {
            let next = endmap[end_path[i - 1]].neighbors.filter(item => item.id === end_path[i]);
            _end_time += calcTime(next[0].w, speed, next[0].c, next[0].isBicycleEable);
        }
    }
    return {
        start: start_school,
        end: end_school,
        isCross: true,
        part_start_path: start_path,
        part_end_path: end_path,
        part_start_time: _start_time,
        part_end_time: _end_time,
        part_start_dist: _start_dist,
        part_end_dist: _end_dist,
        part_time: _start_time + _end_time,
        part_dist: _start_dist + _end_dist,
        start_pathinfo: start_pathinfo.path,
        end_pathinfo: end_pathinfo.path
    }
}
//eg  11:20
const getMinutes = (time: string) => {
    let arr = time.split(":");
    return parseInt(arr[0]) * 60 + parseInt(arr[1]);
}
export const getBusSchedule = (currentTime: string, scheduleList: Array<string>, scheduleName: string) => {
    let bias = -1;
    let bus_time = "";
    for (let time of scheduleList) {
        if (getMinutes(currentTime) <= getMinutes(time)) {
            bias = getMinutes(time) - getMinutes(currentTime);
            bus_time = time;
            break;
        }
    }
    return {
        time: bus_time,
        bias: bias,
        type: scheduleName,
    }
}
export const getBestBus = (a: BusInfo, b: BusInfo) => {
    let obj = {
        time: "",
        bias: -1,
        type: ""
    }
    if (a.bias == -1 && b.bias == -1) {
        return obj;
    }
    if (a.bias == -1) {
        return b;
    }
    if (b.bias == -1) {
        return a;
    }
    if (a.bias < b.bias)
        return a;
    else
        return b;
}

export const calcMutiplePath = (pathinfo_arr: Array<InnerPart | CrossPart>): Array<Node | null> => {
    let node_list = [] as Array<Node | null>;
    for (let index = pathinfo_arr.length - 1; index >= 0; index--) {
        if (pathinfo_arr[index].isCross) {
            let _item = pathinfo_arr[index] as CrossPart
            let start_mapping = _item.start == "沙河校区" ? shaheMapping : buptMapping;
            let end_mapping = _item.end == "沙河校区" ? shaheMapping : buptMapping;
            node_list.push(calcPartNamedPath(_item.part_end_path[0], _item.part_end_path[_item.part_end_path.length - 1], end_mapping, _item.end_pathinfo, _item.end));
            node_list.push(calcPartNamedPath(_item.part_start_path[0], _item.part_start_path[_item.part_start_path.length - 1], start_mapping, _item.start_pathinfo, _item.start));
        } else {
            let _item = pathinfo_arr[index] as InnerPart;
            let mapping = _item.start == "沙河校区" ? shaheMapping : buptMapping;
            node_list.push(calcPartNamedPath(_item.part_path[0], _item.part_path[_item.part_path.length - 1], mapping, _item.pathinfo, _item.start));
        }
    }
    return node_list;
}
//倒序树,根为终点,叶子为起点
export const calcPartNamedPath = (start_loc: number, end_loc: number, mapping, pathinfo: Array<Array<number>>, school: string): Node | null => {
    if (start_loc == end_loc)
        return new Node(`${school},${mapping[start_loc].name}`);
    let p = end_loc;
    let node = new Node(`${school},${mapping[p].name}`);
    for (let pre of pathinfo[p]) {
        node.addChildren(calcPartNamedPath(start_loc, pre, mapping, pathinfo, school));
    }
    return node;
}
//根据树来生成路径数组,深度优先
export const generatePathArrayFromTree = (root: Node | null, prefix: string, paths: Array<string>) => {
    if (root?.children.length == 0) {
        paths.push(prefix + `${root.name}`);
        return;
    }
    prefix = prefix.concat(`${root.name}|`)
    for (let child of root.children) {
        generatePathArrayFromTree(child, prefix, paths);
    }

}

export interface BusInfo {
    time: string,
    bias: number,
    type: string
}

export interface ParentPart {
    isCross: boolean,
    start: string,
    end: string,
    part_time: number,
    part_dist: number,
}
export interface InnerPart extends ParentPart {
    part_path: Array<number>,
    pathinfo: Array<Array<number>>,
}
export interface CrossPart extends ParentPart {
    part_start_path: Array<number>,
    part_end_path: Array<number>,
    part_start_time: number,
    part_end_time: number,
    part_start_dist: number,
    part_end_dist: number,
    start_pathinfo: Array<Array<number>>,
    end_pathinfo: Array<Array<number>>,
}

//路径生成树
class Node {
    name: string;
    children: Array<Node>;
    constructor(name: string) {
        this.name = name;
        this.children = new Array<Node>();
    }

    addChildren(child: Node | null) {
        if (child != null)
            this.children.push(child);
    }
}