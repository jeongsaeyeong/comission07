import React, { useState } from 'react'
import Pagenation from '../ETC/Pagenation'
import List from './List'
import Top from './Top'

const Board01 = () => {
    const [page, setPage] = useState(1);

    return (
        <div className='Board01_wrap container_main'>
            <Top />
            <div className="main">
                <List />
                <Pagenation setPage={setPage} page={page}/>
            </div>
        </div>
    )
}

export default Board01