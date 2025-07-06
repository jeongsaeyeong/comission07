import React from 'react'

const LoginSuccess = () => {
    const handleEnter = () => {
        window.location.href = '/'
    }

    return (
        <div className='Login_wrap LoginSuccess_wrap container'>
            <div className="img"></div>
            <button className='go_home' onClick={handleEnter}>입장하기</button>
        </div>
    )
}

export default LoginSuccess
