import React, { useState } from 'react'
import Home from './Home'
import Board from './Board'
import Member from './Member'
import Delete from '../../assets/img/board/button_none.svg'

const Admin = () => {
    const [click, setClick] = useState('home')
    const [show, setShow] = useState(false);

    return (
        <div className='Admin_wrap container_main'>
            <div className="top">
                <button className={click === 'home' ? 'click' : ''} onClick={() => { setClick('home') }}>홈 설정</button >
                <button className={click === 'board' ? 'click' : ''} onClick={() => { setClick('board') }}>게시판 설정</button>
                <button className={click === 'member' ? 'click' : ''} onClick={() => { setClick('member') }}>멤버 설정</button>
            </div>
            <div className="main">
                {click === 'home' && <Home />}
                {click === 'board' && <Board />}
                {click === 'member' && <Member setShow={setShow} />}
            </div>
            {show &&
                <div className='picture_wrap'>
                    <button onClick={() => { setShow(false) }}><img src={Delete} alt="" /></button>
                    <div>원본 이미지</div>
                </div>
            }
        </div>
    )
}

export default Admin