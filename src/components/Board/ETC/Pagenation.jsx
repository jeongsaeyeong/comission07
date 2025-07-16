import React, { useEffect, useState } from 'react'
import Left from '../../../assets/img/board/button_left.svg'
import Right from '../../../assets/img/board/button_right.svg'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_BASE_URL

const Pagenation = ({ setPage, page }) => {
    const location = useLocation()
    const [maxPage, setMaxPage] = useState(5)

    useEffect(() => {
        const menuKey = getMenuKey(location.pathname)
        if (!menuKey) return

        const fetchPerPage = async () => {
            try {
                const res = await axios.get(`${baseUrl}/setting/board/get_board_setting.php?key=${menuKey}_page`)
                if (res.data?.value) {
                    setMaxPage(Number(res.data.value))
                }
            } catch (err) {
                console.error('페이지 수 불러오기 실패', err)
            }
        }

        fetchPerPage()
        setPage(1)
    }, [location.pathname])

    const onLeft = () => {
        setPage(prev => (prev > 1 ? prev - 1 : 1))
    }

    const onRight = () => {
        setPage(prev => (prev < maxPage ? prev + 1 : maxPage))
    }

    const getMenuKey = (path) => {
        if (path.includes('/board/')) {
            const number = path.split('/board/')[1]
            return `menu${Number(number)}`
        } else if (path.includes('/board05')) {
            return 'menu5'
        }
        return null
    }

    return (
        <div className="Pagenation_wrap">
            <button onClick={onLeft} className='left'><img src={Left} alt="" /></button>
            {Array.from({ length: maxPage }, (_, i) => (
                <button
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    className={page === i + 1 ? 'click' : ''}
                >
                    {i + 1}
                </button>
            ))}
            <button onClick={onRight} className='right'><img src={Right} alt="" /></button>
        </div>
    )
}

export default Pagenation
