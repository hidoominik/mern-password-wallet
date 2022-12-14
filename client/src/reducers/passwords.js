import { FETCH_ALL, CREATE, UPDATE, DELETE, GET_DECRYPTED } from "../constants/actionTypes";



export default (passwords = [], action) => {
    switch (action.type) {
        case DELETE: return passwords.filter((password)=>password._id !== action.payload)
        case FETCH_ALL:
            return action.payload;
        case UPDATE:
            return passwords.map((password)=> password._id === action.payload._id ? action.payload : password);
            
        case CREATE :
            return [...passwords, action.payload]
        case GET_DECRYPTED:
          
            return passwords.map((password)=> password._id === action.payload._id ? action.payload : password);
            
        default:
            return passwords;
    }
}