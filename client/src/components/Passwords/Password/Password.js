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


const Password = ({ password }) => {
    const classes = useStyles();
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
          <Button>
            <EditOutlined fontSize="medium"/>
          </Button>
          <Button>
            <DeleteOutline fontSize="medium"/>
          </Button>
        </CardActions>
          
       
          
          
            

          
      
      </Card>
  )
}

export default Password