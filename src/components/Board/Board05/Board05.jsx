import React, { useState } from 'react'
import Pagenation from '../ETC/Pagenation'
import ThreadItem from './ThreadItem'
import Exam from '../../../assets/img/board/example.png'
import Admin from '../../../assets/img/board/button_admin.svg'
import Camera from '../../../assets/img/board/button_picture.svg'
import Write05 from '../Write/Write05'
import { useParams } from 'react-router-dom'

const Board05 = () => {
    const [page, setPage] = useState(1);
    const [show, setShow] = useState(false);
    const [noticew, setNoticew] = useState(false);
    const params = useParams();

    return (
        <div className='Board05_wrap container_main'>
            <div className="top">
                {noticew ? (
                    <div className="notice_wrap notice_write">
                        <h3>공지</h3>
                        <textarea placeholder='내용을 입력하세요'></textarea>
                        <div className="btn_box">
                            <input type="file" id='file' />
                            <label htmlFor="file"><img src={Camera} alt="" /></label>
                            <button onClick={() => { setNoticew(false) }}>저장</button>
                        </div>
                    </div>
                ) : (
                    <div className="notice_wrap">
                        <h3>공지</h3>
                        <p>
                            공지 내용입니다 공지 내용입니다<br />
                            공지 내용입니다. 공지 내용입니다. 공지 내용입니다<br />
                            공지 내용입니다 공지 내용입니다<br />
                        </p>
                        {params.admin === 'admin' &&
                            <button className='admin_write' onClick={() => { setNoticew(true) }}>
                                <img src={Admin} alt="" />
                            </button>
                        }
                    </div>
                )}
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
