import React from 'react'
import { Link } from 'react-router-dom'

const FindPassSuccess = () => {
    return (
        <div className='FindPassSuccess_wrap container Login_wrap'>
            <p>비밀번호 변경이 완료되었습니다.</p>
            <Link to='/login'>로그인하기</Link>
        </div>
    )
}

export default FindPassSuccess