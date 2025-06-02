import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const navigation = useNavigate();

    const onLogin = () => {
        navigation('/login_success')
    }

    return (
        <div className='Login_wrap container'>
            <div className="img"></div>
            <div className="input_box">
                <input type="text" placeholder='아이디' />
                <input type="text" placeholder='비밀번호' />
                <button onClick={() => { onLogin() }}>로그인</button>
            </div>
            <div className="link_box">
                <Link to='/join'>회원가입</Link>
                <Link to='/findpass'>비밀번호 찾기</Link>
            </div>
        </div>
    )
}

export default Login