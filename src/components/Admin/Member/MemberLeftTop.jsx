import React, { useEffect, useState } from 'react'
import axios from 'axios'

const MemberLeftTop = () => {
    const [questions, setQuestions] = useState({ 1: '', 2: '', 3: '' })
    const baseUrl = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        axios.get(`${baseUrl}/admin/member/get_questions.php`).then(res => {
            setQuestions(res.data)
        })
    }, [])

    const onSave = (num) => {
        const form = new FormData()
        form.append('question_number', num)
        form.append('question_text', questions[num])
        axios.post(`${baseUrl}/admin/member/save_question.php`, form)
            .then(res => alert(res.data.success ? '저장 완료' : '저장 실패'))
    }

    return (
        <div className="top">
            <h3>회원가입 질문</h3>
            {[1, 2, 3].map((num) => (
                <div key={num}>
                    <input
                        type="text"
                        placeholder={`질문${num}`}
                        value={questions[num]}
                        onChange={e => setQuestions({ ...questions, [num]: e.target.value })}
                    />
                    <button onClick={() => onSave(num)}>저장</button>
                </div>
            ))}
        </div>
    )
}

export default MemberLeftTop
