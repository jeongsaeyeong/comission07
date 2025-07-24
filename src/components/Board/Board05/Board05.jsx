import React, { useEffect, useState } from 'react'
import Pagenation from '../ETC/Pagenation'
import ThreadItem from './ThreadItem'
import NoneBtn from '../../../assets/img/board/button_noneb.svg'
import Admin from '../../../assets/img/board/button_admin.svg'
import Camera from '../../../assets/img/board/button_picture.svg'
import Write05 from '../Write/Write05'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_BASE_URL

const Board05 = () => {
    const [page, setPage] = useState(1)
    const [posts, setPosts] = useState([])
    const [comments, setComment] = useState([])
    const [show, setShow] = useState(false)
    const [noticew, setNoticew] = useState(false)
    const [nick, setNick] = useState('닉네임')
    const [settings, setSettings] = useState({})
    const params = useParams()
    const [notice, setNotice] = useState(null)
    const [noticeContent, setNoticeContent] = useState('')
    const [noticeImage, setNoticeImage] = useState(null)
    const [noticeBig, setNoticeBig] = useState(false)

    useEffect(() => {
        const fetchSettingsAndPosts = async () => {
            try {
                const settingRes = await axios.get(`${baseUrl}/board/get/get_board_settings.php`, {
                    params: { number: 5 }
                })

                if (!settingRes.data.success) return

                const s = settingRes.data.settings
                setSettings(s)

                const perPage = parseInt(s.menu5_per_page || '5', 10)

                const postRes = await axios.get(`${baseUrl}/board/get/get_posts_05.php`, {
                    params: { page, per_page: perPage }
                })

                if (postRes.data.success) {
                    setPosts(postRes.data.posts)
                }
            } catch (err) {
                console.error('설정 또는 게시글 불러오기 실패:', err)
            }
        }

        fetchSettingsAndPosts()
    }, [page])

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`${baseUrl}/board/get/get_comments_05.php?page=${page}`)
                const data = await res.json()
                if (data.success) {
                    setComment(data.comments)
                } else {
                    console.error('댓글 불러오기 실패:', data.message)
                }
            } catch (err) {
                console.error('댓글 에러 발생:', err)
            }
        }

        fetchComments()
    }, [page])

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const res = await axios.get(`${baseUrl}/board/get/get_board05_notice.php`)
                if (res.data.success) {
                    setNotice(res.data.notice)
                }
            } catch (err) {
                console.error('공지 불러오기 실패:', err)
            }
        }

        fetchNotice()
    }, [])

    const handleNoticeUpload = async () => {
        if (!noticeContent.trim()) {
            alert('내용을 입력하세요.')
            return
        }

        const formData = new FormData()
        formData.append('content', noticeContent)
        if (noticeImage) {
            formData.append('image', noticeImage)
        }

        try {
            const res = await fetch(`${baseUrl}/board/write/upload_board05_notice.php`, {
                method: 'POST',
                body: formData
            })
            const data = await res.json()

            if (data.success) {
                alert('공지 등록 완료')
                setNoticeContent('')
                setNoticeImage(null)
                setNoticew(false)
            } else {
                alert('등록 실패: ' + data.message)
            }
        } catch (err) {
            console.error('업로드 오류:', err)
            alert('업로드 중 오류 발생')
        }
    }

    return (
        <div className='Board05_wrap container_main'>
            <div className="top">
                {noticew ? (
                    <div className="notice_wrap notice_write">
                        <h3>공지</h3>
                        <textarea
                            placeholder='내용을 입력하세요'
                            value={noticeContent}
                            onChange={e => setNoticeContent(e.target.value)}
                        />
                        <div className="btn_box">
                            <input
                                type="file"
                                id='file'
                                onChange={e => setNoticeImage(e.target.files[0])}
                            />
                            <label htmlFor="file">
                                <img src={Camera} alt="첨부" />
                                {noticeImage && (
                                    <span className="file_name">{noticeImage.name}</span>
                                )}
                            </label>
                            <button onClick={handleNoticeUpload}>저장</button>
                        </div>
                    </div>
                ) : (
                    <div className="notice_wrap">
                        <h3>공지</h3>
                        {notice ? (
                            <p onClick={() => { setNoticeBig(true) }}>
                                {notice.content.split('\n').map((line, i) => (
                                    <span key={i}>
                                        {line}<br />
                                    </span>
                                ))}
                            </p>
                        ) : (
                            <p>등록된 공지가 없습니다.</p>
                        )}
                        {params.admin === 'admin' &&
                            <button className='admin_write' onClick={() => { setNoticew(true) }}>
                                <img src={Admin} alt="" />
                            </button>
                        }
                    </div>
                )}
                <div className="search_wrap">
                    <div className="search">
                        <input type="text" placeholder='검색어' />
                        <button>검색</button>
                        <button onClick={() => { setShow(true) }}>업로드</button>
                    </div>
                    <Pagenation
                        setPage={setPage}
                        page={page}
                        board={'board05'}
                        settings={settings}
                        setSettings={setSettings}
                    />
                </div>
            </div>
            <div className="main">
                {posts.map(post => {
                    const postComments = comments.filter(c => c.post_id === post.id)

                    return (
                        <ThreadItem
                            key={post.id}
                            post={post}
                            comments={postComments}
                            show={false}
                            nick={nick}
                            setNick={setNick}
                        />
                    )
                })}
            </div>
            {show && <Write05 setShow={setShow} nick={nick} />}
            {noticeBig &&
                <div className="notice_pop">
                    <div className="pop notice_wrap">
                        <button onClick={() => setNoticeBig(false)}>
                            <img src={NoneBtn} alt="닫기" />
                        </button>
                        <h3>공지</h3>
                        <p>
                            {notice.content.split('\n').map((line, i) => (
                                <span key={i}>
                                    {line}<br />
                                </span>
                            ))}
                        </p>
                        {notice.image && (
                            <img
                                src={`http://ooooo0516.dothome.co.kr/uploads/board05_notice/${notice.image}`}
                                alt="공지 이미지"
                            />
                        )}
                    </div>
                </div>
            }
        </div>
    )
}

export default Board05
