import React from 'react'
import MemberLeftTop from './MemberLeftTop'
import MemberLeftBottom from './MemberLeftBottom'

const MemberLeft = ({ setShow, setPicture }) => {
    return (
        <div className="left">
            <MemberLeftTop />
            <MemberLeftBottom setShow={setShow} setPicture={setPicture} />
        </div>
    )
}

export default MemberLeft
