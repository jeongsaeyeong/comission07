import React, { useEffect, useState } from 'react'

const baseUrl = process.env.REACT_APP_API_BASE_URL

const MemberLeftSee = () => {
    const [list, setList] = useState([])
    const [selected, setSelected] = useState(null)
    const [search, setSearch] = useState('')
    const [form, setForm] = useState({
        username: '',
        nickname: '',
        email: '',
        hint_answer: '',
    })

    useEffect(() => {
        fetch(`${baseUrl}/admin/member/get_approved_users.php`)
            .then(res => res.json())
            .then(data => {
                setList(data)
            })
    }, [])

    const filteredList = search
        ? list.filter(user => user.nickname.includes(search))
        : list

    const onSelect = (index) => {
        setSelected(index)
        const user = filteredList[index]
        setForm({
            username: user.username,
            nickname: user.nickname,
            email: user.email,
            hint_answer: user.hint_answer,
        })
    }

    const onChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }))
    }

    const onSave = async (field) => {
        const formData = new FormData()
        formData.append('id', filteredList[selected].id)
        formData.append('field', field)
        formData.append('value', form[field])

        const res = await fetch(`${baseUrl}/admin/member/update_userinfo.php`, {
            method: 'POST',
            body: formData,
        })
        const data = await res.json()
        if (data.success) {
            alert('수정 완료')
        } else {
            alert('수정 실패: ' + data.message)
        }
    }

    return (
        <div className='see_wrap'>
            <h3>회원 정보</h3>
            <div className="find">
                <input
                    type="text"
                    placeholder='닉네임 입력'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={() => setSearch('')}>찾기</button>
            </div>
            <div className="list_wrap">
                <div>
                    <button className={selected === null ? 'click' : ''} onClick={() => setSelected(null)}></button>
                    <p>전체</p>
                </div>
                {filteredList.map((user, index) => (
                    <div key={user.id}>
                        <button
                            className={selected === index ? 'click' : ''}
                            onClick={() => onSelect(index)}
                        ></button>
                        <p>{user.nickname}</p>
                    </div>
                ))}
            </div>
            {selected !== null && (
                <div className="info">
                    <div>
                        <p>아이디</p>
                        <input
                            className='input_full'
                            type="text"
                            value={form.username}
                            onChange={(e) => onChange('username', e.target.value)}
                        />
                    </div>
                    <div>
                        <p>닉네임</p>
                        <input
                            type="text"
                            value={form.nickname}
                        />
                        <button onClick={() => onSave('nickname')}>수정</button>
                    </div>
                    <div>
                        <p>이메일</p>
                        <input
                            type="text"
                            value={form.email}
                            onChange={(e) => onChange('email', e.target.value)}
                        />
                        <button onClick={() => onSave('email')}>수정</button>
                    </div>
                    <div>
                        <p>힌트</p>
                        <input
                            type="text"
                            value={form.hint_answer}
                            onChange={(e) => onChange('hint_answer', e.target.value)}
                        />
                        <button onClick={() => onSave('hint_answer')}>수정</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MemberLeftSee
