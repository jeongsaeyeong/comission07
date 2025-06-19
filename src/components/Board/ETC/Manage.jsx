import React from 'react'
import Manage_icon from '../../../assets/img/board/button_manage.svg'

const Manage = ({ manage, setManage }) => {
    return (
        <div className='manage' onClick={() => { setManage(!manage) }}>
            <img src={Manage_icon} alt="" />
            {manage ? (
                <div className="btn_box">
                    <button>수정</button>
                    <button>삭제</button>
                </div>) : (<></> )}
        </div>
    )
}

export default Manage