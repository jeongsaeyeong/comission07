import React, { useState } from 'react'
import Write05 from '../Write/Write05'
import Profile from '../../../assets/img/board/profile.png'
import Manage from '../ETC/Manage'
import Combtn from '../../../assets/img/board/button_comment.svg'
import Exam from '../../../assets/img/board/example.png'
import NoneBtn from '../../../assets/img/board/button_none.svg'
import { useNavigate } from 'react-router-dom'

const ContentItem = ({ text, img, count }) => {
    const [manage, setManage] = useState(false);
    const [big, setBig] = useState(false);
    const [show, setShow] = useState(false)
    const navigation = useNavigate();

    const onDetail = () => {
        navigation('/board05/detail/01')
    }

    return (
        <>
            <div className="content">
                <div className="left">
                    <img src={Profile} alt="" />
                    <div className={`line ${text === '답글2' ? 'line_not' : ''}`}></div>
                </div>
                <div className="right">
                    <div className="top">
                        <div>
                            <h3>익명</h3>
                            <p>2025.00.00 00:00</p>
                        </div>
                        <Manage setManage={setManage} manage={manage} />
                    </div>
                    <div className="bottom">
                        <p onClick={() => { onDetail() }}>{text}</p>
                        {img === undefined ? (<></>) : <img src={img} alt="" className='content_img' onClick={() => { setBig(true) }} />}
                        <button onClick={() => { setShow(true) }}><img src={Combtn} alt="" />{count}</button>
                    </div>
                </div>
            </div>
            {big && <div className='big_picture'>
                <button onClick={() => { setBig(false) }}><img src={NoneBtn} alt="" /></button>
                <img src={Exam} alt="" />
            </div>}
            {show && <Write05 setShow={setShow} comment={true}/>}
        </>
    )
}

export default ContentItem
