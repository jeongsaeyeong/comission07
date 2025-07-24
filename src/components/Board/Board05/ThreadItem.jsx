import React, { useState } from 'react'
import ContentItem from './ContentItem'
import More from '../../../assets/img/board/button_more.svg'
import Profile from '../../../assets/img/board/profile.png'

const ThreadItem = ({ show, detail, post, setNick, nick, comments }) => {
    const [thisshow, setThisshow] = useState(show)

    const {
        content,
        created_at,
        image1,
        image2,
        image3,
        image4,
        is_sensitive
    } = post

    const images = [image1, image2, image3, image4]
        .filter(Boolean)
        .map(img => `http://ooooo0516.dothome.co.kr/uploads/board05/${img}`)

    const parentComments = comments.filter(c => !c.parent_id)
    const childComments = comments.filter(c => c.parent_id)
    const parentsWithReplies = [...new Set(childComments.map(c => c.parent_id))]

    const previewParent = parentComments
        .filter(c => parentsWithReplies.includes(c.id))
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0]

    const shouldShowToggleButton = !detail && comments.length >= 3

    return (
        <div className="content_wrap">
            <ContentItem
                post={post}
                text={content}
                count={comments?.length || 0}
                img={images}
                nick={nick}
                setNick={setNick}
                created_at={created_at}
                isSensitive={is_sensitive}
            />

            {/* 스레드 토글 버튼 (디테일 페이지에서는 숨김) */}
            {shouldShowToggleButton && (
                <button onClick={() => setThisshow(!thisshow)}>
                    <div><img src={More} alt="" /></div>
                    <p>이 스레드 {thisshow ? '접기' : '표시'}</p>
                </button>
            )}

            {/* 댓글 렌더링 */}
            {detail ? (
                // ✅ 디테일: 모든 부모 + 대댓글 전체
                parentComments
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .map(parent => {
                        const parentImages = [parent.image1, parent.image2, parent.image3, parent.image4]
                            .filter(Boolean)
                            .map(img => `http://ooooo0516.dothome.co.kr/uploads/board05/${img}`)

                        const replies = childComments
                            .filter(c => c.parent_id === parent.id)
                            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

                        return (
                            <React.Fragment key={parent.id}>
                                <ContentItem
                                    text={parent.content}
                                    img={parentImages}
                                    count={replies.length}
                                    created_at={parent.created_at}
                                    nick={parent.nickname}
                                    setNick={setNick}
                                    post={post}
                                    parentid={parent.id}
                                />
                                {replies.map(reply => {
                                    const replyImages = [reply.image1, reply.image2, reply.image3, reply.image4]
                                        .filter(Boolean)
                                        .map(img => `http://ooooo0516.dothome.co.kr/uploads/board05/${img}`)

                                    return (
                                        <ContentItem
                                            classN="reple"
                                            key={reply.id}
                                            text={reply.content}
                                            img={replyImages}
                                            count={0}
                                            created_at={reply.created_at}
                                            nick={reply.nickname}
                                            setNick={setNick}
                                            post={post}
                                            parentid={reply.id}
                                        />
                                    )
                                })}
                            </React.Fragment>
                        )
                    })
            ) : (
                thisshow ? (
                    // 펼친 상태: 대표 부모 댓글 + 모든 대댓글
                    previewParent && (() => {
                        const parentImages = [previewParent.image1, previewParent.image2, previewParent.image3, previewParent.image4]
                            .filter(Boolean)
                            .map(img => `http://ooooo0516.dothome.co.kr/uploads/board05/${img}`)

                        const replies = comments
                            .filter(c => c.parent_id === previewParent.id)
                            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

                        return (
                            <>
                                <ContentItem
                                    key={previewParent.id}
                                    text={previewParent.content}
                                    img={parentImages}
                                    count={replies.length}
                                    created_at={previewParent.created_at}
                                    nick={previewParent.nickname}
                                    setNick={setNick}
                                    post={post}
                                    parentid={previewParent.id}
                                />
                                {replies.map(reply => {
                                    const replyImages = [reply.image1, reply.image2, reply.image3, reply.image4]
                                        .filter(Boolean)
                                        .map(img => `http://ooooo0516.dothome.co.kr/uploads/board05/${img}`)

                                    return (
                                        <ContentItem
                                            classN="reple"
                                            key={reply.id}
                                            text={reply.content}
                                            img={replyImages}
                                            count={0}
                                            created_at={reply.created_at}
                                            nick={reply.nickname}
                                            setNick={setNick}
                                            post={post}
                                            parentid={reply.id}
                                        />
                                    )
                                })}
                            </>
                        )
                    })()
                ) : (
                    // 접힌 상태: 대표 부모 댓글 + 대댓글 1개 or 부모 2개
                    (() => {
                        const rendered = []

                        if (previewParent) {
                            const parentImages = [previewParent.image1, previewParent.image2, previewParent.image3, previewParent.image4]
                                .filter(Boolean)
                                .map(img => `http://ooooo0516.dothome.co.kr/uploads/board05/${img}`)

                            const replies = childComments
                                .filter(c => c.parent_id === previewParent.id)
                                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

                            rendered.push(
                                <ContentItem
                                    key={previewParent.id}
                                    text={previewParent.content}
                                    img={parentImages}
                                    count={replies.length}
                                    created_at={previewParent.created_at}
                                    nick={previewParent.nickname}
                                    setNick={setNick}
                                    post={post}
                                    parentid={previewParent.id}
                                />
                            )

                            if (replies.length > 0) {
                                const reply = replies[0]
                                const replyImages = [reply.image1, reply.image2, reply.image3, reply.image4]
                                    .filter(Boolean)
                                    .map(img => `http://ooooo0516.dothome.co.kr/uploads/board05/${img}`)

                                rendered.push(
                                    <ContentItem
                                        classN="reple"
                                        key={reply.id}
                                        text={reply.content}
                                        img={replyImages}
                                        count={0}
                                        created_at={reply.created_at}
                                        nick={reply.nickname}
                                        setNick={setNick}
                                        post={post}
                                        parentid={reply.id}
                                    />
                                )
                            }
                        } else {
                            // 대댓글 없는 경우 → 부모 댓글 2개 미리보기
                            const preview = parentComments
                                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                                .slice(0, 2)

                            preview.forEach(parent => {
                                const parentImages = [parent.image1, parent.image2, parent.image3, parent.image4]
                                    .filter(Boolean)
                                    .map(img => `http://ooooo0516.dothome.co.kr/uploads/board05/${img}`)

                                rendered.push(
                                    <ContentItem
                                        key={parent.id}
                                        text={parent.content}
                                        img={parentImages}
                                        count={0}
                                        created_at={parent.created_at}
                                        nick={parent.nickname}
                                        setNick={setNick}
                                        post={post}
                                        parentid={parent.id}
                                    />
                                )
                            })
                        }

                        return rendered
                    })()
                )
            )}
        </div>
    )
}

export default ThreadItem
