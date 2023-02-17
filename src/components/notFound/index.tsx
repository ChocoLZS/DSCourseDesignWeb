import { Empty } from "@douyinfe/semi-ui"
import { FC } from "react"
import { IllustrationNoContent } from "@douyinfe/semi-illustrations"
import "./index.sass"
const Index: FC = () => {
    return (
        <Empty
            image={<IllustrationNoContent style={{ width: 150, height: 150 }} />}
            title={"Working..."}
            description={"Waiting for constructing..."}
        />
    )
}

export default Index;