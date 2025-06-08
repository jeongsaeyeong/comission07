import React, { useState } from 'react'
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

const App = () => {
    const [onlogin, setOnlogin] = useState(true);

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

                {/* main */}
                <Route path='/' element={<Main />} />
                <Route path='/board01' element={<Board01 />} />
                <Route path='/board_write' element={<Write />} />
                <Route path='/board02' element={<Main />} />
                <Route path='/board03' element={<Main />} />
                <Route path='/board04' element={<Main />} />
                <Route path='/board05' element={<Main />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App