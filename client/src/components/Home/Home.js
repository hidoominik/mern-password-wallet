import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import {Container, AppBar, Typography, Grow, Grid, Paper, Button} from '@material-ui/core';
import {getPasswords} from '../../actions/passwords';
import {useLocation, useNavigate} from 'react-router-dom';
import useStyles from './styles'
import Passwords from '../Passwords/Passwords';
import Form from '../Form/Form';

export const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [loadPasswords, setLoadPasswords] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    
    useEffect(()=>{
        const token = user?.token;
        //JWT... 
        setUser(JSON.parse(localStorage.getItem('profile')));
       
        },[dispatch]);

    const loadUserPasswords = () =>{
      if(user.result._id){
        dispatch(getPasswords(user.result._id))
      }
      
      setLoadPasswords(true);
    }
    if(!user?.result?.username){
        return (
          <Paper>
            <Typography variant='h5' align='center'> Sign in to add your passwords</Typography>
          </Paper>
        )
    
      } 
  return (
    <Grow in>
            <Container>
                <Grid container className={classes.mainContainer} justifyContent="space-between" alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={7}>
                      {
                        loadPasswords ? (<Passwords setCurrentId={setCurrentId}/>) : (
                          <Button type='contained' color='primary' onClick={loadUserPasswords}> Load my passwords </Button>)
                      }
                        
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId}/>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
  )
}

export default Home;