import { checkHomeworkFinished, downloadHomework, uploadHomework } from "@app/api/course";
import { useLoading } from "@app/hooks/useLoading";
import { useCourseStore } from "@app/store/course/CourseStore";
import { useLogStore } from "@app/store/LogStore";
import { useUserStore } from "@app/store/User";
import { IHomeworkItem } from "@app/typings/course";
import { KMP } from "@app/utils/KMP";
import { IconDownload, IconMore, IconPlus, IconUpload, IconSearch } from "@douyinfe/semi-icons";
import { Button, Card, DatePicker, Descriptions, Input, InputGroup, Notification, Select, SideSheet, Table, TimePicker, Upload } from "@douyinfe/semi-ui";
import axios from "axios";
import _ from "lodash";
import { createRef, FC, useEffect, useMemo, useRef, useState } from "react";
import "./index.scss"


interface IWorkProps {
    id?: string,
    name?: string,
    homework: Array<IHomeworkItem>
}
enum searchTypes {
    Title,
    Content,
    Time
}

const { Column } = Table;
const index: FC<IWorkProps> = (props) => {
    const { loading } = useLoading();
    const [visible, setVisible] = useState(false);
    const [homeworkItem, setHomeworkItem] = useState({ id: "", content: "", ddl: 0 } as IHomeworkItem);
    const uploadRef = createRef();
    const [tableData, setTableData] = useState([]);
    const manulUpload = () => {
        //@ts-ignore
        uploadRef.current.upload();
    }
    useEffect(() => {
        const load = async () => {
            let homework = _.cloneDeep(props.homework)
            if (homework && homework.length) {
                for (let item of homework) {
                    let { data } = await checkHomeworkFinished(useUserStore.getState().id, item.id);
                    item["finished"] = data;
                }
                setTableData(generateTableData(homework))
            }
        }
        load();
    }, [])
    const generateTableData = (homework: Array<IHomeworkItem>) => {
        let arr = [];
        if (homework && homework.length) {
            for (let item of homework) {
                let obj = {} as any;
                obj.id = item.id;
                obj.title = item.title;
                obj.content = item.content;
                obj.ddl = new Date(item.ddl * 1000).toLocaleString();
                //@ts-ignore
                obj.finished = item.finished;
                arr.push(obj);
            }
        }
        return arr;
    }
    const onRow = useMemo(
        () => (record: any, index: number) => {
            const props = {}
            return {
                ...props,
                onClick: e => { setVisible(true); setHomeworkItem(record); },
            }
        }, []
    )

    const HomeworkManage: FC = () => {
        return (
            <>
                <Descriptions>
                    <Descriptions.Item itemKey={"??????"}>{homeworkItem.title}</Descriptions.Item>
                    <Descriptions.Item itemKey={"????????????"}>{homeworkItem.content}</Descriptions.Item>
                    <Descriptions.Item itemKey={"????????????"}>{homeworkItem.ddl}</Descriptions.Item>
                </Descriptions>
                <Upload
                    limit={1}
                    action=""
                    uploadTrigger="custom"
                    ref={uploadRef}
                    onSuccess={(...v) => console.log(...v)}
                    onError={(...v) => console.log(...v)}
                    customRequest={({ file, onProgress, onError, onSuccess }) => {
                        const send = async () => {
                            let { data } = await uploadHomework(useUserStore.getState().id as string, homeworkItem.id, file.fileInstance);
                            Notification.success({ content: "????????????" })
                            let homework = _.cloneDeep(tableData)
                            for (let item of homework) {
                                if (item.id == homeworkItem.id) {
                                    item["finished"] = true;
                                    setHomeworkItem(item);
                                }
                            }
                            setTableData(homework);
                        }
                        send();
                    }
                    }
                >
                    <Button icon={<IconPlus />} theme="light" style={{ marginRight: '6px' }}>
                        ????????????
                    </Button>
                    <Button icon={<IconUpload />} theme="light" onClick={e => { e.stopPropagation(); manulUpload() }}>
                        ????????????
                    </Button>
                    {
                        homeworkItem.finished
                            ? (
                                <a href={`${window.location.origin}/api/student/${useUserStore.getState().id}/homework/${homeworkItem.id}`} target={"_blank"}
                                >
                                    <Button disabled={!homeworkItem.finished} icon={<IconDownload />} onClick={e => { e.stopPropagation() }}>
                                        ????????????
                                    </Button>
                                </a>
                            )
                            : (<></>)
                    }


                </Upload>
            </>
        )
    }
    const [searchValue, setSearchValue] = useState("");
    const onSearch = () => {
        const load = async () => {
            let homework = _.cloneDeep(props.homework)
            if (homework && homework.length) {
                for (let item of homework) {
                    let { data } = await checkHomeworkFinished(useUserStore.getState().id, item.id);
                    item["finished"] = data;
                }
                if (searchValue != "") {
                    switch (searchType) {
                        case searchTypes.Content:
                            homework = homework.filter(item => KMP(item.content, searchValue))
                            break;
                        case searchTypes.Time:
                            homework = homework.filter(item => (item.ddl * 1000) >= (searchValue as number))
                            break;
                        case searchTypes.Title:
                            homework = homework.filter(item => KMP(item.title, searchValue))
                        default:
                            break;
                    }
                }
                setTableData(generateTableData(homework))
            }
        }
        load();
        useLogStore.getState().putLogs("???????????????"
            , `???????????????:${searchValue}`
        )
    }
    const [searchType, setSearchType] = useState(searchTypes.Title);
    return (
        <Card
            className="homework-list-card"
            headerExtraContent={
                <InputGroup>
                    <Select placeholder="????????????" onChange={setSearchType} >
                        <Select.Option label={"??????"} value={searchTypes.Title}></Select.Option>
                        <Select.Option label={"????????????"} value={searchTypes.Content}></Select.Option>
                        <Select.Option label={"????????????"} value={searchTypes.Time}></Select.Option>
                    </Select>
                    {searchType == searchTypes.Time
                        ? <DatePicker
                            prefix={<IconSearch />} showClear onChange={setSearchValue}
                        ></DatePicker>
                        : <Input
                            prefix={<IconSearch />} onEnterPress={onSearch} showClear
                            onChange={setSearchValue}
                            placeholder={"?????????????????????"}
                        />}
                    <Button type="tertiary" onClick={onSearch}>??????</Button>
                </InputGroup>
            }
            loading={loading}
        >
            <Table onRow={onRow} dataSource={tableData} pagination={{ formatPageText: false }}

            >
                <Column title="??????" dataIndex="title" key="title"></Column>
                <Column title="????????????" dataIndex="content" key="content"></Column>
                <Column title="????????????" dataIndex="ddl" key="ddl"
                    sorter={(a, b) => new Date(a.ddl).getTime() - new Date(b.ddl).getTime() > 0 ? 1 : -1}
                ></Column>
                <Column title="????????????" dataIndex="finished" key="finished"
                    sorter={(a, b) => {
                        if (a.finished || b.finished == false)
                            return -1
                        else if (a.finished == true && b.finished == false) {
                            return 1
                        } else {
                            return -1
                        }
                    }}
                    render={(text, record, index) => (
                        <>
                            {text ? "?????????" : "?????????"}
                        </>
                    )}></Column>
            </Table>
            <SideSheet
                visible={visible}
                onCancel={() => setVisible(!visible)}
            >
                <HomeworkManage />
            </SideSheet>
        </Card>
    )
}
export default index;