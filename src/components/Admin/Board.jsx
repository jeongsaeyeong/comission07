import React from 'react'
import LeftTop from './Board/LeftTop'
import LeftMiddle from './Board/LeftMiddle'
import RightTop from './Board/RightTop'
import RightMiddle from './Board/RightMiddle'
import LeftBottom from './Board/LeftBottom'

const Board = () => {
    return (
        <div className='Board_wrap Home_wrap'>
            <div className="left right">
                <LeftTop />
                <LeftMiddle />
                <RightTop />
                <RightMiddle />
            </div>
            <div className="left right">
               <LeftBottom />
            </div>
        </div>
    )
}

export default Board