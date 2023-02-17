import { FC, useState } from "react";
import { Pagination } from "@douyinfe/semi-ui";
import { Input } from "@douyinfe/semi-ui";
import { Button } from "@douyinfe/semi-ui";
import { ValidateStatus } from "@douyinfe/semi-ui/lib/es/input";
import { useTimeStore, getCurrentWeek, getWeekDaysRange } from "@app/store/TimeStore";
import PropTypes from 'prop-types';

interface SearchBarProps {
    setPage?: (p: number) => void;
}

const index: FC<SearchBarProps> = (props) => {
    const [currentWeek, getTime] = useTimeStore((i) => [i.currentWeek, i.getTime]);
    const [inputValue, setInputValue] = useState(Number);
    const [inputStatus, setInputStatus] = useState("default" as ValidateStatus);
    const [currentPage, setCurrentPage] = useState(currentWeek);
    const onChange = (v: string) => {
        let pattern = /^[0-9]*$/
        if (pattern.test(v)) {
            setInputValue(parseInt(v));
            setInputStatus("default")
        } else
            setInputStatus("error")
    }
    const changePage = () => {
        if (inputStatus == "default")
            inputValue <= 20 && inputValue >= 1 ? onPageChange(inputValue) : onPageChange(currentWeek);
    }
    const onPageChange = (v: number) => {
        if (props.setPage)
            props.setPage(v);
        setCurrentPage(v);
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'auto' }}>
            <div>{"当前是第" + currentWeek + "周"}</div>
            <Pagination
                total={200}
                currentPage={currentPage}
                onPageChange={(v) => onPageChange(v)}
            ></Pagination>
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '12px' }}>
                <span style={{ marginRight: '6px' }}>跳转至第</span>
                <Input
                    style={{ width: "48px" }}
                    validateStatus={inputStatus}
                    onChange={(v) => onChange(v)}
                    onEnterPress={() => changePage()}
                ></Input>
                <span style={{ marginLeft: '6px', marginRight: '24px' }}>周</span>
                <Button size="small" onClick={() => changePage()} >确认跳转</Button>
            </div>
        </div>
    )
}

export default index;