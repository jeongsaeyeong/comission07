import React, { useEffect, useState } from 'react'
import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_BASE_URL

const RightTop = () => {
    const [tabs, setTabs] = useState([])
    const [addTab, setAddTab] = useState('')
    const [removeTab, setRemoveTab] = useState('')

    const loadTabs = async () => {
        try {
            const res = await axios.get(`${baseUrl}/admin/board/board_load_setting.php?key=menu1_tabs`)
            if (res.data.success && res.data.value) {
                setTabs(JSON.parse(res.data.value))
            }
        } catch (err) {
            console.error('탭 불러오기 실패', err)
        }
    }

    const saveTabs = async (newTabs) => {
        const formData = new FormData()
        formData.append('settings', JSON.stringify({ menu1_tabs: JSON.stringify(newTabs) }))

        try {
            const res = await axios.post(`${baseUrl}/admin/board/board_save_setting.php`, formData)
            if (res.data.success) {
                setTabs(newTabs)
                alert('저장 완료')
            } else {
                alert('저장 실패: ' + res.data.message)
            }
        } catch (err) {
            console.error('저장 실패', err)
            alert('서버 오류')
        }
    }

    const handleAdd = () => {
        const newTab = addTab.trim()
        if (!newTab) return
        if (tabs.includes(newTab)) {
            alert('이미 존재하는 탭입니다.')
            return
        }
        const updated = [...tabs, newTab]
        saveTabs(updated)
        setAddTab('')
    }

    const handleDelete = () => {
        const tabToRemove = removeTab.trim()
        if (!tabToRemove || !tabs.includes(tabToRemove)) {
            alert('존재하지 않는 탭입니다.')
            return
        }
        const updated = tabs.filter(tab => tab !== tabToRemove)
        saveTabs(updated)
        setRemoveTab('')
    }

    useEffect(() => {
        loadTabs()
    }, [])

    return (
        <div className="top top_right">
            <div className='tab'>
                <h3>메뉴1 탭 추가</h3>
                {tabs.map((tab, i) => (
                    <p key={i}>{tab}</p>
                ))}
            </div>
            <div>
                <div className="add">
                    <input
                        type="text"
                        placeholder='탭 이름'
                        value={addTab}
                        onChange={(e) => setAddTab(e.target.value)}
                    />
                    <button onClick={handleAdd}>추가</button>
                </div>
                <div className="delete">
                    <input
                        type="text"
                        placeholder='탭 이름'
                        value={removeTab}
                        onChange={(e) => setRemoveTab(e.target.value)}
                    />
                    <button onClick={handleDelete}>삭제</button>
                </div>
            </div>
        </div>
    )
}

export default RightTop
