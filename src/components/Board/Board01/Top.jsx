import React, { useState } from 'react'
import Down from '../../../assets/img/board/button_down.svg'

const Top = ({ params }) => {
    const [click, setClick] = useState('all');

    return (
        <div className="top">
            {params.number === '01' &&
                <div className="tag_wrap">
                    <button className={click === 'all' ? 'click' : ''} onClick={() => { setClick('all') }}>전체<strong>(999+)</strong></button>
                    <button className={click === 'short' ? 'click' : ''} onClick={() => { setClick('short') }}>단편<strong>(999+)</strong></button>
                    <button className={click === 'long' ? 'click' : ''} onClick={() => { setClick('long') }}>장편<strong>(999+)</strong></button>
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