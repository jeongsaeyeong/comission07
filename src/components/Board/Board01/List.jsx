import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Rock from '../../../assets/img/board/button_rock.svg'

const mockData = [
    { id: 'notice1', number: '공지', title: '제목', tag: '', type: '공지', comment: '', isInfo: true },
    { id: 'notice2', number: '공지', title: '제목', tag: '', type: '공지', comment: '', isInfo: true },
    { id: '5', number: '5', title: '제목', tag: '단편', type: '비밀글', comment: '[999+]', isInfo: false },
    { id: '4', number: '4', title: '제목', tag: '장편', type: '비밀글', comment: '[999+]', isInfo: false },
    { id: '3', number: '3', title: '제목', tag: '단편', type: '일반', comment: '[999+]', isInfo: false },
    { id: '2', number: '2', title: '제목', tag: '단편', type: '일반', comment: '', isInfo: false },
    { id: '1', number: '1', title: '제목', tag: '단편', type: '일반', comment: '', isInfo: false },
]

const List = ({ params }) => {
    const navigate = useNavigate()

    const hideWriter = params.number === '03' || params.number === '04'

    const onDetail = (id) => {
        navigate(`/detail/${id}`)
    }

    return (
        <div className="list_wrap">
            <div className="top">
                <p className="number">번호</p>
                <div className="title_wrap">제목</div>
                {!hideWriter && <p className="writer">작성자</p>}
                <p className="date">작성일</p>
                <p className="watch">조회수</p>
            </div>
            <div className="bottom">
                {mockData.map((item) => (
                    <div
                        key={item.id}
                        className={`list ${item.isInfo ? 'information' : ''}`}
                    >
                        {params.admin &&
                            <>
                                <input type="checkbox" id={`check-${item.id}`} />
                                <label htmlFor={`check-${item.id}`}></label>
                            </>
                        }

                        <p className="number">{item.number}</p>
                        <div className="title_wrap"
                            onClick={() => onDetail(item.id)}
                        >
                            {item.tag && <p className="tage">{item.tag}</p>}
                            {item.type === '비밀글' && <img src={Rock} alt="" />}
                            <p className={`title ${item.isInfo ? 'information' : ''}`}>{item.title}</p>
                            {item.comment && <p className="comment">{item.comment}</p>}
                        </div>
                        {!hideWriter && <p className="writer">관리자A</p>}
                        <p className="date">25.01.01</p>
                        <p className="watch">0</p>
                    </div>
                ))}

            </div>
            <div className="go_write">
                {params.admin ? (
                    <>
                        <div>
                            <button>비공개</button>
                            <button>삭제하기</button>
                        </div>
                        <Link to={`/board_write/${params.number}/admin`}>글쓰기</Link>
                    </>) : (
                    <Link to={`/board_write/${params.number}`}>글쓰기</Link>

                )
                }
            </div>
        </div>
    )
}

export default List
