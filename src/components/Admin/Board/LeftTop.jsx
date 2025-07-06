import React, { useEffect, useState } from 'react'
import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_BASE_URL

const LeftTop = () => {
    const [nickname, setNickname] = useState('')

    const handleSave = async () => {
        const settings = {
            anonymous_nickname: nickname,
        }

        const formData = new FormData()
        formData.append('settings', JSON.stringify(settings))

        try {
            const res = await axios.post(`${baseUrl}/admin/board/board_save_setting.php`, formData)
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

    const loadNickname = async () => {
        try {
            const res = await axios.get(`${baseUrl}/admin/board/board_load_setting.php?key=anonymous_nickname`)
            if (res.data.success) {
                setNickname(res.data.value)
            }
        } catch (err) {
            console.error('닉네임 불러오기 실패', err)
        }
    }

    useEffect(() => {
        loadNickname()
    }, [])

    return (
        <div className="top">
            <h3>익명 게시판 별명</h3>
            <div>
                <input
                    type="text"
                    placeholder="닉네임을 입력하세요"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                />
                <button onClick={handleSave}>저장</button>
            </div>
        </div>
    )
}

export default LeftTop
