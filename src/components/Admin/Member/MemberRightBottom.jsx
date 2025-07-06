import React, { useState } from 'react'
const baseUrl = process.env.REACT_APP_API_BASE_URL

const MemberRightBottom = () => {
    const [searchNickname, setSearchNickname] = useState('')
    const [foundUser, setFoundUser] = useState(null)

    const handleSearch = () => {
        fetch(`${baseUrl}/admin/member/get_approved_users.php`)
            .then(res => res.json())
            .then(data => {
                const user = data.find(u => u.nickname === searchNickname)
                if (user) {
                    setFoundUser(user)
                } else {
                    alert('해당 유저를 찾을 수 없습니다.')
                    setFoundUser(null)
                }
            })
    }

    const handleDelete = () => {
        if (!foundUser) return alert('삭제할 유저가 없습니다.')

        if (!window.confirm(`${foundUser.nickname} 유저를 탈퇴시키겠습니까?`)) return

        fetch(`${baseUrl}/admin/member/delete_user.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ nickname: foundUser.nickname })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert('탈퇴 완료')
                    setFoundUser(null)
                    setSearchNickname('')
                } else {
                    alert(data.message || '실패')
                }
            })
    }

    return (
        <div className="bottom">
            <h3>강제 탈퇴</h3>

            <div>
                <input
                    type="text"
                    placeholder="닉네임"
                    value={searchNickname}
                    onChange={e => setSearchNickname(e.target.value)}
                />
                <button onClick={handleSearch}>찾기</button>
            </div>

            <div>
                <input
                    type="text"
                    placeholder="닉네임"
                    value={foundUser ? foundUser.nickname : ''}
                    readOnly
                />
                <button onClick={handleDelete}>삭제</button>
            </div>
        </div>
    )
}

export default MemberRightBottom
