import React, { useState } from 'react'
import Pagenation from '../ETC/Pagenation'
import List from './List'
import Top from './Top'
import { useParams } from 'react-router-dom'

const Board01 = () => {
    const [page, setPage] = useState(1);
    const [click, setClick] = useState('all')
    const params = useParams();

    return (
        <div className='Board01_wrap container_main'>
            <Top params={params} setClick={setClick} click={click}/>
            <div className="main">
                <List params={params} click={click}/>
                <Pagenation setPage={setPage} page={page} />
            </div>
        </div>
    )
}

export default Board01