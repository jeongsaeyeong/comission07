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
    const [isNotice, setIsNotice] = useState(false)
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

    useEffect(() => {
        const fetchPost = async () => {
            if (params.modify !== 'modify') return
            try {
                const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/board/get/get_board_post.php?number=${params.number}&id=${params.id}`)
                const data = await res.json()
                if (data.success) {
                    const p = data.post
                    setTitle(p.title)
                    setContent(p.content)
                    setOpen(p.open_type)
                    setLong(p.tab || '')
                    if (p.open_type === 'notice') setIsNotice(true)
                }
            } catch (err) {
                console.error('게시글 불러오기 실패', err)
            }
        }

        fetchPost()
    }, [params.modify, params.number, params.id])


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
        formData.append('open', isNotice ? 'notice' : open)
        formData.append('tab', long)

        if (open === 'protect') {
            const password = document.querySelector('input[type="password"]')?.value
            if (!password) {
                alert('보호글 비밀번호를 입력해주세요.')
                return
            }
            formData.append('password', password)
        }

        // 수정이면 게시글 id도 함께 추가
        if (params.modify === 'modify') {
            formData.append('post_id', params.id)
        }

        const endpoint = params.modify === 'modify'
            ? `${process.env.REACT_APP_API_BASE_URL}/board/write/update.php`
            : `${process.env.REACT_APP_API_BASE_URL}/board/write/upload.php`

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                body: formData,
            });

            const text = await res.text()
            console.log('서버 응답 원문:', text)
            const data = JSON.parse(text)

            if (data.success) {
                alert(params.modify === 'modify' ? '수정 완료' : '업로드 완료')
                navigation(`/board/${params.number}`)
            } else {
                alert(data.message || '작업 실패')
            }
        } catch (err) {
            console.error('업로드 실패:', err)
            alert('서버 오류가 발생했습니다.')
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
                        {!isNotice && (
                            <>
                                {
                                    tabs.map(tab => (
                                        <button
                                            key={tab}
                                            onClick={() => setLong(tab)}
                                            className={long === tab ? 'click' : ''}
                                        >
                                            {tab}
                                        </button>
                                    ))
                                }
                            </>
                        )}
                    </div>
                }
                <div className="right">
                    {!isNotice && (
                        <>
                            <button onClick={() => setOpen('open')} className={open === 'open' ? 'click' : ''}>공개</button>
                            <button onClick={() => setOpen('notopen')} className={open === 'notopen' ? 'click' : ''}>비공개</button>
                            <button onClick={() => setOpen('protect')} className={open === 'protect' ? 'click' : ''}>보호글</button>
                        </>
                    )}
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
                    {params.admin && (
                        <div className='notice'>
                            <input
                                type="checkbox"
                                id="check"
                                checked={isNotice}
                                onChange={(e) => setIsNotice(e.target.checked)}
                            />
                            <label htmlFor="check"></label>
                            <p>공지로 설정</p>
                        </div>
                    )}
                    {open === 'protect' && (<input type='password' placeholder='비밀번호 작성' />)}
                    <button className='upload' onClick={onUpload}>{params.modify === 'modify' ? '수정' : '업로드'}</button>
                </div>
            </div>
        </div>
    )
}

export default Write
