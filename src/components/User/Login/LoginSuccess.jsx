import React, { useEffect, useState } from 'react'
import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_BASE_URL

const LoginSuccess = () => {
    const [logo, setLogo] = useState(null)

    useEffect(() => {
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

        fetchLogo()
    }, [])

    const handleEnter = () => {
        window.location.href = '/'
    }

    return (
        <div className='Login_wrap LoginSuccess_wrap container'>
            <div className="img">
                {logo && <img src={logo} alt="로고" />}
            </div>
            <button className='go_home' onClick={handleEnter}>입장하기</button>
        </div>
    )
}

export default LoginSuccess
