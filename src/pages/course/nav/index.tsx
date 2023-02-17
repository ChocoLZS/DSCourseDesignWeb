import * as echarts from 'echarts';
import { FC, useEffect, useState } from "react";
import shaheSvg from '@app/assets/map/shahe@responsive.svg?raw'
import buptSvg from '@app/assets/map/buptmap.svg?raw'
import ReactCharts from 'echarts-for-react';
import { Button, ButtonGroup, Card, Col, Form, Input, InputGroup, Row, Select, List, Descriptions, TreeSelect, Cascader, Transfer, Popover, Steps, Timeline, Step, CardGroup } from '@douyinfe/semi-ui';
import { Speed_bicycle, Speed_walk, Strategy } from '../../../utils/dijkstra';
import { shahemap, shaheMapping, shaheNormalMapping, shaheStudyingMapping, buptMapping, treeData, buptmap, _DISTANCE_, _TIME_, BusSchedule, buptStudyingMapping, transferData, buptNormalMapping } from './data';
import { OptionProps } from "@douyinfe/semi-ui/lib/es/select"
import { IconDelete, IconPlus, IconSearch } from '@douyinfe/semi-icons';
import { useCourseStore } from '@app/store/course/CourseStore'
import { ICourseItem } from "@typings/course"
import { getCurrentWeekdayToString, useTimeStore } from "@app/store/TimeStore"
import _ from 'lodash';
import { useLogStore } from '@app/store/LogStore';
import { KMP } from '@app/utils/KMP';
import { getPartPathinfo, getPartCrossPathInfo, getBestBus, getBusSchedule, CrossPart, InnerPart, BusInfo, calcMutiplePath, calcPartNamedPath, generatePathArrayFromTree } from './config';

import "./index.scss"

