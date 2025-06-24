import React from 'react'
import Profile from '../../assets/img/main/icon_user.png'
import { Link } from 'react-router-dom'
import Header from './Header'

const Main = () => {
    return (
        <div className='Main_wrap container_main'>
            <div className='m_header'>
                <Header />
            </div>
            <div className="left">
                <h2>메인 공지</h2>
                <p>공지에 들어가는 내용</p>
            </div>
            <div className="right">
                <div className="top">
                    <div className="icon">
                        <img src={Profile} alt="" />
                    </div>
                    <div className="info">
                        <h3>천사님</h3>
                        <p className='point'>500p</p>
                        <Link to='/mypage'>프로필 관리</Link>
                    </div>
                </div>
                <div className="bottom">트위터</div>
            </div>
        </div>
    )
}

export default Main