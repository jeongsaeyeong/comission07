import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Rock from '../../../assets/img/board/button_rock.svg'

const List = () => {
    const navigation = useNavigate();

    const onDetail = (id) => {
        navigation(`/detail/${id}`)
    }

    return (
        <div className="list_wrap">
            <div className="top">
                <p className="number">공지</p>
                <div className="title_wrap">제목</div>
                <p className="writer">작성자</p>
                <p className="date">작성일</p>
                <p className="watch">조회수</p>
            </div>
            <div className="bottom">
                <div className="list ">
                    <p className="number">공지</p>
                    <div className="title_wrap">
                        <p className='title information'>제목</p>
                    </div>
                    <p className="writer">관리자A</p>
                    <p className="date">25.01.01</p>
                    <p className="watch">조회수</p>
                </div>
                <div className="list information">
                    <p className="number">공지</p>
                    <div className="title_wrap">
                        <p className='title information'>제목</p>
                    </div>
                    <p className="writer">관리자A</p>
                    <p className="date">25.01.01</p>
                    <p className="watch">조회수</p>
                </div>
                <div className="list" onClick={() => { onDetail('5') }}>
                    <p className="number">5</p>
                    <div className="title_wrap">
                        <p className="tage">단편</p>
                        <img src={Rock} alt="" />
                        <p className='title'>제목</p>
                        <p className='comment'>[999+]</p>
                    </div>
                    <p className="writer">관리자A</p>
                    <p className="date">25.01.01</p>
                    <p className="watch">조회수</p>
                </div>
                <div className="list" onClick={() => { onDetail('4') }}>
                    <p className="number">4</p>
                    <div className="title_wrap">
                        <p className="tage">장편</p>
                        <img src={Rock} alt="" />
                        <p className='title'>제목</p>
                        <p className='comment'>[999+]</p>
                    </div>
                    <p className="writer">관리자A</p>
                    <p className="date">25.01.01</p>
                    <p className="watch">조회수</p>
                </div>
                <div className="list" onClick={() => { onDetail('3') }}>
                    <p className="number">3</p>
                    <div className="title_wrap">
                        <p className="tage">단편</p>
                        <p className='title'>제목</p>
                        <p className='comment'>[999+]</p>
                    </div>
                    <p className="writer">관리자A</p>
                    <p className="date">25.01.01</p>
                    <p className="watch">조회수</p>
                </div>
                <div className="list">
                    <p className="number">2</p>
                    <div className="title_wrap">
                        <p className="tage">단편</p>
                        <p className='title'>제목</p>
                    </div>
                    <p className="writer">관리자A</p>
                    <p className="date">25.01.01</p>
                    <p className="watch">조회수</p>
                </div>
                <div className="list">
                    <p className="number">1</p>
                    <div className="title_wrap">
                        <p className="tage">단편</p>
                        <p className='title'>제목</p>
                    </div>
                    <p className="writer">관리자A</p>
                    <p className="date">25.01.01</p>
                    <p className="watch">조회수</p>
                </div>
            </div>
            <div className='go_write'>
                <Link to='/board_write'>글쓰기</Link>
            </div>
        </div>
    )
}

export default List