import React from 'react'
import MemberRightTop from './MemberRightTop'
import MemberRightMiddle from './MemberRightMiddle'
import MemberRightBottom from './MemberRightBottom'

const MemberRight = () => {
    return (
        <div className="right">
            <MemberRightTop />
            <MemberRightMiddle />
            <MemberRightBottom />
        </div>
    )
}

export default MemberRight
