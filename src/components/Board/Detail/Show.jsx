import React, { useEffect, useState } from 'react'
import Picture from '../../../assets/img/board/button_picture.svg'
import Comment from './Comment'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_BASE_URL

const cleanQuillHTML = (html) => {
    if (!html) return ''
    return html.replace(/ class="[^"]*?ql-[^"]*?ql-[^"]*?"/g, '')
}

const Show = ({ post }) => {
    const params = useParams()
    const [comments, setComments] = useState([])
    const [content, setContent] = useState('')
    const [image, setImage] = useState(null)
    const [imageName, setImageName] = useState('')
    const [cmodify, setCmoidfy] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [editTarget, setEditTarget] = useState(null)

    useEffect(() => {
        if (!post) return

        const increaseView = async () => {
            try {
                await axios.post(`${baseUrl}/board/update/increase_view.php`, {
                    board_number: params.number,
                    post_id: post.id
                })
            } catch (err) {
                console.error('조회수 증가 실패', err)
            }
        }

        increaseView()

        const fetchComments = async () => {
            try {
                const res = await axios.get(`${baseUrl}/board/get/get_comments.php`, {
                    params: {
                        board_number: params.number,
                        post_id: post.id
                    }
                })
                if (res.data.success) {
                    setComments(res.data.comments)
                }
            } catch (err) {
                console.error('댓글 불러오기 실패', err)
            }
        }

        fetchComments()
    }, [post, params.number])

    useEffect(() => {
        const handleEditStart = (e) => {
            const { id, content, image } = e.detail
            setEditMode(true)
            setEditTarget(id)
            setContent(content)
            if (image) {
                setImageName(image)
            } else {
                setImageName('')
            }
        }

        window.addEventListener('commentEditStart', handleEditStart)
        return () => window.removeEventListener('commentEditStart', handleEditStart)
    }, [])

    const onSubmit = async () => {
        const writer = localStorage.getItem('username')
        if (!writer) {
            alert('로그인이 필요합니다.')
            return
        }

        if (!content.trim()) {
            alert('댓글 내용을 입력하세요.')
            return
        }

        const formData = new FormData()
        formData.append('board_number', params.number)
        formData.append('post_id', post.id)
        formData.append('writer', writer)
        formData.append('content', content)
        if (image) formData.append('image', image)

        try {
            if (editMode) {
                formData.append('comment_id', editTarget)
                const res = await axios.post(`${baseUrl}/board/update/update_comment.php`, formData)
                if (res.data.success) {
                    alert('댓글이 수정되었습니다.')
                } else {
                    alert('수정 실패: ' + res.data.message)
                }
            } else {
                const res = await axios.post(`${baseUrl}/board/write/upload_comment.php`, formData)
                if (!res.data.success) {
                    alert('등록 실패')
                    return
                }
            }

            const refreshed = await axios.get(`${baseUrl}/board/get/get_comments.php`, {
                params: {
                    board_number: params.number,
                    post_id: post.id
                }
            })
            if (refreshed.data.success) {
                setComments(refreshed.data.comments)
            }

            setContent('')
            setImage(null)
            setImageName('')
            setEditMode(false)
            setEditTarget(null)

        } catch (err) {
            console.error('댓글 등록/수정 실패', err)
            alert('요청 실패')
        }
    }

    if (!post) return null
    const cleanedContent = cleanQuillHTML(post.content)

    const onFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(file)
            setImageName(file.name)
        }
    }

    return (
        <div className="main">
            <div className="content_wrap">
                {post.tab &&
                    <h3>{post.tab}</h3>
                }
                <div className="content">
                    <h1>{post.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: cleanedContent }} />
                </div>
            </div>

            <div className="comment_wrap">
                {comments.map(comment => (
                    <Comment
                        cmodify={cmodify}
                        setCmoidfy={setCmoidfy}
                        key={comment.id}
                        commentId={comment.id}
                        nickname={comment.writer}
                        date={comment.created_at?.slice(0, 16).replace('T', ' ')}
                        text={comment.content}
                        image={comment.image}
                    />
                ))}
            </div>

            <div className="input_wrap">
                <input
                    type='text'
                    id='comment'
                    placeholder='댓글 작성하기'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <div className="btn_box">
                    <div>
                        <input
                            type="file"
                            id="picture"
                            onChange={onFileChange}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="picture">
                            <img src={Picture} alt="사진 첨부" />
                        </label>
                        {imageName && <p className="image_name">{imageName}</p>}
                    </div>
                    <button onClick={onSubmit}>{editMode ? '수정' : '등록'}</button>
                </div>
            </div>
        </div>
    )
}

export default Show
