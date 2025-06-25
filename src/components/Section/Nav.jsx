import React, { useEffect, useState } from 'react'
import Example from '../../assets/img/main/example.png'
import Del from '../../assets/img/main/button_delete.svg'
import Logo from '../../assets/img/main/logo_m.png'
import Menu from '../../assets/img/main/button_menu.svg'
import Profile from '../../assets/img/main/icon_user.png'
import { Link, useLocation } from 'react-router-dom'

const Nav = () => {
    const [show, setShow] = useState(false);

    const location = useLocation()

    useEffect(() => {
        setShow(false)
    }, [location.pathname])

    return (
        <div className='Nav_wrap'>
            <div className="nav">
                <Link to='/'><img className='menu_wrap' src={Example} alt="" /></Link>
                <Link to='/board/01'><img className='board01' src={Example} alt="" /></Link>
                <Link to='/board/02'><img className='board02' src={Example} alt="" /></Link>
                <Link to='/board/03'><img className='board03' src={Example} alt="" /></Link>
                <Link to='/board/04'><img className='board04' src={Example} alt="" /></Link>
                <Link to='/board05'><img className='board05' src={Example} alt="" /></Link>
            </div>
            <div className="nav_m">
                <Link to={'/'}>
                    <img src={Logo} alt="" />
                </Link>
                <button onClick={() => { setShow(true) }}><img src={Menu} alt="" /></button>
                {show &&
                    <div className="nav_m_wrap">
                        <div>
                            <div className="top">
                                <div className="icon">
                                    <img src={Profile} alt="" />
                                </div>
                                <div className="info">
                                    <h3>천사님</h3>
                                    <p className="point">500p</p>
                                    <Link to="/mypage">프로필 관리</Link>
                                </div>
                                <button onClick={() => { setShow(false) }}><img src={Del} alt="" /></button>
                            </div>
                            <div className="bottom">
                                <Link to='/board/01'><img className='board01' src={Example} alt="" /></Link>
                                <Link to='/board/02'><img className='board02' src={Example} alt="" /></Link>
                                <Link to='/board/03'><img className='board03' src={Example} alt="" /></Link>
                                <Link to='/board/04'><img className='board04' src={Example} alt="" /></Link>
                                <Link to='/board05'><img className='board05' src={Example} alt="" /></Link>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Nav