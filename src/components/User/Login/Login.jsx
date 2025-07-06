import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [errormsg, setErrormsg] = useState('');
    const navigation = useNavigate()

    useEffect(() => {
        const username = localStorage.getItem('username');
        if (username) {
            alert('이미 로그인되어 있습니다.');
            navigation('/');
        }
    }, []);

    const onLogin = async () => {
        const formData = new FormData();
        formData.append('username', id);
        formData.append('password', password);

        try {
            const res = await axios.post('http://ooooo0516.dothome.co.kr/backend/user/login/login.php', formData)
            if (res.data.success) {
                localStorage.setItem('username', id);
                localStorage.setItem('password', password);
                navigation('/login_success');
            } else {
                setErrormsg('로그인 실패: ' + res.data.message);
            }
        } catch (err) {
            setErrormsg('에러 발생: ' + err.message)
        }
    }

    return (
        <div className='Login_wrap container'>
            <div className="img"></div>
            <div className="input_box">
                <input type="text" placeholder='아이디' value={id} onChange={(e) => setId(e.target.value)} />
                <input type="password" placeholder='비밀번호' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={onLogin}>로그인</button>
                {errormsg && <p className='error'>{errormsg}</p>}
            </div>
            <div className="link_box">
                <Link to='/join'>회원가입</Link>
                <Link to='/findpass'>비밀번호 찾기</Link>
            </div>
        </div>
    )
}

export default Login
