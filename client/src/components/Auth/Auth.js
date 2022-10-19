import React, {useState} from 'react';
import {Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core';
import useStyles from './styles';
import LockOutlined from '@material-ui/icons/LockOutlined';

import Input from './Input';
const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [isPasswordKeptAsHash, setIsPasswordKeptAsHash] = useState(true);

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit =()=>{
        console.log("Submit!");
    };
    const handleChange =()=>{
        console.log("Change!");
    };

    const switchMode =()=> {
        setIsSignup((prevMode) => !prevMode);
        setShowPassword(false)
    }

    const switchPasswordStoreMode=()=>setIsPasswordKeptAsHash((prevMode) => !prevMode);
   


  return (
    <Container component='main' maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlined />
            </Avatar>
            <Typography variant='h5' >{isSignup ? 'Sign Up' : 'Sign In'}</Typography>

            <form onSubmit={handleSubmit} className={classes.form}>
                <Grid container spacing={2}>
                    {
                        isSignup && ( //ONLY IF isSignup == true
                            <>
                                <Input name='email' label="Email" handleChange={handleChange} type='email'/>
                            </>
                        ) 
                    }
                    <Input name='username' label="Username" handleChange={handleChange} type='text' autoFocus/>
                    <Input name='password' label='Password' handleChange={handleChange} type = {showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                    { isSignup && (
                        <>
                            <Input name="confirmPassword" label="Repeat password" handleChange = {handleChange} type="password" />
                            <Typography align='right' variant='subtitle1'>Password will be stored using: </Typography>
                            <Button fullWidth  onClick={switchPasswordStoreMode}>
                            {isPasswordKeptAsHash ? ` SHA512  (Click to change)` : 'HMAC (Click to change)'}

                            </Button>
                           
                        </>
                    )}
            
                </Grid>
                <Button type ="submit" fullWidth variant="contained" color="primary" className={classes.submit}>{isSignup ? 'Sign Up' : 'Sign In'} </Button>
                <Grid container justifyContent='center'>
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignup ? 'Already have an account? Sign in!' : 'No account yet? Sign up!'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>

    </Container>
  )
}

export default Auth;