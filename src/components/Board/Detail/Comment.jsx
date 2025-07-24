import React, { useState } from 'react'
import Manage from '../ETC/Manage'

const Comment = ({ nickname, date, text, image, cmodify, commentId }) => {
    const [manage, setManage] = useState(false)
    const isMine = localStorage.getItem('username') === nickname

    console.log('isMine', isMine)

    return (
        <div className="comment">
            <div className="top">
                <div className="left">
                    <h3>{nickname}</h3>
                    <p>{date}</p>
                </div>
                {isMine &&
                    <Manage
                        cmodify="comment"
                        manage={manage}
                        setManage={setManage}
                        commentId={commentId} 
                        text={text}          
                        image={image}         
                    />
                }
            </div>
            <p className="text">{text}</p>
            {image && (
                <div className="comment_image">
                    <img src={`/uploads/comments/${image}`} alt="첨부 이미지" />
                </div>
            )}
        </div>
    )
}

export default Comment
