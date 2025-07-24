import React, { useState } from 'react'
import Pagenation from '../ETC/Pagenation'
import List from './List'
import Top from './Top'
import { useParams } from 'react-router-dom'

const Board01 = () => {
    const [page, setPage] = useState(1);
    const [click, setClick] = useState('all');
    const [all, setAll] = useState(0)
    const params = useParams();
    const [settings, setSettings] = useState([]);
    const [keyword, setKeyword] = useState('')
    const [type, setType] = useState('title')
    const [filteredCount, setFilteredCount] = useState(0)

    return (
        <div className='Board01_wrap container_main'>
            <Top params={params} setClick={setClick} click={click} setType={setType} keyword={keyword} setKeyword={setKeyword} type={type} />
            <div className="main">
                <List
                    params={params}
                    click={click}
                    settings={settings}
                    page={page}
                    keyword={keyword}
                    type={type}
                    setFilteredCount={setFilteredCount}
                />
                <Pagenation setPage={setPage} page={page} setAll={setAll} settings={settings} setSettings={setSettings} filteredCount={filteredCount}
                    keyword={keyword} />
            </div>
        </div>
    )
}

export default Board01