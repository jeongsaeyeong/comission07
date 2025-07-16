import React from 'react'

const ProfileTop = ({ userInfo, onModifyClick, baseUrl, totalProfile }) => {
    console.log('totalProfile', totalProfile)
    
    return (
        <div className="top">
            <div className="icon">
                <img src={totalProfile || `${baseUrl}/default.png`} alt="프로필" />
            </div>
            <div className="info">
                <h3>{userInfo.nickname || '닉네임'}</h3>
                <p className='point'>{userInfo.point}p</p>
                <button onClick={onModifyClick}>프로필 관리</button>
            </div>
        </div>
    )
}

export default ProfileTop