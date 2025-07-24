import React, { useState, useEffect } from 'react'
import Back from '../../../assets/img/board/button_left.svg'
import Picture from '../../../assets/img/board/button_picture.svg'
import Pagenation from '../ETC/Pagenation'
import ThreadItem from './ThreadItem'
import { useNavigate, useParams } from 'react-router-dom'

const baseUrl = process.env.REACT_APP_API_BASE_URL

const Detail = () => {
    const [page, setPage] = useState(1)
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])
    const navigation = useNavigate()
    const params = useParams()

    const onBack = () => navigation(-1)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`${baseUrl}/board/get/get_post_detail.php?id=${params.id}`)
                const data = await res.json()
                if (data.success) {
                    setPost(data.post)
                } else {
                    console.error(data.message)
                }
            } catch (err) {
                console.error('게시글 불러오기 실패:', err)
            }
        }

        const fetchComments = async () => {
            try {
                const res = await fetch(`${baseUrl}/board/get/get_comments_detail.php?post_id=${params.id}`)
                const data = await res.json()
                if (data.success) {
                    setComments(data.comments)
                } else {
                    console.error(data.message)
                }
            } catch (err) {
                console.error('댓글 불러오기 실패:', err)
            }
        }

        fetchPost()
        fetchComments()
    }, [params.id])

    return (
        <div className='Detail05_wrap container_main Board05_wrap'>
            <div className="top">
                <button onClick={onBack} className="back"><img src={Back} alt="" /></button>
                <Pagenation page={page} setPage={setPage} />
            </div>
            <div className="main">
                {post && (
                    <ThreadItem
                        post={post}
                        show={true}
                        detail={true}
                        nick={post.nickname}
                        setNick={() => {}}
                        comments={comments}
                    />
                )}
            </div>
        </div>
    )
}

export default Detail
