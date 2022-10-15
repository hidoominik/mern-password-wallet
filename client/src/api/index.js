import axios from 'axios';

const url = 'http://localhost:5000/passwords';

export const fetchPasswords  = () => axios.get(url);
export const createPassword = (newPassword) => axios.post(url, newPassword);