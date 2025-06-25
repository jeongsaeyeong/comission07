import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import { useNavigate, useParams } from 'react-router-dom';

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

const Write = () => {
    const params = useParams();
    const [long, setLong] = useState('short');
    const [open, setOpen] = useState('open');
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('');
    const navigation = useNavigate();

    const onUpload = () => {

    }

    const onBack = () => {
        navigation(-1)
    }

    return (
        <div className='Write_wrap container_main'>
            <input value={title} onChange={(e) => { setTitle(e.target.value) }} type="text" className="title" placeholder='제목을 입력하세요' />
            <div className="tage_wrap">
                {params.number === '01' &&
                    <div className="left">
                        <button onClick={() => { setLong('short') }} className={long === 'short' ? 'click' : ''}>단편</button>
                        <button onClick={() => { setLong('long') }} className={long === 'long' ? 'click' : ''}>장편</button>
                    </div>
                }
                <div className="right">
                    <button onClick={() => { setOpen('open') }} className={open === 'open' ? 'click' : ''}>공개</button>
                    <button onClick={() => { setOpen('notopen') }} className={open === 'notopen' ? 'click' : ''}>비공개</button>
                    <button onClick={() => { setOpen('protect') }} className={open === 'protect' ? 'click' : ''}>보호글</button>
                </div>
            </div>
            <div className="Editor">
                <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={(value) => setContent(value)}
                    modules={modules}
                    formats={formats}
                    placeholder='내용을 입력하세요'
                />
            </div>
            <div className="btn_wrap">
                <button className='nope' onClick={() => { onBack() }}>취소</button>
                <div>
                    {params.admin &&
                        <div className='notice'>
                            <input type="checkbox" id="check" />
                            <label htmlFor="check"></label>
                            <p>공지로 설정</p>
                        </div>
                    }
                    {open === 'protect' && (<input type='password' placeholder='비밀번호 작성' />)}
                    <button className='upload' onClick={() => { onUpload() }}>업로드</button>
                </div>
            </div>
        </div>
    )
}

export default Write