import { StepProps } from '@douyinfe/semi-ui/lib/es/steps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { formatTime } from '@app/components/clock/config';
echarts.registerMap('沙河', { svg: shaheSvg })
echarts.registerMap('西土城', { svg: buptSvg })
const index: FC = () => {
    const [option, setOption] = useState({
        tooltip: {},
        geo: {
            map: '沙河',
            roam: true,
            layoutSize: '100%'
        },
        series: [
            {
                name: 'Route',
                type: 'lines',
                coordinateSystem: 'geo',
                geoIndex: 0,
                emphasis: {
                    label: {
                        show: false
                    }
                },
                polyline: true,
                lineStyle: {
                    color: '#c46e54',
                    width: 5,
                    opacity: 1,
                    type: 'dotted'
                },
                effect: {
                    show: true,
                    period: 8,
                    color: '#a10000',
                    constantSpeed: 80,
                    trailLength: 0,
                    symbolSize: [20, 12],
                    symbol:
                        'path://M35.5 40.5c0-22.16 17.84-40 40-40s40 17.84 40 40c0 1.6939-.1042 3.3626-.3067 5H35.8067c-.2025-1.6374-.3067-3.3061-.3067-5zm90.9621-2.6663c-.62-1.4856-.9621-3.1182-.9621-4.8337 0-6.925 5.575-12.5 12.5-12.5s12.5 5.575 12.5 12.5a12.685 12.685 0 0 1-.1529 1.9691l.9537.5506-15.6454 27.0986-.1554-.0897V65.5h-28.7285c-7.318 9.1548-18.587 15-31.2715 15s-23.9535-5.8452-31.2715-15H15.5v-2.8059l-.0937.0437-8.8727-19.0274C2.912 41.5258.5 37.5549.5 33c0-6.925 5.575-12.5 12.5-12.5S25.5 26.075 25.5 33c0 .9035-.0949 1.784-.2753 2.6321L29.8262 45.5h92.2098z'
                },
                data: [
                    {
                        coords: [
                            [1, 1],
                            [1, 2],
                        ]
                    }
                ]
            }
        ]
    });
    const [buptOption, setBuptOption] = useState({
        tooltip: {},
        geo: {
            map: '西土城',
            roam: true,
            layoutSize: '100%'
        },
        series: [
            {
                name: 'Route',
                type: 'lines',
                coordinateSystem: 'geo',
                geoIndex: 0,
                emphasis: {
                    label: {
                        show: false
                    }
                },
                polyline: true,
                lineStyle: {
                    color: '#c46e54',
                    width: 5,
                    opacity: 1,
                    type: 'dotted'
                },
                effect: {
                    show: true,
                    period: 8,
                    color: '#a10000',
                    constantSpeed: 80,
                    trailLength: 0,
                    symbolSize: [20, 12],
                    symbol:
                        'path://M35.5 40.5c0-22.16 17.84-40 40-40s40 17.84 40 40c0 1.6939-.1042 3.3626-.3067 5H35.8067c-.2025-1.6374-.3067-3.3061-.3067-5zm90.9621-2.6663c-.62-1.4856-.9621-3.1182-.9621-4.8337 0-6.925 5.575-12.5 12.5-12.5s12.5 5.575 12.5 12.5a12.685 12.685 0 0 1-.1529 1.9691l.9537.5506-15.6454 27.0986-.1554-.0897V65.5h-28.7285c-7.318 9.1548-18.587 15-31.2715 15s-23.9535-5.8452-31.2715-15H15.5v-2.8059l-.0937.0437-8.8727-19.0274C2.912 41.5258.5 37.5549.5 33c0-6.925 5.575-12.5 12.5-12.5S25.5 26.075 25.5 33c0 .9035-.0949 1.784-.2753 2.6321L29.8262 45.5h92.2098z'
                },
                data: [
                    {
                        coords: [
                            [1, 1],
                            [1, 2],
                        ]
                    }
                ]
            }
        ]
    });
    const [start, setStart] = useState(["沙河校区", 41]);
    const [end, setEnd] = useState([]);
    const [speed, setSpeed] = useState(Speed_walk);
    const [strategy, setStrategy] = useState(Strategy.distance);
    const [bus, setBus] = useState("");

    const [visible, setVisible] = useState(false);

    const [time, setTime] = useState("0秒");
    const [dist, setDist] = useState("0米");
    const [shownCourseList, setShownCourseList] = useState([] as Array<ICourseItem>);

    useEffect(() => {
        let courses = _.cloneDeep(useCourseStore.getState().courses);
        setShownCourseList(courses);
        useTimeStore.getState().timePause();
    }, [])
    const startNavi = () => {
        const shaheBorder = 79;//沙河西门
        const buptBorder = 0;//西土城西门
        let location_arr = [];
        let pathinfo_arr = [];
        let businfo_arr = [];
        location_arr.push(start, ...middlePoint, end);
        let shahepath = [0] as Array<number>;
        let buptpath = [0] as Array<number>;
        let _time = 0;
        let _dist = 0;
        for (let i = 0; i < location_arr.length - 1; i++) {
            let start_school = location_arr[i][0];
            let end_school = location_arr[i + 1][0];
            let start_loc = location_arr[i][1];
            let end_loc = location_arr[i + 1][1];
            if (location_arr[i][0] == location_arr[i + 1][0]) {
                let obj
                    = getPartPathinfo(start_school as string, start_loc as number, end_loc as number, speed, strategy);
                pathinfo_arr.push(obj)
            } else {
                let startmap, start_exit;
                let endmap, end_entry;
                if (start_school == "沙河校区") {
                    startmap = shahemap;
                    start_exit = shaheBorder;
                    endmap = buptmap;
                    end_entry = buptBorder;
                } else {
                    startmap = buptmap;
                    start_exit = buptBorder;
                    endmap = shahemap;
                    end_entry = shaheBorder;
                }
                let obj = getPartCrossPathInfo(
                    startmap, start_school as string, start_loc as number, start_exit
                    , endmap, end_school as string, end_entry, end_loc as number
                    , speed, strategy)
                pathinfo_arr.push(obj)

            }
        }
        let currentTime = useTimeStore.getState().getTime();
        //当前时间
        for (let item of pathinfo_arr) {
            if (item.isCross) {
                //跨校区
                let _item = item as CrossPart;
                _dist += item.part_dist + _DISTANCE_
                _time += _item.part_start_time
                //计算巴士时间
                let busTime = Math.floor(currentTime + _time * 1000);
                let hh = new Date(busTime).getHours();
                let mm = new Date(busTime).getMinutes();
                let bus_obj;
                if (_item.start == "沙河校区") {
                    shahepath = shahepath.slice(0, shahepath.length - 1).concat(_item.part_start_path);
                    buptpath = buptpath.slice(0, buptpath.length - 1).concat(_item.part_end_path);
                    bus_obj = getBestBus(
                        getBusSchedule(hh + ":" + mm, BusSchedule.shahe, "shahe"),
                        getBusSchedule(hh + ":" + mm, BusSchedule.bus, "bus"));
                } else {
                    buptpath = buptpath.slice(0, buptpath.length - 1).concat(_item.part_start_path);
                    shahepath = shahepath.slice(0, shahepath.length - 1).concat(_item.part_end_path);
                    bus_obj = getBestBus(
                        getBusSchedule(hh + ":" + mm, BusSchedule.bupt, "shahe"),
                        getBusSchedule(hh + ":" + mm, BusSchedule.bus, "bus"));
                }
                if (bus_obj.bias != -1) {
                    //计算完整时间
                    _time += bus_obj.bias * 60
                }

                _time += _TIME_ + _item.part_end_time
                businfo_arr.push(bus_obj);
            } else {
                _time += item.part_time
                _dist += item.part_dist
                //未跨校区
                let _item = item as InnerPart;
                if (_item.start == "沙河校区") {
                    shahepath = shahepath.slice(0, shahepath.length - 1).concat(_item.part_path);
                } else {
                    buptpath = buptpath.slice(0, buptpath.length - 1).concat(_item.part_path);
                }
            }
        }
        setDist(formatDistance(_dist));
        setTime(formatSeconds(_time));
        let bus_descriptions = businfo_arr.length == 0 ? ""
            : businfo_arr[0].bias == -1 ? `今日无班车`
                : `始发地:${pathinfo_arr[0].start},最近为班车${businfo_arr[0].time}`;
        setBus(bus_descriptions);
        //计算坐标并画图
        let shahe_coords: Array<Array<CoordinatePair>> = []
        for (let item of shahepath) {
            //@ts-ignore
            let { x, y } = shaheMapping[item];
            shahe_coords.push([x, y]);
        }
        let bupt_coords: Array<Array<CoordinatePair>> = []
        for (let item of buptpath) {
            //@ts-ignore
            let { x, y } = buptMapping[item];
            bupt_coords.push([x, y]);
        }
        if (shahe_coords.length == 1) {
            let [x, y] = shahe_coords[0];
            //@ts-ignore
            shahe_coords.push([(x + 1), y]);
        }
        if (bupt_coords.length == 1) {
            let [x, y] = bupt_coords[0];
            //@ts-ignore
            bupt_coords.push([x, (y + 1)])
        }
        //@ts-ignore
        setBuptOption({ series: { data: [{ coords: bupt_coords }] } })
        //@ts-ignore
        setOption({ series: { data: [{ coords: shahe_coords }] } })
        let stepArr = [] as Array<StepProps>;
        let { node_arr, time_arr: node_time_arr, icon_arr } = generateRawStepsList(pathinfo_arr, businfo_arr)
        for (let i = 0; i < node_arr.length; i++) {
            let { hour, minute } = formatTime(node_time_arr[i], "");
            let obj = {
                title: node_arr[i],
                description: `${hour}:${minute}`,
                icon: icon_arr[i]
            } as StepProps
            stepArr.push(obj);
        }
        setStepList(stepArr);
        //多路径输出
        let nodeArr = calcMutiplePath(pathinfo_arr);
        let multiplePath = [] as Array<Array<Array<string>>>;
        for (let root of nodeArr) {
            let multiplePathsArr = [] as Array<string>;
            let arr = [] as Array<Array<string>>;
            generatePathArrayFromTree(root, "", multiplePathsArr);
            for (let item of multiplePathsArr) {
                arr.push(item.split("|").reverse());
            }
            multiplePath.push(arr);
        }
        multiplePath = multiplePath.reverse();
        setMultiplePath(multiplePath);

        {
            let arr = [] as any;
            if (middlePoint.length) {
                for (let item of middlePoint) {
                    let mapping = item[0] == "沙河校区" ? shaheMapping : buptMapping
                    arr.push(mapping[item[1]].name)
                }
            }
            let startmapping = start[0] == "沙河校区" ? shaheMapping : buptMapping
            let endmapping = end[0] == "沙河校区" ? shaheMapping : buptMapping
            useLogStore.getState().putLogs("进行了导航"
                , `起始地点:${start[0]} ${startmapping[start[1]].name}`
                , `经过了:${arr}`
                , `终点:${end[0]} ${endmapping[end[1]].name}`
                , `预计耗时:${formatSeconds(_time)}`
                , `总路程:${formatDistance(_dist)}`
            )
        }


    }
    const onSubmit = (v: any) => {
        let courses = _.cloneDeep(useCourseStore.getState().courses);
        let coursesTable = useCourseStore.getState().coursesTable;
        let ids = [] as Array<string>;
        if (v["name"]) {
            courses = courses.filter(i => KMP(i.name, v["name"]))
        }
        if (v["dow"] && v["course_start"]) {
            for (let id of coursesTable[v["dow"]].slice(v["course_start"], coursesTable[0].length)) {
                if (id && !ids.includes(id)) {
                    ids.push(id);
                }
            }
            courses = courses.filter(item => ids.includes(item.id));
        } else if (v["dow"]) {
            for (let id of coursesTable[v["dow"]]) {
                if (id && !ids.includes(id)) {
                    ids.push(id);
                }
            }
            courses = courses.filter(item => ids.includes(item.id));
        } else if (v["course_start"]) {
            for (let day of coursesTable) {
                for (let id of day.slice(v["course_start"], day.length)) {
                    if (id && !ids.includes(id)) {
                        ids.push(id);
                    }
                }
            }
            courses = courses.filter(item => ids.includes(item.id));
        }

        setShownCourseList(courses);
        useLogStore.getState().putLogs(
            `搜索了课程, 课程名称为${v["name"] ? v["name"] : ""}`
            , `课程星期为${v["dow"] ? getCurrentWeekdayToString(v["dow"]) : ""}`
        )
    }
    const [middlePoint, setMiddlePoint] = useState([]);
    const middleData = [
        {
            label: '沙河校区',
            value: '沙河校区',
            children: shaheNormalMapping
        },
        {
            label: '西土城校区',
            value: '西土城校区',
            children: buptNormalMapping
        }
    ]
    const [stepList, setStepList] = useState([] as Array<StepProps>);
    const generateRawStepsList = (pathinfos: Array<InnerPart | CrossPart>, businfos: Array<BusInfo>) => {
        let baseTime = useTimeStore.getState().getTime();
        let location_arr = [""];
        let time_arr = [0];
        let icon_arr = [<></>];
        let index = 0;
        for (let pathinfo of pathinfos) {
            if (pathinfo.isCross) {
                let item = pathinfo as CrossPart
                let start_mapping = item.start == "沙河校区" ? shaheMapping : buptMapping;
                let end_mapping = item.end == "沙河校区" ? shaheMapping : buptMapping;
                //起始
                location_arr = location_arr.slice(0, location_arr.length - 1);
                location_arr.push(`${item.start},${start_mapping[item.part_start_path[0]].name}`);
                time_arr = time_arr.slice(0, time_arr.length - 1);
                time_arr.push(baseTime);
                icon_arr = icon_arr.slice(0, icon_arr.length - 1);
                icon_arr.push(FontIcon(false, speed));
                baseTime = Math.floor(baseTime + item.part_start_time * 1000);
                location_arr.push(`${item.start},${start_mapping[item.part_start_path[item.part_start_path.length - 1]].name}`);
                time_arr.push(baseTime);
                icon_arr.push(FontIcon(false, speed));
                //巴士
                baseTime += _TIME_ * 1000;
                baseTime += businfos[index].bias == -1 ? 0 : businfos[index].bias * 60 * 1000;
                index++;
                //终止
                location_arr.push(`${item.end},${end_mapping[item.part_end_path[0]].name}`);
                time_arr.push(baseTime);
                icon_arr.push(FontIcon(item.isCross, speed));
                baseTime = Math.floor(baseTime + item.part_end_time * 1000);
                location_arr.push(`${item.end},${end_mapping[item.part_end_path[item.part_end_path.length - 1]].name}`);
                time_arr.push(baseTime);
                icon_arr.push(FontIcon(false, speed));
            } else {
                let mapping = pathinfo.start == "沙河校区" ? shaheMapping : buptMapping;
                //没有跨越
                location_arr = location_arr.slice(0, location_arr.length - 1);
                location_arr.push(`${pathinfo.start},${mapping[pathinfo.part_path[0]].name}`);
                time_arr = time_arr.slice(0, time_arr.length - 1);
                time_arr.push(baseTime);
                icon_arr = icon_arr.slice(0, icon_arr.length - 1);
                icon_arr.push(FontIcon(false, speed));
                baseTime = Math.floor(baseTime + pathinfo.part_time * 1000)
                location_arr.push(`${pathinfo.end},${mapping[pathinfo.part_path[pathinfo.part_path.length - 1]].name}`)
                time_arr.push(baseTime);
                icon_arr.push(FontIcon(false, speed));
            }
        }
        return {
            node_arr: location_arr,
            time_arr: time_arr,
            icon_arr: icon_arr
        }
    }
    const FontIcon = (isCross?: boolean, speed?: number) => {
        if (isCross) {
            return <FontAwesomeIcon icon={solid('bus')} />
        }
        if (speed == Speed_bicycle) {
            return <FontAwesomeIcon icon={solid('bicycle')} />
        } else {
            return <FontAwesomeIcon icon={solid('person-walking')} />
        }
    }
    const [multiplePath, setMultiplePath] = useState([] as Array<Array<Array<string>>>)
    return (
        <>
            <Row gutter={12}>
                <Col span={8}>
                    <Card>
                        <Form
                            labelPosition='left'
                            labelAlign='right'
                            onSubmit={onSubmit}>
                            <Form.Section text="名称">
                                <Form.Input field='name' label="课程名称"></Form.Input>
                            </Form.Section>
                            <Form.Section text="时间">
                                <Form.Select field='dow' label="星期" optionList={weekday}></Form.Select>
                                <Form.Select field='course_start' label="第几节课" optionList={courseTime()}></Form.Select>
                            </Form.Section>
                            <ButtonGroup>
                                <Button htmlType='reset' icon={<IconDelete />}></Button>
                                <Button htmlType='submit'>搜索</Button>
                            </ButtonGroup>
                        </Form>
                    </Card>
                </Col>
                <Col span={16}>
                    <Card className='nav-course-lists'
                        title={"直接导航"}
                        headerExtraContent={
                            <InputGroup>
                                <Cascader separator=">" filterTreeNode placeholder='起点' treeData={treeData} value={start} onChange={(v) => { setStart(v as any); setVisible(false) }}></Cascader>
                                <Popover trigger='custom'
                                    visible={visible}
                                    content={
                                        <Cascader separator=">"
                                            multiple filterTreeNode placeholder='途经点(最多五个)'
                                            treeData={middleData} max={5}
                                            onChange={setMiddlePoint}
                                            leafOnly
                                        ></Cascader>
                                    }
                                >
                                    <Button
                                        type='tertiary'
                                        icon={<IconPlus />}
                                        onClick={() => {
                                            setVisible(!visible);
                                        }}
                                    ></Button>
                                </Popover>
                                <Cascader separator=">" filterTreeNode placeholder='终点' treeData={treeData} value={end} onChange={(v) => { setEnd(v as any); setVisible(false) }}></Cascader>
                                <Select placeholder="交通方式" value={speed} onChange={(v) => setSpeed(v as any)}>
                                    <Select.Option value={Speed_walk} label="步行"></Select.Option>
                                    <Select.Option value={Speed_bicycle} label="自行车"></Select.Option>
                                </Select>
                                <Select placeholder="导航策略" value={strategy} onChange={(v) => setStrategy(v as any)}>
                                    <Select.Option value={Strategy.distance} label="距离最短"></Select.Option>
                                    <Select.Option value={Strategy.time} label="时间最短"></Select.Option>
                                </Select>


                                <Button onClick={() => startNavi()}>导航</Button>
                            </InputGroup>
                        }
                    >
                        <List>
                            {
                                shownCourseList.map((i, idx) => (
                                    <List.Item key={idx}
                                        main={
                                            <div>
                                                <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}>{i.name}</span>
                                                <div style={{ color: 'var(--semi-color-text-2)', margin: '4px 0' }}>
                                                    {i.time.map((time, index) => (
                                                        <span key={index}>
                                                            <div>{getCurrentWeekdayToString(time.dow)}</div>
                                                            <div>{`第${time.start} 节课` + "---" + `第${time.end} 节课`}</div>
                                                        </span>
                                                    ))}
                                                    <div>{i.location}</div>
                                                </div>
                                            </div >
                                        }
                                        extra={
                                            <Button
                                                onClick={
                                                    () => {
                                                        let school_loc = i.location.split(',')[0];
                                                        let key = i.location.split(',')[1];
                                                        let Mapping = school_loc == "沙河校区" ? shaheStudyingMapping : buptStudyingMapping;
                                                        let item = Mapping.find(i => i.label == key);
                                                        setEnd([school_loc, item?.value]);
                                                    }
                                                }>选择该课程</Button>
                                        }
                                    >
                                    </List.Item>
                                ))
                            }
                        </List>
                    </Card>
                </Col>
                <Card>
                    <Descriptions row>
                        <Descriptions.Item itemKey={"选择策略"}>{strategy === Strategy.distance ? "距离最短" : "时间最短"}</Descriptions.Item>
                        <Descriptions.Item itemKey={"路程"}>{`${dist} `}</Descriptions.Item>
                        <Descriptions.Item itemKey={"耗时"}>{`${time} `}</Descriptions.Item>
                        <Descriptions.Item itemKey={"最近班车/公共汽车"}>{`${bus}`}</Descriptions.Item>
                    </Descriptions>
                    <Steps></Steps>
                </Card>
                <Card>
                    <Steps type="basic" >
                        {stepList.map((item, idx) => (
                            <Step key={idx} title={item.title} icon={item.icon} description={item.description} />
                        ))}
                    </Steps>
                </Card>
                <CardGroup>
                    {
                        multiplePath.map((item, idx) => (
                            <Card key={idx} style={{ maxWidth: 250 }}>
                                <div style={{ display: 'inline-block' }}>
                                    {item.map((path, index) => (
                                        <span key={`${idx}-${index}`}>
                                            {`${index + 1}.begin--${path.join("->")}--end`}
                                        </span>
                                    ))}
                                </div>
                            </Card>
                        ))
                    }
                </CardGroup>
                <section>
                    <Col span={12}>
                        <Card style={{ height: '1000px' }}>
                            <ReactCharts style={{ height: '800px' }} option={option} />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card style={{ height: '1000px' }}>
                            <ReactCharts style={{ height: '800px' }} option={buptOption} />
                        </Card>
                    </Col>
                </section>

            </Row >
        </>

    )
}
export default index;

const weekday: Array<OptionProps> = [
    { value: 1, label: "星期一" },
    { value: 2, label: "星期二" },
    { value: 3, label: "星期三" },
    { value: 4, label: "星期四" },
    { value: 5, label: "星期五" },
    { value: 6, label: "星期六" },
    { value: 7, label: "星期日" },
]

const courseTime = () => {
    let arr = [];
    for (let i = 1; i <= 14; i++) {
        let obj = {
            value: i,
            label: `第${i} 节课`,
        }
        arr.push(obj);
    }
    return arr;
}

const formatSeconds = (seconds: number) => {
    seconds = Math.floor(seconds);
    let ss = seconds % 60;
    let mm = Math.floor(seconds / 60);
    let hh = Math.floor(mm / 60);
    mm = mm % 60;
    return `${hh}时${mm}分${ss} 秒`
}
const formatDistance = (meters: number) => {
    let kilometers = Math.floor(meters / 1000);
    meters = meters % 1000;
    return `${kilometers}公里${meters}米`
}

type CoordX = number
type CoordY = number
type CoordinatePair = [CoordX | number, CoordY | number]