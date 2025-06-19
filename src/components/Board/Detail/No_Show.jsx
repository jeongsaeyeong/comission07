import React from 'react'
import Rock from '../../../assets/img/board/button_rock.svg'

const No_Show = () => {
    return (
        <div className='no_wrap'>
            <img src={Rock} alt="" />
            <h3>비공개 게시글입니다.</h3>
            <p>관리자만 열람이 가능합니다.</p>
        </div>
    )
}

export default No_Show