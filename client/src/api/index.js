import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req)=>{ //send token to backend auth middleware
    if(localStorage.getItem('profile')){
       req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;

});
//const url = 'http://localhost:5000/passwords';

export const fetchPasswords  = () => API.get('/passwords');
export const createPassword = (newPassword) => API.post('/passwords', newPassword);
export const updatePassword = (id, updatedPassword) => API.patch(`/passwords/${id}`, updatedPassword);
export const deletePassword = (id) => API.delete(`/passwords/${id}`);

export const signin = (formData) => API.post('user/signin',formData);
export const signup = (formData) => API.post('user/signup',formData);