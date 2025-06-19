import React from 'react'
import Picture from '../../../assets/img/board/button_picture.svg'
import Comment from './Comment'

const Show = () => {

    return (
        <>
            <div className="main">
                <div className="content_wrap">
                    <h3>장편</h3>
                    <div className="content">
                        <h1>제목</h1>
                        <p>들어가는 내용</p>
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