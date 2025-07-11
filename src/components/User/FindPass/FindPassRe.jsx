import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FindPassRe = () => {
    const navigation = useNavigate();
    const [pass, setPass] = useState('');
    const [passre, setPassre] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const onChange = async () => {
        const username = localStorage.getItem('find_username');
        if (!username) {
            setErrorMsg('유효하지 않은 접근입니다.');
            return;
        }

        if (pass !== passre) {
            setErrorMsg('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(pass)) {
            setErrorMsg('비밀번호는 영문/숫자/특수문자를 포함해 8자 이상이어야 합니다.');
            return;
        }

        const formData = new FormData();
        formData.append('username', username);
        formData.append('new_password', pass);

        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/user/join/reset_password.php`, {
            method: 'POST',
            body: formData
        });

        const data = await res.json();

        if (data.success) {
            localStorage.removeItem('find_username');
            navigation('/pass_re_success');
        } else {
            setErrorMsg(data.message);
        }
    };

    return (
        <div className='FindPassRe_wrap Login_wrap Join_wrap FindPass_wrap container'>
            <h1>비밀번호 재설정</h1>
            <p>새로운 비밀번호를 입력해 주세요.</p>
            <div className="input_box">
                <input
                    type="password"
                    placeholder='비밀번호 입력(영문/숫자/특수문자 혼합 8자 이상)'
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                />
                <input
                    type="password"
                    placeholder='비밀번호 확인'
                    value={passre}
                    onChange={(e) => setPassre(e.target.value)}
                />
            </div>
            <button onClick={onChange}>변경하기</button>
            <div className="link_box">
                <Link to='/login'>로그인</Link>
                <Link to='/join'>회원가입</Link>
            </div>
            <p className='errormsg'>{errorMsg}</p>
        </div>
    );
};

export default FindPassRe;
