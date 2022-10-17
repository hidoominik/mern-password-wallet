import axios from 'axios';

const url = 'http://localhost:5000/passwords';

export const fetchPasswords  = () => axios.get(url);
export const createPassword = (newPassword) => axios.post(url, newPassword);
export const updatePassword = (id, updatedPassword) => axios.patch(`${url}/${id}`, updatedPassword);
export const deletePassword = (id) => axios.delete(`${url}/${id}`);