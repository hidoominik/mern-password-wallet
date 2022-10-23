import React, {useState, useEffect} from 'react';
import { AppBar,Avatar,Button,Toolbar,Typography } from '@material-ui/core';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import useStyles from './styles';
import lock from '../../images/lock.png';
import decode from 'jwt-decode';
import LockOutlined from '@material-ui/icons/LockOutlined'


const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(()=>{
        const token = user?.token;
        if(token){
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) logout(); //check if token is expired
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const logout =()=>{
        dispatch({type: 'LOGOUT'});
        setUser(null);
        navigate("/auth");
    }

    const changePassword=()=>{
        navigate("/auth/changePassword");
    }

    return(
    <AppBar className={classes.appBar} position='static' color="inherit">
        <div className={classes.brandContainer}>
            <Typography className={classes.heading} color='primary' variant='h3' component={Link} to="/" align='center'> <b>PASSWORD WALLET</b> </Typography>
            {/*<img className={classes.heading} src={lock} alt='lock' height="60" /> */}
            <LockOutlined className={classes.heading} color='secondary'  fontSize="large"/>
        </div>
        <Toolbar className={classes.toolbar}>
            {user ? ( //This if there is logged in user, we display his avatar, nickname, and button to logout
                <div className={classes.profile}>
                    {/* //<Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}> {user.result.name.charAt(0)}</Avatar> */}
                    <Typography className={classes.userName} variant="h6"> Hello, <b>{user.result.username} </b> </Typography>
                    <Button variant='contained' className={classes.logout} component={Link} to="/Auth/changePassword"  color='primary'>Change password</Button>
                    <Button variant='contained' className={classes.logout} onClick={logout} color='secondary'>Logout</Button>
                </div>
            ):(
                <Button variant='contained' component={Link} to="/Auth" className={classes.login} color='primary'>Login</Button>
            )}
        </Toolbar>
    </AppBar> 
    )
    
}

export default Navbar