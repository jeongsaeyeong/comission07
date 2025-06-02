import React from 'react'
import { Link } from 'react-router-dom'

const LoginSuccess = () => {
    return (
        <div className='Login_wrap LoginSuccess_wrap container'>
            <div className="img"></div>
            <Link to='/main'>입장하기</Link>
        </div>
    )
}

export default LoginSuccess