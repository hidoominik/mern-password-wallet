import * as api from "../api";
import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";
//Action creators

export const getPasswords = () => async(dispatch) => {
    try {
        const { data } = await api.fetchPasswords();
        dispatch({type: FETCH_ALL, payload:data});
    } catch (error) {
        console.log(error)
    }
    
}


export const createPassword = (password) => async(dispatch) => {
    try {
        const {data} = await api.createPassword(password);
        dispatch({type: CREATE, payload:data });

    } catch (error) {
        console.log(error)
    }
}

export const updatePassword = (id, password) => async(dispatch) =>{
    try {
        const {data}= await api.updatePassword(id, password);
        dispatch({type: UPDATE,payload:data });
    } catch (error) {
        console.log(error)
    }
}

export const deletePassword = (id) => async(dispatch)=>{
    try {
        await api.deletePassword(id);
        dispatch({type: DELETE, payload:id})
    } catch (error) {
        console.log(error)
    }
}