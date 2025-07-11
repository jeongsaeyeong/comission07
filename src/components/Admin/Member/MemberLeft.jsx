import React from 'react'
import MemberLeftTop from './MemberLeftTop'
import MemberLeftBottom from './MemberLeftBottom'
import MemberLeftSee from './MemberLeftSee'

const MemberLeft = ({ setShow, setPicture }) => {
    return (
        <div className="left">
            <MemberLeftTop />
            <MemberLeftBottom setShow={setShow} setPicture={setPicture} />
            <MemberLeftSee />
        </div>
    )
}

export default MemberLeft
