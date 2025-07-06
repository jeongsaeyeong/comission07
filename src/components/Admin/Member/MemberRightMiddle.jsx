import React, { useEffect, useState } from 'react'
const baseUrl = process.env.REACT_APP_API_BASE_URL

const MemberRightMiddle = () => {
    const [managers, setManagers] = useState([])
    const [nickname, setNickname] = useState('')
    const [removeNickname, setRemoveNickname] = useState('')
    const [userList, setUserList] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [markFile, setMarkFile] = useState(null)
    const [isAllSelected, setIsAllSelected] = useState(false)

    const handleAllSelect = () => {
        setIsAllSelected(true)
        setSelectedUser(null)
    }


    useEffect(() => {
        fetch(`${baseUrl}/admin/member/get_managers.php`)
            .then(res => res.json())
            .then(data => setManagers(data))

        fetch(`${baseUrl}/admin/member/get_approved_users.php`)
            .then(res => res.json())
            .then(data => setUserList(data))
    }, [])

    const handleSelect = (user) => {
        setSelectedUser(user)
    }

    const handleAssignManager = () => {
        if (isAllSelected) {
            if (!userList.length) return alert('유저가 없습니다.')

            Promise.all(
                userList.map(user =>
                    fetch(`${baseUrl}/admin/member/update_role.php`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: new URLSearchParams({ nickname: user.nickname, role: '운영진' })
                    }).then(res => res.json())
                )
            )
                .then(results => {
                    alert('전체 유저가 운영진으로 지정되었습니다.')
                    setIsAllSelected(false)
                    fetch(`${baseUrl}/admin/member/get_managers.php`)
                        .then(res => res.json())
                        .then(setManagers)
                })
                .catch(() => alert('실패'))
            return
        }

        if (!selectedUser) return alert('유저를 선택하세요.')

        fetch(`${baseUrl}/admin/member/update_role.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ nickname: selectedUser.nickname, role: '운영진' })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert('운영진으로 지정되었습니다.')
                    setSelectedUser(null)
                    fetch(`${baseUrl}/admin/member/get_managers.php`)
                        .then(res => res.json())
                        .then(setManagers)
                } else {
                    alert(data.message || '실패')
                }
            })
    }

    const handleRemoveManager = () => {
        if (!removeNickname) return alert('닉네임을 입력하세요.')
        fetch(`${baseUrl}/admin/member/update_role.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ nickname: removeNickname, role: '유저' })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert('운영진에서 삭제되었습니다.')
                    setRemoveNickname('')
                    fetch(`${baseUrl}/admin/member/get_managers.php`)
                        .then(res => res.json())
                        .then(setManagers)
                } else {
                    alert(data.message || '실패')
                }
            })
    }

    const handleFileChange = (e) => {
        setMarkFile(e.target.files[0])
    }

    const handleMarkSave = () => {
        if (!markFile) return alert('파일을 선택하세요.')
        const formData = new FormData()
        formData.append('file', markFile)

        fetch(`${baseUrl}/admin/member/upload_mark.php`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) alert('운영진 마크 저장 완료')
                else alert(data.message || '실패')
            })
    }

    return (
        <div className="middle">
            <div className="tab">
                <h3>운영진 설정</h3>
                {managers.map((m, i) => <p key={i}>{m}</p>)}
            </div>
            <div>
                <input type="text" placeholder='닉네임' value={nickname} onChange={e => setNickname(e.target.value)} />
                <button onClick={() => {
                    const user = userList.find(u => u.nickname === nickname)
                    if (user) setSelectedUser(user)
                    else alert('해당 닉네임 없음')
                }}>찾기</button>
            </div>
            <div>
                <input type="text" placeholder='닉네임' value={removeNickname} onChange={e => setRemoveNickname(e.target.value)} />
                <button onClick={handleRemoveManager}>삭제</button>
            </div>
            <div>
                <label htmlFor="file">{markFile ? markFile.name : '파일명'}</label>
                <input type="file" id='file' onChange={handleFileChange} />
                <button onClick={handleMarkSave}>저장</button>
            </div>
            <div className='list_all'>
                <div className="list_wrap">
                    <div>
                        <button className={!selectedUser && isAllSelected ? 'click' : ''} onClick={handleAllSelect}></button>
                        <p>전체</p>
                    </div>
                    {userList.map((u, i) => (
                        <div key={i}>
                            <button
                                className={selectedUser?.id === u.id && !isAllSelected ? 'click' : ''}
                                onClick={() => {
                                    setIsAllSelected(false)
                                    handleSelect(u)
                                }}
                            ></button>
                            <p>{u.nickname}</p>
                        </div>
                    ))}
                </div>
                <button onClick={handleAssignManager}>저장</button>
            </div>
        </div>
    )
}

export default MemberRightMiddle
