import { React, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Rock from '../../../assets/img/board/button_rock.svg'

const baseUrl = process.env.REACT_APP_API_BASE_URL

const List = ({ params, click }) => {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])

    const hideWriter = params.number === '03' || params.number === '04'

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`${baseUrl}/board/get/get_board_posts.php`, {
                    params: {
                        board_number: params.number,
                        tab: click
                    }
                })
                if (res.data.success) {
                    setPosts(res.data.posts)
                }
            } catch (err) {
                console.error('게시글 불러오기 실패', err)
            }
        }

        fetchPosts()
    }, [params.number, click])

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
                {posts.map((item) => {
                    const isSecret = item.open_type === 'protect' || item.open_type === 'notopen'
                    const isInfo = item.tab === '공지'

                    return (
                        <div key={item.id} className={`list ${isInfo ? 'information' : ''}`}>
                            {params.admin && (
                                <>
                                    <input type="checkbox" id={`check-${item.id}`} />
                                    <label htmlFor={`check-${item.id}`}></label>
                                </>
                            )}

                            <p className="number">{item.id}</p>
                            <div className="title_wrap" onClick={() => onDetail(item.id)}>
                                {item.tab && <p className="tage">{item.tab}</p>}
                                {isSecret && <img src={Rock} alt="" />}
                                <p className={`title ${isInfo ? 'information' : ''}`}>{item.title}</p>
                            </div>
                            {!hideWriter && <p className="writer">{item.writer}</p>}
                            <p className="date">{item.created_at?.slice(2, 10).replace(/-/g, '.')}</p>
                            <p className="watch">{item.views ?? 0}</p>
                        </div>
                    )
                })}
            </div>
            <div className="go_write">
                {params.admin ? (
                    <>
                        <div>
                            <button>비공개</button>
                            <button>삭제하기</button>
                        </div>
                        <Link to={`/board_write/${params.number}/admin`}>글쓰기</Link>
                    </>
                ) : (
                    <Link to={`/board_write/${params.number}`}>글쓰기</Link>
                )}
            </div>
        </div>
    )
}

export default List
