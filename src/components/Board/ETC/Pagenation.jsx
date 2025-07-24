import React, { useEffect, useState } from 'react'
import Left from '../../../assets/img/board/button_left.svg'
import Right from '../../../assets/img/board/button_right.svg'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_BASE_URL

const Pagenation = ({ setPage, page, setAll, settings, setSettings, filteredCount, keyword, board, comment }) => {
    const location = useLocation()
    const [maxPage, setMaxPage] = useState(5)
    const [listC, setListC] = useState(0)
    const params = useParams()

    const getMenuKey = (path) => {
        if (path.includes('/board/')) {
            const number = path.split('/board/')[1]
            return `menu${Number(number)}`
        } else if (path.includes('/board05')) {
            return 'menu5'
        }
        return null
    }

    // ✅ board05 페이지네이션 전용
    useEffect(() => {
        if (board !== 'board05') return

        const fetchBoard05Pagination = async () => {
            try {
                const settingRes = await axios.get(`${baseUrl}/board/get/get_board_settings.php`, {
                    params: { number: 5 }
                })
                if (!settingRes.data.success) throw new Error('설정값 실패')

                const s = settingRes.data.settings
                setSettings?.(s)

                const perPage = parseInt(s.menu5_per_page || '5', 10)
                const maxSetting = parseInt(s.menu5_page || '5', 10)

                const countRes = await axios.get(`${baseUrl}/board/get/get_post_count_board05.php`)
                if (!countRes.data.success) throw new Error('글 개수 실패')

                const total = countRes.data.count
                setAll?.(total)
                setListC(total)

                const realPageCount = Math.ceil(total / perPage)
                setMaxPage(Math.min(realPageCount, maxSetting))
            } catch (err) {
                console.error('board05 페이지네이션 설정 실패:', err)
            }
        }

        fetchBoard05Pagination()
    }, [board, keyword])

    // ✅ 기존 메뉴(1~4번 게시판)
    useEffect(() => {
        if (board === 'board05') return

        const menuKey = getMenuKey(location.pathname)
        if (!menuKey) return

        const fetchPerPageSetting = async () => {
            try {
                const res = await axios.get(`${baseUrl}/setting/board/get_board_setting.php?key=${menuKey}_page`)
                if (res.data?.value) {
                    setMaxPage(Number(res.data.value))
                }
            } catch (err) {
                console.error('페이지 수 불러오기 실패', err)
            }
        }

        fetchPerPageSetting()
        setPage(1)
    }, [location.pathname])

    useEffect(() => {
        if (board === 'board05') return

        const menuKey = getMenuKey(location.pathname)
        if (!menuKey) return

        const board_number = menuKey.replace('menu', '')

        const fetchPostCount = async () => {
            try {
                const res = await axios.get(`${baseUrl}/board/get/get_post_count.php`, {
                    params: {
                        board_number,
                        tab: 'all'
                    }
                })
                if (res.data.success) {
                    setAll?.(res.data.count)
                    setListC(res.data.count)
                }
            } catch (err) {
                console.error('게시글 수 불러오기 실패', err)
            }
        }

        fetchPostCount()
    }, [location.pathname])

    useEffect(() => {
        if (!settings || board === 'board05') return

        const menuKey = getMenuKey(location.pathname)
        if (!menuKey) return

        const perPage = parseInt(settings[`${menuKey}_per_page`] || '5', 10)
        const maxSetting = parseInt(settings[`${menuKey}_page`] || '5', 10)
        const countToUse = keyword?.trim() ? filteredCount : listC

        const realPageCount = Math.ceil(countToUse / perPage)
        setMaxPage(Math.min(maxSetting, realPageCount))
    }, [settings, listC, filteredCount, keyword])

    const onLeft = () => {
        setPage(prev => (prev > 1 ? prev - 1 : 1))
    }

    const onRight = () => {
        setPage(prev => (prev < maxPage ? prev + 1 : maxPage))
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
