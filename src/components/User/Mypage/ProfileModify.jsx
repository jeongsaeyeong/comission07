import React from 'react'
import Delete from '../../../assets/img/mypage/button_delete.svg'

const ProfileModify = ({
    userInfo,
    setUserInfo,
    setModify,
    setShow,
    setText,
    handleSaveProfile,
}) => {

    console.log('userInfo', userInfo)

    return (
        <div className="modify_wrap">
            <div className="top">
                <div></div>
                <h2>프로필 관리</h2>
                <button onClick={() => { setModify(false) }}>
                    <img src={Delete} alt="" />
                </button>
            </div>
            <div className="bottom">
                <div className="text_box">
                    <p>{userInfo.nickname}</p>
                    <p>{userInfo.email}</p>
                    <input
                        type="text"
                        placeholder="닉네임"
                        value={userInfo.nickname}
                        onChange={(e) => setUserInfo(prev => ({ ...prev, nickname: e.target.value }))}
                    />
                    <input
                        type="password"
                        placeholder="새 비밀번호"
                        value={userInfo.newPassword || ''}
                        onChange={(e) => setUserInfo(prev => ({ ...prev, newPassword: e.target.value }))}
                    />
                    <input
                        className="last"
                        type="password"
                        placeholder="비밀번호 재입력"
                        value={userInfo.newPasswordConfirm || ''}
                        onChange={(e) => setUserInfo(prev => ({ ...prev, newPasswordConfirm: e.target.value }))}
                    />
                </div>
                <div className="btn_box">
                    <div>
                        <button onClick={() => { setText('로그아웃'); setShow(true) }}>로그아웃</button>
                        <button onClick={() => { setText('계정 탈퇴'); setShow(true) }} className="del">탈퇴하기</button>
                    </div>
                    <button onClick={handleSaveProfile}>저장</button>
                </div>
            </div>
        </div>
    )
}

export default ProfileModify
