import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const FindPass = () => {
    const navigation = useNavigate();

    const onPass = () => {
        navigation('/pass_re')
    }

    return (
        <div className='FindPass_wrap Login_wrap Join_wrap container'>
            <h1>비밀번호 재설정</h1>
            <div className="input_box">
                <input type="text" placeholder='아이디' />
                <input type="email" placeholder='이메일' />
            </div>
            <div className="input_box">
                <h3>비밀번호 힌트 질문: 최애 팬픽 작가님은?</h3>
                <input type="text" placeholder='비밀번호 힌트 답변' />
            </div>
            <button onClick={() => { onPass() }}>비밀번호 재설정하기</button>
            <div className="link_box">
                <Link to='/login'>로그인</Link>
                <Link to='/login'>회원가입</Link>
            </div>
        </div>
    )
}

export default FindPass