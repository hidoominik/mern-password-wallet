import React, {useEffect, useState} from 'react';
import {Container} from '@material-ui/core';
import {BrowserRouter,  Route, Routes} from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';


import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import ChangePassword from './components/Auth/ChangePassword/ChangePassword';
const App = () =>{
    
    return(
        <BrowserRouter>
            <Container maxWidth="lg">
                <Navbar/>
                <Routes>
                    <Route path='/' exac element={<Home />}/>
                    <Route path='/Auth' exac element={<Auth />}/>
                    <Route path='/Auth/changePassword' exac element={<ChangePassword />}/>
                </Routes>
            </Container>
        
        </BrowserRouter>
      
    )
}

export default App;