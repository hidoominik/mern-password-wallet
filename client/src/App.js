import React, {useEffect, useState} from 'react';
import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import {BrowserRouter, Switch, Route, Routes} from 'react-router-dom';
import lock from './images/lock.png'
import Passwords from './components/Passwords/Passwords';
import Form from './components/Form/Form';
import Navbar from './components/Navbar/Navbar';
import useStyles from './styles'
import Home from './components/Home/Home';
const App = () =>{
    
    return(
        <BrowserRouter>
            <Container maxWidth="lg">
                <Navbar/>
                <Home/>
                <Routes>
                    <Route path='/' exac element={<Home />}/>
                </Routes>
            </Container>
        
        </BrowserRouter>
      
    )
}

export default App;