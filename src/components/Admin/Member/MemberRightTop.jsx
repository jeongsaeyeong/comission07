import React, { useEffect, useState } from 'react'
const baseUrl = process.env.REACT_APP_API_BASE_URL

const MemberRightTop = () => {
    const [nickname, setNickname] = useState('')
    const [userList, setUserList] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [giveAmount, setGiveAmount] = useState('')
    const [deductAmount, setDeductAmount] = useState('')
    const [historyNickname, setHistoryNickname] = useState('')
    const [giveList, setGiveList] = useState([])
    const [takeList, setTakeList] = useState([])

    useEffect(() => {
        fetch(`${baseUrl}/admin/member/get_approved_users.php`)
            .then(res => res.json())
            .then(data => setUserList(data))
    }, [])

    const handlePoint = (type) => {
        const targetAmount = type === '지급' ? giveAmount : deductAmount
        if (!selectedUser || !targetAmount) {
            alert('유저와 금액을 확인하세요.')
            return
        }

        const finalAmount = type === '지급' ? targetAmount : -targetAmount

        fetch(`${baseUrl}/admin/member/update_points.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                nickname: selectedUser.nickname,
                amount: finalAmount,
                reason: `관리자 ${type}`
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert('성공적으로 처리되었습니다.')
                    if (type === '지급') setGiveAmount('')
                    else setDeductAmount('')
                } else {
                    alert(data.message || '실패')
                }
            })
    }

    const fetchPointHistory = () => {
        if (!historyNickname) {
            alert('닉네임을 입력하세요.')
            return
        }

        fetch(`${baseUrl}/admin/member/get_point_history.php?nickname=${historyNickname}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setGiveList(data.give)
                    setTakeList(data.take)
                } else {
                    alert(data.message || '조회 실패')
                    setGiveList([])
                    setTakeList([])
                }
            })
    }

    return (
        <div className="top">
            <div className="point_manage">
                <h3>포인트 관리</h3>
                <div>
                    <input
                        type="text"
                        placeholder='닉네임'
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                    <button
                        onClick={() => {
                            const user = userList.find(u => u.nickname === nickname)
                            if (user) {
                                setSelectedUser(user)
                            } else {
                                alert('해당 닉네임을 찾을 수 없습니다.')
                            }
                        }}
                    >
                        찾기
                    </button>
                </div>
                <div className="list_wrap">
                    <div>
                        <button
                            className={!selectedUser ? 'click' : ''}
                            onClick={() => setSelectedUser(null)}
                        ></button>
                        <p>전체</p>
                    </div>
                    {userList.map((user, idx) => (
                        <div key={idx}>
                            <button
                                className={selectedUser?.id === user.id ? 'click' : ''}
                                onClick={() => {setSelectedUser(user)}}
                            ></button>
                            <p>{user.nickname}</p>
                        </div>
                    ))}
                </div>
                <div className="add">
                    <p>지급</p>
                    <input
                        type="text"
                        placeholder='숫자'
                        value={giveAmount}
                        onChange={(e) => setGiveAmount(e.target.value)}
                    />
                    <button onClick={() => handlePoint('지급')}>저장</button>
                </div>
                <div className="add">
                    <p>차감</p>
                    <input
                        type="text"
                        placeholder='숫자'
                        value={deductAmount}
                        onChange={(e) => setDeductAmount(e.target.value)}
                    />
                    <button onClick={() => handlePoint('차감')}>저장</button>
                </div>
            </div>
            <div className="point_find">
                <h3>포인트 내역 찾기</h3>
                <div>
                    <input
                        type="text"
                        placeholder='닉네임'
                        value={historyNickname}
                        onChange={(e) => setHistoryNickname(e.target.value)}
                    />
                    <button onClick={fetchPointHistory}>찾기</button>
                </div>
                <div className='list_all'>
                    <div className="point_list">
                        <p>지급</p>
                        {giveList.map((item, idx) => (
                            <div key={idx}>
                                <p>{item.amount.toLocaleString()}</p>
                                <p className='date'>{item.created_at}</p>
                            </div>
                        ))}
                    </div>
                    <div className="point_list">
                        <p>차감</p>
                        {takeList.map((item, idx) => (
                            <div key={idx}>
                                <p>{item.amount.toLocaleString()}</p>
                                <p className='date'>{item.created_at}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MemberRightTop
