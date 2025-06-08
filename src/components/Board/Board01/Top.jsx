import React from 'react'
import Down from '../../../assets/img/board/button_down.svg'

const Top = () => {
    return (
        <div className="top">
            <div className="tag_wrap">
                <button>전체<strong>(999+)</strong></button>
                <button>단편<strong>(999+)</strong></button>
                <button>장편<strong>(999+)</strong></button>
            </div>
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