import React, { useState } from 'react'
import Delete from '../../../assets/img/mypage/button_delete.svg'
import Profile from '../../../assets/img/mypage/profile.svg'

const Mypage = () => {
    const [show, setShow] = useState(false);
    const [text, setText] = useState('로그아웃');
    const [modify, setModify] = useState(false);
    const [click, setClick] = useState('개별');

    return (
        <div className='Mypage_wrap container_main'>
            <div className="right_m">
                <div className="top">
                    <div className="icon">
                        <img src={Profile} alt="" />
                    </div>
                    <div className="info">
                        <h3>천사님</h3>
                        <p className='point'>500p</p>
                        <button onClick={() => { (setModify(!modify)) }}>프로필 관리</button>
                    </div>
                </div>
                {modify &&
                    <div className="modify_wrap">
                        <div className="top">
                            <div></div>
                            <h2>프로필 관리</h2>
                            <button onClick={() => { setModify(false) }}><img src={Delete} alt="" /></button>
                        </div>
                        <div className="bottom">
                            <div className="text_box">
                                <p>1234</p>
                                <p>1234@naver.com</p>
                                <input type="text" placeholder='닉네임' />
                                <input type="password" placeholder='비밀번호' />
                                <input className='last' type="password" placeholder='비밀번호 재입력' />
                            </div>
                            <div className="btn_box">
                                <div>
                                    <button onClick={() => { setText('로그아웃'); setShow(true) }}>로그아웃</button>
                                    <button onClick={() => { setText('계정 탈퇴'); setShow(true) }} className='del'>탈퇴하기</button>
                                </div>
                                <button>저장</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className="left">
                <div className="tab">
                    <button onClick={() => { setClick('개별') }} className={click === '개별' ? 'click' : ''}>개별 공지</button>
                    <button onClick={() => { setClick('전체') }} className={click === '전체' ? 'click' : ''}>전체 공지</button>
                </div>
                <div className="main">
                    <p>내용</p>
                </div>
            </div>
            <div className="right">
                <div className="top">
                    <div className="icon">
                        <img src={Profile} alt="" />
                    </div>
                    <div className="info">
                        <h3>천사님</h3>
                        <p className='point'>500p</p>
                        <button onClick={() => { (setModify(!modify)) }}>프로필 관리</button>
                    </div>
                </div>
                {modify &&
                    <div className="modify_wrap">
                        <div className="top">
                            <div></div>
                            <h2>프로필 관리</h2>
                            <button onClick={() => { setModify(false) }}><img src={Delete} alt="" /></button>
                        </div>
                        <div className="bottom">
                            <div className="text_box">
                                <p>1234</p>
                                <p>1234@naver.com</p>
                                <input type="text" placeholder='닉네임' />
                                <input type="password" placeholder='비밀번호' />
                                <input className='last' type="password" placeholder='비밀번호 재입력' />
                            </div>
                            <div className="btn_box">
                                <div>
                                    <button onClick={() => { setText('로그아웃'); setShow(true) }}>로그아웃</button>
                                    <button onClick={() => { setText('계정 탈퇴'); setShow(true) }} className='del'>탈퇴하기</button>
                                </div>
                                <button>저장</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
            {show &&
                <div className="pop_wrap">
                    <div className="pop">
                        <h1>{text}</h1>
                        {text === '로그아웃' ? (
                            <p>정말 로그아웃 하시겠습니까?</p>
                        ) : (
                            <p>
                                탈퇴하신 후에도 작성한 게시글은 삭제되지 않으며,<br />
                                유저 정보는 보이지 않습니다.
                            </p>
                        )}
                        <div className="btn_box">
                            <button onClick={() => { setShow(false) }}>취소하기</button>
                            <button className='go'>{text}</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Mypage