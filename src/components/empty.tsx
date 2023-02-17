import { FC } from "react";
import { Empty } from "@douyinfe/semi-ui";
import { IllustrationNoResult, IllustrationNoResultDark } from '@douyinfe/semi-illustrations';
interface emptyProps {
    description?: string;
}

const index: FC<emptyProps> = (props) => {
    const emptyStyle = {
        padding: 30,
    };
    return (
        <Empty
            image={<IllustrationNoResult style={{ width: 150, height: 150 }} />}
            darkModeImage={<IllustrationNoResultDark style={{ width: 150, height: 150 }} />}
            description={props.description || '搜索结果去哪了?'}
            style={emptyStyle}
        />
    )
}

export default index;