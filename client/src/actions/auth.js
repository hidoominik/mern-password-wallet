import * as api from "../api";
import { AUTH , CHANGE_PASSWORD} from "../constants/actionTypes";

export const signin = (formData, navigate) => async(dispatch) =>{
    try {
        const { data } = await api.signin(formData);
        dispatch({type: AUTH, data});

        navigate("/");
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, navigate) => async(dispatch) =>{
    try {
        const { data } = await api.signup(formData);
        dispatch({type: AUTH, data});
        
        navigate("/");
    } catch (error) {
        console.log(error);
    }
}

export const changePassword = (formData, navigate) => async(dispatch) =>{
    try {
        const { data } = await api.changePassword(formData);
        dispatch({type: CHANGE_PASSWORD, data});
        navigate("/");
    } catch (error) {
        console.log(error);
    }
}