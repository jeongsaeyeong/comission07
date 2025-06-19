import React, { useState } from 'react'
import Back from '../../../assets/img/board/button_left.svg'
import Exam from '../../../assets/img/board/example.png'
import Picture from '../../../assets/img/board/button_picture.svg'
import Pagenation from '../ETC/Pagenation'
import ThreadItem from './ThreadItem'
import { useNavigate } from 'react-router-dom'

const Detail = () => {
    const [page, setPage] = useState(1);
    const navigation = useNavigate();

    const onBack = () => {
        navigation(-1)
    }

    return (
        <div className='Detail05_wrap container_main Board05_wrap'>
            <div className="top">
                <button onClick={() => { onBack() }} className="back"><img src={Back} alt="" /></button>
                <Pagenation page={page} setPage={setPage} />
            </div>
            <div className="main">
                <ThreadItem img={Exam} show={true} detail={true} />
                <div className="input_wrap">
                    <input type='text' id='comment' placeholder='댓글 작성하기' />
                    <div className="btn_box">
                        <input type="file" id='picture' />
                        <label htmlFor="picture"><img src={Picture} alt="" /></label>
                        <button>등록</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail