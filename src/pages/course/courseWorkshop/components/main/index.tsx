import { downloadFile, uploadFile, updateCourse } from "@app/api/course";
import { getStudentInfo } from "@app/api/student";
import { useLoading } from "@app/hooks/useLoading";
import { useUserStore } from "@app/store/User";
import { ICourseItem, IFileItem } from "@app/typings/course";
import { IExamItem } from "@app/typings/exam";
import { IconDelete, IconDownload, IconPlus, IconUpload, IconSearch } from "@douyinfe/semi-icons";
import { Collapse, Card, InputGroup, Input, Upload, List, Button, Notification, Modal, Select } from "@douyinfe/semi-ui";
import { createRef, FC, useEffect, useState } from "react";
import { __extends_TreeNodeData, formatTreeData, formatTreeDirectoryData } from "./config";
import './index.scss'
import _ from "lodash"
import { useLogStore } from "@app/store/LogStore";
import { KMP } from "@utils/KMP"

interface Props {
    id: string,
    course: ICourseItem
}

enum searchTypes {
    Name,
    Extension
}

const index: FC<Props> = (props) => {
    const { loading } = useLoading();
    const [fileList, setFileList] = useState([] as Array<IFileItem>);

    const uploadRef = createRef();
    const manulUpload = () => {
        //@ts-ignore
        uploadRef.current.upload();
    }

    useEffect(() => {
        const load = (async () => {
            const { data } = await getStudentInfo(useUserStore.getState().id as string);
            let files = data.courses.find(item => item.id == props.id)?.file
            let arr = [] as Array<IFileItem>
            for (let file of files) {
                let obj = {
                    id: file.id,
                    name: file.name,
                    status: 'success',
                    url: `${window.location.origin}/api/course/${props.id}/file/${file.id}`
                }
                arr.push(obj);
            }
            arr.sort((a, b) => { return a.name < b.name ? -1 : 1 })
            setFileList(arr);
        })
        load();
        return () => {
            setFileList([]);
        }
    }, []);
    const onDeleteFile = (fileItem: any) => {
        Modal.warning({
            title: "?????????????????????????",
            onOk: () => {
                const load = async () => {
                    let course = _.cloneDeep(props.course);
                    let exams = {}
                    for (let exam of course.exams) {
                        exams[exam.id] = {
                            ...exam
                        }
                    }
                    course["exams"] = exams;
                    let homeworkItem = {}
                    for (let homework of course?.homework) {
                        homeworkItem[homework.id] = {
                            ...homework
                        }
                    }
                    course["homework"] = homeworkItem;
                    let fileobj = {};
                    for (let file of course.file) {
                        if (file.id !== fileItem.id) {
                            fileobj[file.id] = file.name
                        }
                    }
                    course["file"] = fileobj;
                    await updateCourse(course, course.id);
                    useLogStore.getState().putLogs(`?????????`
                        , ` ${props.course.name} ???????????????`
                        , ` ????????????${fileItem.name}`)
                    location.reload();
                }
                load();
            }
        })
    }
    const [searchValue, setSearchValue] = useState("");
    const onSearch = () => {
        const load = (async () => {
            const { data } = await getStudentInfo(useUserStore.getState().id as string);
            let files = data.courses.find(item => item.id == props.id)?.file
            let arr = [] as Array<IFileItem>
            for (let file of files) {
                let obj = {
                    id: file.id,
                    name: file.name,
                    status: 'success',
                    url: `${window.location.origin}/api/course/${props.id}/file/${file.id}`
                }
                arr.push(obj);
            }
            arr.sort((a, b) => {
                if (sortType == 0) {
                    return a.name < b.name ? -1 : 1
                } else {
                    return a.name.split(".")[1] < b.name.split(".")[1] ? -1 : 1
                }
            })
            arr = searchValue == "" ? arr : arr.filter(item => {
                if (searchType == searchTypes.Name) {
                    return KMP(item.name, searchValue)
                } else {
                    return KMP(item.name.split(".")[1], searchValue);
                }
            })
            setFileList(arr);
        })
        load();
        useLogStore.getState().putLogs("?????????????????????"
            , `???????????????:${searchValue}`
        )
    }
    const [searchType, setSearchType] = useState(0);
    const [sortType, setSortType] = useState(0);
    return (
        <Card
            className="material-list-card"
            title={"????????????"}
            headerExtraContent={
                <InputGroup>
                    <Select placeholder="????????????" onChange={(v) => {
                        fileList.sort((a, b) => {
                            if (v == 0) {
                                return a.name < b.name ? -1 : 1
                            } else {
                                return a.name.split(".")[1] < b.name.split(".")[1] ? -1 : 1
                            }
                        })
                        setFileList(fileList);
                        setSortType(v)
                    }}>
                        <Select.Option value={searchTypes.Name} label="??????"></Select.Option>
                        <Select.Option value={searchTypes.Extension} label="?????????"></Select.Option>
                    </Select>
                    <Select placeholder="???????????????" onChange={setSearchType}>
                        <Select.Option value={searchTypes.Name} label="??????"></Select.Option>
                        <Select.Option value={searchTypes.Extension} label="?????????"></Select.Option>
                    </Select>
                    <Input prefix={<IconSearch />} onEnterPress={onSearch} showClear
                        onChange={setSearchValue}
                        suffix={<Button type="tertiary" onClick={onSearch}>??????</Button>}
                    />

                </InputGroup>
            }
            footer={
                <Upload
                    limit={1}
                    action=""
                    uploadTrigger="custom"
                    ref={uploadRef}
                    onSuccess={(...v) => console.log(...v)}
                    onError={(...v) => console.log(...v)}
                    customRequest={({ file, onProgress, onError, onSuccess }) => {
                        const send = async () => {
                            let { data } = await uploadFile(props.id, file.name, file.fileInstance);
                            useLogStore.getState().putLogs(`?????????`
                                , ` ${props.course.name} ???????????????`
                                , ` ????????????${file.name}`)
                            Notification.success({ content: "????????????" })
                            let course = _.cloneDeep(props.course);
                            let exams = {}
                            for (let exam of course.exams) {
                                exams[exam.id] = {
                                    ...exam
                                }
                            }
                            course["exams"] = exams;
                            let homeworkItem = {}
                            for (let homework of course?.homework) {
                                homeworkItem[homework.id] = {
                                    ...homework
                                }
                            }
                            course["homework"] = homeworkItem;
                            let fileobj = {};
                            for (let fileItem of course.file) {
                                if (fileItem.name !== file.name)
                                    fileobj[fileItem.id] = fileItem.name
                            }
                            fileobj[data] = file.name;
                            course["file"] = fileobj;
                            await updateCourse(course, course.id);
                            location.reload();
                        }
                        let flag = false;
                        for (let item of fileList) {
                            if (item.name == file.name) {
                                flag = true;
                                break;
                            }
                        }
                        if (flag) {
                            Modal.warning(({
                                content: (
                                    <>???????????????????????????????????????????</>
                                ),
                                onOk: () => {
                                    send();
                                }
                            }))
                        } else {
                            send();
                        }
                    }
                    }
                >
                    <Button icon={<IconPlus />} theme="light" style={{ marginRight: '6px' }}>
                        ????????????
                    </Button>
                    <Button icon={<IconUpload />} theme="light" onClick={e => { e.stopPropagation(); manulUpload() }}>
                        ????????????
                    </Button>
                </Upload>
            }
            loading={loading}
        >
            <List>
                {
                    fileList.map(item => (
                        <List.Item key={item.id}
                            main={
                                <div>
                                    <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}>{item.name}</span>
                                </div>
                            }
                            extra={
                                <>
                                    <Button type="danger" icon={<IconDelete />} onClick={() => { onDeleteFile(item) }} ></Button>
                                    <a href={item.url} target={"_blank"} download={item.name} >
                                        <Button icon={<IconDownload />} >
                                        </Button>
                                    </a>
                                </>


                            }
                        />
                    ))
                }
            </List>
        </Card>
    )
}
export default index;