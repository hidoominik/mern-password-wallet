import * as api from "../api";

//Action creators

export const getPasswords = () => async(dispatch) => {
    try {
        const { data } = await api.fetchPasswords();
        dispatch({type: 'FETCH_ALL', payload:data});
    } catch (error) {
        console.log(error)
    }
    
}


export const createPassword = (password) => async(dispatch) => {
    try {
        const {data} = await api.createPassword(password);
        dispatch({type: 'CREATE', payload:data });

    } catch (error) {
        console.log(error)
    }
}