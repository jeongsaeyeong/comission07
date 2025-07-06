import React, { useEffect, useState } from 'react'
import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_BASE_URL

const LeftBottom = () => {
    const [users, setUsers] = useState([])
    const [selectedNick, setSelectedNick] = useState('전체')
    const [noticeContent, setNoticeContent] = useState('')
    const [globalNotice, setGlobalNotice] = useState('')
    const [searchNickname, setSearchNickname] = useState('')

    useEffect(() => {
        fetchUsers()
        loadNotice('notice_all', setGlobalNotice)
    }, [])

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${baseUrl}/admin/board/fetch_approved_users.php`)
            if (res.data.success) {
                setUsers(res.data.users)
            }
        } catch (err) {
            console.error(err)
        }
    }

    const loadNotice = async (key, setter) => {
        try {
            const res = await axios.get(`${baseUrl}/admin/board/board_load_setting.php?key=${key}`)
            setter(res.data.success ? res.data.value : '')
        } catch (err) {
            console.error(err)
            setter('')
        }
    }

    const handleNickClick = async (nickname) => {
        setSelectedNick(nickname)
        if (nickname === '전체') {
            loadNotice('notice_all', setGlobalNotice)
        } else {
            loadNotice(`notice_${nickname}`, setNoticeContent)
        }
    }

    const handleSearch = () => {
        const user = users.find(u => u.nickname === searchNickname.trim())
        if (user) {
            handleNickClick(user.nickname)
        } else {
            alert('닉네임을 찾을 수 없습니다')
        }
    }

    const saveNotice = async (key, content) => {
        try {
            const formData = new FormData()
            const settings = {}
            settings[key] = content
            formData.append('settings', JSON.stringify(settings))

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

    return (
        <>
            <div className="bottom">
                <h3>마이페이지 공지</h3>
                <div className='nick'>
                    <input
                        type="text"
                        placeholder='닉네임'
                        value={searchNickname}
                        onChange={(e) => setSearchNickname(e.target.value)}
                    />
                    <button onClick={handleSearch}>찾기</button>
                </div>
                <div className="list_wrap list">
                    <div onClick={() => handleNickClick('전체')}>
                        <button className={selectedNick === '전체' ? 'click' : ''}></button>
                        <p>전체</p>
                    </div>
                    {users.map((user, idx) => (
                        <div key={idx} onClick={() => handleNickClick(user.nickname)}>
                            <button className={selectedNick === user.nickname ? 'click' : ''}></button>
                            <p>{user.nickname}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bottom">
                <div>
                    <textarea
                        placeholder='개별 공지 내용'
                        value={noticeContent}
                        onChange={(e) => setNoticeContent(e.target.value)}
                        disabled={selectedNick === '전체'}
                    />
                    <button
                        onClick={() => saveNotice(`notice_${selectedNick}`, noticeContent)}
                        disabled={selectedNick === '전체'}
                    >
                        저장
                    </button>
                </div>
                <div>
                    <textarea
                        placeholder='전체 공지 내용'
                        value={globalNotice}
                        onChange={(e) => setGlobalNotice(e.target.value)}
                    />
                    <button onClick={() => saveNotice('notice_all', globalNotice)}>저장</button>
                </div>
            </div>
        </>
    )
}

export default LeftBottom
