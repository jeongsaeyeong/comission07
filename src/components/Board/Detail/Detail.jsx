import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Back from '../../../assets/img/board/button_left.svg'
import No_Show from './No_Show'
import Pass from './Pass'
import Pagenation from '../ETC/Pagenation'
import Show from './Show'
import Manage from '../ETC/Manage'

const Detail = () => {
    const params = useParams();
    const navigation = useNavigate();
    const [rock, setRock] = useState(false);
    const [needpass, setNeedpass] = useState(false);
    const [pass, setPass] = useState('');
    const [manage, setManage] = useState(false)
    const [page, setPage] = useState(1);

    useEffect(() => {
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
            <div className="detail_header">
                <button onClick={() => { onBack() }} className='back'><img src={Back} alt="" /></button>
                {needpass || rock ? (<></>) : <Manage manage={manage} setManage={setManage}/>}
            </div>
            {needpass || rock ? (<></>) : (
                <>
                    <Show />
                    <Pagenation setPage={setPage} page={page}/>
                </>
            )}
            {rock && (
                <No_Show />
            )}
            {needpass && (
                <Pass pass={pass} setPass={setPass} />
            )}
        </div>
    )
}

export default Detail