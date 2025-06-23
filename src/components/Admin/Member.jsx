import React, { useState } from 'react'

const Member = ({ setShow }) => {

    return (
        <>
            <div className='Member_wrap Home_wrap Board_wrap'>
                <div className="left">
                    <div className="top">
                        <h3>회원가입 질문</h3>
                        <div>
                            <input type="text" placeholder='질문1' />
                            <button>저장</button>
                        </div>
                        <div>
                            <input type="text" placeholder='질문2' />
                            <button>저장</button>
                        </div>
                        <div>
                            <input type="text" placeholder='질문3' />
                            <button>저장</button>
                        </div>
                    </div>
                    <div className="bottom">
                        <h3>가입 신청 내역</h3>
                        <div className="list_wrap">
                            <div>
                                <button className='click'></button>
                                <p>전체</p>
                            </div>
                            <div>
                                <button></button>
                                <p>닉1</p>
                            </div>
                            <div>
                                <button></button>
                                <p>닉2</p>
                            </div>
                            <div>
                                <button></button>
                                <p>닉3</p>
                            </div>
                        </div>
                        <div className="info_wrap">
                            <p>아이디</p>
                            <p>닉네임</p>
                            <p>이메일</p>
                            <p>질문1 답변</p>
                            <p>질문2 답변</p>
                            <p>질문3 답변</p>
                            <p className='long'>가입 메시지</p>
                        </div>
                        <div className="btn_wrap">
                            <button onClick={() => { setShow(true) }}>신분증.jpg</button>
                            <div>
                                <button>반려</button>
                                <button className='ok'>승인</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="top">
                        <div className="point_manage">
                            <h3>포인트 관리</h3>
                            <div>
                                <input type="text" placeholder='닉네임' />
                                <button>찾기</button>
                            </div>
                            <div className="list_wrap">
                                <div>
                                    <button className='click'></button>
                                    <p>전체</p>
                                </div>
                                <div>
                                    <button></button>
                                    <p>닉1</p>
                                </div>
                                <div>
                                    <button></button>
                                    <p>닉2</p>
                                </div>
                                <div>
                                    <button></button>
                                    <p>닉3</p>
                                </div>
                            </div>
                            <div className="add">
                                <p>지급</p>
                                <input type="text" placeholder='숫자' />
                                <button>저장</button>
                            </div>
                            <div className="add">
                                <p>차감</p>
                                <input type="text" placeholder='숫자' />
                                <button>저장</button>
                            </div>
                        </div>
                        <div className="point_find">
                            <h3>포인트 내역 찾기</h3>
                            <div>
                                <input type="text" placeholder='닉네임' />
                                <button>찾기</button>
                            </div>
                            <div className='list_all'>
                                <div className="point_list">
                                    <p>지급</p>
                                    <div>
                                        <p>10,000</p>
                                        <p className='date'>2025.00.00</p>
                                    </div>
                                    <div>
                                        <p>10,000</p>
                                        <p className='date'>2025.00.00</p>
                                    </div>
                                    <div>
                                        <p>10,000</p>
                                        <p className='date'>2025.00.00</p>
                                    </div>
                                </div>
                                <div className="point_list">
                                    <p>차감</p>
                                    <div>
                                        <p>10,000</p>
                                        <p className='date'>2025.00.00</p>
                                    </div>
                                    <div>
                                        <p>10,000</p>
                                        <p className='date'>2025.00.00</p>
                                    </div>
                                    <div>
                                        <p>10,000</p>
                                        <p className='date'>2025.00.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="middle">
                        <div className="tab">
                            <h3>운영진 설정</h3>
                            <p>관리자A</p>
                            <p>관리자B</p>
                        </div>
                        <div>
                            <input type="text" placeholder='닉네임' />
                            <button>찾기</button>
                        </div>
                        <div>
                            <input type="text" placeholder='닉네임' />
                            <button>삭제</button>
                        </div>
                        <div>
                            <label htmlFor="file">파일명</label>
                            <input type="file" id='file' placeholder='파일명' />
                            <button>저장</button>
                        </div>
                        <div className='list_all'>
                            <div className="list_wrap">
                                <div>
                                    <button className='click'></button>
                                    <p>전체</p>
                                </div>
                                <div>
                                    <button></button>
                                    <p>닉1</p>
                                </div>
                                <div>
                                    <button></button>
                                    <p>닉2</p>
                                </div>
                                <div>
                                    <button></button>
                                    <p>닉3</p>
                                </div>
                            </div>
                            <button>저장</button>
                        </div>
                    </div>
                    <div className="bottom">
                        <h3>강제 탈퇴</h3>
                        <div>
                            <input type="text" placeholder='닉네임' />
                            <button>찾기</button>
                        </div>
                        <div>
                            <input type="text" placeholder='닉네임' />
                            <button>삭제</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Member