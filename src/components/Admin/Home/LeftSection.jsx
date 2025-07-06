import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FileInput from './FileInput'

const baseUrl = process.env.REACT_APP_API_BASE_URL

const LeftSection = () => {
    const [loginEnabled, setLoginEnabled] = useState(true)
    const [joinEnabled, setJoinEnabled] = useState(true)

    const saveToggle = async (key, value) => {
        try {
            const formData = new FormData()
            formData.append('key', key)
            formData.append('value', value ? '1' : '0')

            const res = await axios.post(`${baseUrl}/admin/home/save_setting.php`, formData)

            if (res.data.success) {
                alert(`${key} 저장 완료`)
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
                setter(res.data.value === '1')
            }
        } catch (err) {
            console.error(`${key} 불러오기 실패`, err)
        }
    }

    useEffect(() => {
        loadSetting('login_enabled', setLoginEnabled)
        loadSetting('join_enabled', setJoinEnabled)
    }, [])

    return (
        <div className="left">
            <div className="top">
                <div className="top_left">
                    <h3>로그인 대문</h3>
                    <div>
                        <div>
                            <input
                                type="radio"
                                id="login_check_on"
                                checked={loginEnabled}
                                onChange={() => setLoginEnabled(true)}
                            />
                            <label htmlFor="login_check_on"></label>
                            <p>ON</p>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="login_check_off"
                                checked={!loginEnabled}
                                onChange={() => setLoginEnabled(false)}
                            />
                            <label htmlFor="login_check_off"></label>
                            <p>OFF</p>
                        </div>
                        <button onClick={() => saveToggle('login_enabled', loginEnabled)}>저장</button>
                    </div>
                </div>
                <div className="top_right">
                    <h3>회원가입</h3>
                    <div>
                        <div>
                            <input
                                type="radio"
                                id="join_check_on"
                                checked={joinEnabled}
                                onChange={() => setJoinEnabled(true)}
                            />
                            <label htmlFor="join_check_on"></label>
                            <p>ON</p>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="join_check_off"
                                checked={!joinEnabled}
                                onChange={() => setJoinEnabled(false)}
                            />
                            <label htmlFor="join_check_off"></label>
                            <p>OFF</p>
                        </div>
                        <button onClick={() => saveToggle('join_enabled', joinEnabled)}>저장</button>
                    </div>
                </div>
            </div>

            <div className="bottom">
                <h3>이미지 등록</h3>
                <FileInput label="대문 배경" keyName="main_background" />
                <FileInput label="대문 로고" keyName="main_logo" />
                <FileInput label="배경화면" keyName="background_image" />
                <FileInput label="배너" keyName="banner" />
                <FileInput label="메뉴 로고" keyName="menu_logo" />
                <FileInput label="메뉴1" keyName="menu1" />
                <FileInput label="메뉴2" keyName="menu2" />
                <FileInput label="메뉴3" keyName="menu3" />
                <FileInput label="메뉴4" keyName="menu4" />
                <FileInput label="메뉴5" keyName="menu5" />
                <FileInput label="토탈 프로필" keyName="total_profile" />
            </div>
        </div>
    )
}

export default LeftSection
