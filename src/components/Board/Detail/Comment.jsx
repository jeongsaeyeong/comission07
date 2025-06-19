import React, { useState } from 'react'
import Manage from '../ETC/Manage'

const Comment = ({ nickname, date, text }) => {
    const [manage, setManage] = useState(false)

    return (
        <div className="comment">
            <div className="top">
                <div className="left">
                    <h3>{nickname}</h3>
                    <p>{date}</p>
                </div>
                <Manage manage={manage} setManage={setManage} />
            </div>
            <p className="text">{text}</p>
        </div>
    )
}

export default Comment
