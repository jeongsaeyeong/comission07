import React, { useEffect, useState } from 'react'
import Down from '../../../assets/img/board/button_down.svg'
import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_BASE_URL

const Top = ({ type, params, setClick, click, keyword, setKeyword, setType }) => {
    const [tabs, setTabs] = useState({})
    const [total, setTotal] = useState(0)

    const onSearch = () => {
        setClick('search')
    }

    useEffect(() => {
        const fetchTabs = async () => {
            try {
                const res = await axios.get(`${baseUrl}/setting/board/get_board_tabs.php?menu=menu1`)
                if (res.data) {
                    setTabs(res.data.tabs || {})
                    setTotal(res.data.total || 0)
                }
            } catch (err) {
                console.error('탭 불러오기 실패', err)
            }
        }

        if (params.number === '01') {
            fetchTabs()
        }
    }, [params.number])

    useEffect(() => {
        setKeyword('')
        setType('title')
    }, [params.number])

    return (
        <div className="top">
            {params.number === '01' &&
                <div className="tag_wrap">
                    <button className={click === 'all' ? 'click' : ''} onClick={() => setClick('all')}>
                        전체<strong>({total})</strong>
                    </button>
                    {Object.entries(tabs).map(([tabName, count], i) => (
                        <button
                            key={i}
                            className={click === tabName ? 'click' : ''}
                            onClick={() => setClick(tabName)}
                        >
                            {tabName}<strong>({count})</strong>
                        </button>
                    ))}
                </div>
            }
            <div className="search_wrap">
                <div className="cate">
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="title">제목</option>
                        <option value="writer">작성자</option>
                    </select>
                    <img src={Down} alt="" />
                </div>
                <div className="search">
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder='검색어'
                    />
                    <button onClick={onSearch}>검색</button>
                </div>
            </div>
        </div>
    )
}

export default Top
