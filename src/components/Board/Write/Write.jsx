import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useNavigate, useParams } from 'react-router-dom'

const modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
        ['link', 'image'],
        ['clean'],
    ],
}

const formats = [
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'align',
    'link', 'image',
]

const Write = () => {
    const params = useParams()
    const [long, setLong] = useState('')
    const [tabs, setTabs] = useState([])
    const [open, setOpen] = useState('open')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const navigation = useNavigate()

    useEffect(() => {
        if (params.number === '01') {
            fetch(`${process.env.REACT_APP_API_BASE_URL}/setting/board/get_board_setting.php?key=menu1_tabs`)
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        const parsed = JSON.parse(data.value)
                        setTabs(parsed)
                        setLong(parsed[0])
                    }
                })
                .catch(err => {
                    console.error('탭 불러오기 실패', err)
                })
        }
    }, [params.number])

    const onUpload = async () => {
        const writer = localStorage.getItem('username')
        if (!writer) {
            alert('로그인이 필요합니다.')
            return
        }

        if (!title.trim() || !content.trim()) {
            alert('제목과 내용을 모두 입력해주세요.')
            return
        }

        const formData = new FormData()
        formData.append('board_number', params.number)
        formData.append('writer', writer)
        formData.append('title', title)
        formData.append('content', content)
        formData.append('open', open)
        formData.append('tab', long)

        if (open === 'protect') {
            const password = document.querySelector('input[type="password"]')?.value
            if (!password) {
                alert('보호글 비밀번호를 입력해주세요.')
                return
            }
            formData.append('password', password)
        }

        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/board/write/upload.php`, {
                method: 'POST',
                body: formData,
            });

            const text = await res.text(); // JSON으로 파싱 시도 X
            console.log('서버 응답 원문:', text); // 👈 진짜 뭐가 오는지 확인

            const data = JSON.parse(text); // 그 다음 파싱 시도
            if (data.success) {
                alert('업로드 완료');
                navigation(`/board/${params.number}`);
            } else {
                alert(data.message || '업로드 실패');
            }
        } catch (err) {
            console.error('업로드 실패:', err);
            alert('서버 오류가 발생했습니다.');
        }
    }

    const onBack = () => {
        navigation(-1)
    }

    return (
        <div className='Write_wrap container_main'>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className="title"
                placeholder='제목을 입력하세요'
            />
            <div className="tage_wrap">
                {params.number === '01' &&
                    <div className="left">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setLong(tab)}
                                className={long === tab ? 'click' : ''}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                }
                <div className="right">
                    <button onClick={() => setOpen('open')} className={open === 'open' ? 'click' : ''}>공개</button>
                    <button onClick={() => setOpen('notopen')} className={open === 'notopen' ? 'click' : ''}>비공개</button>
                    <button onClick={() => setOpen('protect')} className={open === 'protect' ? 'click' : ''}>보호글</button>
                </div>
            </div>

            <div className="Editor">
                <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    formats={formats}
                    placeholder='내용을 입력하세요'
                />
            </div>

            <div className="btn_wrap">
                <button className='nope' onClick={onBack}>취소</button>
                <div>
                    {params.admin &&
                        <div className='notice'>
                            <input type="checkbox" id="check" />
                            <label htmlFor="check"></label>
                            <p>공지로 설정</p>
                        </div>
                    }
                    {open === 'protect' && (<input type='password' placeholder='비밀번호 작성' />)}
                    <button className='upload' onClick={onUpload}>업로드</button>
                </div>
            </div>
        </div>
    )
}

export default Write
