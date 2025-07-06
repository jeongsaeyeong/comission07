import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const baseUrl = process.env.REACT_APP_API_BASE_URL

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

const RightSection = () => {
    const [color, setColor] = useState('')
    const [twitter, setTwitter] = useState('')
    const [notice, setNotice] = useState('')

    const saveSetting = async (key, value) => {
        try {
            const formData = new FormData()
            formData.append('key', key)
            formData.append('value', value)

            const res = await axios.post(`${baseUrl}/admin/home/save_setting.php`, formData)
            if (res.data.success) {
                alert('저장 완료')
            } else {
                alert('저장 실패: ' + res.data.message)
            }
        } catch (err) {
            console.error(err)
            alert('서버 오류')
        }
    }

    const loadSetting = async (key, setter) => {
        try {
            const res = await axios.get(`${baseUrl}/admin/home/load_setting.php?key=${key}`)
            if (res.data.success) {
                setter(res.data.value)
            }
        } catch (err) {
            console.error(`${key} 불러오기 실패`, err)
        }
    }

    useEffect(() => {
        loadSetting('main_color', setColor)
        loadSetting('twitter_widget', setTwitter)
        loadSetting('main_notice', setNotice)
    }, [])

    return (
        <div className="right">
            <div>
                <h3>메인 컬러</h3>
                <div>
                    <input
                        type="text"
                        placeholder="ex)#ffffff"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                    <button onClick={() => saveSetting('main_color', color)}>저장</button>
                </div>
            </div>
            <div>
                <h3>트위터 위젯 링크</h3>
                <div>
                    <input
                        type="text"
                        placeholder="링크"
                        value={twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                    />
                    <button onClick={() => saveSetting('twitter_widget', twitter)}>저장</button>
                </div>
            </div>
            <div className="notice">
                <h3>메인 공지</h3>
                <div>
                    <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        value={notice}
                        onChange={setNotice}
                        placeholder="내용을 입력하세요"
                    />
                    <button onClick={() => saveSetting('main_notice', notice)}>저장</button>
                </div>
            </div>
        </div>
    )
}

export default RightSection
