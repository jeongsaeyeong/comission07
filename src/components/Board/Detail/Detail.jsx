import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import Back from '../../../assets/img/board/button_left.svg'
import No_Show from './No_Show'
import Pass from './Pass'
import Pagenation from '../ETC/Pagenation'
import Show from './Show'
import Manage from '../ETC/Manage'

const baseUrl = process.env.REACT_APP_API_BASE_URL

const Detail = () => {
    const params = useParams();
    const navigation = useNavigate();

    const [rock, setRock] = useState(false);
    const [needpass, setNeedpass] = useState(false);
    const [pass, setPass] = useState('');
    const [manage, setManage] = useState(false);
    const [page, setPage] = useState(1);
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`${baseUrl}/board/get/get_board_post.php`, {
                    params: {
                        number: params.number,
                        id: params.id
                    }
                });

                if (res.data.success) {
                    setPost(res.data.post);
                    console.log('res.data.post', res.data.post);

                    const type = res.data.post.open_type;
                    const username = localStorage.getItem('username');
                    const isAdminOrOwner = username === 'admin' || username === res.data.post.writer;

                    if (type === 'notopen' && !isAdminOrOwner) {
                        setRock(true);
                    } else if (type === 'protect' && !isAdminOrOwner) {
                        setNeedpass(true);
                    }

                } else {
                    console.error('게시글 없음');
                }
            } catch (err) {
                console.error('게시글 불러오기 실패', err);
            }
        };

        fetchPost();
    }, [params.number, params.id]);

    const onBack = () => {
        navigation(-1);
    }

    return (
        <div className='Detail_wrap container_main'>
            <div className="detail_header">
                <button onClick={onBack} className='back'>
                    <img src={Back} alt="뒤로가기" />
                </button>
                {!(rock || needpass) && post?.writer === localStorage.getItem('username') && (
                    <Manage manage={manage} setManage={setManage} />
                )}
            </div>

            {!(rock || needpass) && (
                <>
                    <Show post={post} />
                    <Pagenation setPage={setPage} page={page} comment={true} />
                </>
            )}

            {rock && <No_Show />}
            {needpass && (
                <Pass
                    post={post}
                    pass={pass}
                    setPass={setPass}
                    postId={params.id}
                    boardNumber={String(params.number).padStart(2, '0')} // <-- 이거 추가
                    setNeedpass={setNeedpass}
                />
            )}
        </div>
    )
}

export default Detail
