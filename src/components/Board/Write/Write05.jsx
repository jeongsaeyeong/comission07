import React from 'react'
import None from '../../../assets/img/board/button_none.svg'
import Camera from '../../../assets/img/board/button_picturew.svg'
import Profile from '../../../assets/img/board/profile.png'

const Write05 = ({ setShow, comment }) => {
    return (
        <div className='Write05_wrap container_main'>
            <div className="write_wrap">
                <div className="header">
                    <button onClick={() => { setShow(false) }} className='none_btn'><img src={None} alt="" /></button>
                    <button>게시하기</button>
                </div>
                <div className="main">
                    {comment &&
                        <div className="comment">
                            <div className="left">
                                <img src={Profile} alt="" />
                                <div className="line"></div>
                            </div>
                            <div className="right">
                                <h3>익명</h3>
                                <p>내용</p>
                            </div>
                        </div>
                    }
                    <div className="profile">
                        <img src={Profile} alt="" />
                        <p>닉네임</p>
                    </div>
                    <div className="content">
                        <input type="text" placeholder='무슨 일이 일어나고 있나요?' />
                        <div className="picture_wrap">
                            <div className="picture"></div>
                            <div className="picture"></div>
                            <div className="picture"></div>
                            <div className="picture"></div>
                        </div>
                        <div className="btn_box">
                            <div>
                                <input type="file" id='picture' />
                                <label htmlFor="picture"><img src={Camera} alt="" /></label>
                            </div>
                            <div>
                                <input type="checkbox" id='check' />
                                <label htmlFor="check" className='check'></label>
                                <p>민감한 내용으로 표시</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Write05