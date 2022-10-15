import React from 'react'
import Password from './Password/Password';
import { useSelector } from 'react-redux';
import useStyles from './styles'


const Passwords = () => {
    const classes = useStyles();
    const passwords = useSelector((state)=>state.passwords); //.password from reducers>passwords
    console.log(passwords)
    return (
    <div>
        <h1>Your passwords:</h1>
        <Password />


    </div>
  )
}

export default Passwords;