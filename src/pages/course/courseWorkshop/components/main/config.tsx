import { TreeNodeData } from "@douyinfe/semi-ui/lib/es/tree";
import { infoDataType } from "@mock/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import { Button } from "@douyinfe/semi-ui";
export interface __extends_TreeNodeData extends TreeNodeData {
    extension?: string,
    link?: string,
    type?: string,
}

const style = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '32px',
};

function iconType(extension: string | undefined) {
    const iconStyle = {
        marginLeft: '6px',
    }
    switch (extension) {
        case ".pdf":
            return <FontAwesomeIcon icon={solid('file-pdf')} color="red" style={iconStyle} />
        case ".doc":
            return <FontAwesomeIcon icon={solid('file-word')} color="#00AAD6" style={iconStyle} />
        default:
            return;

    }
}

export function formatTreeDirectoryData(data: Array<infoDataType>,
    TreeData: Array<__extends_TreeNodeData>) {
    for (let item of data) {
        let obj = {} as __extends_TreeNodeData;
        obj.label = item.title;
        obj.key = item.title;
        obj.type = item.type;
        switch (item.type) {
            case "directory":
                if (item.children?.length) {
                    obj.children = [];
                    formatTreeDirectoryData(item.children, obj.children);
                }
                break;
            case "file":
                obj.extension = item.extension;
                obj.link = item.link;
                break;
        }
        TreeData.push(obj);
    }
}
export function formatTreeData(data: Array<infoDataType>,
    TreeData: Array<__extends_TreeNodeData>) {
    for (let item of data) {
        let obj = {} as __extends_TreeNodeData;

        obj.key = item.title;
        obj.type = item.type;
        switch (item.type) {
            case "directory":
                obj.label = (
                    <div style={style}>
                        {item.title}
                    </div>
                )
                obj.children = [];
                if (item.children?.length)
                    formatTreeData(item.children, obj.children);
                break;
            case "file":
                obj.label = (
                    <div style={style}>
                        <div>
                            {item.title}
                            {iconType(item.extension)}
                        </div>
                        <Button className="file-download-button" theme="borderless">
                            <FontAwesomeIcon icon={solid('download')}
                                color="	
                                rgba(var(--semi-grey-9), .35)"
                            />
                        </Button>
                    </div>);
                obj.extension = item.extension;
                obj.link = item.link;
                break;
        }
        TreeData.push(obj);
    }
}