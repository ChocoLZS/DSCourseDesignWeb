import _ from "lodash";

const INF = Number.MAX_SAFE_INTEGER

export const Speed_walk = 1.5;
export const Speed_bicycle = 5.5;

export enum Strategy {
    distance,
    time
}

//小根堆
class Heap {
    compare: Function;
    list: Array<Node>
    constructor(compare?: Function) {
        //@ts-ignore
        this.list = [0];//添加一个值把0占住，数据从下标为1开始
        this.compare =
            compare instanceof Function ? compare : this.defaultCompare;
    }

    defaultCompare(a: Node, b: Node) {
        return a.w < b.w;
    }

    swap(x: number, y: number) {
        const t = this.list[x]
        this.list[x] = this.list[y]
        this.list[y] = t
    }

    isEmpty() {
        return this.list.length === 1
    }

    getSize() {
        return this.list.length - 1
    }

    top() {
        return this.list[1]
    }

    left(x: number) {
        return 2 * x;
    }

    right(x: number) {
        return 2 * x + 1
    }

    parent(x: number) {
        return Math.floor(x / 2)
    }

    push(val: Node) {
        // 新增数据，向堆尾添加
        this.list.push(val)
        this.up(this.list.length - 1)
    }

    // 上浮
    up(k: number) {
        const { list, parent, compare } = this;
        while (k > 1 && compare(list[k], list[parent(k)])) {
            this.swap(parent(k), k)
            k = parent(k)
        }
    }

    pop() {
        const { list } = this
        if (list.length === 0) return null
        this.swap(1, list.length - 1)
        const top = list.pop()
        this.down(1)
        return top
    }

    down(k: number) {
        const { list, left, right, compare } = this
        const size = this.getSize()
        while (left(k) <= size) {
            let _left = left(k)
            if (right(k) <= size && compare(list[right(k)], list[_left])) {
                _left = right(k)
            }
            if (compare(list[k], list[_left])) return
            this.swap(k, _left)
            k = _left
        }
    }
}

//堆结点
class Node {
    w: number;
    preId: number;
    nodeId: number;
    constructor(w: number, preId: number, nodeId: number) {//权值, 前一个点Id, 当前点Id
        this.w = w;
        this.preId = preId;
        this.nodeId = nodeId;
    }
}

//已弃用
function minDistance(dist: number[], visited: boolean[]) {
    let min = INF
    let minIndex = -1
    for (let i = 0; i < dist.length; i++) {
        if (!visited[i] && dist[i] < min) {
            minIndex = i
            min = dist[i]
        }
    }
    return minIndex
};

//计算通过一条路的时间
export const calcTime = function (w: number, speed: number, c: number, isBicycleEable: boolean) {
    let realSpeed = speed;
    if (speed == Speed_bicycle && isBicycleEable)//自行车优先策略并且这条道允许自行车通行
        realSpeed = Speed_bicycle;
    else
        realSpeed = Speed_walk;
    return w / (realSpeed * (1 - c));
}

//已弃用，改为堆优化版本。
//若自行车优先策略，则根据路段情况选择速度，根据speed选择是否自行车优先
export function dijkstraByTime(paths: any, src: number, speed: number) {
    let arr_edge = Array.from(Array(paths.length), () => new Array());//清空arr_edge
    for (let i = 0; i < arr_edge.length; i++) {
        let u = paths[i].id
        for (let neighbor of paths[i].neighbors) {
            let v = neighbor.id, w = neighbor.w, c = neighbor.c
            arr_edge[u].push({ "u": u, "v": v, "w": w, "c": c });//出发地id，目的地id，边权，拥挤程度
        }
    }
    let dist: number[] = []
    let visited = []
    let length = arr_edge.length
    let path = []
    for (let i = 0; i < length; i++) {
        dist[i] = INF
        path[i] = INF
        visited[i] = false
    }
    dist[src] = 0
    path[src] = src
    for (let j = 0; j < length - 1; j++) {
        let u = minDistance(dist, visited)
        if (u !== -1) {
            visited[u] = true
            if (dist[u] != INF)//u首先是能到达的
                for (let i = 0; i < arr_edge[u].length; i++) {
                    let v = arr_edge[u][i]["v"];
                    let w = arr_edge[u][i]["w"];
                    let c = arr_edge[u][i]["c"];
                    let isBicycleEable = arr_edge[u][i]["isBicycleEable"];
                    if (!visited[v]) {
                        let time = calcTime(w, speed, c, isBicycleEable)
                        if (dist[v] == INF || dist[u] + time < dist[v]) {
                            dist[v] = dist[u] + time;
                            path[v] = u;
                        }
                    }
                }
        }
    }
    let timePathInfo = {
        dist: dist,
        path: path
    }
    // timePathInfo.dist = dist;//调用pathInfo.dist来传数据
    // timePathInfo.path = path;
    // console.log(pathInfo);
    return timePathInfo;
}

