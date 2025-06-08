import React from 'react'
import Example from '../../assets/img/main/example.png'
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <div className='Nav_wrap'>
            <div className="nav">
                <Link to='/'><img className='menu_wrap' src={Example} alt="" /></Link>
                <Link to='/board01'><img className='board01' src={Example} alt="" /></Link>
                <Link to='/board02'><img className='board02' src={Example} alt="" /></Link>
                <Link to='/board03'><img className='board03' src={Example} alt="" /></Link>
                <Link to='/board04'><img className='board04' src={Example} alt="" /></Link>
                <Link to='/board05'><img className='board05' src={Example} alt="" /></Link>
            </div>
        </div>
    )
}

export default Nav