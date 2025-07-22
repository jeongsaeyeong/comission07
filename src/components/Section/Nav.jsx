import React, { useEffect, useState } from 'react'
import Del from '../../assets/img/main/button_delete.svg'
import Logo from '../../assets/img/main/logo_m.png'
import Menu from '../../assets/img/main/button_menu.svg'
import Profile from '../../assets/img/main/icon_user.png'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_BASE_URL

const boardLinks = [
    { path: '/board/01', key: 'menu1', mobileKey: 'm_menu1', className: 'board01' },
    { path: '/board/02', key: 'menu2', mobileKey: 'm_menu2', className: 'board02' },
    { path: '/board/03', key: 'menu3', mobileKey: 'm_menu3', className: 'board03' },
    { path: '/board/04', key: 'menu4', mobileKey: 'm_menu4', className: 'board04' },
    { path: '/board05', key: 'menu5', mobileKey: 'm_menu5', className: 'board05' },
]

const Nav = () => {
    const [show, setShow] = useState(false)
    const [menuImages, setMenuImages] = useState({})
    const location = useLocation()
    const [totalProfile, setTotalProfile] = useState('')
    const [noLogin, setNoLogin] = useState(false);
    const [userInfo, setUserInfo] = useState({
        nickname: '',
        point: 0
    })

    useEffect(() => {
        setShow(false)
    }, [location.pathname])

    useEffect(() => {
        const fetchUserInfo = async () => {
            const username = localStorage.getItem('username')
            if (!username) return

            try {
                const formData = new FormData()
                formData.append('username', username)

                const [infoRes, pointRes, profileRes] = await Promise.all([
                    axios.post(`${baseUrl}/user/mypage/get_userinfo.php`, formData),
                    axios.post(`${baseUrl}/user/mypage/get_user_point.php`, formData),
                    axios.get(`${baseUrl}/setting/home/get_total_profile.php`)
                ])

                if (infoRes.data && pointRes.data) {
                    setUserInfo({
                        nickname: infoRes.data.data.nickname,
                        point: pointRes.data.point
                    })
                }

                if (profileRes.data) {
                    setTotalProfile(`http://ooooo0516.dothome.co.kr/uploads/admin/${profileRes.data.file_name}`)
                }
            } catch (err) {
                console.error('유저 정보 불러오기 실패', err)
            }
        }

        fetchUserInfo()
    }, [])

    useEffect(() => {
        const fetchMenuImages = async () => {
            try {
                const res = await axios.get(`${baseUrl}/setting/home/get_menu_images.php`)
                setMenuImages(res.data)
            } catch (err) {
                console.error('메뉴 이미지 로딩 실패:', err)
            }
        }

        fetchMenuImages()
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
        <div className='Nav_wrap'>
            <div className="nav">
                <Link to='/'><img className='menu_wrap' src={`http://ooooo0516.dothome.co.kr/uploads/admin/${menuImages.menu_logo || 'default.png'}`} alt="logo" /></Link>
                {boardLinks.map(link => (
                    <Link key={link.path} to={link.path}>
                        <img
                            className={link.className}
                            src={`http://ooooo0516.dothome.co.kr/uploads/admin/${menuImages[link.key] || 'default.png'}`}
                            alt={link.key}
                        />
                    </Link>
                ))}
            </div>
            <div className="nav_m">
                <Link to='/'><img className='menu_wrap' src={`http://ooooo0516.dothome.co.kr/uploads/admin/${menuImages.m_menu_logo}`} alt="logo" /></Link>
                <button onClick={() => setShow(true)}><img src={Menu} alt="menu" /></button>
                {show && (
                    <div className="nav_m_wrap">
                        <div>
                            {noLogin ? (
                                <div className="top">
                                    <Link to='/login/inmain' className='inlogin'>로그인</Link>
                                    <button onClick={() => setShow(false)}>
                                        <img src={Del} alt="닫기" />
                                    </button>
                                </div>
                            ) : (
                                <div className="top">
                                    <div className="icon">
                                        <img src={totalProfile || Profile} alt="user" />
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
                                    <button onClick={() => setShow(false)}>
                                        <img src={Del} alt="닫기" />
                                    </button>
                                </div>
                            )}
                            <div className="bottom">
                                {boardLinks.map(link => (
                                    <Link key={link.path} to={link.path}>
                                        <img
                                            className={link.className}
                                            src={`http://ooooo0516.dothome.co.kr/uploads/admin/${menuImages[link.mobileKey] || 'default.png'}`}
                                            alt={link.key}
                                        />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Nav
