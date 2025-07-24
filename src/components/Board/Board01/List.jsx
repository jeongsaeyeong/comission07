import { React, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Rock from '../../../assets/img/board/button_rock.svg'

const baseUrl = process.env.REACT_APP_API_BASE_URL

const List = ({ params, click, settings, page, keyword, type, setFilteredCount }) => {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])

    const hideWriter = params.number === '03' || params.number === '04'

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`${baseUrl}/board/get/get_board_posts.php`, {
                    params: {
                        board_number: params.number,
                        tab: click === 'search' ? '' : click
                    }
                })
                if (res.data.success) {
                    setPosts(res.data.posts)
                }
            } catch (err) {
                console.error('게시글 불러오기 실패', err)
            }
        }

        if (click !== 'search') {
            fetchPosts()
        }
    }, [params.number, click, settings])

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const res = await axios.get(`${baseUrl}/board/get/get_board_posts.php`, {
                    params: {
                        board_number: params.number,
                        keyword,
                        type
                    }
                })
                if (res.data.success) {
                    setPosts(res.data.posts)
                }
            } catch (err) {
                console.error('검색 실패', err)
            }
        }

        if (click === 'search' && keyword.trim()) {
            fetchSearchResults()
        }
    }, [click, keyword, type, params.number])

    const onDetail = (id) => {
        navigate(`/detail/${params.number}/${id}`)
    }

    const menuKey = `menu${Number(params.number)}_per_page`
    const perPage = parseInt(settings[menuKey] || '10', 10)

    // 🔹 공지/일반 분리
    const filteredPosts = posts.filter(post => {
        if (click !== 'search') return true
        if (!keyword.trim()) return true
        const target = post[type]?.toLowerCase()
        return target && target.includes(keyword.toLowerCase())
    })

    const noticePosts = filteredPosts.filter(post => post.open_type === 'notice')
    const normalPosts = filteredPosts.filter(post => post.open_type !== 'notice')

    useEffect(() => {
        setFilteredCount(normalPosts.length) // 공지 제외한 글 개수만 전달
    }, [normalPosts])

    const startIndex = (page - 1) * perPage
    const endIndex = startIndex + perPage
    const pagedPosts = normalPosts.slice(startIndex, endIndex)

    const visiblePosts = [...noticePosts, ...pagedPosts]

    // 🔹 체크박스 기능
    const [checkedItems, setCheckedItems] = useState([])

    const toggleCheck = (id) => {
        setCheckedItems(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        )
    }

    const handleSetPrivate = async () => {
        try {
            await axios.post(`${baseUrl}/board/admin/set_notopen.php`, {
                board_number: params.number,
                ids: checkedItems
            })
            alert('비공개 처리 완료')
            window.location.reload()
        } catch (err) {
            console.error('비공개 처리 실패', err)
        }
    }

    const handleDelete = async () => {
        if (!window.confirm('정말 삭제할까요?')) return
        try {
            await axios.post(`${baseUrl}/board/admin/delete_posts.php`, {
                board_number: params.number,
                ids: checkedItems
            })
            alert('삭제 완료')
            window.location.reload()
        } catch (err) {
            console.error('삭제 실패', err)
        }
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
                {visiblePosts.map((item) => {
                    const isSecret = item.open_type === 'protect' || item.open_type === 'notopen'
                    const isNotice = item.open_type === 'notice'
                    const isInfo = item.tab === '공지'

                    return (
                        <div key={item.id} className={`list ${isInfo || isNotice ? 'information' : ''}`}>
                            {params.admin && (
                                <>
                                    <input
                                        type="checkbox"
                                        id={`check-${item.id}`}
                                        checked={checkedItems.includes(item.id)}
                                        onChange={() => toggleCheck(item.id)}
                                    />
                                    <label htmlFor={`check-${item.id}`}></label>
                                </>
                            )}

                            {/* ✅ 번호: 공지면 "공지", 아니면 실제 id */}
                            <p className="number">{isNotice ? '공지' : item.id}</p>

                            <div className="title_wrap" onClick={() => onDetail(item.id)}>
                                {/* ✅ 공지가 아니면 tage 표시 */}
                                {!isNotice && item.tab && <p className="tage">{item.tab}</p>}
                                {isSecret && <img src={Rock} alt="" />}
                                <p className={`title ${isInfo || isNotice ? 'information' : ''}`}>
                                    {item.title}
                                </p>
                            </div>

                            {!hideWriter && <p className="writer">{item.writer}</p>}
                            <p className="date">{item.created_at?.slice(2, 10).replace(/-/g, '.')}</p>
                            <p className="watch">{item.views ?? 0}</p>
                        </div>
                    )
                })}
                {visiblePosts.length === 0 && (
                    <div className="no_result">검색 결과가 없습니다.</div>
                )}
            </div>
            <div className="go_write">
                {params.admin ? (
                    <>
                        <div>
                            <button onClick={handleSetPrivate}>비공개</button>
                            <button onClick={handleDelete}>삭제하기</button>
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
