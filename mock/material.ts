import { MockMethod } from 'vite-plugin-mock'

export type infoDataType = {
    type: string,
    title: string,
    link?: string,
    extension?: string,
    children?: Array<infoDataType>
}

const infoData: Array<infoDataType> = [
    {
        type: "directory",
        title: "第一章",
        children: [
            {
                type: "file",
                extension: ".pdf",
                title: "牛爷爷.pdf",
                link: "localhost:25565"
            },
            {
                type: "file",
                extension: ".doc",
                title: "大耳朵图图.doc",
                link: "localhost:25565"
            }]
    },
    {
        type: "directory",
        title: "第二章",
        children: [
            {
                type: "file",
                extension: ".pdf",
                title: "哆啦a梦.pdf",
                link: "localhost:25565"
            },
            {
                type: "file",
                extension: ".doc",
                title: "野比大雄.doc",
                link: "localhost:25565"
            }]
    }
]

export default [
    {
        url: '/mock/material',
        method: 'get',
        timeout: 500,
        response: () => {
            return {
                infoData
            }
        }
    }
] as MockMethod[]
