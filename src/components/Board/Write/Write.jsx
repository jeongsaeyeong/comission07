import React, { useState } from 'react'
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

const Write = () => {
    const [content, setContent] = useState('');

    return (
        <div className='Write_wrap container_main'>
            <input type="text" className="title" placeholder='제목을 입력하세요' />
            <div className="tage_wrap">
                <div className="left">
                    <button className='click'>단편</button>
                    <button>장편</button>
                </div>
                <div className="right">
                    <button className='click'>공개</button>
                    <button>비공개</button>
                    <button>보호글</button>
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
                <button className='nope'>취소</button>
                <button className='upload'>업로드</button>
            </div>
        </div>
    )
}

export default Write