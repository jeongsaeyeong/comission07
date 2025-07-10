import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Delete from '../../../assets/img/mypage/button_delete.svg'
import Profile from '../../../assets/img/mypage/profile.svg'
import ProfileTop from './ProfileTop'
import ProfileModify from './ProfileModify'

const baseUrl = process.env.REACT_APP_API_BASE_URL

const Mypage = () => {
    const [show, setShow] = useState(false);
    const [text, setText] = useState('로그아웃');
    const [modify, setModify] = useState(false);
    const [click, setClick] = useState('개별');
    const [notice, setNotice] = useState({ personal: '', all: '' });
    const [userInfo, setUserInfo] = useState({
        nickname: '',
        email: '',
        profile_image: '',
        point: 0
    });

    const loadNotices = async () => {
        try {
            const formData = new FormData();
            formData.append('username', localStorage.getItem('username'));

            const res = await axios.post(`${baseUrl}/backend/user/mypage/get_notice.php`, formData);
            if (res.data.success) {
                setNotice(res.data.data);
            }
        } catch (err) {
            console.error('공지 불러오기 실패', err);
        }
    };

    const loadUserInfo = async () => {
        try {
            const username = localStorage.getItem('username');
            const formData = new FormData();
            formData.append('username', username);

            const [infoRes, pointRes] = await Promise.all([
                axios.post(`${baseUrl}/backend/user/mypage/get_userinfo.php`, formData),
                axios.post(`${baseUrl}/backend/user/mypage/get_user_point.php`, formData)
            ]);

            if (infoRes.data.success && pointRes.data.success) {
                setUserInfo({
                    ...infoRes.data.data,
                    point: pointRes.data.point
                });
            }
        } catch (err) {
            console.error('유저 정보 또는 포인트 불러오기 실패', err);
        }
    };

    const handleSaveProfile = async () => {
        if (userInfo.newPassword && userInfo.newPassword !== userInfo.newPasswordConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('username', localStorage.getItem('username'));
            formData.append('nickname', userInfo.nickname);
            if (userInfo.newPassword) {
                formData.append('password', userInfo.newPassword);
            }

            const res = await axios.post(`${baseUrl}/backend/user/mypage/update_userinfo.php`, formData);
            if (res.data.success) {
                alert('프로필이 저장되었습니다.');
                loadUserInfo();  // 다시 불러오기
                setModify(false);
            } else {
                alert('실패: ' + res.data.message);
            }
        } catch (err) {
            console.error('저장 실패', err);
            alert('서버 오류');
        }
    };

    useEffect(() => {
        loadNotices();
        loadUserInfo();
    }, []);

    useEffect(() => {
        loadNotices();
    }, []);

    return (
        <div className='Mypage_wrap container_main'>
            <div className="right_m">
                <ProfileTop userInfo={userInfo} baseUrl={baseUrl} onModifyClick={() => setModify(!modify)} />
                {modify && (
                    <ProfileModify
                        userInfo={userInfo}
                        setUserInfo={setUserInfo}
                        setModify={setModify}
                        setShow={setShow}
                        setText={setText}
                        handleSaveProfile={handleSaveProfile}
                    />
                )}
            </div>
            <div className="left">
                <div className="tab">
                    <button onClick={() => { setClick('개별') }} className={click === '개별' ? 'click' : ''}>개별 공지</button>
                    <button onClick={() => { setClick('전체') }} className={click === '전체' ? 'click' : ''}>전체 공지</button>
                </div>
                <div className="main">
                    <p>{click === '개별' ? notice.personal : notice.all}</p>
                </div>
            </div>
            <div className="right">
                <ProfileTop userInfo={userInfo} baseUrl={baseUrl} onModifyClick={() => setModify(!modify)} />
                {modify && (
                    <ProfileModify
                        userInfo={userInfo}
                        setUserInfo={setUserInfo}
                        setModify={setModify}
                        setShow={setShow}
                        setText={setText}
                        handleSaveProfile={handleSaveProfile}
                    />
                )}
            </div>
            {show &&
                <div className="pop_wrap">
                    <div className="pop">
                        <h1>{text}</h1>
                        {text === '로그아웃' ? (
                            <p>정말 로그아웃 하시겠습니까?</p>
                        ) : (
                            <p>
                                탈퇴하신 후에도 작성한 게시글은 삭제되지 않으며,<br />
                                유저 정보는 보이지 않습니다.
                            </p>
                        )}
                        <div className="btn_box">
                            <button onClick={() => { setShow(false) }}>취소하기</button>
                            <button className='go'>{text}</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Mypage
