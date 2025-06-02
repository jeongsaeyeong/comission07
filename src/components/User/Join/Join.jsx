import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Join = () => {
    const navigation = useNavigate();

    const onJoin = () => {
        navigation('/join_success')
    }

    return (
        <div className='Login_wrap Join_wrap container'>
            <h1>회원가입</h1>
            <div className="input_box">
                <h3>회원 정보</h3>
                <input type="text" placeholder='아이디' />
                <input type="text" placeholder='닉네임(띄어쓰기 없이 국문 12자 이하)' />
                <input type="email" placeholder='이메일' />
                <input type="password" placeholder='비밀번호 입력 (영문/숫자/특수문자 혼합 8자 이상)' />
                <input type="password" placeholder='비밀번호 확인' />
            </div>
            <div className="input_box">
                <h3>비밀번호 힌트 질문: 최애 팬픽 작가님은?</h3>
                <input type="text" placeholder='비밀번호 힌트 답안' />
            </div>
            <div className="input_box input_file">
                <div>
                    <label htmlFor="file_input">사진 첨부</label>
                    <input type="file" id='file_input' />
                </div>
                <p>
                    신분증의 주민번호 앞 7자리를 제외한 정보는 마스킹하고<br />
                    닉네임이 적힌 사진을 포함하여 첨부해 주세요.
                </p>
            </div>
            <div className="input_box">
                <h3>가입 질문</h3>
                <input type="text" placeholder='1. 질문' />
                <input type="text" placeholder='2. 질문' />
                <input type="text" placeholder='3. 질문' />
            </div>
            <div className="input_box">
                <h3>유수에 대하여 자유발언 해주세요 (500자 이상)</h3>
                <input type="text" placeholder='유수에 대한 자유발언' />
            </div>
            <button onClick={() => { onJoin() }}>가입 신청</button>
            <Link to='/'>로그인</Link>
        </div>
    )
}

export default Join