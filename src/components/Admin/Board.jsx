import React from 'react'

const Board = () => {
    return (
        <div className='Board_wrap Home_wrap'>
            <div className="left">
                <div className="top">
                    <h3>익명 게시판 별명</h3>
                    <div>
                        <input type="text" placeholder='닉네임을 입력하세요' />
                        <button>저장</button>
                    </div>
                </div>
                <div className="middle">
                    <h3>게시판 관리</h3>
                    <div className="board_manage">
                        <div className="kind">
                            <h4 className='name'>게시판</h4>
                            <h4>페이지 번호</h4>
                            <h4>페이지 목록 수</h4>
                            <h4>댓글 페이지 번호</h4>
                            <h4>댓글 목록 수</h4>
                        </div>
                        <div className='state_wrap'>
                            <div className="state">
                                <p className="name">메뉴1</p>
                                <input type="text" placeholder='숫자' />
                                <input type="text" placeholder='숫자' />
                                <input type="text" placeholder='숫자' />
                                <input type="text" placeholder='숫자' />
                            </div>
                            <div className="state">
                                <p className="name">메뉴2</p>
                                <input type="text" placeholder='숫자' />
                                <input type="text" placeholder='숫자' />
                                <input type="text" placeholder='숫자' />
                                <input type="text" placeholder='숫자' />
                            </div>
                            <div className="state">
                                <p className="name">메뉴3</p>
                                <input type="text" placeholder='숫자' />
                                <input type="text" placeholder='숫자' />
                                <input type="text" placeholder='숫자' />
                                <input type="text" placeholder='숫자' />
                            </div>
                            <div className="state">
                                <p className="name">메뉴4</p>
                                <input type="text" placeholder='숫자' />
                                <input type="text" placeholder='숫자' />
                                <input type="text" placeholder='숫자' />
                                <input type="text" placeholder='숫자' />
                            </div>
                            <div className="state">
                                <p className="name">메뉴5</p>
                                <input type="text" placeholder='숫자' />
                                <input type="text" placeholder='숫자' />
                                <input type="text" placeholder='숫자' />
                                <input type="text" placeholder='숫자' />
                            </div>
                        </div>
                        <button>저장</button>
                    </div>
                </div>
                <div className="bottom">
                    <h3>마이페이지 공지</h3>
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
                </div>
            </div>
            <div className="right">
                <div className="top">
                    <div className='tab'>
                        <h3>메뉴1 탭 추가</h3>
                        <p>장편</p>
                        <p>단편</p>
                    </div>
                    <div>
                        <div className="add">
                            <input type="text" placeholder='탭 이름' />
                            <button>추가</button>
                        </div>
                        <div className="delete">
                            <input type="text" placeholder='탭 이름' />
                            <button>삭제</button>
                        </div>
                    </div>
                </div>
                <div className="middle">
                    <h3>게시판 포인트 관리</h3>
                    <div className="board_manage">
                        <div className="kind">
                            <h4 className='name'>게시판</h4>
                            <h4>글 작성 지급</h4>
                            <h4>글 열람 차감</h4>
                            <h4>댓글 작성 지급</h4>
                        </div>
                        <div className='state_wrap'>
                            <div className="state">
                                <p className="name">메뉴1</p>
                                <input type="text" placeholder='숫자' />
                                <input type="text" placeholder='숫자' />
                                <input type="text" placeholder='숫자' />
                            </div>
                            <div className="state">
                                <p className="name">메뉴2</p>
                                <input type="text" placeholder='숫자' />
                                <input type="text" placeholder='숫자' />
                                <input type="text" placeholder='숫자' />
                            </div>
                            <div className="state">
                                <p className="name">메뉴3</p>
                                <input type="text" placeholder='숫자' />
                                <input type="text" placeholder='숫자' />
                                <input type="text" placeholder='숫자' />
                            </div>
                            <div className="state">
                                <p className="name">메뉴4</p>
                                <input type="text" placeholder='숫자' />
                                <input type="text" placeholder='숫자' />
                                <input type="text" placeholder='숫자' />
                            </div>
                            <div className="state">
                                <p className="name">메뉴5</p>
                                <input type="text" placeholder='숫자' />
                                <input type="text" placeholder='숫자' />
                                <input type="text" placeholder='숫자' />
                            </div>
                        </div>
                        <button>저장</button>
                    </div>
                </div>
                <div className="bottom">
                    <div>
                        <textarea placeholder='개별 공지 내용'></textarea>
                        <button>저장</button>
                    </div>
                    <div>
                        <textarea placeholder='전체 공지 내용'></textarea>
                        <button>저장</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Board