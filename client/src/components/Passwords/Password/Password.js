import React, {useState, useEffect} from 'react'
import useStyles from './styles'
import {Card, CardActions, CardContent, Button, Typography} from '@material-ui/core'



import DeleteOutline from '@material-ui/icons/DeleteOutline';
import EditOutlined from '@material-ui/icons/EditOutlined';
import LockOutlined from '@material-ui/icons/LockOutlined';
import LockOpenOutlined from '@material-ui/icons/LockOpenOutlined'
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { deletePassword , decryptPassword, getPasswords} from '../../../actions/passwords';
import {useLocation, useNavigate} from 'react-router-dom';


const Password = ({ password, setCurrentId }) => {
    const [isEncrypted, setIsEncrypted] = useState(true)
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
   
    const passwordEncrypt = useSelector((state)=>state.passwords); //.password from reducers>passwords
    const location = useLocation();



  const getDecryptedPassword = () =>{
    if(isEncrypted){
      
    dispatch(decryptPassword(password._id, user.result.password))
      .then(setTimeout(()=>{setIsEncrypted(false)},300));
    }
    else{
      
      dispatch(getPasswords(user.result._id))
      setIsEncrypted(true)
    }
  }
    
    
  return (
      <Card className={classes.card}>
        <CardContent>

          <Typography variant='h4'>{ password.webAddress} </Typography>
        
          <Typography variant='h6'><b>Login:</b>{ password.login} </Typography>
          
          
       
          <Typography variant='subtitle2'> <b>Description:</b>{ password.description} </Typography>
          <Typography variant='subtitle2'><b>Created at:</b> { moment(password.createdAt).fromNow()} </Typography>
          {
            !isEncrypted &&(<Typography variant='h5'><b>Password:</b>{ password.password} </Typography> )
          }
        </CardContent>
        <CardActions>
          {
            (user?.result?._id === password?.creator) && (
              <>
                {
                  isEncrypted? (
                    <Button onClick={getDecryptedPassword}>
                    <LockOpenOutlined color='primary' fontSize="large"/>
                  </Button>
                  ):(<Button onClick={getDecryptedPassword}>
                  <LockOutlined color='secondary' fontSize="large"/>
                </Button>)
                }
                

                <Button onClick={()=>setCurrentId(password._id)}>
                  <EditOutlined  color='primary' fontSize="large"/>
                </Button>
          
                <Button>
                  <DeleteOutline color='secondary' onClick={() => dispatch(deletePassword(password._id))} fontSize="large"/>
                </Button>
              </>
            )
            
          }
        
        </CardActions>
          
       
          
          
            

          
      
      </Card>
  )
}

export default Password