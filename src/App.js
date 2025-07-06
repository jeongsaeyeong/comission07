import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/User/Login/Login'
import LoginSuccess from './components/User/Login/LoginSuccess'
import Join from './components/User/Join/Join'
import JoinSuccess from './components/User/Join/JoinSuccess'
import FindPass from './components/User/FindPass/FindPass'
import FindPassRe from './components/User/FindPass/FindPassRe'
import FindPassSuccess from './components/User/FindPass/FindPassSuccess'
import Main from './components/Section/Main'
import Header from './components/Section/Header'
import Nav from './components/Section/Nav'
import Board01 from './components/Board/Board01/Board01'
import Write from './components/Board/Write/Write'
import Detail from './components/Board/Detail/Detail'
import Board05 from './components/Board/Board05/Board05'
import Detail05 from './components/Board/Board05/Detail'
import Admin from './components/Admin/Admin'
import Mypage from './components/User/Mypage/Mypage'

const App = () => {
    const [onlogin, setOnlogin] = useState(false);

    useEffect(() => {
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');
        if (username && password) {
            setOnlogin(true);
        } else {
            setOnlogin(false);
        }
    }, []);

    return (
        <BrowserRouter>
            {onlogin ? <><Header /><Nav /></> : <></>}
            <Routes>
                {/* user - login/join/findpass */}
                <Route path='/login' element={<Login />} />
                <Route path='/login_success' element={<LoginSuccess />} />
                <Route path='/join' element={<Join />} />
                <Route path='/join_success' element={<JoinSuccess />} />
                <Route path='/findpass' element={<FindPass />} />
                <Route path='/pass_re' element={<FindPassRe />} />
                <Route path='/pass_re_success' element={<FindPassSuccess />} />

                {/* user-mypage */}
                <Route path='/mypage' element={<Mypage />} />

                {/* main */}
                <Route path='/' element={<Main />} />
                <Route path='/board/:number' element={<Board01 />} />
                <Route path='/board/:number/:admin' element={<Board01 />} />
                <Route path='/board05' element={<Board05 />} />
                <Route path='/board05/:admin' element={<Board05 />} />
                <Route path='/board_write/:number' element={<Write />} />
                <Route path='/board_write/:number/:admin' element={<Write />} />
                <Route path='/board05/detail/:id' element={<Detail05 />} />
                <Route path='/detail/:id' element={<Detail />} />

                {/* admin */}

                <Route path='/admin' element={<Admin />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App