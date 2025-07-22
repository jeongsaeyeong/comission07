import React from 'react'
import Picture from '../../../assets/img/board/button_picture.svg'
import Comment from './Comment'

const cleanQuillHTML = (html) => {
    if (!html) return ''
    return html.replace(/ class="[^"]*?ql-[^"]*?"/g, '')
}

const Show = ({ post }) => {
    if (!post) return null

    const cleanedContent = cleanQuillHTML(post.content)

    return (
        <>
            <div className="main">
                <div className="content_wrap">
                    <h3>{post.tab}</h3>
                    <div className="content">
                        <h1>{post.title}</h1>
                        <div dangerouslySetInnerHTML={{ __html: cleanedContent }} />
                    </div>
                </div>
                <div className="comment_wrap">
                    <div className="comment_wrap">
                        <Comment nickname="닉네임" date="2025.00.00 00:00" text="댓글 내용" />
                        <Comment nickname="닉네임" date="2025.00.00 00:00" text="댓글 내용" />
                    </div>
                </div>
                <div className="input_wrap">
                    <input type='text' id='comment' placeholder='댓글 작성하기' />
                    <div className="btn_box">
                        <input type="file" id='picture' />
                        <label htmlFor="picture"><img src={Picture} alt="" /></label>
                        <button>등록</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Show
