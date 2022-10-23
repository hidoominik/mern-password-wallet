import { AUTH, CHANGE_PASSWORD, LOGOUT } from "../constants/actionTypes";

const authReducer =(state = {authData: null}, action)=>{
    switch(action.type){
        case AUTH:
            //console.log(action?.data);
            localStorage.setItem('profile', JSON.stringify({...action?.data}));
            return {...state, authData: action?.data};
        case LOGOUT:
            localStorage.clear();
            return {...state, authData: null};
        case CHANGE_PASSWORD:
            //return action.payload;
            localStorage.setItem('profile', JSON.stringify({...action?.data}));
            return {...state, authData: action?.data};
        default:
            return state;
    }
};

export default authReducer;