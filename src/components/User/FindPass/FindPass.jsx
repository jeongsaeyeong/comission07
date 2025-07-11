import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FindPass = () => {
    const navigation = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [hintAnswer, setHintAnswer] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const onPass = async () => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('hint_answer', hintAnswer);

        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/user/join/find_password.php`, {
            method: 'POST',
            body: formData
        });

        const data = await res.json();

        if (data.success) {
            localStorage.setItem('find_username', username);
            navigation('/pass_re');
        } else {
            setErrorMsg(data.message);
        }
    };

    return (
        <div className='FindPass_wrap Login_wrap Join_wrap container'>
            <h1>비밀번호 재설정</h1>
            <div className="input_box">
                <input type="text" placeholder='아이디' value={username} onChange={e => setUsername(e.target.value)} />
                <input type="email" placeholder='이메일' value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="input_box">
                <h3>비밀번호 힌트 질문: 최애 팬픽 작가님은?</h3>
                <input type="text" placeholder='비밀번호 힌트 답변' value={hintAnswer} onChange={e => setHintAnswer(e.target.value)} />
            </div>
            <button onClick={onPass}>비밀번호 재설정하기</button>
            <div className="link_box">
                <Link to='/login'>로그인</Link>
                <Link to='/join'>회원가입</Link>
            </div>
            <p className='errormsg'>{errorMsg}</p>
        </div>
    );
};

export default FindPass;
