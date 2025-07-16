import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Link } from 'react-router-dom'
import { TwitterTweetEmbed } from 'react-twitter-embed'
import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_BASE_URL

const Main = () => {
    const [notice, setNotice] = useState('')
    const [tweetId, setTweetId] = useState('')
    const [userInfo, setUserInfo] = useState({ nickname: '', point: 0 })
    const [totalProfile, setTotalProfile] = useState('')
    const [noLogin, setNoLogin] = useState(false);

    useEffect(() => {
        const fetchHomeSettings = async () => {
            try {
                const res = await axios.get(`${baseUrl}/setting/home/get_home_settings.php`)
                const data = res.data

                if (data.main_notice) setNotice(data.main_notice)
                if (data.twitter_widget) {
                    const match = data.twitter_widget.match(/status\/(\d+)/)
                    if (match) setTweetId(match[1])
                }
            } catch (err) {
                console.error('홈 설정 로딩 실패:', err)
            }
        }

        fetchHomeSettings()
    }, [])

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const username = localStorage.getItem('username')
                if (!username) return

                const formData = new FormData()
                formData.append('username', username)

                const [infoRes, pointRes] = await Promise.all([
                    axios.post(`${baseUrl}/user/mypage/get_userinfo.php`, formData),
                    axios.post(`${baseUrl}/user/mypage/get_user_point.php`, formData)
                ])

                if (infoRes.data && pointRes.data) {
                    setUserInfo({
                        ...infoRes.data.data,
                        point: pointRes.data.point
                    })
                }
            } catch (err) {
                console.error('유저 정보 불러오기 실패:', err)
            }
        }

        const fetchTotalProfile = async () => {
            try {
                const res = await axios.get(`${baseUrl}/setting/home/get_total_profile.php`)
                if (res.data.file_name) {
                    setTotalProfile(`http://ooooo0516.dothome.co.kr/uploads/admin/${res.data.file_name}`)
                }
            } catch (err) {
                console.error('토탈 프로필 이미지 로딩 실패:', err)
            }
        }

        fetchUserInfo()
        fetchTotalProfile()
    }, [])

    useEffect(() => {
        const username = localStorage.getItem('username');
        if (username === 'none') {
            setNoLogin(true);
        } else {
            setNoLogin(false);
        }
    }, [])

    const handleLogout = () => {
        localStorage.clear()
        alert('로그아웃되었습니다.')
        window.location.href = '/login'
    }

    return (
        <div className="Main_wrap container_main">
            <div className="m_header">
                <Header mobile={true} />
            </div>
            <div className="left">
                <h2>메인 공지</h2>
                <div dangerouslySetInnerHTML={{ __html: notice }} />
            </div>
            <div className="right">
                <div className="top">
                    {noLogin ? (
                        <Link to='/login/inmain' className='inlogin'>로그인</Link>
                    ) : (
                        <>
                            <div className="icon">
                                <img src={totalProfile || `${baseUrl}/default.png`} alt="프로필" />
                            </div>
                            <div className="info">
                                <h3>{userInfo.nickname || '닉네임'}</h3>
                                <p className="point">{userInfo.point}p</p>
                                <div className='info_btn'>
                                    {localStorage.getItem('username') === 'admin' ? (
                                        <Link to="/admin">관리자 페이지</Link>
                                    ) : (
                                        <Link to="/mypage">프로필 관리</Link>
                                    )}
                                    <button onClick={handleLogout}>로그아웃</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className="bottom">
                    {tweetId && <TwitterTweetEmbed tweetId={tweetId} />}
                </div>
            </div>
        </div >
    )
}

export default Main
