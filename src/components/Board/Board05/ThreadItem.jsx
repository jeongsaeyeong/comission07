import React, { useEffect, useState } from 'react'
import ContentItem from './ContentItem'
import More from '../../../assets/img/board/button_more.svg'
import Profile from '../../../assets/img/board/profile.png'

const ThreadItem = ({ img, show, detail }) => {
    const [thisshow, setThisshow] = useState(show);

    return (
        <div className="content_wrap">
            <ContentItem text="내용" count={1} />

            <button onClick={() => { setThisshow(!thisshow) }}>
                <div><img src={More} alt="" /></div>
                <p>이 스레드 {thisshow ? '접기' : '표시'}</p>
            </button>
            {thisshow ? (
                <>
                    <ContentItem text="답글1" count={1} img={img} />
                    <ContentItem text="답글2" count={0} />
                </>
            ) : (
                <></>
            )}

            {detail &&
                <div className="another content">
                    <div className="left">
                        <img src={Profile} alt="" />
                    </div>
                    <div className="right">
                        <button>다른 게시물 추가</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default ThreadItem
