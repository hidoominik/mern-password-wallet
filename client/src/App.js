import React, {useEffect, useState} from 'react';
import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import { useDispatch } from 'react-redux';

import {getPasswords} from './actions/passwords';
import lock from './images/lock.png'
import Passwords from './components/Passwords/Passwords';
import Form from './components/Form/Form';

import useStyles from './styles'
const App = () =>{
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getPasswords())
    },[dispatch]);


    return(
       <Container maxWidth="lg">
        <AppBar className={classes.appBar} position='static' color="inherit">
            <Typography variant='h2' align='center'> Password Wallet </Typography>
            <img className={classes.heading} src={lock} alt='lock' height="60" />
        </AppBar>
        <Grow in>
            <Container>
                <Grid container justifyContent="space-between" alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Passwords setCurrentId={setCurrentId}/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId}/>
                    </Grid>
                </Grid>
            </Container>
        </Grow>

       </Container>
    )
}

export default App;