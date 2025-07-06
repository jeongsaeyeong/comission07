import React from 'react'
import { Link } from 'react-router-dom'

const JoinSuccess = () => {
    return (
        <div className='JoinSuccess_wrap Login_wrap container'>
            <p>
                가입 신청이 완료 되었습니다!<br />
                관리자가 가입을 수락하면 로그인 할 수 있습니다.
            </p>
            <Link to='/login'>로그인페이지로 이동하기</Link>
        </div>
    )
}

export default JoinSuccess