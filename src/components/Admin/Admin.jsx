import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Home from './Home'
import Board from './Board'
import Member from './Member'
import Delete from '../../assets/img/board/button_none.svg'

const Admin = () => {
    const [click, setClick] = useState('home')
    const [show, setShow] = useState(false)
    const [picture, setPicture] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const username = localStorage.getItem('username')
        if (username !== 'admin') {
            alert('관리자만 접근할 수 있습니다.')
            navigate('/')
        }
    }, [navigate])

    return (
        <div className='Admin_wrap container_main'>
            <div className="top">
                <button className={click === 'home' ? 'click' : ''} onClick={() => setClick('home')}>홈 설정</button >
                <button className={click === 'board' ? 'click' : ''} onClick={() => setClick('board')}>게시판 설정</button>
                <button className={click === 'member' ? 'click' : ''} onClick={() => setClick('member')}>멤버 설정</button>
            </div>
            <div className="main">
                {click === 'home' && <Home />}
                {click === 'board' && <Board />}
                {click === 'member' && <Member setShow={setShow} setPicture={setPicture} />}
            </div>
            {show &&
                <div className='picture_wrap'>
                    <button onClick={() => setShow(false)}><img src={Delete} alt="닫기" /></button>
                    <img src={picture} alt="신청 이미지" className="picture" />
                </div>
            }
        </div>
    )
}

export default Admin
