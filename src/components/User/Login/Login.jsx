import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_BASE_URL

const Login = ({ setOnlogin }) => {
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [errormsg, setErrormsg] = useState('')
    const [logo, setLogo] = useState(null)
    const navigation = useNavigate()
    const params = useParams();

    useEffect(() => {
        setOnlogin(false)
        const loadBackgroundImage = async () => {
            try {
                const res = await axios.get(`${baseUrl}/setting/home/get_login_background.php`)
                if (res.data.file_name) {
                    const imgUrl = `http://ooooo0516.dothome.co.kr/uploads/admin/${res.data.file_name}`
                    document.body.style.backgroundImage = `url(${imgUrl})`
                    document.body.style.backgroundSize = 'cover'
                    document.body.style.backgroundRepeat = 'no-repeat'
                    document.body.style.backgroundPosition = 'center center'
                }
            } catch (err) {
                console.error('배경 이미지 불러오기 실패', err)
            }
        }

        loadBackgroundImage()
    }, [])

    useEffect(() => {
        if (params.inmain !== 'inmain') {
            const checkLoginEnabled = async () => {
                try {
                    const res = await axios.get(`${baseUrl}/user/login/get_login_setting.php`)
                    if (res.data.value === '0') {
                        localStorage.setItem('username', 'none')
                        localStorage.setItem('password', 'none')
                        setOnlogin(true)
                        navigation('/')
                    }
                } catch (err) {
                    console.error('설정 불러오기 실패:', err)
                }
            }

            checkLoginEnabled()
        } else {
            setOnlogin(false)
        }

        const fetchLogo = async () => {
            try {
                const res = await axios.get(`${baseUrl}/user/login/get_main_logo.php`)
                if (res.data.file_name) {
                    setLogo(`http://ooooo0516.dothome.co.kr/uploads/admin/${res.data.file_name}`)
                }
            } catch (err) {
                console.error('로고 이미지 불러오기 실패:', err)
            }
        }

        const username = localStorage.getItem('username')
        if (username && username !== 'none') {
            alert('이미 로그인되어 있습니다.')
            navigation('/')
        } else {
            fetchLogo()
        }
    }, [])

    const onLogin = async () => {
        const formData = new FormData()
        formData.append('username', id)
        formData.append('password', password)

        try {
            const res = await axios.post(`${baseUrl}/user/login/login.php`, formData)
            if (res.data.success) {
                localStorage.setItem('username', id)
                localStorage.setItem('password', password)
                navigation('/login_success')
            } else {
                setErrormsg('로그인 실패: ' + res.data.message)
            }
        } catch (err) {
            setErrormsg('에러 발생: ' + err.message)
        }
    }

    return (
        <div className='Login_wrap container'>
            <div className="img">
                {logo && <img src={logo} alt="로고" />}
            </div>
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
