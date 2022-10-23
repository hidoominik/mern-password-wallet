import React, {useState} from 'react';
import {Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core';
import useStyles from './styles';
import LockOutlined from '@material-ui/icons/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Input from '../Input';
import {changePassword} from '../../../actions/auth'

const ChangePassword = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const classes = useStyles();
  const initialState = {password:'',newPassword:'', confirmNewPassword:'', userId:'', userPassword:''};
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleChange =(e)=>{ //Same handle change for each field from form 
    
    
    setFormData({...formData, [e.target.name]: e.target.value, userId: user.result._id});
    
  };
  const handleSubmit =(e)=>{
    e.preventDefault();
    console.log("Submit!");
    console.log(formData);
    
        dispatch(changePassword(formData,navigate))
    
        
    };
  
    if(!user?.result?.username){
      return (
        <Paper>
          <Typography variant='h6' align='center'> Sign in to change your password</Typography>
        </Paper>
      )
  
    }
  return (
    <Container component='main' maxWidth="xs">
    <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
            <LockOutlined />
        </Avatar>
        <Typography variant='h5' >Change password:</Typography>

        <form onSubmit={handleSubmit} className={classes.form}>
            <Grid container spacing={2}>
             
                <Input name='password' label="Password" handleChange={handleChange} type='password' autoFocus/>
                <Input name='newPassword' label='New password' handleChange={handleChange} type = {showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
               <Input name="confirmNewPassword" label="Repeat new password" handleChange = {handleChange} type="password" />
                        
            
        
            </Grid>
            <Button type ="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Submit </Button>
        
        </form>
    </Paper>

</Container>
  )
};

export default ChangePassword