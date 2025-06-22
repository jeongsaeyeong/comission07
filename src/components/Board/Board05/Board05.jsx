import React, { useState } from 'react'
import Pagenation from '../ETC/Pagenation'
import ThreadItem from './ThreadItem'
import Exam from '../../../assets/img/board/example.png'
import Write05 from '../Write/Write05'

const Board05 = () => {
    const [page, setPage] = useState(1);
    const [show, setShow] = useState(false);
    const [big, setBig] = useState(false);

    return (
        <div className='Board05_wrap container_main'>
            <div className="top">
                <div className="notice_wrap">
                    <h3>공지</h3>
                    <p>
                        공지 내용입니다 공지 내용입니다<br />
                        공지 내용입니다. 공지 내용입니다. 공지 내용입니다<br />
                        공지 내용입니다 공지 내용입니다<br />
                    </p>
                </div>
                <div className="search_wrap">
                    <div className="search">
                        <input type="text" placeholder='검색어' />
                        <button>검색</button>
                        <button onClick={() => { setShow(true) }}>업로드</button>
                    </div>
                    <Pagenation setPage={setPage} page={page} />
                </div>
            </div>
            <div className="main">
                <ThreadItem img={Exam} show={true} />
                <ThreadItem show={false} />
            </div>
            {show && <Write05 setShow={setShow} />}
        </div>
    )
}

export default Board05
