import React, { useEffect } from 'react'
import Left from '../../../assets/img/board/button_left.svg'
import Right from '../../../assets/img/board/button_right.svg'
import { useLocation } from 'react-router-dom'

const Pagenation = ({ setPage, page }) => {

    const onLeft = () => {
        if (page > 1) {
            setPage(page - 1);
        } else {
            setPage(1)
        }
    }

    const onRight = () => {
        if (page < 5) {
            setPage(page + 1)
        } else {
            setPage(5)
        }
    }

    const location = useLocation()

    useEffect(() => {
        setPage(1)
    }, [location.pathname])

    return (
        <div className="Pagenation_wrap">
            <button onClick={() => { onLeft() }} className='left'><img src={Left} alt="" /></button>
            <button onClick={() => { setPage(1) }} className={page === 1 ? 'click' : ''}>1</button>
            <button onClick={() => { setPage(2) }} className={page === 2 ? 'click' : ''}>2</button>
            <button onClick={() => { setPage(3) }} className={page === 3 ? 'click' : ''}>3</button>
            <button onClick={() => { setPage(4) }} className={page === 4 ? 'click' : ''}>4</button>
            <button onClick={() => { setPage(5) }} className={page === 5 ? 'click' : ''}>5</button>
            <button onClick={() => { onRight() }} className='right'><img src={Right} alt="" /></button>
        </div>
    )
}

export default Pagenation