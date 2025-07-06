import React from 'react'
import Profile from '../../assets/img/main/icon_user.png'
import { Link } from 'react-router-dom'
import Header from './Header'
import { TwitterTweetEmbed } from 'react-twitter-embed'

const Main = () => {
    const handleLogout = () => {
        localStorage.clear()
        alert('로그아웃되었습니다.')
        window.location.href = '/login'
    }

    return (
        <div className="Main_wrap container_main">
            <div className="m_header">
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
                        <p className="point">500p</p>
                        <div className='info_btn'>
                            {localStorage.getItem('username') === 'admin' ? (
                                <Link to="/admin">관리자 페이지</Link>
                            ) : (
                                <Link to="/mypage">프로필 관리</Link>
                            )}
                            <button onClick={handleLogout}>로그아웃</button>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <div>
                        <TwitterTweetEmbed tweetId={'1936985273533087768'} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main
