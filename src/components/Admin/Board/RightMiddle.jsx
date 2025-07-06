import React, { useEffect, useState } from 'react'
import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_BASE_URL

const RightMiddle = () => {
    const menus = ['menu1', 'menu2', 'menu3', 'menu4', 'menu5']
    const keys = ['point_write', 'point_read', 'point_comment']
    const labels = ['글 작성 지급', '글 열람 차감', '댓글 작성 지급']

    const [settings, setSettings] = useState(() =>
        menus.reduce((acc, menu) => {
            acc[menu] = ['', '', '']
            return acc
        }, {})
    )

    const handleChange = (menuKey, index, value) => {
        setSettings(prev => ({
            ...prev,
            [menuKey]: prev[menuKey]?.map((v, i) => (i === index ? value : v)) || ['', '', ''],
        }))
    }

    const handleSave = async () => {
        try {
            const payload = {}

            menus.forEach(menu => {
                settings[menu].forEach((val, i) => {
                    const key = `${menu}_${keys[i]}`
                    payload[key] = val
                })
            })

            const formData = new FormData()
            formData.append('settings', JSON.stringify(payload))

            const res = await axios.post(`${baseUrl}/admin/board/board_save_setting_point.php`, formData)

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

    const loadSetting = async () => {
        try {
            const res = await axios.get(`${baseUrl}/admin/board/board_load_setting_point.php`)
            if (res.data.success && res.data.settings) {
                setSettings(res.data.settings)
            }
        } catch (err) {
            console.error('불러오기 실패', err)
        }
    }

    useEffect(() => {
        loadSetting()
    }, [])

    return (
        <div className="middle">
            <h3>게시판 포인트 관리</h3>
            <div className="board_manage board_manage_right">
                <div className="kind kind_right">
                    <h4 className='name'>게시판</h4>
                    {labels.map((label, i) => (
                        <h4 key={i}>{label}</h4>
                    ))}
                </div>
                <div className='state_wrap state_wrap_right'>
                    {menus.map((menuKey, i) => (
                        <div className="state" key={i}>
                            <p className="name">{menuKey.replace('menu', '메뉴')}</p>
                            {(settings[menuKey] || []).map((val, j) => (
                                <input
                                    key={j}
                                    type="text"
                                    placeholder="숫자"
                                    value={val}
                                    onChange={e => handleChange(menuKey, j, e.target.value)}
                                />
                            ))}
                        </div>
                    ))}
                </div>
                <button onClick={handleSave}>저장</button>
            </div>
        </div>
    )
}

export default RightMiddle
