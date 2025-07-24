import React, { useEffect, useState } from 'react'
import None from '../../../assets/img/board/button_none.svg'
import Camera from '../../../assets/img/board/button_picturew.svg'
import Profile from '../../../assets/img/board/profile.png'

const baseUrl = process.env.REACT_APP_API_BASE_URL

const Write05 = ({ setShow, comment, nick, postId, poststext, parentid }) => {
    const nickname = nick;
    const [content, setContent] = useState('')
    const [isSensitive, setIsSensitive] = useState(false)
    const [profileimg, setProfileImg] = useState('')
    const [images, setImages] = useState([])

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

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (!file) return

        if (images.length >= 4) {
            alert('최대 4장까지 첨부할 수 있습니다.')
            return
        }

        setImages(prev => [...prev, file])
        e.target.value = ''
    }

    const onSubmit = async () => {
        if (!nickname || !content.trim()) {
            alert('내용을 입력해주세요.')
            return
        }

        const formData = new FormData()
        formData.append('nickname', nickname)
        formData.append('content', content)
        formData.append('is_sensitive', isSensitive ? '1' : '0')
        images.forEach((img, i) => {
            if (img) formData.append(`image${i + 1}`, img)
        })

        if (comment && postId) {
            formData.append('post_id', postId);
            if (typeof parentid === 'number') {
                formData.append('parent_id', parentid);
            }
        }

        try {
            const res = await fetch(
                comment
                    ? `${baseUrl}/board/write/upload_comment_05.php`
                    : `${baseUrl}/board/write/upload_05.php`,
                {
                    method: 'POST',
                    body: formData
                }
            );
            const text = await res.text();
            const data = JSON.parse(text);
            if (data.success) {
                alert(comment ? '댓글이 등록되었습니다.' : '게시글이 등록되었습니다.');
                setShow(false)
            } else {
                alert(data.message || '등록 실패');
            }
        } catch (err) {
            console.error('에러 발생:', err)
            alert('예상치 못한 에러 발생')
        }
    }

    return (
        <div className='Write05_wrap container_main'>
            <div className="write_wrap">
                <div className="header">
                    <button onClick={() => { setShow(false) }} className='none_btn'><img src={None} alt="" /></button>
                    <button onClick={onSubmit}>게시하기</button>
                </div>
                <div className="main">
                    {comment &&
                        <div className="comment">
                            <div className="left">
                                <img src={profileimg} alt="" />
                                <div className="line"></div>
                            </div>
                            <div className="right">
                                <h3>{nick}</h3>
                                <p>{poststext}</p>
                            </div>
                        </div>
                    }
                    <div className="profile">
                        <img src={profileimg} alt="" />
                        <p>{nickname}</p>
                    </div>
                    <div className="content">
                        <input
                            type="text"
                            placeholder='무슨 일이 일어나고 있나요?'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <div className="picture_wrap">
                            {images.map((img, idx) => (
                                <div className="picture" key={idx}>
                                    {img && <img src={URL.createObjectURL(img)} alt={`upload${idx}`} />}
                                </div>
                            ))}
                        </div>
                        <div className="btn_box">
                            <div>
                                <input type="file" id='picture' onChange={handleImageChange} />
                                <label htmlFor="picture"><img src={Camera} alt="" /></label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id='check'
                                    checked={isSensitive}
                                    onChange={() => setIsSensitive(prev => !prev)}
                                />
                                <label htmlFor="check" className='check'></label>
                                <p>민감한 내용으로 표시</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Write05
