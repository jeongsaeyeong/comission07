import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Back from '../../../assets/img/board/button_left.svg'
import Rock from '../../../assets/img/board/button_rock.svg'

const Detail = () => {
    const params = useParams();
    const navigation = useNavigate();
    const [rock, setRock] = useState(false);
    const [needpass, setNeedpass] = useState(false);
    const [pass, setPass] = useState('');

    useEffect(() => {
        console.log(params.id)

        if (params.id === '5') {
            setRock(true);
        } else if (params.id === '4') {
            setNeedpass(true)
        }
    }, [params]);

    const onBack = () => {
        navigation(-1);
    }

    return (
        <div className='Detail_wrap container_main'>
            <button onClick={() => { onBack() }}><img src={Back} alt="" /></button>
            {rock && (
                <div>
                    <img src={Rock} alt="" />
                    <h3>비공개 게시글입니다.</h3>
                    <p>관리자만 열람이 가능합니다.</p>
                </div>
            )}
            {needpass && (
                <div>
                    <img src={Rock} alt="" />
                    <h3>보호된 게시글입니다.</h3>
                    <p>비밀번호를 입력해주세요.</p>
                    <div>
                        <input value={pass} onChange={setPass} type="text" placeholder='비밀번호' />
                        <button>입력</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Detail