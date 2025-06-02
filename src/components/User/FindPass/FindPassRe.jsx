import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const FindPassRe = () => {
    const navigation = useNavigate();

    const onChange = () => {
        navigation('/pass_re_success')
    }

    return (
        <div className='FindPassRe_wrap Login_wrap Join_wrap FindPass_wrap container'>
            <h1>비밀번호 재설정</h1>
            <p>새로운 비밀번호를 입력해 주세요.</p>
            <div className="input_box">
                <input type="password" placeholder='비밀번호 입력(영문/숫자/특수문자 혼합 8자 이상)' />
                <input type="password" placeholder='비밀번호 확인' />
            </div>
            <button onClick={() => { onChange() }}>변경하기</button>
            <div className="link_box">
                <Link to='/login'>로그인</Link>
                <Link to='/join'>회원가입</Link>
            </div>
        </div>
    )
}

export default FindPassRe