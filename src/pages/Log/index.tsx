import store from "@app/store/common/Global";
import { useLogStore } from "@app/store/LogStore";
import { useUserStore } from "@app/store/User";
import { KMP } from "@app/utils/KMP";
import { Button, Card, Input, InputGroup } from "@douyinfe/semi-ui";
import { FC, useState } from "react";

const index: FC = () => {
    const [logs] = useLogStore(i => [i.logs]);
    const [shownLogs, setShownLogs] = useState(logs);
    const [inputValue, setInputValue] = useState("");
    const download = () => {
        let text = "";
        for (let log of logs) {
            text = text.concat(log);
        }
        download_txt(`${useUserStore.getState().id}_logs`, text)
    }
    function download_txt(filename: string, text: string) {
        let pom = document.createElement('a');
        let stringifyText = JSON.stringify(text);
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        pom.setAttribute('download', filename);
        if (document.createEvent) {
            var event = document.createEvent('MouseEvents');
            event.initEvent('click', true, true);
            pom.dispatchEvent(event);
        } else {
            pom.click();
        }
    }
    return (
        <div>
            <Card className="log-lists"
                title={
                    <InputGroup>
                        <Button onClick={download}>下载日志</Button>
                        <Button onClick={() => { useLogStore.getState().removeLogs(); setShownLogs([]) }}>清空日志</Button>
                    </InputGroup>
                }
                headerExtraContent={
                    <Input value={inputValue} onChange={setInputValue}
                        onEnterPress={() => { setShownLogs(inputValue == "" ? logs : logs.filter(item => KMP(item, inputValue))) }}
                        suffix={<Button onClick={() => { setShownLogs(inputValue == "" ? logs : logs.filter(item => KMP(item, inputValue))) }}>搜索</Button>}>
                    </Input>
                }
            >
                {shownLogs.map((i, idx) => (
                    <div style={{ marginBottom: '3px' }} key={idx}>{i}</div>
                ))}
            </Card>

        </div>
    )
}
export default index;
