import React from 'react'
import MemberLeft from './Member/MemberLeft'
import MemberRight from './Member/MemberRight'

const Member = ({ setShow, setPicture }) => {
    return (
        <div className='Member_wrap Home_wrap Board_wrap'>
            <MemberLeft setShow={setShow}  setPicture={setPicture}/>
            <MemberRight />
        </div>
    )
}

export default Member
