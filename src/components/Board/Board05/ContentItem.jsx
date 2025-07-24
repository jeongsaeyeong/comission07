import React, { useEffect, useState } from 'react'
import Write05 from '../Write/Write05'
import Profile from '../../../assets/img/board/profile.png'
import Manage from '../ETC/Manage'
import Combtn from '../../../assets/img/board/button_comment.svg'
import NoneBtn from '../../../assets/img/board/button_none.svg'
import { useNavigate } from 'react-router-dom'

const baseUrl = process.env.REACT_APP_API_BASE_URL

const ContentItem = ({ classN, text, img, count, created_at, setNick, nick, post, parentid, replies }) => {
    const [manage, setManage] = useState(false)
    const [bigImage, setBigImage] = useState(null)
    const [show, setShow] = useState(false)
    const navigation = useNavigate()
    const [profileImg, setProfileImg] = useState(null)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(`${baseUrl}/board/get/get_total_profile.php`)
                const data = await res.json()
                if (data.success) {
                    setProfileImg(`http://ooooo0516.dothome.co.kr/uploads/admin/${data.file_name}`)
                }
            } catch (err) {
                console.error('프로필 이미지 불러오기 실패', err)
            }
        }
        fetchProfile()
    }, [])

    useEffect(() => {
        const fetchNick = async () => {
            try {
                const res = await fetch(`${baseUrl}/board/get/anonymous_nickname.php`)
                const data = await res.json()
                if (data.success) {
                    setNick(data.nickname)
                }
            } catch (err) {
                console.error('닉네임 불러오기 실패', err)
            }
        }
        fetchNick()
    }, [])

    const onDetail = (id) => {
        navigation(`/board05/detail/${id}`)
    }

    const isImageArray = Array.isArray(img)
    const imageList = isImageArray ? img : img ? [img] : []

    return (
        <>
            <div className={`${classN ? 'reple' : ' '} content`}>
                <div className="left">
                    <img src={profileImg || Profile} alt="" />
                    <div className={`line ${count === 0 ? 'line_not' : ''}`}></div>
                </div>
                <div className="right">
                    <div className="top">
                        <div>
                            <h3>{nick}</h3>
                            <p>{created_at}</p>
                        </div>
                        <Manage setManage={setManage} manage={manage} />
                    </div>
                    <div className="bottom">
                        <p onClick={()=>{onDetail(post.id)}}>{text}</p>

                        <div className="img_wrap">
                            {imageList.length === 1 && (
                                <img src={imageList[0]} alt="첨부이미지1" className="content_img" onClick={() => setBigImage(imageList[0])} />
                            )}
                            {imageList.length === 2 && (
                                <>
                                    {imageList.map((src, idx) => (
                                        <img key={idx} src={src} alt={`첨부이미지${idx}`} className="content_img" onClick={() => setBigImage(src)} />
                                    ))}
                                </>
                            )}
                            {imageList.length === 3 && (
                                <>
                                    <img src={imageList[0]} alt="첨부이미지0" className="content_img" onClick={() => setBigImage(imageList[0])} />
                                    <div className="img_two">
                                        {imageList.slice(1).map((src, idx) => (
                                            <img key={idx + 1} src={src} alt={`첨부이미지${idx + 1}`} className="content_img" onClick={() => setBigImage(src)} />
                                        ))}
                                    </div>
                                </>
                            )}
                            {imageList.length === 4 && (
                                <>
                                    <div className="img_two">
                                        {imageList.slice(0, 2).map((src, idx) => (
                                            <img key={idx} src={src} alt={`첨부이미지${idx}`} className="content_img" onClick={() => setBigImage(src)} />
                                        ))}
                                    </div>
                                    <div className="img_two">
                                        {imageList.slice(2).map((src, idx) => (
                                            <img key={idx + 2} src={src} alt={`첨부이미지${idx + 2}`} className="content_img" onClick={() => setBigImage(src)} />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {classN !== 'reple' &&
                            <button onClick={() => setShow(true)}>
                                <img src={Combtn} alt="" />{count}
                            </button>
                        }
                    </div>
                </div>
            </div>

            {bigImage && (
                <div className="big_picture">
                    <button onClick={() => setBigImage(null)}>
                        <img src={NoneBtn} alt="닫기" />
                    </button>
                    <img src={bigImage} alt="확대 이미지" />
                </div>
            )}

            {(show && classN !== 'reple') ? (
                <Write05
                    profileImg={profileImg}
                    poststext={text}
                    setShow={setShow}
                    comment={true}
                    parentid={parentid}
                    nick={nick}
                    postId={post.id}
                />
            ) : null}

            {replies?.length > 0 && (
                <>
                    {replies.map((reply) => {
                        const replyImages = [reply.image1, reply.image2, reply.image3, reply.image4]
                            .filter(Boolean)
                            .map(img => `http://ooooo0516.dothome.co.kr/uploads/board05/${img}`)

                        return (
                            <ContentItem
                                classN={'reple'}
                                key={reply.id || `${reply.nickname}-${reply.created_at}`}
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
            )}
        </>
    )
}

export default ContentItem
