import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean'],
    ],
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image',
]


const Home = () => {
    return (
        <div className='Home_wrap'>
            <div className="left">
                <div className="top">
                    <div className="top_left">
                        <h3>로그인 대문</h3>
                        <div>
                            <div>
                                <input type="checkbox" id='check' />
                                <label htmlFor="check"></label>
                                <p>ON</p>
                            </div>
                            <div>
                                <input type="checkbox" id='check' />
                                <label htmlFor="check"></label>
                                <p>OFF</p>
                            </div>
                            <button>저장</button>
                        </div>
                    </div>
                    <div className="top_right">
                        <h3>회원가입</h3>
                        <div>
                            <div>
                                <input type="checkbox" id='check' />
                                <label htmlFor="check"></label>
                                <p>ON</p>
                            </div>
                            <div>
                                <input type="checkbox" id='check' />
                                <label htmlFor="check"></label>
                                <p>OFF</p>
                            </div>
                            <button>저장</button>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <h3>이미지 등록</h3>
                    <div className='input_wrap'>
                        <div>
                            <input type="file" id='file' />
                            <label htmlFor="file">대문 배경</label>
                            <p>대문 배경화면.jpg</p>
                        </div>
                        <button>저장</button>
                    </div>
                    <div className='input_wrap'>
                        <div>
                            <input type="file" id='file' />
                            <label htmlFor="file">대문 로고</label>
                            <p>대문 로고.jpg</p>
                        </div>
                        <button>저장</button>
                    </div>
                    <div className='input_wrap'>
                        <div>
                            <input type="file" id='file' />
                            <label htmlFor="file">배경화면</label>
                            <p></p>
                        </div>
                        <button>저장</button>
                    </div>
                    <div className='input_wrap'>
                        <div>
                            <input type="file" id='file' />
                            <label htmlFor="file">배너</label>
                            <p></p>
                        </div>
                        <button>저장</button>
                    </div>
                    <div className='input_wrap'>
                        <div>
                            <input type="file" id='file' />
                            <label htmlFor="file">메뉴 로고</label>
                            <p></p>
                        </div>
                        <button>저장</button>
                    </div>
                    <div className='input_wrap'>
                        <div>
                            <input type="file" id='file' />
                            <label htmlFor="file">메뉴1</label>
                            <p></p>
                        </div>
                        <button>저장</button>
                    </div>
                    <div className='input_wrap'>
                        <div>
                            <input type="file" id='file' />
                            <label htmlFor="file">메뉴2</label>
                            <p></p>
                        </div>
                        <button>저장</button>
                    </div>
                    <div className='input_wrap'>
                        <div>
                            <input type="file" id='file' />
                            <label htmlFor="file">메뉴3</label>
                            <p></p>
                        </div>
                        <button>저장</button>
                    </div>
                    <div className='input_wrap'>
                        <div>
                            <input type="file" id='file' />
                            <label htmlFor="file">메뉴4</label>
                            <p></p>
                        </div>
                        <button>저장</button>
                    </div>
                    <div className='input_wrap'>
                        <div>
                            <input type="file" id='file' />
                            <label htmlFor="file">메뉴5</label>
                            <p></p>
                        </div>
                        <button>저장</button>
                    </div>
                    <div className='input_wrap'>
                        <div>
                            <input type="file" id='file' />
                            <label htmlFor="file">토탈 프로필</label>
                            <p></p>
                        </div>
                        <button>저장</button>
                    </div>
                </div>
            </div>
            <div className="right">
                <div>
                    <h3>메인 컬러</h3>
                    <div>
                        <input type="text" placeholder='ex)#ffffff' />
                        <button>저장</button>
                    </div>
                </div>
                <div>
                    <h3>트위터 위젯 링크</h3>
                    <div>
                        <input type="text" placeholder='링크' />
                        <button>저장</button>
                    </div>
                </div>
                <div className='notice'>
                    <h3>메인 공지</h3>
                    <div>
                        <ReactQuill
                            theme="snow"
                            modules={modules}
                            formats={formats}
                            placeholder='내용을 입력하세요'
                        />
                        <button>저장</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home