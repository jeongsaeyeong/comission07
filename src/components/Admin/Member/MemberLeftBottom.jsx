import React, { useEffect, useState } from 'react'
const baseUrl = process.env.REACT_APP_API_BASE_URL

const MemberLeftBottom = ({ setShow, setPicture }) => {
    const [list, setList] = useState([])
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        fetch(`${baseUrl}/admin/member/get_requests.php`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setList(data)
            })
    }, [])

    const onAgree = (newStatus) => {
        const formData = new FormData()
        formData.append('id', list[selected].id)
        formData.append('status', newStatus)

        fetch(`${baseUrl}/admin/member/update_status.php`, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert(`${newStatus} 처리 완료`)
                    setList(prev => prev.filter((_, idx) => idx !== selected))
                    setSelected(null)
                } else {
                    alert('처리 실패: ' + data.message)
                }
            })
    }

    return (
        <div className="bottom">
            <h3>가입 신청 내역</h3>
            <div className="list_wrap">
                <div>
                    <button
                        className={selected === null ? 'click' : ''}
                        onClick={() => setSelected(null)}
                    ></button>
                    <p>전체</p>
                </div>
                {list.map((user, index) => (
                    <div key={user.id}>
                        <button
                            className={selected === index ? 'click' : ''}
                            onClick={() => setSelected(index)}
                        ></button>
                        <p>{user.nickname}</p>
                    </div>
                ))}
            </div>

            {selected !== null && list[selected] && (
                <>
                    <div className="info_wrap">
                        <p>{list[selected].username}</p>
                        <p>{list[selected].nickname}</p>
                        <p>{list[selected].email}</p>
                        <p>{list[selected].answer01}</p>
                        <p>{list[selected].answer02}</p>
                        <p>{list[selected].answer03}</p>
                        <p className='long'>{list[selected].join_reason}</p>
                    </div>
                    <div className="btn_wrap">
                        <button onClick={() => {
                            setShow(true);
                            setPicture(`${baseUrl}/${list[selected].profile_image}`)
                        }}>사진</button>
                        <div>
                            <button onClick={() => onAgree('반려')}>반려</button>
                            <button className='ok' onClick={() => onAgree('승인')}>승인</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default MemberLeftBottom
