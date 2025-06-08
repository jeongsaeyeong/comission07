import React from 'react'
import Left from '../../../assets/img/board/button_left.svg'
import Right from '../../../assets/img/board/button_right.svg'

const Pagenation = () => {
    return (
        <div className="Pagenation_wrap">
            <button className='left'><img src={Left} alt="" /></button>
            <button className='click'>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>5</button>
            <button className='right'><img src={Right} alt="" /></button>
        </div>
    )
}

export default Pagenation