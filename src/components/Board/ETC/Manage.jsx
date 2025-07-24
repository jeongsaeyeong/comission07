import React from 'react'
import Manage_icon from '../../../assets/img/board/button_manage.svg'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_BASE_URL

const Manage = ({ manage, setManage, cmodify, commentId, text, image }) => {
    const navigation = useNavigate()
    const params = useParams()

    const onModify = () => {
        navigation(`/board_write/${params.number}/${params.id}/modify`)
    }

    const onModifyC = () => {
        if (cmodify === 'comment') {
            window.dispatchEvent(new CustomEvent('commentEditStart', {
                detail: {
                    id: commentId,
                    content: text,
                    image: image || null  // 이미지 (선택)
                }
            }))
        } else {
            // 게시글 수정
            navigation(`/board_write/${params.number}/${params.id}/modify`)
        }
    }

    const onDeletePost = async () => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return

        try {
            const res = await axios.post(`${baseUrl}/board/delete/delete_post.php`, {
                board_number: params.number,
                post_id: params.id
            })

            if (res.data.success) {
                alert('삭제 완료')
                navigation(`/board/${params.number}`)
            } else {
                alert('삭제 실패: ' + (res.data.message || '알 수 없는 오류'))
            }
        } catch (err) {
            console.error('삭제 요청 실패', err)
            alert('서버 오류가 발생했습니다.')
        }
    }

    const onDeleteComment = async () => {
        if (!window.confirm('댓글을 삭제할까요?')) return

        console.log('params.number', params.number)
        console.log('params.id', params.id)
        console.log('commentId', commentId)

        const formData = new FormData()
        formData.append('board_number', params.number)
        formData.append('post_id', params.id)
        formData.append('comment_id', commentId)

        try {
            const res = await axios.post(`${baseUrl}/board/delete/delete_comment.php`, formData)

            if (res.data.success) {
                alert('댓글이 삭제되었습니다.')
                window.location.reload()
            } else {
                alert('댓글 삭제 실패: ' + (res.data.message || '알 수 없는 오류'))
            }
        } catch (err) {
            console.error('댓글 삭제 요청 실패', err)
            alert('서버 오류가 발생했습니다.')
        }
    }

    return (
        <div className='manage' onClick={() => { setManage(!manage) }}>
            <img src={Manage_icon} alt="관리" />
            {manage && (
                <div className="btn_box">
                    {cmodify === 'comment' ? (
                        <>
                            <button onClick={onModifyC}>수정</button>
                            <button onClick={onDeleteComment}>삭제</button>
                        </>
                    ) : (
                        <>
                            <button onClick={onModify}>수정</button>
                            <button onClick={onDeletePost}>삭제</button>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

export default Manage
