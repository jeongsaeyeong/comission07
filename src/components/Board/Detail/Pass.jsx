import React from 'react'
import Rock from '../../../assets/img/board/button_rock.svg'

const Pass = ({ pass, setPass, setNeedpass, post }) => {
    const checkPassword = () => {
        const input = String(pass).trim()
        const real = String(post.password).trim()

        if (input === real) {
            setNeedpass(false)
        } else {
            alert('비밀번호가 일치하지 않습니다.')
        }
    }

    return (
        <div className='no_wrap'>
            <img src={Rock} alt="" />
            <h3>보호된 게시글입니다.</h3>
            <p>비밀번호를 입력해주세요.</p>
            <div>
                <input
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    type="text"
                    placeholder='비밀번호'
                />
                <button onClick={checkPassword}>입력</button>
            </div>
        </div>
    )
}

export default Pass
