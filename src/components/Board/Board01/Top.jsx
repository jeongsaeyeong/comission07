import React, { useEffect, useState } from 'react'
import Down from '../../../assets/img/board/button_down.svg'
import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_BASE_URL

const Top = ({ params }) => {
    const [click, setClick] = useState('all')
    const [tabs, setTabs] = useState([])

    useEffect(() => {
        const fetchTabs = async () => {
            try {
                const res = await axios.get(`${baseUrl}/setting/board/get_board_tabs.php?menu=menu1`)
                if(res.data){
                    console.log(res.data)
                    setTabs(res.data.tabs || [])
                }
            } catch (err) {
                console.error('탭 불러오기 실패', err)
            }
        }

        if (params.number === '01') {
            fetchTabs()
        }
    }, [params.number])

    return (
        <div className="top">
            {params.number === '01' &&
                <div className="tag_wrap">
                    <button className={click === 'all' ? 'click' : ''} onClick={() => setClick('all')}>
                        전체<strong>(999+)</strong>
                    </button>
                    {tabs.map((tab, i) => (
                        <button
                            key={i}
                            className={click === tab ? 'click' : ''}
                            onClick={() => setClick(tab)}
                        >
                            {tab}<strong>(999+)</strong>
                        </button>
                    ))}
                </div>
            }
            <div className="search_wrap">
                <div className="cate">
                    <select>
                        <option value="title">제목</option>
                        <option value="writer">작성자</option>
                    </select>
                    <img src={Down} alt="" />
                </div>
                <div className="search">
                    <input type="text" placeholder='검색어' />
                    <button>검색</button>
                </div>
            </div>
        </div>
    )
}

export default Top
