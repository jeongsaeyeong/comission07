import React, { useState } from 'react'
import Pagenation from '../ETC/Pagenation'
import ThreadItem from './ThreadItem'
import Exam from '../../../assets/img/board/example.png'

const Board05 = () => {
    const [page, setPage] = useState(1)

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
                        <button>업로드</button>
                    </div>
                    <Pagenation setPage={setPage} page={page} />
                </div>
            </div>
            <div className="main">
                <ThreadItem img={Exam} show={true}/>
                <ThreadItem show={false}/>
            </div>
        </div>
    )
}

export default Board05
