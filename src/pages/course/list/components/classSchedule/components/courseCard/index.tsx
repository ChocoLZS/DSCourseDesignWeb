import { FC, useState } from "react";
import { ICourseItem, ICourseItemWrap } from "@app/typings/course";
import "./index.scss"
import { Modal, Button } from "@douyinfe/semi-ui";
import PopCard from "@app/components/coursePopCard";


const index: FC<ICourseItemWrap<ICourseItem>> = (props) => {
    const clickHandler = () => {
        Modal.info({ 'content': <PopCard schedule course={props.course} />, icon: null })
    }
    return (
        <div className="card-course" onClick={clickHandler}>
            <div style={{ "fontWeight": "800", "marginBottom": "6px" }}>{props.course.name}</div>
            <div>{props.course.teacher}</div>
            <div>{props.course.location}</div>
        </div>
    )
}

export default index;