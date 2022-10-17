import React from 'react'
import Password from './Password/Password';
import { CircularProgress, Paper, Grid, Container } from '@material-ui/core';
import { useSelector } from 'react-redux';
import useStyles from './styles'


const Passwords = ({setCurrentId}) => {
    const classes = useStyles();
    const passwords = useSelector((state)=>state.passwords); //.password from reducers>passwords
    console.log(passwords)
    return (
    !postMessage.length ? <CircularProgress /> : (
      <Container alignitems="stretch" spacing={3} >
        {passwords.map((password) => (
          <div key={password.id} xs={12} sm={6}>
              <Password password={password} setCurrentId={setCurrentId}/>
          </div>
        ))}
      </Container>
    )
  )
}

export default Passwords;