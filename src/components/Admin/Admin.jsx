import React, { useState } from 'react'
import Home from './Home'
import Board from './Board'
import Member from './Member'

const Admin = () => {
    const [click, setClick] = useState('home')

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
                {click === 'member' && <Member />}
            </div>
        </div>
    )
}

export default Admin