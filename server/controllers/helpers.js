import CryptoJS from 'crypto-js';

export const encrypt_SHA512_with_salt_and_pepper = (pepper, salt, password) => {
    return CryptoJS.SHA512(pepper+salt+password).toString();
}

export const encrypt_HmacSHA512_with_KEY = (password, key) =>{
    return CryptoJS.HmacSHA512(password, key).toString();
}
export const create_MD5_String=(string)=>{
    return CryptoJS.MD5(string).toString();
}

export const decrypt_AES = (password,userPassword) =>{
    var MD5_userPassword = create_MD5_String(userPassword); 
    return CryptoJS.AES.decrypt(password,MD5_userPassword).toString();
}
export const encrypt_AES = (password,userPassword) =>{
    //var MD5_userPassword = create_MD5_String(userPassword); 
    return CryptoJS.AES.encrypt(password,CryptoJS.MD5(userPassword).toString(),{mode: CryptoJS.mode.ECB});
}

export const generate_Salt = () =>{
    return CryptoJS.lib.WordArray.random(128/8).toString();
}

export default{
    generate_Salt,
    encrypt_AES,
    decrypt_AES,
    encrypt_HmacSHA512_with_KEY,
    encrypt_SHA512_with_salt_and_pepper,
    create_MD5_String
}