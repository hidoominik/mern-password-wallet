import React from 'react'
import useStyles from './styles'
import {Card, CardActions, CardContent, Button, Typography} from '@material-ui/core'

//import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
//import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
//import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import EditOutlined from '@material-ui/icons/EditOutlined';
import LockOutlined from '@material-ui/icons/LockOutlined';
import { useDispatch } from "react-redux";
import { deletePassword } from '../../../actions/passwords';


const Password = ({ password, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    console.log(password)
  return (
      <Card className={classes.card}>
        <CardContent>

          <Typography variant='h5'>{ password.webAddress} </Typography>
        
          <Typography variant='subtitle1'>Login:{ password.login} </Typography>
        
          <Typography variant='subtitle1'>Password:{ password.password} </Typography>
       
          <Typography variant='subtitle2'>Description:{ password.description} </Typography>
        </CardContent>
        <CardActions>
        <Button>
            <LockOutlined fontSize="medium"/>
          </Button>
          <Button onClick={()=>setCurrentId(password._id)}>
            <EditOutlined fontSize="medium"/>
          </Button>
          <Button>
            <DeleteOutline onClick={() => dispatch(deletePassword(password._id))} fontSize="medium"/>
          </Button>
        </CardActions>
          
       
          
          
            

          
      
      </Card>
  )
}

export default Password