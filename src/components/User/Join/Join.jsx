import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Join = () => {
    const navigation = useNavigate();
    const [id, setId] = useState('');
    const [nick, setNick] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [passre, setPassre] = useState('');
    const [hint, setHint] = useState('');
    const [file, setFile] = useState(null)
    const [answer01, setAnswer01] = useState('');
    const [answer02, setAnswer02] = useState('');
    const [answer03, setAnswer03] = useState('');
    const [free, setFree] = useState('');
    const [errormsg, setErrormsg] = useState('');
    const [touched, setTouched] = useState({
        nick: false,
        email: false,
        pass: false,
        passre: false
    })

    useEffect(() => {
        const username = localStorage.getItem('username');
        if (username) {
            alert('이미 로그인되어 있습니다.');
            navigation('/');
        }
    }, []);

    useEffect(() => {
        if (touched.passre && pass !== passre) {
            setErrormsg('비밀번호가 일치하지 않습니다.')
            return
        }

        if (!/^[가-힣]{1,12}$/.test(nick)) {
            setErrormsg('닉네임은 띄어쓰기 없이 한글 12자 이하로 입력해 주세요.');
            return;
        }

        if (touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setErrormsg('올바른 이메일 형식을 입력해 주세요.')
            return
        }

        if (touched.pass && !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(pass)) {
            setErrormsg('비밀번호는 영문/숫자/특수문자를 포함해 8자 이상이어야 합니다.')
            return
        }

        if (file && !['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'].includes(file.type)) {
            setErrormsg('이미지 파일만 첨부해 주세요.');
            return;
        }

        setErrormsg('')
    }, [nick, pass, passre, email, touched, file]);


    const onJoin = async () => {
        if (!id || !nick || !email || !pass || !passre || !hint || !file || !answer01 || !answer02 || !answer03 || !free) {
            setErrormsg('모든 항목을 입력해 주세요.');
            return;
        }

        if (pass !== passre) {
            setErrormsg('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (!/^[가-힣]{1,12}$/.test(nick)) {
            setErrormsg('닉네임은 띄어쓰기 없이 한글 12자 이하로 입력해 주세요.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setErrormsg('올바른 이메일 형식을 입력해 주세요.');
            return;
        }

        if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(pass)) {
            setErrormsg('비밀번호는 영문/숫자/특수문자를 포함해 8자 이상이어야 합니다.');
            return;
        }

        if (file && !['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'].includes(file.type)) {
            setErrormsg('이미지 파일만 첨부해 주세요.');
            return;
        }

        const formData = new FormData();
        formData.append('username', id);
        formData.append('nickname', nick);
        formData.append('email', email);
        formData.append('password', pass);
        formData.append('hint_question', '최애 팬픽 작가님은?');
        formData.append('hint_answer', hint);
        formData.append('profile_image', file);
        formData.append('answer01', answer01);
        formData.append('answer02', answer02);
        formData.append('answer03', answer03);
        formData.append('free', free);

        try {
            const res = await axios.post('http://ooooo0516.dothome.co.kr/backend/user/join/join.php', formData);
            if (res.data.success) {
                navigation('/join_success');
            } else {
                setErrormsg('회원가입 실패: ' + res.data.message);
            }
        } catch (err) {
            setErrormsg('에러 발생: ' + err.message);
        }
    }

    return (
        <div className='Login_wrap Join_wrap container'>
            <h1>회원가입</h1>
            <div className="input_box">
                <h3>회원 정보</h3>
                <input value={id} onChange={(e) => { setId(e.target.value) }} type="text" placeholder='아이디' />
                <input value={nick} onChange={(e) => { setNick(e.target.value) }} onBlur={() => setTouched(prev => ({ ...prev, nick: true }))} type="text" placeholder='닉네임(띄어쓰기 없이 국문 12자 이하)' />
                <input value={email} onChange={(e) => { setEmail(e.target.value) }} onBlur={() => setTouched(prev => ({ ...prev, email: true }))} type="email" placeholder='이메일' />
                <input value={pass} onChange={(e) => { setPass(e.target.value) }} onBlur={() => setTouched(prev => ({ ...prev, pass: true }))} type="password" placeholder='비밀번호 입력 (영문/숫자/특수문자 혼합 8자 이상)' />
                <input value={passre} onChange={(e) => { setPassre(e.target.value) }} onBlur={() => setTouched(prev => ({ ...prev, passre: true }))} type="password" placeholder='비밀번호 확인' />
            </div>
            <div className="input_box">
                <h3>비밀번호 힌트 질문: 최애 팬픽 작가님은?</h3>
                <input value={hint} onChange={(e) => { setHint(e.target.value) }} type="text" placeholder='비밀번호 힌트 답안' />
            </div>
            <div className="input_box input_file">
                <div>
                    <label htmlFor="file_input">사진 첨부</label>
                    <input onChange={(e) => setFile(e.target.files[0])} type="file" id='file_input' />
                </div>
                {file ? (<p>{file.name}</p>) : (
                    <p>
                        신분증의 주민번호 앞 7자리를 제외한 정보는 마스킹하고<br />
                        닉네임이 적힌 사진을 포함하여 첨부해 주세요.
                    </p>
                )}
            </div>
            <div className="input_box">
                <h3>가입 질문</h3>
                <input value={answer01} onChange={(e) => { setAnswer01(e.target.value) }} type="text" placeholder='1. 질문' />
                <input value={answer02} onChange={(e) => { setAnswer02(e.target.value) }} type="text" placeholder='2. 질문' />
                <input value={answer03} onChange={(e) => { setAnswer03(e.target.value) }} type="text" placeholder='3. 질문' />
            </div>
            <div className="input_box">
                <h3>유수에 대하여 자유발언 해주세요 (500자 이상)</h3>
                <input value={free} onChange={(e) => { setFree(e.target.value) }} type="text" placeholder='유수에 대한 자유발언' />
            </div>
            <button onClick={() => { onJoin() }}>가입 신청</button>
            <Link to='/'>로그인</Link>
            <p className='errormsg'>{errormsg}</p>
        </div>
    )
}

export default Join