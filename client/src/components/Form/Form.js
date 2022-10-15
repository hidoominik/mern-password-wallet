import React, {useState} from 'react'
import useStyles from './styles'
import {TextField, Button, Typography, Paper} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { createPassword } from '../../actions/passwords';

const Form = () => {
  const classes = useStyles();
  const [passwordData, setPasswordData] = useState({
    login:'',
    password:'',
    webAddress: '',
    description:''
  });

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
        console.log("Submit Click!");
        e.preventDefault();
        dispatch(createPassword(passwordData))
    }
  const clear = () => {
    console.log("Clear!")
  }
  return (
    <Paper className={classes.paper}>
        <form  className={`${classes.form} ${classes.root}`} autoComplete='off' noValidate  onSubmit={handleSubmit}>
          <Typography variant="h6"> Add new password </Typography>
          <TextField  name='login' variant='outlined' label="Login:" fullWidth value={passwordData.login} onChange={(e)=>setPasswordData({...passwordData, login: e.target.value})}/>
          <TextField  name='password' type="password" variant='outlined' label="Password:" fullWidth value={passwordData.password} onChange={(e)=>setPasswordData({...passwordData, password: e.target.value})}/>
          <TextField  name='webAddress' variant='outlined' label="Web address:" fullWidth value={passwordData.webAddress} onChange={(e)=>setPasswordData({...passwordData, webAddress: e.target.value})}/>
          <TextField  name='description' variant='outlined' label="Description:" fullWidth value={passwordData.description} onChange={(e)=>setPasswordData({...passwordData, description: e.target.value})}/>
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
          
          <Button  variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
        </form>
    </Paper>
  )
}

export default Form