//已弃用，改为堆优化版本。
//是否是自行车优先策略，对路程最小策略的路径无影响，只对时间计算有影响
export function dijkstra(paths: any, src: number) {
    let arr_edge = Array.from(Array(paths.length), () => new Array());//清空arr_edge
    for (let i = 0; i < arr_edge.length; i++) {
        let u = paths[i].id
        for (let neighbor of paths[i].neighbors) {
            let v = neighbor.id, w = neighbor.w
            arr_edge[u].push({ "u": u, "v": v, "w": w });//出发地id，目的地id，边权
        }
    }
    let dist: number[] = []
    let visited = []
    let length = arr_edge.length
    let path = []
    for (let i = 0; i < length; i++) {
        dist[i] = INF
        path[i] = INF
        visited[i] = false
    }
    dist[src] = 0
    path[src] = src
    for (let j = 0; j < length - 1; j++) {
        let u = minDistance(dist, visited)
        if (u !== -1) {
            visited[u] = true
            if (dist[u] != INF)//u首先是能到达的
                for (let i = 0; i < arr_edge[u].length; i++) {
                    let v = arr_edge[u][i]["v"];
                    let w = arr_edge[u][i]["w"];
                    if (!visited[v]) {
                        if (dist[v] == INF || dist[u] + w < dist[v]) {
                            dist[v] = dist[u] + w;
                            path[v] = u;
                        }

                    }
                }
        }
    }
    let pathInfo = {
        dist: dist,
        path: path
    }
    // pathInfo.dist = dist;//调用pathInfo.dist来传数据
    // pathInfo.path = path;
    // console.log(pathInfo);
    return pathInfo;
}

//若自行车优先策略，则根据路段情况选择速度，根据speed选择是否自行车优先
export function heapDijkstraByTime(paths: any, src: number, speed: number) {
    let arr_edge = Array.from(Array(paths.length), () => new Array());//清空arr_edge
    for (let i = 0; i < arr_edge.length; i++) {
        let u = paths[i].id
        for (let neighbor of paths[i].neighbors) {
            let v = neighbor.id, w = neighbor.w, c = neighbor.c
            arr_edge[u].push({ "u": u, "v": v, "w": w, "c": c });//出发地id，目的地id，边权，拥挤程度
        }
    }
    let visited = []
    let length = arr_edge.length
    let dist = [] as Array<number>;
    let path = Array.from(Array(paths.length), () => new Array());
    for (let i = 0; i < length; i++) {
        visited[i] = false;
    }
    dist[src] = 0
    path[src].push(src);
    visited[src] = true;
    var nodeHeap = new Heap();
    length = arr_edge[src].length;
    for (let i = 0; i < length; ++i) {
        nodeHeap.push(new Node(
            calcTime(arr_edge[src][i]['w'], speed, arr_edge[src][i]["c"], arr_edge[src][i]["isBycycleEable"])
            , src, arr_edge[src][i]['v']))
    }
    while (!nodeHeap.isEmpty()) {
        let node = nodeHeap.pop();
        //@ts-ignore
        let u = node.nodeId;
        if (!visited[u]) {
            visited[u] = true;
            //@ts-ignore
            if (dist[u] != node.w)
                path[u].length = 0;//清空数组
            //@ts-ignore
            dist[u] = node.w;
            //@ts-ignore
            path[u].push(node?.preId);
            let length = arr_edge[u].length;
            for (let i = 0; i < length; i++) {
                nodeHeap.push(new Node(
                    node?.w + calcTime(arr_edge[u][i]['w'], speed, arr_edge[u][i]["c"], arr_edge[u][i]["isBycycleEable"])
                    , u, arr_edge[u][i]["v"]))
            }
        }

    }
    // timePathInfo.dist = dist;//调用pathInfo.dist来传数据
    // timePathInfo.path = path;
    // console.log(pathInfo);
    return {
        dist: dist,
        path: path,
    };
}

//若自行车优先策略，则根据路段情况选择速度，根据speed选择是否自行车优先
export function heapDijkstra(paths: any, src: number) {
    let arr_edge = Array.from(Array(paths.length), () => new Array());//清空arr_edge
    for (let i = 0; i < arr_edge.length; i++) {
        let u = paths[i].id
        for (let neighbor of paths[i].neighbors) {
            let v = neighbor.id, w = neighbor.w, c = neighbor.c
            arr_edge[u].push({ "u": u, "v": v, "w": w });//出发地id，目的地id，边权，拥挤程度
        }
    }
    let visited = []
    let length = arr_edge.length
    let dist = [] as Array<number>;
    let path = Array.from(Array(paths.length), () => new Array());
    for (let i = 0; i < length; i++) {
        visited[i] = false;
    }
    dist[src] = 0
    path[src].push(src);
    visited[src] = true;
    var nodeHeap = new Heap();
    length = arr_edge[src].length;
    for (let i = 0; i < length; ++i) {
        nodeHeap.push(new Node(arr_edge[src][i]['w'], src, arr_edge[src][i]['v']))
    }
    while (!nodeHeap.isEmpty()) {
        let node = nodeHeap.pop();
        //@ts-ignore
        let u = node.nodeId;
        if (!visited[u]) {
            visited[u] = true;
            //@ts-ignore
            if (dist[u] != node.w)
                path[u].length = 0;//清空数组
            //@ts-ignore
            dist[u] = node.w;
            //@ts-ignore
            path[u].push(node?.preId);
            let length = arr_edge[u].length;
            for (let i = 0; i < length; i++) {
                nodeHeap.push(new Node(node?.w + arr_edge[u][i]["w"], u, arr_edge[u][i]["v"]))
            }
        }
    }
    // timePathInfo.dist = dist;//调用pathInfo.dist来传数据
    // timePathInfo.path = path;
    // console.log(pathInfo);
    return {
        dist: dist,
        path: path,
    };
}

