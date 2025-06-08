import React from 'react'
import Pagenation from '../ETC/Pagenation'
import List from './List'
import Top from './Top'

const Board01 = () => {
    return (
        <div className='Board01_wrap container_main'>
            <Top />
            <div className="main">
                <List />
                <Pagenation />
            </div>
        </div>
    )
}

export default Board01